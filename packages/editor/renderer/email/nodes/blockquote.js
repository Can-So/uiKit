import { colors, gridSize } from '@atlaskit/theme';
import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    'border-left': "2px solid " + colors.N40,
    color: colors.N300,
    margin: gridSize() * 1.5 + "px 0 0 0",
    'padding-left': gridSize() * 2 + "px",
});
export default function blockquote(_a) {
    var text = _a.text;
    return createTag('blockquote', { style: css }, text);
}
//# sourceMappingURL=blockquote.js.map