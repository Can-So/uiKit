import * as tslib_1 from "tslib";
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Component } from 'react';
import { defaultEmojiHeight } from '../../constants';
import { isPromise } from '../../type-helpers';
import CachingEmoji from './CachingEmoji';
import EmojiPlaceholder from './EmojiPlaceholder';
var ResourcedEmojiComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ResourcedEmojiComponent, _super);
    function ResourcedEmojiComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.ready = false;
        _this.state = {
            emoji: undefined,
            loaded: false,
        };
        return _this;
    }
    ResourcedEmojiComponent.prototype.getChildContext = function () {
        return {
            emoji: {
                emojiProvider: this.props.emojiProvider,
            },
        };
    };
    ResourcedEmojiComponent.prototype.refreshEmoji = function (emojiProvider, emojiId) {
        var _this = this;
        var foundEmoji = emojiProvider.findByEmojiId(emojiId);
        if (isPromise(foundEmoji)) {
            this.setState({
                loaded: false,
            });
            foundEmoji.then(function (emoji) {
                if (_this.ready) {
                    // don't update state if component was unmounted
                    _this.setState({
                        emoji: emoji,
                        loaded: true,
                    });
                }
            });
        }
        else {
            // loaded
            this.setState({
                emoji: foundEmoji,
                loaded: true,
            });
        }
    };
    ResourcedEmojiComponent.prototype.componentWillMount = function () {
        this.ready = true;
        if (!this.state.emoji) {
            // using componentWillMount instead of componentDidMount to avoid needless
            // rerendering.
            this.refreshEmoji(this.props.emojiProvider, this.props.emojiId);
        }
    };
    ResourcedEmojiComponent.prototype.componentWillUnmount = function () {
        this.ready = false;
    };
    ResourcedEmojiComponent.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.emojiProvider !== this.props.emojiProvider ||
            nextProps.emojiId !== this.props.emojiId) {
            this.refreshEmoji(nextProps.emojiProvider, nextProps.emojiId);
        }
    };
    ResourcedEmojiComponent.prototype.render = function () {
        var _a = this.props, emojiId = _a.emojiId, _b = _a.fitToHeight, fitToHeight = _b === void 0 ? defaultEmojiHeight : _b, showTooltip = _a.showTooltip;
        var _c = this.state, emoji = _c.emoji, loaded = _c.loaded;
        var shortName = emojiId.shortName, fallback = emojiId.fallback;
        if (emoji) {
            return this.emojiWrapper(React.createElement(CachingEmoji, { emoji: emoji, showTooltip: showTooltip, fitToHeight: fitToHeight }));
        }
        else if (loaded) {
            // loaded but not found - render fallback
            return this.emojiWrapper(React.createElement("span", null, fallback || shortName));
        }
        return this.emojiWrapper(React.createElement(EmojiPlaceholder, { shortName: shortName, showTooltip: showTooltip, size: fitToHeight || defaultEmojiHeight }));
    };
    ResourcedEmojiComponent.prototype.emojiWrapper = function (element) {
        var _a = this.props.emojiId, shortName = _a.shortName, id = _a.id, fallback = _a.fallback;
        return (React.createElement("span", { "data-emoji-id": id, "data-emoji-short-name": shortName, "data-emoji-text": fallback || shortName }, element));
    };
    ResourcedEmojiComponent.childContextTypes = {
        emoji: PropTypes.object,
    };
    return ResourcedEmojiComponent;
}(Component));
export default ResourcedEmojiComponent;
//# sourceMappingURL=ResourcedEmojiComponent.js.map