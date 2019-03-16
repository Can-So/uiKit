import * as React from 'react';
var TableHeader = function (props) {
    var style = {};
    if (props.background) {
        style.backgroundColor = props.background;
    }
    return (React.createElement("th", { style: style, rowSpan: props.rowspan, colSpan: props.colspan }, props.children));
};
export default TableHeader;
//# sourceMappingURL=tableHeader.js.map