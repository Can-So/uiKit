var _a, _b, _c, _d, _e, _f, _g, _h;
import { style } from 'typestyle';
import { borderRadius, colors } from '@findable/theme';
import { akEmojiSelectedBackgroundColor, emojiFooterBoxShadow, emojiPickerBorderColor, emojiPickerBoxShadow, } from '../../shared-styles';
import { emojiSprite, placeholder, emojiNode } from '../common/styles';
import { emojiPickerHeight, emojiPickerWidth } from '../../constants';
export var active = 'emoji-picker-active';
export var disable = 'emoji-picker-disable';
// Level 1 - picker
export var emojiPicker = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'white',
    border: emojiPickerBorderColor + " 1px solid",
    borderRadius: borderRadius() + "px",
    boxShadow: emojiPickerBoxShadow,
    height: emojiPickerHeight + "px",
    width: emojiPickerWidth + "px",
    marginBottom: '8px',
    minWidth: emojiPickerWidth + "px",
});
// Level 2
/// Category Selector
export var addButton = 'emoji-picker-add-button';
export var categorySelector = style({
    flex: '0 0 auto',
    backgroundColor: colors.N30,
    $nest: (_a = {
            ul: {
                listStyle: 'none',
                margin: '0 4px',
                padding: '3px 0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
            },
            li: {
                display: 'inline-block',
                margin: 0,
                padding: 0,
                $nest: {
                    button: {
                        verticalAlign: 'middle',
                    },
                },
            }
        },
        _a["." + addButton] = {
            color: colors.N200,
            margin: '0 0 0 5px',
            verticalAlign: 'middle',
        },
        _a),
});
export var category = style({
    backgroundColor: 'transparent',
    border: 0,
    color: colors.N100A,
    cursor: 'pointer',
    margin: '2px 0',
    padding: 0,
    transition: 'color 0.2s ease',
    $nest: (_b = {},
        /* Firefox */
        _b['&::-moz-focus-inner'] = {
            border: '0 none',
            padding: 0,
        },
        _b["&." + active] = {
            color: colors.B300,
            $nest: (_c = {},
                _c['&:hover'] = {
                    color: colors.B300,
                },
                _c),
        },
        _b['&:hover'] = {
            color: colors.B100,
        },
        _b["&." + disable] = {
            color: colors.N50,
            cursor: 'default',
            $nest: (_d = {},
                _d['&:hover'] = {
                    color: colors.N50,
                },
                _d),
        },
        _b['&:focus'] = {
            outline: '0',
        },
        _b),
});
/// EmojiPickerList
export var emojiPickerList = style({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    // To force Firefox/IE/Edge to shrink the list, if necessary (e.g. when upload panel in place)
    height: '0',
});
// react-virtualized enables focus style by default - turn it off
export var virtualList = style({
    $nest: {
        '&:focus': {
            outline: 'none',
        },
    },
});
//// Search
export var searchIcon = 'search-icon';
export var input = 'input';
export var pickerSearch = style({
    boxSizing: 'border-box',
    padding: '10px',
    flex: '0 0 auto',
    $nest: (_e = {},
        _e["." + searchIcon] = {
            opacity: 0.5,
        },
        _e["." + input] = {
            background: 'transparent',
            border: 0,
            boxSizing: 'border-box',
            color: 'inherit',
            cursor: 'inherit',
            fontSize: '14px',
            outline: 'none',
            padding: '1px 0 2px 10px',
            width: '100%',
            $nest: (_f = {},
                _f['&:invalid'] = {
                    boxShadow: 'none',
                },
                _f['&::-ms-clear'] = {
                    display: 'none',
                },
                _f),
        },
        _e),
});
//// Loading/Spinner
export var emojiPickerSpinner = style({
    display: 'flex',
    width: '100%',
    height: '150px',
    justifyContent: 'center',
    alignItems: 'center',
    $nest: {
        '>div': {
            flex: '0 0 auto',
        },
    },
});
//// Category/Result
export var emojiPickerRow = style({
    marginLeft: '8px',
});
export var emojiCategoryTitle = style({
    boxSizing: 'border-box',
    color: colors.N900,
    fontSize: '14px',
    padding: '5px 8px',
    textTransform: 'lowercase',
    $nest: {
        '&:first-letter': {
            textTransform: 'uppercase',
        },
    },
});
export var emojiItem = style({
    display: 'inline-block',
    textAlign: 'center',
    width: '40px',
    $nest: (_g = {},
        _g["&>." + emojiNode] = {
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '5px',
            width: '24px',
            height: '24px',
            $nest: (_h = {
                    // Fit non-square emoji to square
                    '&>img': {
                        position: 'relative',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                        maxHeight: '24px',
                        maxWidth: '24px',
                        display: 'block',
                    }
                },
                // Scale sprite to fit regardless of default emoji size
                _h["&>." + emojiSprite] = {
                    height: '24px',
                    width: '24px',
                },
                _h),
        },
        _g["&>." + placeholder] = {
            padding: '0',
            margin: '7px',
            minWidth: '24px',
            maxWidth: '24px',
        },
        _g),
});
export var addEmoji = style({
    border: '2px dashed #ccc',
    borderRadius: borderRadius() + "px",
    backgroundColor: 'transparent',
    width: '32px',
    height: '32px',
    padding: 0,
    margin: '4px',
    verticalAlign: 'middle',
    $nest: {
        '&:hover': {
            backgroundColor: akEmojiSelectedBackgroundColor,
        },
        '&:focus': {
            outline: '0',
        },
        span: {
            backgroundColor: 'inherit',
        },
    },
});
/// Footer
export var emojiPickerFooter = style({
    flex: '0 0 auto',
});
export var emojiPickerFooterWithTopShadow = style({
    borderTop: "2px solid " + colors.N30A,
    boxShadow: emojiFooterBoxShadow,
});
//# sourceMappingURL=styles.js.map