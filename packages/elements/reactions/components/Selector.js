import * as tslib_1 from "tslib";
import Tooltip from '@atlaskit/tooltip';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { keyframes, style } from 'typestyle';
import { EmojiButton } from './EmojiButton';
import { ShowMore } from './ShowMore';
import { equalEmojiId } from './utils';
var selectorStyle = style({
    boxSizing: 'border-box',
    display: 'flex',
    padding: 0,
});
var emojiStyle = style({
    display: 'inline-block',
    opacity: 0,
    $nest: {
        '&.selected': {
            transition: 'transform 200ms ease-in-out  ',
            transform: 'translateY(-48px) scale(2.667)',
        },
    },
});
var revealAnimation = keyframes({
    '0%': {
        opacity: 1,
        transform: 'scale(0.5)',
    },
    '75%': {
        transform: 'scale(1.25)',
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
    },
});
export var revealStyle = style({
    animation: revealAnimation + " 150ms ease-in-out forwards",
});
var revealDelay = function (index) { return ({ animationDelay: index * 50 + "ms" }); };
export var defaultReactions = [
    { id: '1f44d', shortName: ':thumbsup:' },
    { id: '1f44e', shortName: ':thumbsdown:' },
    { id: '1f525', shortName: ':fire:' },
    { id: '1f60d', shortName: ':heart_eyes:' },
    { id: '1f602', shortName: ':joy:' },
    { id: '1f622', shortName: ':cry:' },
];
export var defaultReactionsByShortName = new Map(defaultReactions.map(function (reaction) { return [
    reaction.shortName,
    reaction,
]; }));
export var isDefaultReaction = function (emojiId) {
    return defaultReactions.filter(function (otherEmojiId) { return equalEmojiId(otherEmojiId, emojiId); })
        .length > 0;
};
var Selector = /** @class */ (function (_super) {
    tslib_1.__extends(Selector, _super);
    function Selector(props) {
        var _this = _super.call(this, props) || this;
        _this.onEmojiSelected = function (emojiId, emoji, event) {
            _this.timeouts.push(window.setTimeout(function () { return _this.props.onSelection(emojiId, emoji, event); }, 250));
            _this.setState({
                selection: emojiId,
            });
        };
        _this.renderEmoji = function (emojiId, index) {
            var emojiProvider = _this.props.emojiProvider;
            var key = emojiId.id || emojiId.shortName;
            var classNames = cx(emojiStyle, revealStyle, {
                selected: emojiId === _this.state.selection,
            });
            var style = revealDelay(index);
            return (React.createElement("div", { key: key, className: classNames, style: style },
                React.createElement(Tooltip, { content: emojiId.shortName },
                    React.createElement(EmojiButton, { emojiId: emojiId, emojiProvider: emojiProvider, onClick: _this.onEmojiSelected }))));
        };
        _this.renderShowMore = function () { return (React.createElement(ShowMore, { key: "more", className: { button: revealStyle }, style: { button: revealDelay(defaultReactions.length) }, onClick: _this.props.onMoreClick })); };
        _this.timeouts = [];
        _this.state = {
            selection: undefined,
        };
        return _this;
    }
    Selector.prototype.componentWillUnmount = function () {
        this.timeouts.forEach(clearTimeout);
    };
    Selector.prototype.render = function () {
        var showMore = this.props.showMore;
        return (React.createElement("div", { className: selectorStyle },
            defaultReactions.map(this.renderEmoji),
            showMore ? this.renderShowMore() : null));
    };
    return Selector;
}(PureComponent));
export { Selector };
//# sourceMappingURL=Selector.js.map