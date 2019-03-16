var _this = this;
import * as tslib_1 from "tslib";
import { NodeSelection } from 'prosemirror-state';
import { pluginKey } from './';
import * as assert from 'assert';
import { getValidNode } from '@findable/editor-common';
import { safeInsert, replaceSelectedNode, replaceParentNodeOfType, } from 'prosemirror-utils';
import { normaliseNestedLayout } from '../../utils';
export var insertMacroFromMacroBrowser = function (macroProvider, macroNode, isEditing) { return function (state, dispatch) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var newMacro, currentLayout, node, bodiedExtension, tr, nonSelectedBodiedExtension;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!macroProvider) {
                    return [2 /*return*/, false];
                }
                return [4 /*yield*/, macroProvider.openMacroBrowser(macroNode)];
            case 1:
                newMacro = _a.sent();
                if (newMacro) {
                    currentLayout = (macroNode && macroNode.attrs.layout) || 'default';
                    node = resolveMacro(newMacro, state, { layout: currentLayout });
                    if (!node) {
                        return [2 /*return*/, false];
                    }
                    bodiedExtension = state.schema.nodes.bodiedExtension;
                    tr = state.tr;
                    nonSelectedBodiedExtension = macroNode.type === bodiedExtension &&
                        !(tr.selection instanceof NodeSelection);
                    if (nonSelectedBodiedExtension && !isEditing) {
                        tr = safeInsert(node)(tr);
                    }
                    else if (nonSelectedBodiedExtension) {
                        tr = replaceParentNodeOfType(bodiedExtension, node)(tr);
                    }
                    else if (tr.selection instanceof NodeSelection) {
                        tr = replaceSelectedNode(node)(tr);
                    }
                    if (dispatch) {
                        dispatch(tr.scrollIntoView());
                    }
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
        }
    });
}); }; };
export var resolveMacro = function (macro, state, optionalAttrs) {
    if (!macro || !state) {
        return null;
    }
    var schema = state.schema;
    var _a = getValidNode(macro, schema), type = _a.type, attrs = _a.attrs;
    var node;
    if (type === 'extension') {
        node = schema.nodes.extension.create(tslib_1.__assign({}, attrs, optionalAttrs));
    }
    else if (type === 'bodiedExtension') {
        node = schema.nodes.bodiedExtension.create(tslib_1.__assign({}, attrs, optionalAttrs), schema.nodeFromJSON(macro).content);
    }
    else if (type === 'inlineExtension') {
        node = schema.nodes.inlineExtension.create(attrs);
    }
    return normaliseNestedLayout(state, node);
};
// gets the macroProvider from the state and tries to autoConvert a given text
export var runMacroAutoConvert = function (state, text) {
    var macroPluginState = pluginKey.getState(state);
    var macroProvider = macroPluginState && macroPluginState.macroProvider;
    if (!macroProvider || !macroProvider.autoConvert) {
        return null;
    }
    var macroAttributes = macroProvider.autoConvert(text);
    if (!macroAttributes) {
        return null;
    }
    // decides which kind of macro to render (inline|bodied|bodyless) - will be just inline atm.
    return resolveMacro(macroAttributes, state);
};
export var setMacroProvider = function (provider) { return function (view) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var resolvedProvider, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, provider];
            case 1:
                resolvedProvider = _a.sent();
                assert(resolvedProvider && resolvedProvider.openMacroBrowser, "MacroProvider promise did not resolve to a valid instance of MacroProvider - " + resolvedProvider);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                resolvedProvider = null;
                return [3 /*break*/, 3];
            case 3:
                view.dispatch(view.state.tr.setMeta(pluginKey, { macroProvider: resolvedProvider }));
                return [2 /*return*/, true];
        }
    });
}); }; };
//# sourceMappingURL=actions.js.map