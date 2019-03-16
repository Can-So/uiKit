import { createTag, serializeStyle } from '../util';
export default function textColor(_a) {
    var mark = _a.mark, text = _a.text;
    var css = serializeStyle({ color: mark.attrs.color });
    return createTag('span', { style: css }, text);
}
//# sourceMappingURL=text-color.js.map