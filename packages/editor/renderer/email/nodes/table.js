import { colors } from '@atlaskit/theme';
import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    border: "1px solid " + colors.N50,
    'border-collapse': 'collapse',
    margin: '20px 8px',
    width: 'auto',
});
export default function table(_a) {
    var attrs = _a.attrs, text = _a.text;
    var colgroup = '';
    if (attrs.columnWidths) {
        var colTags = attrs.columnWidths.map(function (colwidth) {
            var style = colwidth ? "width: " + colwidth + "px" : undefined;
            return createTag('col', { style: style });
        });
        colgroup = createTag('colgroup', undefined, colTags.join(''));
    }
    return createTag('table', { style: css }, colgroup + text);
}
//# sourceMappingURL=table.js.map