import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { findParentNodeOfType } from 'prosemirror-utils';
import { isWrappingPossible } from '../utils';
import { removeBlockMarks } from '../../../utils/mark';
export var pluginKey = new PluginKey('listsPlugin');
export var createPlugin = function (dispatch) {
    return new Plugin({
        state: {
            init: function () { return ({
                bulletListActive: false,
                bulletListDisabled: false,
                orderedListActive: false,
                orderedListDisabled: false,
            }); },
            apply: function (tr, pluginState, _, state) {
                var _a = state.schema.nodes, bulletList = _a.bulletList, orderedList = _a.orderedList;
                var listParent = findParentNodeOfType([bulletList, orderedList])(tr.selection);
                var bulletListActive = !!listParent && listParent.node.type === bulletList;
                var orderedListActive = !!listParent && listParent.node.type === orderedList;
                var bulletListDisabled = !(bulletListActive ||
                    orderedListActive ||
                    isWrappingPossible(bulletList, state));
                var orderedListDisabled = !(bulletListActive ||
                    orderedListActive ||
                    isWrappingPossible(orderedList, state));
                if (bulletListActive !== pluginState.bulletListActive ||
                    orderedListActive !== pluginState.orderedListActive ||
                    bulletListDisabled !== pluginState.bulletListDisabled ||
                    orderedListDisabled !== pluginState.orderedListDisabled) {
                    var nextPluginState = tslib_1.__assign({}, pluginState, { bulletListActive: bulletListActive,
                        orderedListActive: orderedListActive,
                        bulletListDisabled: bulletListDisabled,
                        orderedListDisabled: orderedListDisabled });
                    dispatch(pluginKey, nextPluginState);
                    return nextPluginState;
                }
                return pluginState;
            },
        },
        view: function (editorView) {
            return {
                update: function (_a) {
                    var state = _a.state, dispatch = _a.dispatch;
                    var _b = state.schema.nodes, bulletList = _b.bulletList, orderedList = _b.orderedList;
                    var _c = state.schema.marks, alignment = _c.alignment, indentation = _c.indentation;
                    var listParent = findParentNodeOfType([bulletList, orderedList])(state.tr.selection);
                    if (!listParent) {
                        return;
                    }
                    /** Block mark if exists should be removed when toggled to list items */
                    var removeMarks = removeBlockMarks(state, [alignment, indentation]);
                    if (removeMarks) {
                        dispatch(removeMarks);
                    }
                },
            };
        },
        key: pluginKey,
    });
};
//# sourceMappingURL=main.js.map