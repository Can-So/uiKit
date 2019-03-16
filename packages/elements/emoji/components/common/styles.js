var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
import { borderRadius, colors } from '@atlaskit/theme';
import { defaultEmojiHeight } from '../../constants';
import { akEmojiSelectedBackgroundColor } from '../../shared-styles';
import { style } from 'typestyle';
export var selected = 'emoji-common-selected';
export var selectOnHover = 'emoji-common-select-on-hover';
export var emojiSprite = 'emoji-common-emoji-sprite';
export var emojiNode = 'emoji-common-node';
export var deleteButton = style({
    // hide by default
    visibility: 'hidden',
    display: 'flex',
    height: '0px',
    // 40px emoji width with 2px left offset
    width: '38px',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // vertically align button and prevent emoji offset
    paddingTop: '4px',
    marginBottom: '-4px',
});
export var emoji = style({
    borderRadius: '5px',
    backgroundColor: 'transparent',
    display: 'inline-block',
    verticalAlign: 'middle',
    // Ensure along with vertical align middle, we don't increase the line height for p and some
    // headings. Smaller headings get a slight increase in height, cannot add more negative margin
    // as a "selected" emoji (e.g. in the editor) will not look good.
    margin: '-1px 0',
    $nest: (_a = {},
        _a["&." + selected + ",&." + selectOnHover + ":hover"] = {
            backgroundColor: akEmojiSelectedBackgroundColor,
        },
        _a["&." + selected + ",&." + selectOnHover + ":hover ." + deleteButton] = {
            // show delete button on hover
            visibility: 'visible',
        },
        _a.img = {
            display: 'block',
        },
        _a),
});
export var emojiContainer = style({
    display: 'inline-block',
    // Ensure along with vertical align middle, we don't increase the line height for h1..h6, and p
    margin: '-1px 0',
    $nest: (_b = {},
        _b["&." + selected + ",&." + selectOnHover + ":hover"] = {
            backgroundColor: akEmojiSelectedBackgroundColor,
        },
        _b["." + emojiSprite] = {
            background: 'transparent no-repeat',
            display: 'inline-block',
            verticalAlign: 'middle',
            height: defaultEmojiHeight + "px",
            width: defaultEmojiHeight + "px",
        },
        _b),
});
export var placeholder = 'emoji-common-placeholder';
export var placeholderContainer = style({
    // Ensure no vertical reflow
    margin: '-1px 0',
    display: 'inline-block',
    background: '#f7f7f7',
    borderRadius: '20%',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
});
export var placeholderEmoji = style({
    display: 'inline-block',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
});
export var emojiButton = style({
    backgroundColor: 'transparent',
    border: '0',
    cursor: 'pointer',
    padding: 0,
    $nest: (_c = {},
        /* Firefox */
        _c['&::-moz-focus-inner'] = {
            border: '0 none',
            padding: 0,
        },
        _c['&>span'] = {
            borderRadius: '5px',
            padding: '8px',
            $nest: (_d = {},
                // Scale sprite to fit regardless of default emoji size
                _d["&>." + emojiSprite] = {
                    height: '24px',
                    width: '24px',
                },
                _d),
        },
        _c),
});
// Emoji Preview
export var buttons = 'emoji-common-buttons';
export var preview = 'emoji-common-preview';
export var previewImg = 'emoji-common-preview-image';
export var previewText = 'emoji-common-preview-text';
export var name = 'emoji-common-name';
export var shortName = 'emoji-common-shortname';
export var previewSingleLine = 'emoji-common-preview-single-line';
export var toneSelectorContainer = 'emoji-common-tone-selector-container';
export var withToneSelector = 'emoji-common-with-tone-selector';
export var emojiPreviewSection = 'emoji-preview-section';
export var emojiPreview = style({
    display: 'flex',
    height: '50px',
    boxSizing: 'border-box',
    $nest: (_e = {},
        _e["." + preview] = {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            padding: '10px',
            $nest: (_f = {},
                _f["." + emojiSprite] = {
                    height: '32px',
                    margin: '0',
                    width: '32px',
                },
                _f["." + previewImg] = {
                    display: 'inline-block',
                    flex: 'initial',
                    width: '32px',
                    $nest: {
                        '&>span': {
                            width: '32px',
                            height: '32px',
                            padding: 0,
                            maxHeight: 'inherit',
                            $nest: {
                                '&>img': {
                                    position: 'relative',
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translateX(-50%) translateY(-50%)',
                                    maxHeight: '32px',
                                    maxWidth: '32px',
                                    padding: 0,
                                    display: 'block',
                                },
                            },
                        },
                    },
                },
                _f["." + previewText] = {
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '10px',
                    marginTop: '-2px',
                    maxWidth: '285px',
                    width: '285px' /* IE */,
                    flexGrow: 1,
                    flexShrink: 1,
                    $nest: (_g = {},
                        _g["." + name] = {
                            display: 'block',
                            color: colors.N900,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            $nest: (_h = {},
                                _h['&:first-letter'] = {
                                    textTransform: 'uppercase',
                                },
                                _h),
                        },
                        _g["." + shortName] = {
                            display: 'block',
                            color: colors.N200,
                            fontSize: '12px',
                            lineHeight: 1,
                            marginBottom: '-2px',
                            overflow: 'hidden',
                            paddingBottom: '2px',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                        _g),
                },
                _f["." + previewSingleLine] = {
                    paddingTop: '10px',
                    $nest: (_j = {},
                        _j["." + name] = {
                            display: 'none',
                        },
                        _j["." + shortName] = {
                            color: colors.N900,
                            fontSize: '14px',
                        },
                        _j),
                },
                _f),
        },
        _e["." + buttons] = {
            flex: 1,
            textAlign: 'right',
            margin: '6px',
        },
        _e["." + toneSelectorContainer] = {
            flex: 1,
            textAlign: 'right',
            margin: '6px',
        },
        _e["." + withToneSelector + " ." + previewText] = {
            maxWidth: '235px',
            width: '235px' /* IE */,
        },
        _e),
});
// Scrollable
export var emojiScrollable = style({
    border: '1px solid #fff',
    borderRadius: borderRadius() + "px",
    display: 'block',
    margin: '0',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '0',
});
// EmojiUpload
export var emojiUpload = style({
    height: '78px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
});
export var uploadChooseFileMessage = style({
    color: colors.N300,
    fontSize: '12px',
    paddingBottom: '7px',
});
export var emojiUploadBottom = style({
    fontSize: '11px',
});
export var uploadChooseFileRow = style({
    display: 'flex',
    justifyContent: 'space-between',
});
export var uploadChooseFileEmojiName = style({
    flex: '1 1 auto',
    marginRight: '5px',
    $nest: {
        input: {
            background: 'transparent',
            border: 0,
            fontSize: '12px',
            outline: 'none',
            width: '100%',
            height: '22px',
            $nest: (_k = {},
                _k['&:invalid'] = {
                    boxShadow: 'none',
                },
                _k['&::-ms-clear'] = {
                    display: 'none',
                },
                _k),
        },
    },
});
export var uploadChooseFileBrowse = style({
    flex: '0 0 auto',
});
export var uploadPreviewFooter = style({
    display: 'flex',
    flexDirection: 'column',
    height: '100px',
    padding: '10px',
});
export var uploadPreview = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: colors.N20,
    borderRadius: borderRadius() + "px",
    padding: '10px',
});
export var uploadPreviewText = style({
    $nest: {
        h5: {
            color: colors.N300,
            paddingBottom: '4px',
            fontSize: '12px',
        },
        img: {
            maxHeight: '20px',
            maxWidth: '50px',
        },
    },
});
export var bigEmojiPreview = style({
    paddingLeft: '4px',
    $nest: {
        img: {
            maxHeight: '40px',
            maxWidth: '100px',
        },
    },
});
export var uploadAddRow = style({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: '10px',
});
export var AddCustomEmoji = style({
    alignSelf: 'center',
    marginLeft: '10px',
});
// Emoji Delete preview
export var submitDelete = 'emoji-submit-delete';
export var previewButtonGroup = 'emoji-preview-button-group';
export var deletePreview = style({
    height: '100px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    fontSize: '12px',
});
export var deleteText = style({
    height: '64px',
    $nest: {
        ':first-child': {
            color: colors.N300,
            lineHeight: '16px',
        },
    },
});
export var deleteFooter = style({
    display: 'flex',
    height: '40px',
    alignItems: 'center',
    justifyContent: 'space-between',
    $nest: (_l = {
            img: {
                maxHeight: '32px',
                maxWidth: '72px',
            }
        },
        _l["." + previewButtonGroup] = {
            display: 'flex',
        },
        _l["." + submitDelete] = {
            width: '84px',
            fontWeight: 'bold',
            marginRight: '4px',
        },
        _l.button = {
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px',
            $nest: {
                div: {
                    display: 'flex',
                },
            },
        },
        _l),
});
export var emojiDeleteErrorMessage = style({
    display: 'flex',
    color: colors.R400,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '4px',
});
export var emojiChooseFileErrorMessage = style({
    display: 'flex',
    color: colors.R300,
    paddingRight: '10px',
    justifyContent: 'flex-start',
});
export var emojiPreviewErrorMessage = style({
    display: 'inline-flex',
    color: colors.R400,
    paddingRight: '10px',
    justifyContent: 'flex-end',
    alignItems: 'center',
});
export var addCustomEmojiButton = style({
    maxWidth: '285px',
});
export var uploadRetryButton = style({
    maxWidth: '172px',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginRight: '4px',
    $nest: {
        div: {
            display: 'flex',
        },
    },
});
export var uploadEmojiButton = style({
    maxWidth: '187px',
    justifyContent: 'center',
    marginRight: '4px',
    $nest: {
        div: {
            display: 'flex',
        },
    },
});
export var cancelButton = style({
    maxWidth: '100px',
});
export var buttonSpinner = style({
    marginRight: '10px',
    marginLeft: '10px',
});
//# sourceMappingURL=styles.js.map