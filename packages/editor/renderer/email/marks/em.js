import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    'font-style': 'italic',
});
export default function em(_a) {
    var mark = _a.mark, text = _a.text;
    return createTag('span', { style: css }, text);
}
//# sourceMappingURL=em.js.map