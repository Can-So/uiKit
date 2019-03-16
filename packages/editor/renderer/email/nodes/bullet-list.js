import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    'list-style-type': 'disc',
});
export default function bulletList(_a) {
    var text = _a.text;
    return createTag('ul', { style: css }, text);
}
//# sourceMappingURL=bullet-list.js.map