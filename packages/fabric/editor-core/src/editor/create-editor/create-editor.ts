import { Schema, MarkSpec } from 'prosemirror-model';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { sanitizeNodes } from '@atlaskit/editor-common';
import { analyticsService, AnalyticsHandler } from '../../analytics';
import {
  EditorInstance,
  EditorPlugin,
  EditorProps,
  EditorConfig,
} from '../types';
import { ProviderFactory } from '@atlaskit/editor-common';
import ErrorReporter from '../../utils/error-reporter';
import { processRawValue } from '../utils/document';
import { EventDispatcher, createDispatch, Dispatch } from '../event-dispatcher';
import { name, version } from '../../version';

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
  return plugins.reduce(
    (acc, plugin) => {
      if (plugin.pmPlugins) {
        acc.pmPlugins.push(...plugin.pmPlugins());
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

export function createPMPlugins(
  editorConfig: EditorConfig,
  schema: Schema,
  props: EditorProps,
  dispatch: Dispatch,
  providerFactory: ProviderFactory,
  errorReporter: ErrorReporter,
): Plugin[] {
  return editorConfig.pmPlugins
    .sort(sortByRank)
    .map(({ plugin }) =>
      plugin({ schema, props, dispatch, providerFactory, errorReporter }),
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

/**
 * Creates and mounts EditorView to the provided place.
 */
export default function createEditor(
  place: HTMLElement | null,
  editorPlugins: EditorPlugin[] = [],
  props: EditorProps,
  providerFactory: ProviderFactory,
): EditorInstance {
  const editorConfig = processPluginsList(editorPlugins, props);
  const {
    contentComponents,
    primaryToolbarComponents,
    secondaryToolbarComponents,
  } = editorConfig;
  const { contentTransformerProvider, defaultValue, onChange } = props;

  initAnalytics(props.analyticsHandler);

  const errorReporter = createErrorReporter(props.errorReporterHandler);
  const eventDispatcher = new EventDispatcher();
  const dispatch = createDispatch(eventDispatcher);
  const schema = createSchema(editorConfig);
  const plugins = createPMPlugins(
    editorConfig,
    schema,
    props,
    dispatch,
    providerFactory,
    errorReporter,
  );
  const contentTransformer = contentTransformerProvider
    ? contentTransformerProvider(schema)
    : undefined;
  const doc =
    contentTransformer && typeof defaultValue === 'string'
      ? contentTransformer.parse(defaultValue)
      : processRawValue(schema, defaultValue);

  const state = EditorState.create({ doc, schema, plugins });
  const editorView = new EditorView(place!, {
    state,
    dispatchTransaction(tr: Transaction) {
      tr.setMeta('isLocal', true);
      const newState = editorView.state.apply(tr);
      editorView.updateState(newState);
      if (onChange && tr.docChanged) {
        onChange(editorView);
      }
    },
    editable: () => true,
  });

  return {
    editorView,
    eventDispatcher,
    contentComponents,
    primaryToolbarComponents,
    secondaryToolbarComponents,
    contentTransformer,
  };
}
