import * as tslib_1 from "tslib";
import { withAnalyticsEvents } from '@findable/analytics-next';
import { ResourcedEmoji } from '@findable/emoji';
import { borderRadius, colors } from '@findable/theme';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { style } from 'typestyle';
import { createAndFireSafe, createReactionClickedEvent, createReactionHoveredEvent, } from '../analytics';
import { Counter } from './Counter';
import { FlashAnimation } from './FlashAnimation';
import { ReactionTooltip } from './ReactionTooltip';
import { isLeftClick } from './utils';
var akBorderRadius = borderRadius() + "px";
var akColorN30A = colors.N30A;
var akColorN400 = colors.N400;
var emojiStyle = style({
    transformOrigin: 'center center 0',
    margin: '0 4px',
});
var reactionStyle = style({
    outline: 'none',
    display: 'flex',
    flexDirection: 'row',
    minWidth: '36px',
    height: '24px',
    lineHeight: '24px',
    background: 'transparent',
    border: '0',
    borderRadius: akBorderRadius,
    color: akColorN400,
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    transition: '200ms ease-in-out',
    $nest: { '&:hover': { background: akColorN30A } },
});
var flashStyle = style({
    display: 'flex',
    flexDirection: 'row',
    borderRadius: akBorderRadius,
});
var counterStyle = style({
    padding: '0 4px 0 0',
});
var ReactionWithoutAnalytics = /** @class */ (function (_super) {
    tslib_1.__extends(ReactionWithoutAnalytics, _super);
    function ReactionWithoutAnalytics(props) {
        var _this = _super.call(this, props) || this;
        _this.mounted = false;
        _this.handleMouseDown = function (event) {
            event.preventDefault();
            if (_this.props.onClick && isLeftClick(event)) {
                var _a = _this.props, reaction = _a.reaction, createAnalyticsEvent = _a.createAnalyticsEvent;
                var reacted = reaction.reacted, emojiId = reaction.emojiId;
                createAndFireSafe(createAnalyticsEvent, createReactionClickedEvent, !reacted, emojiId);
                _this.props.onClick(_this.props.reaction.emojiId, event);
            }
        };
        _this.handleMouseOver = function (event) {
            event.preventDefault();
            var _a = _this.props, onMouseOver = _a.onMouseOver, reaction = _a.reaction;
            if (!reaction.users || !reaction.users.length) {
                _this.hoverStart = Date.now();
            }
            if (onMouseOver) {
                onMouseOver(_this.props.reaction, event);
            }
        };
        _this.state = {};
        return _this;
    }
    ReactionWithoutAnalytics.prototype.componentDidUpdate = function (_a) {
        var prevReaction = _a.reaction;
        if (!prevReaction.users && this.props.reaction.users) {
            createAndFireSafe(this.props.createAnalyticsEvent, createReactionHoveredEvent, this.hoverStart);
        }
    };
    ReactionWithoutAnalytics.prototype.componentDidMount = function () {
        var _this = this;
        this.mounted = true;
        this.props.emojiProvider
            .then(function (emojiResource) {
            return emojiResource.findByEmojiId({
                shortName: '',
                id: _this.props.reaction.emojiId,
            });
        })
            .then(function (foundEmoji) {
            if (foundEmoji && _this.mounted) {
                _this.setState({
                    emojiName: foundEmoji.name,
                });
            }
        });
    };
    ReactionWithoutAnalytics.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    ReactionWithoutAnalytics.prototype.render = function () {
        var _a = this.props, emojiProvider = _a.emojiProvider, reaction = _a.reaction, classNameProp = _a.className, flash = _a.flash;
        var emojiName = this.state.emojiName;
        var classNames = cx(reactionStyle, classNameProp);
        var emojiId = { id: reaction.emojiId, shortName: '' };
        return (React.createElement(ReactionTooltip, { emojiName: emojiName, reaction: reaction },
            React.createElement("button", { className: classNames, onMouseUp: this.handleMouseDown, onMouseOver: this.handleMouseOver },
                React.createElement(FlashAnimation, { flash: flash, className: flashStyle },
                    React.createElement("div", { className: emojiStyle },
                        React.createElement(ResourcedEmoji, { emojiProvider: emojiProvider, emojiId: emojiId, fitToHeight: 16 })),
                    React.createElement(Counter, { className: counterStyle, value: reaction.count, highlight: reaction.reacted })))));
    };
    ReactionWithoutAnalytics.defaultProps = {
        flash: false,
        className: undefined,
        onMouseOver: undefined,
        flashOnMount: false,
    };
    ReactionWithoutAnalytics.displayName = 'Reaction';
    return ReactionWithoutAnalytics;
}(PureComponent));
export var Reaction = withAnalyticsEvents()(ReactionWithoutAnalytics);
//# sourceMappingURL=Reaction.js.map