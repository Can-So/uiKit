import * as tslib_1 from "tslib";
import { textFormattingStateKey, blockPluginStateKey, listsStateKey, statusPluginKey, textColorPluginKey, typeAheadPluginKey, hyperlinkStateKey, HyperlinkInsertStatus, } from '@findable/editor-core';
import { valueOf as valueOfListState } from '../web-to-native/listState';
import { valueOf as valueOfMarkState } from '../web-to-native/markState';
import { toNativeBridge } from '../web-to-native';
import { hasValue } from '../../utils';
var createListenerConfig = function (config) { return config; };
var configs = [
    createListenerConfig({
        bridge: 'statusBridge',
        pluginKey: statusPluginKey,
        updater: function (state) {
            var status = state.selectedStatus, showStatusPickerAt = state.showStatusPickerAt, isNew = state.isNew;
            if (status) {
                toNativeBridge.call('statusBridge', 'showStatusPicker', {
                    text: status.text,
                    color: status.color,
                    uuid: status.localId,
                    isNew: isNew,
                });
            }
            else if (!showStatusPickerAt) {
                toNativeBridge.call('statusBridge', 'dismissStatusPicker', { isNew: isNew });
            }
        },
    }),
    createListenerConfig({
        bridge: 'textFormatBridge',
        pluginKey: textFormattingStateKey,
        updater: function (state) {
            toNativeBridge.call('textFormatBridge', 'updateTextFormat', {
                states: JSON.stringify(valueOfMarkState(state)),
            });
        },
    }),
    createListenerConfig({
        bridge: 'blockFormatBridge',
        pluginKey: blockPluginStateKey,
        updater: function (state) {
            /**
             * Currently `updateBlockState` is on different bridges in native land.
             * We have a ticket to align on the naming.
             * @see https://product-fabric.atlassian.net/browse/FM-1341
             */
            if (window.webkit) {
                // iOS
                toNativeBridge.call('blockFormatBridge', 'updateBlockState', {
                    states: state.currentBlockType.name,
                });
            }
            else {
                // Android
                toNativeBridge.call('textFormatBridge', 'updateBlockState', {
                    states: state.currentBlockType.name,
                });
            }
        },
    }),
    createListenerConfig({
        bridge: 'listBridge',
        pluginKey: listsStateKey,
        updater: function (state) {
            toNativeBridge.call('listBridge', 'updateListState', {
                states: JSON.stringify(valueOfListState(state)),
            });
        },
    }),
    createListenerConfig({
        bridge: 'textFormatBridge',
        pluginKey: textColorPluginKey,
        updater: function (state, initialPass) {
            var e_1, _a;
            var color = state.color || null;
            var serialisedState = {
                color: color,
                disabled: state.disabled,
            };
            if (initialPass) {
                var palette = Object.create(null);
                try {
                    for (var _b = tslib_1.__values(state.palette), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = tslib_1.__read(_c.value, 2), k = _d[0], v = _d[1];
                        palette[v] = k;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                serialisedState = tslib_1.__assign({}, state, { color: color,
                    palette: palette });
            }
            toNativeBridge.call('textFormatBridge', 'updateTextColor', {
                states: JSON.stringify(serialisedState),
            });
        },
        sendInitialState: true,
    }),
    createListenerConfig({
        bridge: 'typeAheadBridge',
        pluginKey: typeAheadPluginKey,
        updater: function (state) {
            var active = state.active, query = state.query, trigger = state.trigger;
            if (active === false) {
                toNativeBridge.call('typeAheadBridge', 'dismissTypeAhead');
                return;
            }
            toNativeBridge.call('typeAheadBridge', 'typeAheadQuery', {
                query: query,
                trigger: trigger,
            });
        },
    }),
    createListenerConfig({
        bridge: 'linkBridge',
        pluginKey: hyperlinkStateKey,
        updater: function (state) {
            var activeText = state.activeText, activeLinkMark = state.activeLinkMark, canInsertLink = state.canInsertLink;
            var message = { text: '', url: '' };
            if (activeLinkMark &&
                activeLinkMark.type === HyperlinkInsertStatus.EDIT_LINK_TOOLBAR) {
                var linkType_1 = activeLinkMark.node.type.schema.marks.link;
                var linkText = activeLinkMark.node.textContent;
                message.text = linkText || '';
                message.url =
                    activeLinkMark.node.marks
                        .filter(function (mark) { return mark.type === linkType_1; })
                        .map(function (link) { return link.attrs.href; })
                        .pop() || '';
            }
            if (canInsertLink && message.text.length === 0 && hasValue(activeText)) {
                message.text = activeText;
            }
            toNativeBridge.call('linkBridge', 'currentSelection', message);
        },
    }),
];
export var initPluginListeners = function (eventDispatcher, bridge, view) {
    configs.forEach(function (config) {
        var updater = config.updater, pluginKey = config.pluginKey;
        var state = pluginKey.getState(view.state);
        bridge[config.bridge + "State"] = tslib_1.__assign({}, bridge[config.bridge + "State"], state);
        if (config.sendInitialState && state) {
            updater(state, true);
        }
        eventDispatcher.on(pluginKey.key, function (state) { return updater(state); });
    });
};
export var destroyPluginListeners = function (eventDispatcher, bridge) {
    configs.forEach(function (config) {
        bridge[config.bridge + "State"] = undefined;
        eventDispatcher.off(config.pluginKey.key, config.updater);
    });
};
//# sourceMappingURL=index.js.map