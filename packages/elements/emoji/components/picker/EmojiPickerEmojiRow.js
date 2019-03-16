import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import * as styles from './styles';
import CachingEmoji from '../common/CachingEmoji';
var EmojiPickerEmojiRow = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiPickerEmojiRow, _super);
    function EmojiPickerEmojiRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiPickerEmojiRow.prototype.render = function () {
        var _a = this.props, emojis = _a.emojis, onSelected = _a.onSelected, onMouseMove = _a.onMouseMove, title = _a.title, showDelete = _a.showDelete, onDelete = _a.onDelete;
        return (React.createElement("div", { className: styles.emojiPickerRow }, emojis.map(function (emoji) {
            var shortName = emoji.shortName, id = emoji.id;
            var key = id ? id + "-" + title : shortName + "-" + title;
            return (React.createElement("span", { className: styles.emojiItem, key: key },
                React.createElement(CachingEmoji, { emoji: emoji, selectOnHover: true, onSelected: onSelected, onMouseMove: onMouseMove, showDelete: showDelete, onDelete: onDelete, placeholderSize: 24 })));
        })));
    };
    return EmojiPickerEmojiRow;
}(PureComponent));
export default EmojiPickerEmojiRow;
//# sourceMappingURL=EmojiPickerEmojiRow.js.map