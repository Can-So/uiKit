import { akEditorBreakoutPadding, akEditorDefaultLayoutWidth, breakoutWideScaleRatio, akEditorFullWidthLayoutWidth, akEditorWideLayoutWidth, } from '../styles';
import { getBreakpoint, mapBreakpointToLayoutMaxWidth } from '../ui';
export var calcBreakoutWidth = function (layout, containerWidth) {
    var effectiveFullWidth = containerWidth - akEditorBreakoutPadding;
    switch (layout) {
        case 'full-width':
            return Math.min(effectiveFullWidth, akEditorFullWidthLayoutWidth) + "px";
        case 'wide':
            return calcWideWidth(containerWidth);
        default:
            return '100%';
    }
};
export var calcWideWidth = function (containerWidth, maxWidth, fallback) {
    if (containerWidth === void 0) { containerWidth = akEditorDefaultLayoutWidth; }
    if (maxWidth === void 0) { maxWidth = Infinity; }
    if (fallback === void 0) { fallback = '100%'; }
    var effectiveFullWidth = containerWidth - akEditorBreakoutPadding;
    var layoutMaxWidth = mapBreakpointToLayoutMaxWidth(getBreakpoint(containerWidth));
    var wideWidth = Math.min(Math.ceil(layoutMaxWidth * breakoutWideScaleRatio), effectiveFullWidth);
    return layoutMaxWidth > wideWidth
        ? fallback
        : Math.min(maxWidth, wideWidth) + "px";
};
export var absoluteBreakoutWidth = function (layout, containerWidth) {
    var breakoutWidth = calcBreakoutWidth(layout, containerWidth);
    // If it's percent, map to max layout size
    if (breakoutWidth.endsWith('%')) {
        switch (layout) {
            case 'full-width':
                return akEditorFullWidthLayoutWidth;
            case 'wide':
                return akEditorWideLayoutWidth;
            default:
                return akEditorDefaultLayoutWidth;
        }
    }
    return parseInt(breakoutWidth, 10);
};
//# sourceMappingURL=calc-breakout-width.js.map