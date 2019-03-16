import * as tslib_1 from "tslib";
import { createTag, serializeStyle } from '../util';
import { B50, B500, R50, R500, Y75, N800, G50, G500, P50, P500, N40, N500, } from '@findable/adf-schema';
var colorMapping = {
    blue: {
        'background-color': B50,
        color: B500,
    },
    red: {
        'background-color': R50,
        color: R500,
    },
    yellow: {
        'background-color': Y75,
        color: N800,
    },
    green: {
        'background-color': G50,
        color: G500,
    },
    purple: {
        'background-color': P50,
        color: P500,
    },
    neutral: {
        'background-color': N40,
        color: N500,
    },
};
export default function status(_a) {
    var attrs = _a.attrs, text = _a.text;
    var color = attrs.color;
    var colorAttributes = colorMapping[color]
        ? colorMapping[color]
        : colorMapping.neutral;
    var css = serializeStyle(tslib_1.__assign({ 'border-radius': '3px', '-webkit-border-radius': '3px', '-moz-border-radius': '3px', 'box-sizing': 'border-box', display: 'inline-block', 'font-size': '11px', 'font-weight': '700', 'line-height': '1', 'max-width': '100%', 'text-transform': 'uppercase', 'vertical-align': 'baseline', padding: '2px 4px 3px 4px' }, colorAttributes));
    return createTag('span', { style: css }, text);
}
//# sourceMappingURL=status.js.map