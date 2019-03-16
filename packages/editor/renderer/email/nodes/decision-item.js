import { borderRadius, gridSize, colors } from '@atlaskit/theme';
import { createTag, serializeStyle } from '../util';
var akGridSize = gridSize();
var css = serializeStyle({
    'background-color': colors.N20,
    'border-radius': borderRadius() + "px",
    margin: akGridSize + "px 0",
    padding: akGridSize + "px " + akGridSize + "px",
    'box-sizing': 'border-box',
});
export default function decisionItem(_a) {
    var text = _a.text;
    if (!text) {
        return '';
    }
    return createTag('div', { style: css }, text);
}
//# sourceMappingURL=decision-item.js.map