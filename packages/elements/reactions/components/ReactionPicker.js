import * as tslib_1 from "tslib";
import { EmojiPicker } from '@atlaskit/emoji';
import Layer from '@atlaskit/layer';
import { borderRadius, colors } from '@atlaskit/theme';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
import { style } from 'typestyle';
import { Selector } from './Selector';
import { Trigger } from './Trigger';
var akBorderRadius = borderRadius() + "px";
var akColorN0 = colors.N0;
var akColorN50A = colors.N50A;
var akColorN60A = colors.N60A;
var pickerStyle = style({
    verticalAlign: 'middle',
    $nest: {
        '&.miniMode': {
            display: 'inline-block',
            marginRight: '4px',
        },
    },
});
var contentStyle = style({
    display: 'flex',
});
var popupStyle = style({
    background: akColorN0,
    borderRadius: akBorderRadius,
    boxShadow: "0 4px 8px -2px " + akColorN50A + ", 0 0 1px " + akColorN60A,
    $nest: {
        '&> div': {
            boxShadow: undefined,
        },
    },
});
var ReactionPicker = /** @class */ (function (_super) {
    tslib_1.__extends(ReactionPicker, _super);
    function ReactionPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClickOutside = function (e) {
            var isOpen = _this.state.isOpen;
            if (!isOpen) {
                return;
            }
            var domNode = ReactDOM.findDOMNode(_this);
            if (!domNode || (e.target instanceof Node && !domNode.contains(e.target))) {
                if (_this.props.onCancel) {
                    _this.props.onCancel();
                }
                _this.close();
            }
        };
        _this.showFullPicker = function (e) {
            e.preventDefault();
            var onMore = _this.props.onMore;
            if (onMore) {
                onMore();
            }
            _this.setState({
                isOpen: true,
                showFullPicker: true,
            });
        };
        _this.onEmojiSelected = function (emoji) {
            var onSelection = _this.props.onSelection;
            if (!emoji.id) {
                return;
            }
            onSelection(emoji.id, _this.state.showFullPicker ? 'emojiPicker' : 'quickSelector');
            _this.close(emoji.id);
        };
        _this.onTriggerClick = function () {
            if (_this.props.onOpen) {
                _this.props.onOpen();
            }
            _this.setState({
                isOpen: !_this.state.isOpen,
                showFullPicker: false,
            });
        };
        _this.state = {
            isOpen: false,
            showFullPicker: false,
        };
        return _this;
    }
    ReactionPicker.prototype.componentDidMount = function () {
        document.addEventListener('click', this.handleClickOutside);
    };
    ReactionPicker.prototype.componentWillUnmount = function () {
        document.removeEventListener('click', this.handleClickOutside);
    };
    ReactionPicker.prototype.close = function (_emojiId) {
        this.setState({
            isOpen: false,
            showFullPicker: false,
        });
    };
    ReactionPicker.prototype.renderSelector = function () {
        var _a = this.props, emojiProvider = _a.emojiProvider, allowAllEmojis = _a.allowAllEmojis;
        return (React.createElement("div", { className: contentStyle },
            React.createElement(Selector, { emojiProvider: emojiProvider, onSelection: this.onEmojiSelected, showMore: allowAllEmojis, onMoreClick: this.showFullPicker })));
    };
    ReactionPicker.prototype.renderEmojiPicker = function () {
        return (React.createElement(EmojiPicker, { emojiProvider: this.props.emojiProvider, onSelection: this.onEmojiSelected }));
    };
    ReactionPicker.prototype.renderContent = function () {
        return this.state.showFullPicker
            ? this.renderEmojiPicker()
            : this.renderSelector();
    };
    ReactionPicker.prototype.renderPopup = function () {
        if (this.state.isOpen) {
            return React.createElement("div", { className: popupStyle }, this.renderContent());
        }
        return null;
    };
    ReactionPicker.prototype.renderTrigger = function (content) {
        var miniMode = this.props.miniMode;
        return (React.createElement(Layer, { content: content, position: "bottom left", autoFlip: ['top', 'bottom'], boundariesElement: "scrollParent" },
            React.createElement(Trigger, { onClick: this.onTriggerClick, miniMode: miniMode, disabled: this.props.disabled })));
    };
    ReactionPicker.prototype.render = function () {
        var isOpen = this.state.isOpen;
        var miniMode = this.props.miniMode;
        var classNames = cx(pickerStyle, {
            isOpen: isOpen,
            miniMode: miniMode,
        }, this.props.className);
        return (React.createElement("div", { className: classNames }, this.renderTrigger(this.renderPopup())));
    };
    ReactionPicker.defaultProps = {
        disabled: false,
    };
    return ReactionPicker;
}(PureComponent));
export { ReactionPicker };
//# sourceMappingURL=ReactionPicker.js.map