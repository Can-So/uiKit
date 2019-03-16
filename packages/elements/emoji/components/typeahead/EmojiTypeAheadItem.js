import * as tslib_1 from "tslib";
import * as classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { toEmojiId } from '../../type-helpers';
import { leftClick } from '../../util/mouse';
import EmojiPreview from '../common/EmojiPreview';
import * as styles from './styles';
var EmojiTypeAheadItem = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiTypeAheadItem, _super);
    function EmojiTypeAheadItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // internal, used for callbacks
        _this.onEmojiSelected = function (event) {
            var _a = _this.props, emoji = _a.emoji, onSelection = _a.onSelection;
            if (leftClick(event) && onSelection) {
                event.preventDefault();
                onSelection(toEmojiId(emoji), emoji, event);
            }
        };
        _this.onEmojiMenuItemMouseMove = function (event) {
            var _a = _this.props, emoji = _a.emoji, onMouseMove = _a.onMouseMove;
            if (onMouseMove) {
                onMouseMove(toEmojiId(emoji), emoji, event);
            }
        };
        return _this;
    }
    EmojiTypeAheadItem.prototype.render = function () {
        var _a;
        var _b = this.props, selected = _b.selected, emoji = _b.emoji;
        var classes = classNames((_a = {
                'ak-emoji-typeahead-item': true
            },
            _a[styles.typeAheadItem] = true,
            _a[styles.selected] = selected,
            _a));
        return (React.createElement("div", { className: classes, onMouseDown: this.onEmojiSelected, onMouseMove: this.onEmojiMenuItemMouseMove, "data-emoji-id": emoji.shortName },
            React.createElement("div", { className: styles.typeAheadItemRow },
                React.createElement(EmojiPreview, { emoji: emoji }))));
    };
    return EmojiTypeAheadItem;
}(PureComponent));
export default EmojiTypeAheadItem;
//# sourceMappingURL=EmojiTypeAheadItem.js.map