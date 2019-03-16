import { style } from 'typestyle';
import { emojiPickerWidth } from '../../constants';
// Uploader
export var emojiUploadWidget = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    background: 'white',
    height: "120px",
    width: emojiPickerWidth + "px",
    marginBottom: '8px',
    minWidth: emojiPickerWidth + "px",
    margin: '-10px',
    marginTop: '-16px',
});
/// Footer
export var emojiUploadFooter = style({
    flex: '0 0 auto',
});
//# sourceMappingURL=styles.js.map