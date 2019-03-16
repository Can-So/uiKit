import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    border: 'none',
    background: 'transparent',
    color: '#0052cc',
    'text-decoration': 'none',
});
export default function link(_a) {
    var mark = _a.mark, text = _a.text;
    var _b = mark.attrs, href = _b.href, title = _b.title;
    return createTag('a', {
        href: href,
        title: title,
        style: css,
    }, text);
}
//# sourceMappingURL=link.js.map