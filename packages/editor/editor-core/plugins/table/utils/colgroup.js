import * as tslib_1 from "tslib";
import { DOMSerializer } from 'prosemirror-model';
import { getFragmentBackingArray } from '../../../utils/slice';
export var generateColgroup = function (node) {
    var cols = [];
    node.content.firstChild.content.forEach(function (cell) {
        var colspan = cell.attrs.colspan || 1;
        if (Array.isArray(cell.attrs.colwidth)) {
            // We slice here to guard against our colwidth array having more entries
            // Than the we actually span. We'll patch the document at a later point.
            cell.attrs.colwidth.slice(0, colspan).forEach(function (width) {
                cols.push(['col', { style: "width: " + width + "px;" }]);
            });
        }
        else {
            // When we have merged cells on the first row (firstChild),
            // We want to ensure we're creating the appropriate amount of
            // cols the table still has.
            cols.push.apply(cols, tslib_1.__spread(Array.from({ length: colspan }, function (_) { return ['col', {}]; })));
        }
    });
    return cols;
};
export var renderColgroupFromNode = function (node) {
    var rendered = DOMSerializer.renderSpec(document, 
    // @ts-ignore
    ['colgroup', {}].concat(generateColgroup(node)));
    if (rendered.dom) {
        return rendered.dom;
    }
};
export var insertColgroupFromNode = function (tableElem, node) {
    var colgroup = tableElem.querySelector('colgroup');
    if (colgroup) {
        tableElem.removeChild(colgroup);
    }
    colgroup = renderColgroupFromNode(node);
    tableElem.insertBefore(colgroup, tableElem.firstChild);
    return colgroup.children;
};
export var hasTableBeenResized = function (node) {
    return !!getFragmentBackingArray(node.content.firstChild.content).find(function (cell) { return cell.attrs.colwidth; });
};
//# sourceMappingURL=colgroup.js.map