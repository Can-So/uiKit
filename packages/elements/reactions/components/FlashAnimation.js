import { colors } from '@findable/theme';
import * as cx from 'classnames';
import * as React from 'react';
import { keyframes, style } from 'typestyle';
var containerStyle = style({
    width: '100%',
    height: '100%',
});
var flashTime = 700;
var flashAnimation = keyframes({
    '0%': {
        backgroundColor: 'transparent',
    },
    '20%': {
        backgroundColor: colors.B75,
    },
    '75%': {
        backgroundColor: colors.B75,
    },
    '100%': {
        backgroundColor: 'transparent',
    },
});
export var flashStyle = style({
    animation: flashAnimation + " " + flashTime + "ms ease-in-out",
});
/**
 * Flash animation background component. See Reaction component for usage.
 */
export var FlashAnimation = function (props) {
    var _a;
    return (React.createElement("div", { className: cx(containerStyle, props.className, (_a = {},
            _a[flashStyle] = props.flash,
            _a)) }, props.children));
};
//# sourceMappingURL=FlashAnimation.js.map