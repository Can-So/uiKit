import * as tslib_1 from "tslib";
import { colors } from '@findable/theme';
import { createTag, serializeStyle } from '../util';
var baseStyle = {
    'background-clip': 'padding-box',
    height: '2.5em',
    'min-width': '3em',
    'vertical-align': 'top',
    border: "1px solid " + colors.N50,
    'border-right-width': 0,
    'border-bottom-width': 0,
    padding: '6px 10px',
};
export default function tableCell(_a) {
    var attrs = _a.attrs, text = _a.text;
    var colspan = attrs.colspan, rowspan = attrs.rowspan, background = attrs.background;
    var style = serializeStyle(tslib_1.__assign({}, baseStyle, { 'background-color': background }));
    return createTag('td', {
        colspan: colspan,
        rowspan: rowspan,
        style: style,
    }, text);
}
//# sourceMappingURL=table-cell.js.map