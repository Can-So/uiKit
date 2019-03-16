import * as tslib_1 from "tslib";
import { colors } from '@atlaskit/theme';
import { createTag, serializeStyle } from '../util';
var baseStyle = {
    'background-color': colors.N20,
    'background-clip': 'padding-box',
    border: "1px solid " + colors.N50,
    'border-right-width': 0,
    'border-bottom-width': 0,
    'font-weight': 'bold',
    height: '2.5em',
    'min-width': '3em',
    padding: '6px 10px',
    'text-align': 'left',
    'vertical-align': 'top',
};
export default function tableHeader(_a) {
    var attrs = _a.attrs, text = _a.text;
    var colspan = attrs.colspan, rowspan = attrs.rowspan, background = attrs.background;
    var style = serializeStyle(tslib_1.__assign({}, baseStyle, { 'background-color': background ? background : baseStyle['background-color'] }));
    return createTag('th', {
        colspan: colspan,
        rowspan: rowspan,
        style: style,
    }, text);
}
//# sourceMappingURL=table-header.js.map