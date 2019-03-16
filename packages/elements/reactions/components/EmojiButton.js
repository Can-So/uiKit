import * as tslib_1 from "tslib";
import { ResourcedEmoji, } from '@atlaskit/emoji';
import * as React from 'react';
import { PureComponent } from 'react';
import { style } from 'typestyle';
import { isLeftClick } from './utils';
var emojiButtonStyle = style({
    outline: 'none',
    display: 'flex',
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0',
    padding: '10px 8px',
    $nest: {
        '&:hover > span': {
            transition: 'transform cubic-bezier(0.23, 1, 0.32, 1) 200ms',
            transform: 'scale(1.33)',
        },
    },
});
var EmojiButton = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiButton, _super);
    function EmojiButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleMouseDown = function (event) {
            event.preventDefault();
            if (_this.props.onClick && isLeftClick(event)) {
                _this.props.onClick(_this.props.emojiId, undefined, event);
            }
        };
        return _this;
    }
    EmojiButton.prototype.render = function () {
        var _a = this.props, emojiId = _a.emojiId, emojiProvider = _a.emojiProvider;
        return (React.createElement("button", { onMouseUp: this.handleMouseDown, className: emojiButtonStyle },
            React.createElement(ResourcedEmoji, { emojiProvider: emojiProvider, emojiId: emojiId })));
    };
    return EmojiButton;
}(PureComponent));
export { EmojiButton };
//# sourceMappingURL=EmojiButton.js.map