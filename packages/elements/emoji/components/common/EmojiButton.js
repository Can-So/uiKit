import * as classNames from 'classnames';
import * as React from 'react';
import * as styles from './styles';
import Emoji from './Emoji';
import { leftClick } from '../../util/mouse';
var handleMouseDown = function (props, event) {
    var onSelected = props.onSelected;
    event.preventDefault();
    if (onSelected && leftClick(event)) {
        onSelected();
    }
};
// tslint:disable-next-line:variable-name
export var EmojiButton = function (props) {
    var emoji = props.emoji, selectOnHover = props.selectOnHover;
    var classes = [styles.emojiButton];
    return (React.createElement("button", { className: classNames(classes), 
        // tslint:disable-next-line:jsx-no-lambda
        onMouseDown: function (event) {
            handleMouseDown(props, event);
        } },
        React.createElement(Emoji, { emoji: emoji, selectOnHover: selectOnHover })));
};
export default EmojiButton;
//# sourceMappingURL=EmojiButton.js.map