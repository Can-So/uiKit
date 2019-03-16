import * as tslib_1 from "tslib";
import { AVATAR_SIZES, BORDER_WIDTH } from '@findable/avatar';
import { colors } from '@findable/theme';
import memoizeOne from 'memoize-one';
import { getAvatarSize } from './utils';
export var BORDER_PADDING = 6;
export var PLACEHOLDER_PADDING = 8;
export var getStyles = memoizeOne(function (width) { return ({
    menu: function (css, state) { return (tslib_1.__assign({}, css, { width: width, minWidth: state.selectProps.menuMinWidth })); },
    control: function (css, state) { return (tslib_1.__assign({}, css, { width: width, borderColor: state.isFocused
            ? css.borderColor
            : state.selectProps.subtle
                ? 'transparent'
                : colors.N40, backgroundColor: state.isFocused
            ? css['backgroundColor']
            : state.selectProps.subtle
                ? 'transparent'
                : colors.N10, '&:hover .fabric-user-picker__clear-indicator': { opacity: 1 }, ':hover': tslib_1.__assign({}, css[':hover'], { borderColor: state.isFocused
                ? css[':hover']
                    ? css[':hover'].borderColor
                    : colors.B100
                : state.selectProps.subtle
                    ? state.selectProps.hoveringClearIndicator
                        ? colors.R50
                        : colors.N30
                    : colors.N40, backgroundColor: state.selectProps.subtle && state.selectProps.hoveringClearIndicator
                ? colors.R50
                : state.isFocused
                    ? css[':hover']
                        ? css[':hover'].backgroundColor
                        : colors.N0
                    : colors.N30 }), padding: 0, minHeight: state.selectProps.appearance === 'compact' ? 32 : 44, alignItems: 'stretch', maxWidth: '100%' })); },
    clearIndicator: function (_a) {
        var paddingTop = _a.paddingTop, paddingBottom = _a.paddingBottom, paddingLeft = _a.paddingLeft, paddingRight = _a.paddingRight, css = tslib_1.__rest(_a, ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"]);
        return (tslib_1.__assign({}, css, { opacity: 0, transition: css.transition + ', opacity 150ms', paddingTop: 0, padding: 0, ':hover': {
                color: colors.R400,
            } }));
    },
    indicatorsContainer: function (css) { return (tslib_1.__assign({}, css, { paddingRight: 4 })); },
    valueContainer: function (_a, state) {
        var paddingTop = _a.paddingTop, paddingBottom = _a.paddingBottom, position = _a.position, css = tslib_1.__rest(_a, ["paddingTop", "paddingBottom", "position"]);
        return (tslib_1.__assign({}, css, { flexGrow: 1, padding: 0, display: 'flex', flexDirection: 'row', maxHeight: 100, overflow: 'hidden', flexWrap: state.selectProps.isMulti ? 'wrap' : 'nowrap' }));
    },
    multiValue: function (css) { return (tslib_1.__assign({}, css, { borderRadius: 24 })); },
    multiValueRemove: function (css) { return (tslib_1.__assign({}, css, { backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } })); },
    placeholder: function (css, state) {
        var avatarSize = getAvatarSize(state.selectProps.appearance);
        return tslib_1.__assign({}, css, { paddingLeft: !state.selectProps.isMulti
                ? BORDER_PADDING +
                    PLACEHOLDER_PADDING +
                    2 * BORDER_WIDTH[avatarSize] +
                    AVATAR_SIZES[avatarSize]
                : PLACEHOLDER_PADDING, paddingTop: 2, paddingRight: 2, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', margin: 0 });
    },
    option: function (css) { return (tslib_1.__assign({}, css, { overflow: 'hidden' })); },
    input: function (_a) {
        var margin = _a.margin, css = tslib_1.__rest(_a, ["margin"]);
        return (tslib_1.__assign({}, css, { display: 'flex', alignSelf: 'center', paddingBottom: 1, paddingLeft: PLACEHOLDER_PADDING, '& input::placeholder': {
                /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: colors.N100,
                opacity: 1 /* Firefox */,
            }, '& input:-ms-input-placeholder': {
                /* Internet Explorer 10-11 */
                color: colors.N100,
            } }));
    },
}); });
export var getPopupStyles = memoizeOne(function (width, flip) { return (tslib_1.__assign({}, getStyles(width), { container: function (css) { return (tslib_1.__assign({}, css, { display: flip ? 'flex' : 'block', flexDirection: 'column-reverse' })); } })); });
//# sourceMappingURL=styles.js.map