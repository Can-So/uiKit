import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { NORMAL_TEXT, HEADING_1, HEADING_2, HEADING_3, HEADING_4, HEADING_5, HEADING_6, BLOCK_QUOTE, CODE_BLOCK, PANEL, OTHER, TEXT_BLOCK_TYPES, WRAPPER_BLOCK_TYPES, HEADINGS_BY_LEVEL, } from '../types';
import { areBlockTypesDisabled } from '../../../utils';
var blockTypeForNode = function (node, schema) {
    if (node.type === schema.nodes.heading) {
        var maybeNode = HEADINGS_BY_LEVEL[node.attrs['level']];
        if (maybeNode) {
            return maybeNode;
        }
    }
    else if (node.type === schema.nodes.paragraph) {
        return NORMAL_TEXT;
    }
    return OTHER;
};
var isBlockTypeSchemaSupported = function (blockType, state) {
    switch (blockType) {
        case NORMAL_TEXT:
            return !!state.schema.nodes.paragraph;
        case HEADING_1:
        case HEADING_2:
        case HEADING_3:
        case HEADING_4:
        case HEADING_5:
        case HEADING_6:
            return !!state.schema.nodes.heading;
        case BLOCK_QUOTE:
            return !!state.schema.nodes.blockquote;
        case CODE_BLOCK:
            return !!state.schema.nodes.codeBlock;
        case PANEL:
            return !!state.schema.nodes.panel;
    }
};
var detectBlockType = function (availableBlockTypes, state) {
    // Before a document is loaded, there is no selection.
    if (!state.selection) {
        return NORMAL_TEXT;
    }
    var blockType;
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    state.doc.nodesBetween($from.pos, $to.pos, function (node, pos) {
        var nodeBlockType = availableBlockTypes.filter(function (blockType) { return blockType === blockTypeForNode(node, state.schema); });
        if (nodeBlockType.length > 0) {
            if (!blockType) {
                blockType = nodeBlockType[0];
            }
            else if (blockType !== OTHER && blockType !== nodeBlockType[0]) {
                blockType = OTHER;
            }
        }
    });
    return blockType || OTHER;
};
export var pluginKey = new PluginKey('blockTypePlugin');
export var createPlugin = function (dispatch, appearance) {
    return new Plugin({
        appendTransaction: function (transactions, oldState, newState) {
            if (appearance === 'comment') {
                var pos = newState.doc.resolve(newState.doc.content.size - 1);
                var lastNode = pos.node(1);
                var paragraph = newState.schema.nodes.paragraph;
                if (lastNode && lastNode.isBlock && lastNode.type !== paragraph) {
                    return newState.tr.insert(newState.doc.content.size, newState.schema.nodes.paragraph.create());
                }
            }
        },
        state: {
            init: function (config, state) {
                var availableBlockTypes = TEXT_BLOCK_TYPES.filter(function (blockType) {
                    return isBlockTypeSchemaSupported(blockType, state);
                });
                var availableWrapperBlockTypes = WRAPPER_BLOCK_TYPES.filter(function (blockType) { return isBlockTypeSchemaSupported(blockType, state); });
                return {
                    currentBlockType: detectBlockType(availableBlockTypes, state),
                    blockTypesDisabled: areBlockTypesDisabled(state),
                    availableBlockTypes: availableBlockTypes,
                    availableWrapperBlockTypes: availableWrapperBlockTypes,
                };
            },
            apply: function (tr, oldPluginState, oldState, newState) {
                var newPluginState = tslib_1.__assign({}, oldPluginState, { currentBlockType: detectBlockType(oldPluginState.availableBlockTypes, newState), blockTypesDisabled: areBlockTypesDisabled(newState) });
                if (newPluginState.currentBlockType !== oldPluginState.currentBlockType ||
                    newPluginState.blockTypesDisabled !==
                        oldPluginState.blockTypesDisabled) {
                    dispatch(pluginKey, newPluginState);
                }
                return newPluginState;
            },
        },
        key: pluginKey,
    });
};
//# sourceMappingURL=main.js.map