import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    'text-decoration': 'line-through',
});
export default function strike(_a) {
    var mark = _a.mark, text = _a.text;
    return createTag('span', { style: css }, text);
}
//# sourceMappingURL=strike.js.map