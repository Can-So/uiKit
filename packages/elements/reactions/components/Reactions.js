import * as tslib_1 from "tslib";
import { withAnalyticsEvents } from '@findable/analytics-next';
import Tooltip from '@findable/tooltip';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { style } from 'typestyle';
import { createAndFireSafe, createPickerButtonClickedEvent, createPickerCancelledEvent, createPickerMoreClickedEvent, createReactionSelectionEvent, createReactionsRenderedEvent, } from '../analytics';
import { ReactionStatus } from '../types/ReactionStatus';
import { messages } from './i18n';
import { Reaction } from './Reaction';
import { ReactionPicker } from './ReactionPicker';
var reactionStyle = style({
    display: 'inline-block',
    // top margin of 2px to allow spacing between rows when wrapped (paired with top margin in reactionsStyle)
    margin: '2px 4px 0 4px',
});
var reactionsStyle = style({
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    background: 'white',
    alignItems: 'center',
    borderRadius: '15px',
    // To allow to row spacing of 2px on wrap, and 0px on first row
    marginTop: '-2px',
    $nest: { '& > :first-child': { marginLeft: 0 } },
});
var ReactionsWithoutAnalytics = /** @class */ (function (_super) {
    tslib_1.__extends(ReactionsWithoutAnalytics, _super);
    function ReactionsWithoutAnalytics(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidUpdate = function () {
            if (_this.props.status === ReactionStatus.ready && _this.renderTime) {
                createAndFireSafe(_this.props.createAnalyticsEvent, createReactionsRenderedEvent, _this.renderTime);
                _this.renderTime = undefined;
            }
        };
        _this.isDisabled = function () {
            return _this.props.status !== ReactionStatus.ready;
        };
        _this.getTooltip = function () {
            var _a = _this.props, status = _a.status, errorMessage = _a.errorMessage;
            switch (status) {
                case ReactionStatus.error:
                    return errorMessage ? (errorMessage) : (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.unexpectedError)));
                case ReactionStatus.loading:
                case ReactionStatus.notLoaded:
                    return React.createElement(FormattedMessage, tslib_1.__assign({}, messages.loadingReactions));
                default:
                    return undefined;
            }
        };
        _this.handleReactionMouseOver = function (reaction) {
            if (_this.props.onReactionHover) {
                _this.props.onReactionHover(reaction.emojiId);
            }
        };
        _this.handlePickerOpen = function () {
            _this.openTime = Date.now();
            createAndFireSafe(_this.props.createAnalyticsEvent, createPickerButtonClickedEvent, _this.props.reactions.length);
        };
        _this.handleOnCancel = function () {
            createAndFireSafe(_this.props.createAnalyticsEvent, createPickerCancelledEvent, _this.openTime);
            _this.openTime = undefined;
        };
        _this.handleOnMore = function () {
            createAndFireSafe(_this.props.createAnalyticsEvent, createPickerMoreClickedEvent, _this.openTime);
        };
        _this.handleOnSelection = function (emojiId, source) {
            createAndFireSafe(_this.props.createAnalyticsEvent, createReactionSelectionEvent, source, emojiId, _this.props.reactions.find(function (reaction) { return reaction.emojiId === emojiId; }), _this.openTime);
            _this.openTime = undefined;
            if (_this.props.onSelection) {
                _this.props.onSelection(emojiId);
            }
        };
        _this.renderReaction = function (reaction) { return (React.createElement(Reaction, { key: reaction.emojiId, className: reactionStyle, reaction: reaction, emojiProvider: _this.props.emojiProvider, onClick: _this.props.onReactionClick, onMouseOver: _this.handleReactionMouseOver, flash: _this.props.flash[reaction.emojiId] })); };
        if (props.status !== ReactionStatus.ready) {
            _this.renderTime = Date.now();
        }
        return _this;
    }
    ReactionsWithoutAnalytics.prototype.componentDidMount = function () {
        if (this.props.status === ReactionStatus.notLoaded) {
            this.props.loadReaction();
        }
    };
    ReactionsWithoutAnalytics.prototype.renderPicker = function () {
        var _a = this.props, emojiProvider = _a.emojiProvider, boundariesElement = _a.boundariesElement, allowAllEmojis = _a.allowAllEmojis;
        return (React.createElement(Tooltip, { content: this.getTooltip() },
            React.createElement(ReactionPicker, { className: reactionStyle, emojiProvider: emojiProvider, miniMode: true, boundariesElement: boundariesElement, allowAllEmojis: allowAllEmojis, disabled: this.isDisabled(), onSelection: this.handleOnSelection, onOpen: this.handlePickerOpen, onCancel: this.handleOnCancel, onMore: this.handleOnMore })));
    };
    ReactionsWithoutAnalytics.prototype.render = function () {
        return (React.createElement("div", { className: reactionsStyle },
            this.props.reactions.map(this.renderReaction),
            this.renderPicker()));
    };
    ReactionsWithoutAnalytics.defaultProps = {
        flash: {},
        reactions: [],
    };
    ReactionsWithoutAnalytics.displayName = 'Reactions';
    return ReactionsWithoutAnalytics;
}(React.PureComponent));
export var Reactions = withAnalyticsEvents()(ReactionsWithoutAnalytics);
//# sourceMappingURL=Reactions.js.map