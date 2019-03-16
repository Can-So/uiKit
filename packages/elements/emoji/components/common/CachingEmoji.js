import * as tslib_1 from "tslib";
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { PureComponent } from 'react';
import { shouldUseAltRepresentation } from '../../api/EmojiUtils';
import { isEmojiDescription, isMediaEmoji, isPromise, } from '../../type-helpers';
import debug from '../../util/logger';
import Emoji from './Emoji';
import EmojiPlaceholder from './EmojiPlaceholder';
/**
 * Renders an emoji from a cached image, if required.
 */
export var CachingEmoji = function (props) {
    // tslint:disable-line:variable-name
    // Optimisation to only render the class based CachingMediaEmoji if necessary
    // slight performance hit, which accumulates for a large number of emoji.
    var placeholderSize = props.placeholderSize, emojiProps = tslib_1.__rest(props, ["placeholderSize"]);
    if (isMediaEmoji(props.emoji)) {
        return React.createElement(CachingMediaEmoji, tslib_1.__assign({}, props));
    }
    return React.createElement(Emoji, tslib_1.__assign({}, emojiProps));
};
/**
 * Rendering a media emoji image from a cache for media emoji, with different
 * rendering paths depending on caching strategy.
 */
var CachingMediaEmoji = /** @class */ (function (_super) {
    tslib_1.__extends(CachingMediaEmoji, _super);
    function CachingMediaEmoji(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.mounted = false;
        _this.handleLoadError = function (_emojiId, emoji) {
            var invalidImage = _this.state.invalidImage;
            if (invalidImage || !emoji) {
                // do nothing, bad image
                return;
            }
            _this.setState({
                cachedEmoji: _this.loadEmoji(emoji, _this.context, true),
            });
        };
        _this.state = {
            cachedEmoji: _this.loadEmoji(props.emoji, context, false),
        };
        return _this;
    }
    CachingMediaEmoji.prototype.componentDidMount = function () {
        this.mounted = true;
    };
    CachingMediaEmoji.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    CachingMediaEmoji.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
        if (nextProps.emoji !== this.props.emoji) {
            if (this.mounted) {
                this.setState({
                    cachedEmoji: this.loadEmoji(nextProps.emoji, nextContext, false),
                });
            }
        }
    };
    CachingMediaEmoji.prototype.loadEmoji = function (emoji, context, forceLoad) {
        var _this = this;
        if (!context.emoji) {
            return undefined;
        }
        var emojiProvider = context.emoji.emojiProvider;
        if (!emojiProvider) {
            return undefined;
        }
        var fitToHeight = this.props.fitToHeight;
        var useAlt = shouldUseAltRepresentation(emoji, fitToHeight);
        var optimisticRendering = emojiProvider.optimisticMediaRendering(emoji, useAlt);
        if (optimisticRendering && !forceLoad) {
            debug('Optimistic rendering', emoji.shortName);
            return emoji;
        }
        debug('Loading image via media cache', emoji.shortName);
        var loadedEmoji = emojiProvider.loadMediaEmoji(emoji, useAlt);
        if (isPromise(loadedEmoji)) {
            loadedEmoji
                .then(function (cachedEmoji) {
                if (_this.mounted) {
                    _this.setState({
                        cachedEmoji: cachedEmoji,
                        invalidImage: !cachedEmoji,
                    });
                }
            })
                .catch(function () {
                if (_this.mounted) {
                    _this.setState({
                        cachedEmoji: undefined,
                        invalidImage: true,
                    });
                }
            });
            return undefined;
        }
        if (isEmojiDescription(loadedEmoji)) {
            return loadedEmoji;
        }
        return undefined;
    };
    CachingMediaEmoji.prototype.render = function () {
        var cachedEmoji = this.state.cachedEmoji;
        var _a = this.props, children = _a.children, placeholderSize = _a.placeholderSize, otherProps = tslib_1.__rest(_a, ["children", "placeholderSize"]);
        var emojiComponent;
        if (cachedEmoji) {
            emojiComponent = (React.createElement(Emoji, tslib_1.__assign({}, otherProps, { emoji: cachedEmoji, onLoadError: this.handleLoadError })));
        }
        else {
            var _b = this.props, emoji = _b.emoji, placeholderSize_1 = _b.placeholderSize, showTooltip = _b.showTooltip, fitToHeight = _b.fitToHeight;
            var shortName = emoji.shortName, representation = emoji.representation;
            emojiComponent = (React.createElement(EmojiPlaceholder, { size: fitToHeight || placeholderSize_1, shortName: shortName, showTooltip: showTooltip, representation: representation }));
        }
        return emojiComponent;
    };
    CachingMediaEmoji.contextTypes = {
        emoji: PropTypes.object,
    };
    return CachingMediaEmoji;
}(PureComponent));
export { CachingMediaEmoji };
export default CachingEmoji;
//# sourceMappingURL=CachingEmoji.js.map