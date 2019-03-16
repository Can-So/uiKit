import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { analyticsService } from '../../analytics';
import { dedupe } from '../../utils';
import { find } from './search';
import { analyticsEventKey, } from '../analytics';
var quickInsertPlugin = {
    name: 'quickInsert',
    pmPlugins: function (quickInsert) {
        return [
            {
                name: 'quickInsert',
                plugin: function (_a) {
                    var providerFactory = _a.providerFactory;
                    return quickInsertPluginFactory(quickInsert, providerFactory);
                },
            },
        ];
    },
    pluginsOptions: {
        typeAhead: {
            trigger: '/',
            getItems: function (query, state, intl, _a, tr, dispatch) {
                var prevActive = _a.prevActive, queryChanged = _a.queryChanged;
                analyticsService.trackEvent('atlassian.editor.quickinsert.query');
                if (!prevActive && queryChanged) {
                    dispatch(analyticsEventKey, {
                        payload: {
                            action: "invoked" /* INVOKED */,
                            actionSubject: "typeAhead" /* TYPEAHEAD */,
                            actionSubjectId: "quickInsertTypeAhead" /* TYPEAHEAD_QUICK_INSERT */,
                            attributes: { inputMethod: "keyboard" /* KEYBOARD */ },
                            eventType: "ui" /* UI */,
                        },
                    });
                }
                var quickInsertState = pluginKey.getState(state);
                var defaultItems = processItems(quickInsertState.items, intl);
                var defaultSearch = function () { return find(query, defaultItems); };
                if (quickInsertState.provider) {
                    return quickInsertState.provider
                        .then(function (items) {
                        return find(query, dedupe(tslib_1.__spread(defaultItems, items), function (item) { return item.title; }));
                    })
                        .catch(function (err) {
                        // tslint:disable-next-line:no-console
                        console.error(err);
                        return defaultSearch();
                    });
                }
                return defaultSearch();
            },
            selectItem: function (state, item, insert) {
                analyticsService.trackEvent('atlassian.editor.quickinsert.select', {
                    item: item.title,
                });
                return item.action(insert, state);
            },
        },
    },
};
export default quickInsertPlugin;
var itemsCache = {};
var processItems = function (items, intl) {
    if (!itemsCache[intl.locale]) {
        itemsCache[intl.locale] = items.reduce(function (acc, item) {
            if (typeof item === 'function') {
                return acc.concat(item(intl));
            }
            return acc.concat(item);
        }, []);
    }
    return itemsCache[intl.locale];
};
/**
 *
 * ProseMirror Plugin
 *
 */
export var pluginKey = new PluginKey('quickInsertPluginKey');
export var setProvider = function (provider) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(pluginKey, provider));
    }
    return true;
}; };
function quickInsertPluginFactory(quickInsertItems, providerFactory) {
    return new Plugin({
        key: pluginKey,
        state: {
            init: function () {
                return {
                    items: quickInsertItems || [],
                };
            },
            apply: function (tr, pluginState) {
                var provider = tr.getMeta(pluginKey);
                if (provider) {
                    return tslib_1.__assign({}, pluginState, { provider: provider });
                }
                return pluginState;
            },
        },
        view: function (editorView) {
            var providerHandler = function (name, providerPromise) {
                if (providerPromise) {
                    setProvider(providerPromise.then(function (provider) {
                        return provider.getItems();
                    }))(editorView.state, editorView.dispatch);
                }
            };
            providerFactory.subscribe('quickInsertProvider', providerHandler);
            return {
                destroy: function () {
                    providerFactory.unsubscribe('quickInsertProvider', providerHandler);
                },
            };
        },
    });
}
//# sourceMappingURL=index.js.map