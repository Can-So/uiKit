var _a;
import { style } from 'typestyle';
import { emojiPreviewSelectedColor, emojiTypeAheadMaxHeight, emojiTypeAheadWidth, noDialogContainerBorderColor, noDialogContainerBorderRadius, noDialogContainerBoxShadow, } from '../../shared-styles';
export var selected = 'emoji-typeahead-selected';
export var emojiTypeAhead = 'emoji-typeahead-element';
export var typeAheadListContainer = 'emoji-typeahead-list-container';
export var typeAheadList = style({
    background: 'white',
    border: "1px solid " + noDialogContainerBorderColor,
    borderRadius: noDialogContainerBorderRadius,
    boxShadow: noDialogContainerBoxShadow,
    color: '#333',
    width: emojiTypeAheadWidth,
});
export var typeAheadEmpty = style({
    display: 'none',
});
export var typeAheadItem = style({
    cursor: 'pointer',
    display: 'block',
    listStyleType: 'none',
    overflow: 'hidden',
    width: emojiTypeAheadWidth,
    $nest: (_a = {},
        _a["&." + selected] = {
            backgroundColor: emojiPreviewSelectedColor,
        },
        _a),
});
export var typeAheadItemRow = style({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    verticalAlign: 'middle',
});
export var emojiTypeAheadSpinnerContainer = style({
    position: 'relative',
    height: emojiTypeAheadMaxHeight + "px",
    paddingTop: ((emojiTypeAheadMaxHeight - 30) / 2).toFixed() + "px",
    boxSizing: 'border-box',
});
export var emojiTypeAheadSpinner = style({
    textAlign: 'center',
});
//# sourceMappingURL=styles.js.map