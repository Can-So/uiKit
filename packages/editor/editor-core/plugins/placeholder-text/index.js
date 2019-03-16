import * as React from 'react';
import { Plugin, NodeSelection, TextSelection, } from 'prosemirror-state';
import { PluginKey } from 'prosemirror-state';
import { placeholder } from '@atlaskit/adf-schema';
import WithPluginState from '../../ui/WithPluginState';
import { isEmptyNode } from '../../utils/document';
import { FakeTextCursorSelection } from '../fake-text-cursor/cursor';
import PlaceholderTextNodeView from './nodeviews/placeholder-text';
import PlaceholderFloatingToolbar from './ui/PlaceholderFloatingToolbar';
import { hidePlaceholderFloatingToolbar, insertPlaceholderTextAtSelection, } from './actions';
export var pluginKey = new PluginKey('placeholderTextPlugin');
export function createPlugin(dispatch, options) {
    var allowInserting = !!options.allowInserting;
    return new Plugin({
        key: pluginKey,
        state: {
            init: function () {
                return ({
                    showInsertPanelAt: null,
                    allowInserting: allowInserting,
                });
            },
            apply: function (tr, state) {
                var meta = tr.getMeta(pluginKey);
                if (meta && meta.showInsertPanelAt !== undefined) {
                    var newState = {
                        showInsertPanelAt: meta.showInsertPanelAt,
                        allowInserting: allowInserting,
                    };
                    dispatch(pluginKey, newState);
                    return newState;
                }
                else if (state.showInsertPanelAt) {
                    var newState = {
                        showInsertPanelAt: tr.mapping.map(state.showInsertPanelAt),
                        allowInserting: allowInserting,
                    };
                    dispatch(pluginKey, newState);
                    return newState;
                }
                return state;
            },
        },
        props: {
            nodeViews: {
                placeholder: function (node, view, getPos) {
                    return new PlaceholderTextNodeView(node, view, getPos);
                },
            },
        },
        appendTransaction: function (transactions, oldState, newState) {
            if (transactions.some(function (txn) { return txn.docChanged; })) {
                var didPlaceholderExistBeforeTxn = oldState.selection.$head.nodeAfter ===
                    newState.selection.$head.nodeAfter;
                var adjacentNode = newState.selection.$head.nodeAfter;
                var adjacentNodePos = newState.selection.$head.pos;
                var placeholderNodeType = newState.schema.nodes.placeholder;
                if (adjacentNode &&
                    adjacentNode.type === placeholderNodeType &&
                    didPlaceholderExistBeforeTxn) {
                    // Check that cursor has moved forward in the document **and** that there is content before the cursor
                    var wasContentAdded = oldState.selection.$head.pos < newState.selection.$head.pos &&
                        !isEmptyNode(newState.selection.$head.nodeBefore);
                    if (wasContentAdded) {
                        var _a = NodeSelection.create(newState.doc, adjacentNodePos), $from = _a.$from, $to = _a.$to;
                        return newState.tr.deleteRange($from.pos, $to.pos);
                    }
                }
            }
            // Handle Fake Text Cursor for Floating Toolbar
            if (!pluginKey.getState(oldState).showInsertPanelAt &&
                pluginKey.getState(newState).showInsertPanelAt) {
                return newState.tr.setSelection(new FakeTextCursorSelection(newState.selection.$from));
            }
            if (pluginKey.getState(oldState).showInsertPanelAt &&
                !pluginKey.getState(newState).showInsertPanelAt) {
                if (newState.selection instanceof FakeTextCursorSelection) {
                    return newState.tr.setSelection(new TextSelection(newState.selection.$from));
                }
            }
        },
    });
}
var placeholderTextPlugin = function (options) { return ({
    nodes: function () {
        return [{ name: 'placeholder', node: placeholder }];
    },
    pmPlugins: function () {
        return [
            {
                name: 'placeholderText',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props, dispatch = _a.dispatch;
                    return createPlugin(dispatch, options);
                },
            },
        ];
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement;
        var insertPlaceholderText = function (value) {
            return insertPlaceholderTextAtSelection(value)(editorView.state, editorView.dispatch);
        };
        var hidePlaceholderToolbar = function () {
            return hidePlaceholderFloatingToolbar(editorView.state, editorView.dispatch);
        };
        var getNodeFromPos = function (pos) { return editorView.domAtPos(pos).node; };
        var getFixedCoordinatesFromPos = function (pos) {
            return editorView.coordsAtPos(pos);
        };
        var setFocusInEditor = function () { return editorView.focus(); };
        return (React.createElement(WithPluginState, { plugins: { placeholderTextState: pluginKey }, render: function (_a) {
                var _b = _a.placeholderTextState, placeholderTextState = _b === void 0 ? {} : _b;
                if (placeholderTextState.showInsertPanelAt) {
                    return (React.createElement(PlaceholderFloatingToolbar, { editorViewDOM: editorView.dom, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, getFixedCoordinatesFromPos: getFixedCoordinatesFromPos, getNodeFromPos: getNodeFromPos, hidePlaceholderFloatingToolbar: hidePlaceholderToolbar, showInsertPanelAt: placeholderTextState.showInsertPanelAt, insertPlaceholder: insertPlaceholderText, setFocusInEditor: setFocusInEditor }));
                }
                return null;
            } }));
    },
}); };
export default placeholderTextPlugin;
//# sourceMappingURL=index.js.map