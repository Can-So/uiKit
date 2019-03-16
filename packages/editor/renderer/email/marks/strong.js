import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    'font-weight': 'bold',
});
export default function strong(_a) {
    var mark = _a.mark, text = _a.text;
    return createTag('span', { style: css }, text);
}
//# sourceMappingURL=strong.js.map