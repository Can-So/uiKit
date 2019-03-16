import * as React from 'react';
import { RendererCssClassName } from '../../consts';
// tslint:disable-next-line:variable-name
var TableRow = function (props) {
    return (React.createElement("tr", null,
        props.isNumberColumnEnabled && (React.createElement("td", { className: RendererCssClassName.NUMBER_COLUMN }, props.index)),
        props.children));
};
export default TableRow;
//# sourceMappingURL=tableRow.js.map