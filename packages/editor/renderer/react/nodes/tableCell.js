import * as React from 'react';
import { hexToRgba, akEditorTableCellBackgroundOpacity, } from '@atlaskit/editor-common';
// tslint:disable-next-line:variable-name
var TableCell = function (props) {
    var style = {};
    if (props.background) {
        // we do this when doing toDOM, so do here as well
        var color = hexToRgba(props.background, akEditorTableCellBackgroundOpacity);
        style['background-color'] = color;
    }
    return (React.createElement("td", { style: style, rowSpan: props.rowspan, colSpan: props.colspan }, props.children));
};
export default TableCell;
//# sourceMappingURL=tableCell.js.map