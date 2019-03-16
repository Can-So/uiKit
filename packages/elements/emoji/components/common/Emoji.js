import * as tslib_1 from "tslib";
import Button from '@atlaskit/button';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import { colors } from '@atlaskit/theme';
import Tooltip from '@atlaskit/tooltip';
import * as classNames from 'classnames';
import * as React from 'react';
import { shouldUseAltRepresentation } from '../../api/EmojiUtils';
import { deleteEmojiLabel } from '../../constants';
import { isImageRepresentation, isMediaRepresentation, isSpriteRepresentation, toEmojiId, } from '../../type-helpers';
import { leftClick } from '../../util/mouse';
import * as styles from './styles';
var handleMouseDown = function (props, event) {
    // Clicked emoji delete button
    if (event.target instanceof Element &&
        event.target.getAttribute('aria-label') === deleteEmojiLabel) {
        return;
    }
    var emoji = props.emoji, onSelected = props.onSelected;
    event.preventDefault();
    if (onSelected && leftClick(event)) {
        onSelected(toEmojiId(emoji), emoji, event);
    }
};
var handleMouseMove = function (props, event) {
    var emoji = props.emoji, onMouseMove = props.onMouseMove;
    if (onMouseMove) {
        onMouseMove(toEmojiId(emoji), emoji, event);
    }
};
var handleDelete = function (props, event) {
    var emoji = props.emoji, onDelete = props.onDelete;
    if (onDelete) {
        onDelete(toEmojiId(emoji), emoji, event);
    }
};
var handleImageError = function (props, event) {
    var emoji = props.emoji, onLoadError = props.onLoadError;
    // Hide error state (but keep space for it)
    if (event.target) {
        var target = event.target;
        target.style.visibility = 'hidden';
    }
    if (onLoadError) {
        onLoadError(toEmojiId(emoji), emoji, event);
    }
};
// Pure functional components are used in favour of class based components, due to the performance!
// When rendering 1500+ emoji using class based components had a significant impact.
var renderAsSprite = function (props) {
    var _a;
    var emoji = props.emoji, fitToHeight = props.fitToHeight, selected = props.selected, selectOnHover = props.selectOnHover, className = props.className, showTooltip = props.showTooltip;
    var representation = emoji.representation;
    var sprite = representation.sprite;
    var classes = (_a = {},
        _a[styles.emojiContainer] = true,
        _a[styles.emojiNode] = true,
        _a[styles.selected] = selected,
        _a[styles.selectOnHover] = selectOnHover,
        _a);
    if (className) {
        classes[className] = true;
    }
    var sizing = {};
    if (fitToHeight) {
        sizing = {
            width: fitToHeight + "px",
            height: fitToHeight + "px",
        };
    }
    var xPositionInPercent = (100 / (sprite.column - 1)) * (representation.xIndex - 0);
    var yPositionInPercent = (100 / (sprite.row - 1)) * (representation.yIndex - 0);
    var style = tslib_1.__assign({ backgroundImage: "url(" + sprite.url + ")", backgroundPosition: xPositionInPercent + "% " + yPositionInPercent + "%", backgroundSize: sprite.column * 100 + "% " + sprite.row * 100 + "%" }, sizing);
    var emojiNode = (React.createElement("span", { className: styles.emojiSprite, style: style }, "\u00A0"));
    return (React.createElement("span", { className: classNames(classes), 
        // tslint:disable-next-line:jsx-no-lambda
        onMouseDown: function (event) {
            handleMouseDown(props, event);
        }, 
        // tslint:disable-next-line:jsx-no-lambda
        onMouseMove: function (event) {
            handleMouseMove(props, event);
        }, "aria-label": emoji.shortName }, showTooltip ? (React.createElement(Tooltip, { tag: "span", content: emoji.shortName }, emojiNode)) : (emojiNode)));
};
// Keep as pure functional component, see renderAsSprite.
var renderAsImage = function (props) {
    var _a;
    var emoji = props.emoji, fitToHeight = props.fitToHeight, selected = props.selected, selectOnHover = props.selectOnHover, className = props.className, showTooltip = props.showTooltip, showDelete = props.showDelete;
    var classes = (_a = {},
        _a[styles.emoji] = true,
        _a[styles.emojiNode] = true,
        _a[styles.selected] = selected,
        _a[styles.selectOnHover] = selectOnHover,
        _a);
    if (className) {
        classes[className] = true;
    }
    var width;
    var height;
    var src;
    var representation = shouldUseAltRepresentation(emoji, fitToHeight)
        ? emoji.altRepresentation
        : emoji.representation;
    if (isImageRepresentation(representation)) {
        src = representation.imagePath;
        width = representation.width;
        height = representation.height;
    }
    else if (isMediaRepresentation(representation)) {
        src = representation.mediaPath;
        width = representation.width;
        height = representation.height;
    }
    var deleteButton;
    if (showDelete) {
        deleteButton = (React.createElement("span", { className: styles.deleteButton },
            React.createElement(Button, { iconBefore: React.createElement(CrossCircleIcon, { label: deleteEmojiLabel, primaryColor: colors.N500, size: "small" }), onClick: function (event) { return handleDelete(props, event); }, appearance: "subtle-link", spacing: "none" })));
    }
    var sizing = {};
    if (fitToHeight && width && height) {
        // Presize image, to prevent reflow due to size changes after loading
        sizing = {
            width: (fitToHeight / height) * width,
            height: fitToHeight,
        };
    }
    var onError = function (event) {
        handleImageError(props, event);
    };
    // Pass src attribute as key to force React to rerender img node since browser does not
    // change preview image until loaded
    var emojiNode = (React.createElement("img", tslib_1.__assign({ src: src, key: src, alt: emoji.shortName, style: { visibility: 'visible' }, onError: onError }, sizing)));
    return (React.createElement("span", { className: classNames(classes), 
        // tslint:disable-next-line:jsx-no-lambda
        onMouseDown: function (event) {
            handleMouseDown(props, event);
        }, 
        // tslint:disable-next-line:jsx-no-lambda
        onMouseMove: function (event) {
            handleMouseMove(props, event);
        }, "aria-label": emoji.shortName },
        deleteButton,
        showTooltip ? (React.createElement(Tooltip, { tag: "span", content: emoji.shortName }, emojiNode)) : (emojiNode)));
};
// tslint:disable-next-line:variable-name
export var Emoji = function (props) {
    var emoji = props.emoji;
    if (isSpriteRepresentation(emoji.representation)) {
        return renderAsSprite(props);
    }
    return renderAsImage(props);
};
export default Emoji;
//# sourceMappingURL=Emoji.js.map