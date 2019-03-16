import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    background: 'rgba(9, 30, 66, 0.08)',
    border: '1px solid transparent',
    'border-radius': '20px',
    color: '#42526E',
    padding: '0 4px 2px 3px',
    'white-space': 'nowrap',
});
export default function mention(_a) {
    var text = _a.text;
    return createTag('span', { style: css }, text);
}
//# sourceMappingURL=mention.js.map