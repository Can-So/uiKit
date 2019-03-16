import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { Card, CardView, } from '@atlaskit/media-card';
import { withImageLoader, } from '@atlaskit/editor-common';
var MediaCardInternal = /** @class */ (function (_super) {
    tslib_1.__extends(MediaCardInternal, _super);
    function MediaCardInternal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.renderLoadingCard = function () {
            var cardDimensions = _this.props.cardDimensions;
            return (React.createElement(CardView, { status: "loading", mediaItemType: "file", dimensions: cardDimensions }));
        };
        return _this;
    }
    MediaCardInternal.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mediaProvider, provider, context;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mediaProvider = this.props.mediaProvider;
                        if (!mediaProvider) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, mediaProvider];
                    case 1:
                        provider = _a.sent();
                        return [4 /*yield*/, provider.viewContext];
                    case 2:
                        context = _a.sent();
                        this.setState({
                            context: context,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaCardInternal.prototype.renderExternal = function () {
        var context = this.state.context;
        var _a = this.props, cardDimensions = _a.cardDimensions, resizeMode = _a.resizeMode, appearance = _a.appearance, url = _a.url, imageStatus = _a.imageStatus, disableOverlay = _a.disableOverlay;
        if (imageStatus === 'loading' || !url) {
            return this.renderLoadingCard();
        }
        var identifier = {
            dataURI: url,
            name: url,
            mediaItemType: 'external-image',
        };
        return (React.createElement(Card, { context: context, identifier: identifier, dimensions: cardDimensions, appearance: appearance, resizeMode: resizeMode, disableOverlay: disableOverlay }));
    };
    MediaCardInternal.prototype.render = function () {
        var context = this.state.context;
        var _a = this.props, eventHandlers = _a.eventHandlers, id = _a.id, type = _a.type, collection = _a.collection, occurrenceKey = _a.occurrenceKey, cardDimensions = _a.cardDimensions, resizeMode = _a.resizeMode, rendererAppearance = _a.rendererAppearance, disableOverlay = _a.disableOverlay, useInlinePlayer = _a.useInlinePlayer;
        var isMobile = rendererAppearance === 'mobile';
        var shouldPlayInline = useInlinePlayer !== undefined ? useInlinePlayer : true;
        var onCardClick = eventHandlers && eventHandlers.media && eventHandlers.media.onClick;
        var shouldOpenMediaViewer = !isMobile && !onCardClick;
        if (type === 'external') {
            return this.renderExternal();
        }
        if (type === 'link') {
            return null;
        }
        if (!context || !id) {
            return this.renderLoadingCard();
        }
        if (!id || type !== 'file') {
            return (React.createElement(CardView, { status: "error", mediaItemType: type, dimensions: cardDimensions }));
        }
        var identifier = {
            id: id,
            mediaItemType: 'file',
            collectionName: collection,
            occurrenceKey: occurrenceKey,
        };
        return (React.createElement(Card, { identifier: identifier, context: context, dimensions: cardDimensions, onClick: onCardClick, resizeMode: resizeMode, isLazy: !isMobile, disableOverlay: disableOverlay, useInlinePlayer: isMobile ? false : shouldPlayInline, shouldOpenMediaViewer: shouldOpenMediaViewer }));
    };
    return MediaCardInternal;
}(Component));
export { MediaCardInternal };
export var MediaCard = withImageLoader(MediaCardInternal);
//# sourceMappingURL=MediaCard.js.map