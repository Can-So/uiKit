import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    'text-decoration': 'underline',
});
export default function strong(_a) {
    var mark = _a.mark, text = _a.text;
    return createTag('span', { style: css }, text);
}
//# sourceMappingURL=underline.js.map