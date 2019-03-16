import * as React from 'react';
import { typeAheadQuery } from '@findable/adf-schema';
import WithPluginState from '../../ui/WithPluginState';
import { createInitialPluginState, createPlugin, pluginKey as typeAheadPluginKey, } from './pm-plugins/main';
import { inputRulePlugin } from './pm-plugins/input-rules';
import { keymapPlugin } from './pm-plugins/keymap';
import { TypeAhead } from './ui/TypeAhead';
var typeAheadPlugin = {
    name: 'typeAhead',
    marks: function () {
        return [{ name: 'typeAheadQuery', mark: typeAheadQuery }];
    },
    pmPlugins: function (typeAhead) {
        if (typeAhead === void 0) { typeAhead = []; }
        return [
            {
                name: 'typeAhead',
                plugin: function (_a) {
                    var dispatch = _a.dispatch, reactContext = _a.reactContext;
                    return createPlugin(dispatch, reactContext, typeAhead);
                },
            },
            {
                name: 'typeAheadInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return inputRulePlugin(schema, typeAhead);
                },
            },
            {
                name: 'typeAheadKeymap',
                plugin: function () { return keymapPlugin(); },
            },
        ];
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement;
        return (React.createElement(WithPluginState, { plugins: {
                typeAhead: typeAheadPluginKey,
            }, render: function (_a) {
                var _b = _a.typeAhead, typeAhead = _b === void 0 ? createInitialPluginState() : _b;
                var queryMarkPos = typeAhead.queryMarkPos;
                var domRef = queryMarkPos !== null ? editorView.domAtPos(queryMarkPos) : null;
                var anchorElement = domRef
                    ? domRef.node.childNodes[domRef.offset]
                    : undefined;
                return (React.createElement(TypeAhead, { editorView: editorView, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, anchorElement: anchorElement, active: typeAhead.active, isLoading: !!typeAhead.itemsLoader, items: typeAhead.items, currentIndex: typeAhead.currentIndex }));
            } }));
    },
};
export { typeAheadPluginKey };
export default typeAheadPlugin;
//# sourceMappingURL=index.js.map