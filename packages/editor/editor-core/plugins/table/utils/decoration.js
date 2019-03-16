import { Decoration } from 'prosemirror-view';
import { TableCssClassName as ClassName, TableDecorations, } from '../types';
export var createControlsHoverDecoration = function (cells, danger) {
    var deco = cells.map(function (cell) {
        var classes = [ClassName.HOVERED_CELL];
        if (danger) {
            classes.push('danger');
        }
        return Decoration.node(cell.pos, cell.pos + cell.node.nodeSize, {
            class: classes.join(' '),
        }, { key: TableDecorations.CONTROLS_HOVER });
    });
    return deco;
};
export var findControlsHoverDecoration = function (decorationSet) {
    return decorationSet.find(undefined, undefined, function (spec) { return spec.key === TableDecorations.CONTROLS_HOVER; });
};
//# sourceMappingURL=decoration.js.map