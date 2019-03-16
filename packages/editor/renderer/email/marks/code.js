import { createTag, serializeStyle } from '../util';
import { codeFontFamily } from '@atlaskit/theme';
var css = serializeStyle({
    background: 'rgb(244, 245, 247)',
    color: 'rgb(23, 43, 77)',
    'border-radius': '3px',
    padding: '2px 4px',
    'font-size': '12px',
    'line-height': '24px',
    'font-family': codeFontFamily(),
});
export default function code(_a) {
    var mark = _a.mark, text = _a.text;
    return createTag('code', { style: css }, text);
}
//# sourceMappingURL=code.js.map