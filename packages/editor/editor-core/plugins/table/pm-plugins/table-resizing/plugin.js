import { Plugin, PluginKey } from 'prosemirror-state';
import { TableMap } from 'prosemirror-tables';
import * as classnames from 'classnames';
import { akEditorTableToolbarSize } from '@findable/editor-common';
import { updateControls, updateResizeHandle, updateColumnWidth, resizeColumn, } from './actions';
import Resizer from './resizer/resizer';
import { getLayoutSize, pointsAtCell, edgeCell, currentColWidth, domCellAround, } from './utils';
import { TableCssClassName as ClassName, } from '../../types';
import { pluginKey as editorDisabledPluginKey, } from '../../../editor-disabled';
import { pluginKey as widthPluginKey } from '../../../width';
import { closestElement } from '../../../../utils';
export var pluginKey = new PluginKey('tableFlexiColumnResizing');
export function createPlugin(dispatch, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.handleWidth, handleWidth = _c === void 0 ? 5 : _c, _d = _b.cellMinWidth, cellMinWidth = _d === void 0 ? 25 : _d, _e = _b.lastColumnResizable, lastColumnResizable = _e === void 0 ? true : _e, _f = _b.dynamicTextSizing, dynamicTextSizing = _f === void 0 ? false : _f;
    return new Plugin({
        key: pluginKey,
        state: {
            init: function () { return new ResizeState(-1, null); },
            apply: function (tr, pluginState, prevState, state) {
                var newPluginState = pluginState.apply(tr, state);
                if ((newPluginState &&
                    pluginState.activeHandle !== newPluginState.activeHandle) ||
                    pluginState.dragging !== newPluginState.dragging) {
                    dispatch(pluginKey, newPluginState);
                    return newPluginState;
                }
                return pluginState;
            },
        },
        props: {
            attributes: function (state) {
                var _a;
                var pluginState = pluginKey.getState(state);
                return {
                    class: classnames(ClassName.RESIZING_PLUGIN, (_a = {},
                        _a[ClassName.RESIZE_CURSOR] = pluginState.activeHandle > -1,
                        _a[ClassName.IS_RESIZING] = !!pluginState.dragging,
                        _a)),
                };
            },
            handleDOMEvents: {
                mousemove: function (view, event) {
                    handleMouseMove(view, event, handleWidth, lastColumnResizable);
                    if (pluginKey.getState(view.state).dragging) {
                        updateControls(view.state);
                        updateResizeHandle(view);
                    }
                    return false;
                },
                mouseleave: function (view) {
                    handleMouseLeave(view);
                    updateControls(view.state);
                    return true;
                },
                mousedown: function (view, event) {
                    var _a = pluginKey.getState(view.state), activeHandle = _a.activeHandle, dragging = _a.dragging;
                    if (activeHandle > -1 && !dragging) {
                        handleMouseDown(view, event, cellMinWidth, dynamicTextSizing);
                        updateResizeHandle(view);
                        return true;
                    }
                    return false;
                },
            },
        },
    });
}
var ResizeState = /** @class */ (function () {
    function ResizeState(activeHandle, dragging) {
        this.activeHandle = activeHandle;
        this.dragging = dragging;
        return Object.freeze(this);
    }
    ResizeState.prototype.apply = function (tr, state) {
        var action = tr.getMeta(pluginKey);
        var editorDisabled = editorDisabledPluginKey.getState(state).editorDisabled;
        // Disable table resizing if the editor is disabled
        if (editorDisabled) {
            return new ResizeState(-1, null);
        }
        if (action && action.setHandle !== undefined) {
            return new ResizeState(action.setHandle, null);
        }
        if (action && action.setDragging !== undefined) {
            return new ResizeState(this.activeHandle, action.setDragging);
        }
        if (this.activeHandle > -1 && tr.docChanged) {
            var handle = tr.mapping.map(this.activeHandle, -1);
            if (!pointsAtCell(tr.doc.resolve(handle))) {
                handle = -1;
            }
            return new ResizeState(handle, this.dragging);
        }
        return this;
    };
    return ResizeState;
}());
export { ResizeState };
function handleMouseMove(view, event, handleWidth, lastColumnResizable) {
    var pluginState = pluginKey.getState(view.state);
    if (!pluginState.dragging) {
        var target = domCellAround(event.target);
        var cell = -1;
        if (target) {
            var _a = target.getBoundingClientRect(), left = _a.left, right = _a.right;
            if (event.clientX - left <= handleWidth) {
                cell = edgeCell(view, event, 'left', handleWidth);
            }
            else if (right - event.clientX <= handleWidth) {
                cell = edgeCell(view, event, 'right', handleWidth);
            }
        }
        if (typeof cell === 'number' && cell !== pluginState.activeHandle) {
            if (!lastColumnResizable && cell !== -1) {
                var $cell = view.state.doc.resolve(cell);
                var table = $cell.node(-1);
                var map = TableMap.get(table);
                var start = $cell.start(-1);
                var col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
                if (col === map.width - 1) {
                    return;
                }
            }
            view.dispatch(view.state.tr.setMeta(pluginKey, { setHandle: cell }));
        }
    }
}
function handleMouseLeave(view) {
    var pluginState = pluginKey.getState(view.state);
    if (pluginState.activeHandle > -1 && !pluginState.dragging) {
        view.dispatch(view.state.tr.setMeta(pluginKey, { setHandle: -1 }));
    }
}
function createResizeHandle(tableRef) {
    var resizeHandleRef = document.createElement('div');
    resizeHandleRef.className = ClassName.COLUMN_RESIZE_HANDLE;
    tableRef.parentNode.appendChild(resizeHandleRef);
    var tableActive = closestElement(tableRef, "." + ClassName.WITH_CONTROLS);
    resizeHandleRef.style.height = (tableActive
        ? tableRef.offsetHeight + akEditorTableToolbarSize
        : tableRef.offsetHeight) + "px";
    return resizeHandleRef;
}
function handleMouseDown(view, event, cellMinWidth, dynamicTextSizing) {
    var state = view.state;
    var activeHandle = pluginKey.getState(state).activeHandle;
    var cell = view.state.doc.nodeAt(activeHandle);
    var $cell = view.state.doc.resolve(activeHandle);
    var $originalTable = $cell.node(-1);
    var start = $cell.start(-1);
    var dom = view.domAtPos(start).node;
    while (dom.nodeName !== 'TABLE') {
        dom = dom.parentNode;
    }
    var resizeHandleRef = createResizeHandle(dom);
    var containerWidth = widthPluginKey.getState(view.state).width;
    var resizer = Resizer.fromDOM(view, dom, {
        minWidth: cellMinWidth,
        maxSize: getLayoutSize(dom.getAttribute('data-layout'), containerWidth, dynamicTextSizing),
        node: $cell.node(-1),
        start: start,
    });
    resizer.apply(resizer.currentState);
    var width = currentColWidth(view, activeHandle, cell
        .attrs);
    view.dispatch(view.state.tr.setMeta(pluginKey, {
        setDragging: { startX: event.clientX, startWidth: width },
    }));
    function finish(event) {
        var clientX = event.clientX;
        window.removeEventListener('mouseup', finish);
        window.removeEventListener('mousemove', move);
        var _a = pluginKey.getState(view.state), activeHandle = _a.activeHandle, dragging = _a.dragging;
        // activeHandle could be remapped via a collab change.
        // Fetch a fresh reference of the table.
        var $cell = view.state.doc.resolve(activeHandle);
        var $table = $cell.node(-1);
        if (resizeHandleRef && resizeHandleRef.parentNode) {
            resizeHandleRef.parentNode.removeChild(resizeHandleRef);
            resizeHandleRef = null;
        }
        // If we let go in the same place we started, dont need to do anything.
        if (dragging && clientX === dragging.startX) {
            view.dispatch(view.state.tr.setMeta(pluginKey, { setDragging: null }));
            return;
        }
        if (dragging) {
            var startX = dragging.startX;
            // If the table has changed (via collab for example) don't apply column widths
            // For example, if a table col is deleted we won't be able to reliably remap the new widths
            // There may be a more elegant solution to this, to avoid a jarring experience.
            if ($table.eq($originalTable)) {
                updateColumnWidth(view, activeHandle, clientX - startX, resizer);
            }
            view.dispatch(view.state.tr.setMeta(pluginKey, { setDragging: null }));
        }
    }
    function move(event) {
        var clientX = event.clientX, which = event.which;
        if (!which) {
            return finish(event);
        }
        var _a = pluginKey.getState(view.state), activeHandle = _a.activeHandle, startX = _a.dragging.startX;
        resizeColumn(view, activeHandle, clientX - startX, resizer);
    }
    window.addEventListener('mouseup', finish);
    window.addEventListener('mousemove', move);
    event.preventDefault();
    return true;
}
//# sourceMappingURL=plugin.js.map