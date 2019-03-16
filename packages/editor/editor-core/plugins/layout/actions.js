import * as tslib_1 from "tslib";
import { safeInsert } from 'prosemirror-utils';
import { Fragment, Slice } from 'prosemirror-model';
import { pluginKey } from './pm-plugins/main';
import { mapChildren, flatmap } from '../../utils/slice';
import { isEmptyDocument, getStepRange } from '../../utils';
export var getPresetLayout = function (section) {
    var widths = mapChildren(section, function (column) { return column.attrs.width; });
    if (widths.length === 2 && widths.every(function (width) { return width === 50; })) {
        return 'two_equal';
    }
    else if (widths.every(function (width) { return Number(width.toFixed(2)) === 33.33; })) {
        return 'three_equal';
    }
};
export var createDefaultLayoutSection = function (state) {
    var _a = state.schema.nodes, layoutSection = _a.layoutSection, layoutColumn = _a.layoutColumn;
    // create a 50-50 layout by default
    var columns = Fragment.fromArray([
        layoutColumn.createAndFill({ width: 50 }),
        layoutColumn.createAndFill({ width: 50 }),
    ]);
    return layoutSection.createAndFill(undefined, columns);
};
export var insertLayoutColumns = function (state, dispatch) {
    if (dispatch) {
        dispatch(safeInsert(createDefaultLayoutSection(state))(state.tr));
    }
    return true;
};
function forceColumnStructure(state, node, pos, presetLayout) {
    var tr = state.tr;
    var insideRightEdgeOfLayoutSection = pos + node.nodeSize - 1;
    if (presetLayout === 'two_equal' && node.childCount === 3) {
        var thirdColumn = node.content.child(2);
        var thirdColumnPos = insideRightEdgeOfLayoutSection - thirdColumn.nodeSize;
        if (isEmptyDocument(thirdColumn)) {
            tr.replaceRange(
            // end pos of second column
            tr.mapping.map(thirdColumnPos - 1), tr.mapping.map(insideRightEdgeOfLayoutSection), Slice.empty);
        }
        else {
            tr.replaceRange(
            // end pos of second column
            tr.mapping.map(thirdColumnPos - 1), 
            // start pos of third column
            tr.mapping.map(thirdColumnPos + 1), Slice.empty);
        }
    }
    else if (presetLayout === 'three_equal' && node.childCount === 2) {
        tr.replaceWith(tr.mapping.map(insideRightEdgeOfLayoutSection), tr.mapping.map(insideRightEdgeOfLayoutSection), state.schema.nodes.layoutColumn.createAndFill());
    }
    return tr;
}
function equalColumnWidth(node, schema, width) {
    var layoutColumn = schema.nodes.layoutColumn;
    var truncatedWidth = Number(width.toFixed(2));
    return flatmap(node.content, function (column) {
        return layoutColumn.create(tslib_1.__assign({}, column.attrs, { width: truncatedWidth }), column.content, column.marks);
    });
}
function forceColumnWidths(state, tr, pos, presetLayout) {
    var width = presetLayout === 'two_equal' ? 50 : 33.33;
    var node = tr.doc.nodeAt(pos);
    if (!node) {
        return tr;
    }
    if (getPresetLayout(node) === presetLayout) {
        return tr;
    }
    return tr.replaceWith(pos + 1, pos + node.nodeSize - 1, equalColumnWidth(node, state.schema, width));
}
export function forceSectionToPresetLayout(state, node, pos, presetLayout) {
    var tr = forceColumnStructure(state, node, pos, presetLayout);
    // save the selection here, since forcing column widths causes a change over the
    // entire layoutSection, which remaps selection to the end. not remapping here
    // is safe because the structure is no longer changing.
    var selection = tr.selection;
    return forceColumnWidths(state, tr, pos, presetLayout).setSelection(selection);
}
export var setPresetLayout = function (layout) { return function (state, dispatch) {
    var pos = pluginKey.getState(state).pos;
    if (pos === null) {
        return false;
    }
    var node = state.doc.nodeAt(pos);
    if (!node) {
        return false;
    }
    var tr = forceSectionToPresetLayout(state, node, pos, layout);
    if (tr) {
        if (dispatch) {
            dispatch(tr.scrollIntoView());
        }
        return true;
    }
    return false;
}; };
export var fixColumnSizes = function (changedTr, state) {
    var layoutSection = state.schema.nodes.layoutSection;
    var change;
    var range = getStepRange(changedTr);
    if (!range) {
        return undefined;
    }
    changedTr.doc.nodesBetween(range.from, range.to, function (node, pos) {
        if (node.type === layoutSection) {
            var widths = mapChildren(node, function (column) { return column.attrs.width; });
            var totalWidth = Math.round(widths.reduce(function (acc, width) { return acc + width; }, 0));
            if (totalWidth !== 100) {
                var fixedColumns = equalColumnWidth(node, state.schema, 100 / node.childCount);
                change = {
                    from: pos + 1,
                    to: pos + node.nodeSize - 1,
                    slice: new Slice(fixedColumns, 0, 0),
                };
                return false;
            }
        }
        else {
            return true;
        }
    });
    return change;
};
export var deleteActiveLayoutNode = function (state, dispatch) {
    var pos = pluginKey.getState(state).pos;
    if (pos !== null) {
        var node = state.doc.nodeAt(pos);
        if (dispatch) {
            dispatch(state.tr.delete(pos, pos + node.nodeSize));
        }
        return true;
    }
    return false;
};
//# sourceMappingURL=actions.js.map