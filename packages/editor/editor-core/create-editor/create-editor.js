import * as tslib_1 from "tslib";
import { Schema } from 'prosemirror-model';
import { sanitizeNodes } from '@findable/adf-schema';
import { ErrorReporter, } from '@findable/editor-common';
import { analyticsService } from '../analytics';
import { name, version } from '../version-wrapper';
import Ranks from '../plugins/rank';
export function sortByRank(a, b) {
    return a.rank - b.rank;
}
function sortByOrder(item) {
    return function (a, b) {
        return Ranks[item].indexOf(a.name) - Ranks[item].indexOf(b.name);
    };
}
export function fixExcludes(marks) {
    var markKeys = Object.keys(marks);
    var markGroups = new Set(markKeys.map(function (mark) { return marks[mark].group; }));
    markKeys.map(function (markKey) {
        var mark = marks[markKey];
        if (mark.excludes) {
            mark.excludes = mark.excludes
                .split(' ')
                .filter(function (group) { return markGroups.has(group); })
                .join(' ');
        }
    });
    return marks;
}
export function processPluginsList(plugins, editorProps) {
    /**
     * First pass to collect pluginsOptions
     */
    var pluginsOptions = plugins.reduce(function (acc, plugin) {
        if (plugin.pluginsOptions) {
            Object.keys(plugin.pluginsOptions).forEach(function (pluginName) {
                if (!acc[pluginName]) {
                    acc[pluginName] = [];
                }
                acc[pluginName].push(plugin.pluginsOptions[pluginName]);
            });
        }
        return acc;
    }, {});
    /**
     * Process plugins
     */
    return plugins.reduce(function (acc, plugin) {
        var _a, _b, _c;
        if (plugin.pmPlugins) {
            (_a = acc.pmPlugins).push.apply(_a, tslib_1.__spread(plugin.pmPlugins(plugin.name ? pluginsOptions[plugin.name] : undefined)));
        }
        if (plugin.nodes) {
            (_b = acc.nodes).push.apply(_b, tslib_1.__spread(plugin.nodes(editorProps)));
        }
        if (plugin.marks) {
            (_c = acc.marks).push.apply(_c, tslib_1.__spread(plugin.marks(editorProps)));
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
    }, {
        nodes: [],
        marks: [],
        pmPlugins: [],
        contentComponents: [],
        primaryToolbarComponents: [],
        secondaryToolbarComponents: [],
    });
}
export function createSchema(editorConfig) {
    var marks = fixExcludes(editorConfig.marks.sort(sortByOrder('marks')).reduce(function (acc, mark) {
        acc[mark.name] = mark.mark;
        return acc;
    }, {}));
    var nodes = sanitizeNodes(editorConfig.nodes.sort(sortByOrder('nodes')).reduce(function (acc, node) {
        acc[node.name] = node.node;
        return acc;
    }, {}), marks);
    return new Schema({ nodes: nodes, marks: marks });
}
export function createPMPlugins(_a) {
    var editorConfig = _a.editorConfig, schema = _a.schema, props = _a.props, dispatch = _a.dispatch, eventDispatcher = _a.eventDispatcher, providerFactory = _a.providerFactory, errorReporter = _a.errorReporter, portalProviderAPI = _a.portalProviderAPI, reactContext = _a.reactContext;
    return editorConfig.pmPlugins
        .sort(sortByOrder('plugins'))
        .map(function (_a) {
        var plugin = _a.plugin;
        return plugin({
            schema: schema,
            props: props,
            dispatch: dispatch,
            providerFactory: providerFactory,
            errorReporter: errorReporter,
            eventDispatcher: eventDispatcher,
            portalProviderAPI: portalProviderAPI,
            reactContext: reactContext,
        });
    })
        .filter(function (plugin) { return !!plugin; });
}
export function createErrorReporter(errorReporterHandler) {
    var errorReporter = new ErrorReporter();
    if (errorReporterHandler) {
        errorReporter.handler = errorReporterHandler;
    }
    return errorReporter;
}
export function initAnalytics(analyticsHandler) {
    analyticsService.handler = analyticsHandler || (function () { });
    analyticsService.trackEvent('atlassian.editor.start', {
        name: name,
        version: version,
    });
}
//# sourceMappingURL=create-editor.js.map