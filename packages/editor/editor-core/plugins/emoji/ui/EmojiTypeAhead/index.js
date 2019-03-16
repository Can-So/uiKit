import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { Popup, akEditorFloatingDialogZIndex } from '@findable/editor-common';
import { EmojiTypeAhead as AkEmojiTypeAhead, } from '@findable/emoji';
import { analyticsService } from '../../../../analytics';
import { getInsertTypeForKey, InsertType, } from '../../../../analytics/fabric-analytics-helper';
var EmojiTypeAhead = /** @class */ (function (_super) {
    tslib_1.__extends(EmojiTypeAhead, _super);
    function EmojiTypeAhead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openTime = 0;
        _this.state = {};
        _this.handlePluginStateChange = function (state) {
            var anchorElement = state.anchorElement, query = state.query, queryActive = state.queryActive, focused = state.focused;
            _this.setState({ anchorElement: anchorElement, query: query, queryActive: queryActive, focused: focused });
        };
        _this.handleEmojiTypeAheadRef = function (ref) {
            _this.typeAhead = ref;
        };
        _this.calculateElapsedTime = function () { return Date.now() - _this.openTime; };
        _this.handleSelectedEmoji = function (emojiId, emoji) {
            var _emoji = emoji;
            var dispatchAnalyticsEvent = _this.props.dispatchAnalyticsEvent;
            _this.fireTypeAheadSelectedAnalytics(_emoji, _this.lastKeyTyped, _this.pluginState.query);
            if (dispatchAnalyticsEvent) {
                dispatchAnalyticsEvent({
                    action: "inserted" /* INSERTED */,
                    actionSubject: "document" /* DOCUMENT */,
                    actionSubjectId: "emoji" /* EMOJI */,
                    attributes: { inputMethod: "typeAhead" /* TYPEAHEAD */ },
                    eventType: "track" /* TRACK */,
                });
            }
            _this.pluginState.insertEmoji(emojiId);
        };
        _this.handleSelectPrevious = function () {
            if (_this.typeAhead) {
                _this.typeAhead.selectPrevious();
                analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.keyup', {});
            }
            return true;
        };
        _this.handleSelectNext = function () {
            if (_this.typeAhead) {
                _this.typeAhead.selectNext();
                analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.keydown', {});
            }
            return true;
        };
        _this.fireTypeAheadSelectedAnalytics = function (emoji, key, query) {
            var queryLength = (query && query.length) || 0;
            var insertType = getInsertTypeForKey(key) || InsertType.SELECTED;
            var dispatchAnalyticsEvent = _this.props.dispatchAnalyticsEvent;
            analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.select', {
                mode: insertType,
                duration: _this.calculateElapsedTime() || 0,
                emojiId: (emoji && emoji.id) || '',
                type: (emoji && emoji.type) || '',
                queryLength: queryLength,
            });
            if (insertType === InsertType.SPACE && dispatchAnalyticsEvent) {
                dispatchAnalyticsEvent({
                    action: "inserted" /* INSERTED */,
                    actionSubject: "document" /* DOCUMENT */,
                    actionSubjectId: "emoji" /* EMOJI */,
                    attributes: { inputMethod: "ascii" /* ASCII */ },
                    eventType: "track" /* TRACK */,
                });
            }
        };
        _this.handleSpaceTyped = function () {
            analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.space', {});
        };
        _this.handleSpaceSelectCurrent = function (emoji, key, query) {
            _this.fireTypeAheadSelectedAnalytics(emoji, key, query);
        };
        _this.handleSelectCurrent = function (key) {
            _this.lastKeyTyped = key;
            if (_this.getEmojisCount() > 0) {
                _this.typeAhead.chooseCurrentSelection();
            }
            else {
                _this.pluginState.dismiss();
            }
            return true;
        };
        _this.handleOnOpen = function () {
            _this.lastKeyTyped = undefined;
            _this.openTime = Date.now();
            analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.open', {});
        };
        _this.handleOnClose = function () {
            analyticsService.trackEvent('atlassian.fabric.emoji.typeahead.close', {});
        };
        return _this;
    }
    EmojiTypeAhead.prototype.componentWillMount = function () {
        this.setPluginState(this.props);
    };
    EmojiTypeAhead.prototype.componentWillUpdate = function (nextProps) {
        if (!this.pluginState) {
            this.setPluginState(nextProps);
        }
    };
    EmojiTypeAhead.prototype.componentWillUnmount = function () {
        var pluginState = this.pluginState;
        if (pluginState) {
            pluginState.unsubscribe(this.handlePluginStateChange);
        }
    };
    EmojiTypeAhead.prototype.setPluginState = function (props) {
        var editorView = props.editorView, pluginKey = props.pluginKey;
        if (!editorView) {
            return;
        }
        var pluginState = pluginKey.getState(editorView.state);
        if (pluginState) {
            this.pluginState = pluginState;
            pluginState.subscribe(this.handlePluginStateChange);
            // note: these bindings are required otherwise 'this' context won't be available
            pluginState.onSelectPrevious = this.handleSelectPrevious;
            pluginState.onSelectNext = this.handleSelectNext;
            pluginState.onSelectCurrent = this.handleSelectCurrent;
            // note: AkEmojiTypeAhead.onClose does not work (product-fabric.atlassian.net/browse/FS-1640)
            pluginState.onDismiss = this.handleOnClose;
            pluginState.onSpaceSelectCurrent = this.handleSpaceSelectCurrent;
            pluginState.onSpaceTyped = this.handleSpaceTyped;
        }
    };
    EmojiTypeAhead.prototype.render = function () {
        var _a = this.state, anchorElement = _a.anchorElement, query = _a.query, queryActive = _a.queryActive, focused = _a.focused;
        var _b = this.props, popupsBoundariesElement = _b.popupsBoundariesElement, popupsMountPoint = _b.popupsMountPoint, popupsScrollableElement = _b.popupsScrollableElement, emojiProvider = _b.emojiProvider;
        if (!focused ||
            !this.pluginState ||
            !anchorElement ||
            !queryActive ||
            !emojiProvider) {
            return null;
        }
        return (React.createElement(Popup, { target: anchorElement, fitHeight: 350, fitWidth: 350, zIndex: akEditorFloatingDialogZIndex, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, mountTo: popupsMountPoint, offset: [0, 3] },
            React.createElement(AkEmojiTypeAhead, { emojiProvider: emojiProvider, onSelection: this.handleSelectedEmoji, onOpen: this.handleOnOpen, query: query, ref: this.handleEmojiTypeAheadRef })));
    };
    EmojiTypeAhead.prototype.getEmojisCount = function () {
        return (this.typeAhead && this.typeAhead.count()) || 0;
    };
    return EmojiTypeAhead;
}(PureComponent));
export default EmojiTypeAhead;
//# sourceMappingURL=index.js.map