import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    'list-style-type': 'decimal',
});
export default function orderedList(_a) {
    var text = _a.text;
    return createTag('ol', { style: css }, text);
}
//# sourceMappingURL=ordered-list.js.map