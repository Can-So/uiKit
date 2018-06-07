import { Schema, MarkSpec } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { sanitizeNodes, ProviderFactory } from '@atlaskit/editor-common';
import { analyticsService, AnalyticsHandler } from '../analytics';
import { EditorPlugin, EditorProps, EditorConfig } from '../types';
import ErrorReporter from '../utils/error-reporter';
import { name, version } from '../version';
import { Dispatch, EventDispatcher } from '../event-dispatcher';
import { PortalProviderAPI } from '../ui/PortalProvider';

export function sortByRank(a: { rank: number }, b: { rank: number }): number {
  return a.rank - b.rank;
}

export function fixExcludes(marks: {
  [key: string]: MarkSpec;
}): { [key: string]: MarkSpec } {
  const markKeys = Object.keys(marks);
  const markGroups = new Set(markKeys.map(mark => marks[mark].group));

  markKeys.map(markKey => {
    const mark = marks[markKey];
    if (mark.excludes) {
      mark.excludes = mark.excludes
        .split(' ')
        .filter(group => markGroups.has(group))
        .join(' ');
    }
  });
  return marks;
}

export function processPluginsList(
  plugins: EditorPlugin[],
  editorProps: EditorProps,
): EditorConfig {
  /**
   * First pass to collect pluginsOptions
   */
  const pluginsOptions = plugins.reduce((acc, plugin) => {
    if (plugin.pluginsOptions) {
      Object.keys(plugin.pluginsOptions).forEach(pluginName => {
        if (!acc[pluginName]) {
          acc[pluginName] = [];
        }
        acc[pluginName].push(plugin.pluginsOptions![pluginName]);
      });
    }

    return acc;
  }, {});

  /**
   * Process plugins
   */
  return plugins.reduce(
    (acc, plugin) => {
      if (plugin.pmPlugins) {
        acc.pmPlugins.push(
          ...plugin.pmPlugins(
            plugin.name ? pluginsOptions[plugin.name] : undefined,
          ),
        );
      }

      if (plugin.nodes) {
        acc.nodes.push(...plugin.nodes(editorProps));
      }

      if (plugin.marks) {
        acc.marks.push(...plugin.marks(editorProps));
      }

      if (plugin.contentComponent) {
        acc.contentComponents.push(plugin.contentComponent);
      }

      if (plugin.primaryToolbarComponent) {
        acc.primaryToolbarComponents.push(plugin.primaryToolbarComponent);
      }

      if (plugin.secondaryToolbarComponent) {
        acc.secondaryToolbarComponents.push(plugin.secondaryToolbarComponent);
      }

      return acc;
    },
    {
      nodes: [],
      marks: [],
      pmPlugins: [],
      contentComponents: [],
      primaryToolbarComponents: [],
      secondaryToolbarComponents: [],
    } as EditorConfig,
  );
}

export function createSchema(editorConfig: EditorConfig) {
  const marks = fixExcludes(
    editorConfig.marks.sort(sortByRank).reduce((acc, mark) => {
      acc[mark.name] = mark.mark;
      return acc;
    }, {}),
  );

  const nodes = sanitizeNodes(
    editorConfig.nodes.sort(sortByRank).reduce((acc, node) => {
      acc[node.name] = node.node;
      return acc;
    }, {}),
    marks,
  );

  return new Schema({ nodes, marks });
}

export function createPMPlugins({
  editorConfig,
  schema,
  props,
  dispatch,
  eventDispatcher,
  providerFactory,
  errorReporter,
  portalProviderAPI,
}: {
  editorConfig: EditorConfig;
  schema: Schema;
  props: EditorProps;
  dispatch: Dispatch;
  eventDispatcher: EventDispatcher;
  providerFactory: ProviderFactory;
  errorReporter: ErrorReporter;
  portalProviderAPI: PortalProviderAPI;
}): Plugin[] {
  return editorConfig.pmPlugins
    .sort(sortByRank)
    .map(({ plugin }) =>
      plugin({
        schema,
        props,
        dispatch,
        providerFactory,
        errorReporter,
        eventDispatcher,
        portalProviderAPI,
      }),
    )
    .filter(plugin => !!plugin) as Plugin[];
}

export function createErrorReporter(errorReporterHandler) {
  const errorReporter = new ErrorReporter();
  if (errorReporterHandler) {
    errorReporter.handler = errorReporterHandler;
  }
  return errorReporter;
}

export function initAnalytics(analyticsHandler?: AnalyticsHandler) {
  analyticsService.handler = analyticsHandler || (() => {});
  analyticsService.trackEvent('atlassian.editor.start', {
    name,
    version,
  });
}
