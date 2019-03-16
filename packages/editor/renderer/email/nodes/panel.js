import { colors, gridSize, borderRadius } from '@atlaskit/theme';
import { createTag, serializeStyle } from '../util';
var config = {
    info: {
        background: colors.B50,
        iconColor: colors.B400,
    },
    note: {
        background: colors.P50,
        iconColor: colors.P400,
    },
    tip: {
        background: colors.G50,
        iconColor: colors.G400,
    },
    success: {
        background: colors.G50,
        iconColor: colors.G400,
    },
    warning: {
        background: colors.Y50,
        iconColor: colors.Y400,
    },
    error: {
        background: colors.R50,
        iconColor: colors.R400,
    },
};
export default function panel(_a) {
    var attrs = _a.attrs, text = _a.text;
    var type = attrs.panelType;
    var css = serializeStyle({
        'border-radius': borderRadius() + "px",
        margin: gridSize() / 2 + "px 0",
        padding: gridSize() + "px",
        background: config[type] && config[type].background,
    });
    return createTag('div', { style: css }, text);
}
//# sourceMappingURL=panel.js.map