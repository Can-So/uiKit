import * as tslib_1 from "tslib";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from 'react';
import { isPreviewableType, isFileIdentifier, isExternalImageIdentifier, isDifferentIdentifier, isImageRepresentationReady, } from '@atlaskit/media-core';
import { AnalyticsContext } from '@atlaskit/analytics-next';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { IntlProvider } from 'react-intl';
import { MediaViewer } from '@atlaskit/media-viewer';
import { CardView } from '../cardView';
import { LazyContent } from '../../utils/lazyContent';
import { getBaseAnalyticsContext } from '../../utils/analyticsUtils';
import { getDataURIDimension } from '../../utils/getDataURIDimension';
import { getDataURIFromFileState } from '../../utils/getDataURIFromFileState';
import { extendMetadata } from '../../utils/metadata';
import { isBigger } from '../../utils/dimensionComparer';
import { getCardStatus } from './getCardStatus';
import { InlinePlayer } from '../inlinePlayer';
var Card = /** @class */ (function (_super) {
    tslib_1.__extends(Card, _super);
    function Card() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasBeenMounted = false;
        _this.state = {
            status: 'loading',
            isCardVisible: !_this.props.isLazy,
            previewOrientation: 1,
            isPlayingFile: false,
        };
        _this.shouldRefetchImage = function (current, next) {
            if (!current || !next) {
                return false;
            }
            return isBigger(current, next);
        };
        _this.releaseDataURI = function () {
            var dataURI = _this.state.dataURI;
            if (dataURI) {
                URL.revokeObjectURL(dataURI);
            }
        };
        _this.onLoadingChangeCallback = function () {
            var onLoadingChange = _this.props.onLoadingChange;
            if (onLoadingChange) {
                var _a = _this.state, status_1 = _a.status, error = _a.error, metadata = _a.metadata;
                var state = {
                    type: status_1,
                    payload: error || metadata,
                };
                onLoadingChange(state);
            }
        };
        _this.notifyStateChange = function (state) {
            if (_this.hasBeenMounted) {
                _this.setState(state, _this.onLoadingChangeCallback);
            }
        };
        _this.unsubscribe = function () {
            if (_this.subscription) {
                _this.subscription.unsubscribe();
            }
            if (_this.hasBeenMounted) {
                _this.setState({ dataURI: undefined });
            }
        };
        // This method is called when card fails and user press 'Retry'
        _this.onRetry = function () {
            var _a = _this.props, identifier = _a.identifier, context = _a.context;
            _this.subscribe(identifier, context);
        };
        _this.onClick = function (result, analyticsEvent) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, identifier, onClick, useInlinePlayer, shouldOpenMediaViewer, mediaItemDetails, isVideo, shouldStartPlayingInline, mediaViewerSelectedItem, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, identifier = _a.identifier, onClick = _a.onClick, useInlinePlayer = _a.useInlinePlayer, shouldOpenMediaViewer = _a.shouldOpenMediaViewer;
                        mediaItemDetails = result.mediaItemDetails;
                        this.onClickPayload = {
                            result: result,
                            analyticsEvent: analyticsEvent,
                        };
                        isVideo = mediaItemDetails &&
                            mediaItemDetails.mediaType === 'video';
                        shouldStartPlayingInline = useInlinePlayer && isVideo;
                        if (onClick && !shouldStartPlayingInline) {
                            onClick(result, analyticsEvent);
                        }
                        if (!mediaItemDetails) {
                            return [2 /*return*/];
                        }
                        if (!shouldStartPlayingInline) return [3 /*break*/, 1];
                        this.setState({
                            isPlayingFile: true,
                        });
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(shouldOpenMediaViewer && identifier.mediaItemType === 'file')) return [3 /*break*/, 3];
                        _b = {};
                        return [4 /*yield*/, identifier.id];
                    case 2:
                        mediaViewerSelectedItem = (_b.id = _c.sent(),
                            _b.mediaItemType = 'file',
                            _b.collectionName = identifier.collectionName,
                            _b.occurrenceKey = identifier.occurrenceKey,
                            _b);
                        this.setState({
                            mediaViewerSelectedItem: mediaViewerSelectedItem,
                        });
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.onInlinePlayerError = function () {
            _this.setState({
                isPlayingFile: false,
            });
        };
        _this.onInlinePlayerClick = function () {
            var onClick = _this.props.onClick;
            if (onClick && _this.onClickPayload) {
                onClick(_this.onClickPayload.result, _this.onClickPayload.analyticsEvent);
            }
        };
        _this.renderInlinePlayer = function () {
            var _a = _this.props, identifier = _a.identifier, context = _a.context, dimensions = _a.dimensions, selected = _a.selected;
            return (React.createElement(InlinePlayer, { context: context, dimensions: dimensions, identifier: identifier, onError: _this.onInlinePlayerError, onClick: _this.onInlinePlayerClick, selected: selected }));
        };
        _this.onMediaViewerClose = function () {
            _this.setState({
                mediaViewerSelectedItem: undefined,
            });
        };
        // returns a valid MV data source including current the card identifier
        _this.getMediaViewerDataSource = function () {
            var mediaViewerDataSource = _this.props.mediaViewerDataSource;
            var mediaViewerSelectedItem = _this.state.mediaViewerSelectedItem;
            if (!mediaViewerSelectedItem) {
                return {
                    list: [],
                };
            }
            if (!mediaViewerDataSource) {
                return {
                    list: [mediaViewerSelectedItem],
                };
            }
            // we want to ensure the card identifier is in the list
            var list = mediaViewerDataSource.list;
            if (list &&
                list.length &&
                mediaViewerSelectedItem.mediaItemType === 'file') {
                var isSelectedItemInList = list.some(function (item) {
                    return item.mediaItemType === 'file' &&
                        item.id === mediaViewerSelectedItem.id;
                });
                if (!isSelectedItemInList) {
                    return {
                        list: tslib_1.__spread([mediaViewerSelectedItem], list),
                    };
                }
            }
            return mediaViewerDataSource;
        };
        _this.renderMediaViewer = function () {
            var mediaViewerSelectedItem = _this.state.mediaViewerSelectedItem;
            var _a = _this.props, context = _a.context, identifier = _a.identifier;
            if (!mediaViewerSelectedItem || identifier.mediaItemType !== 'file') {
                return;
            }
            var _b = identifier.collectionName, collectionName = _b === void 0 ? '' : _b;
            var dataSource = _this.getMediaViewerDataSource();
            return ReactDOM.createPortal(React.createElement(MediaViewer, { collectionName: collectionName, dataSource: dataSource, context: context, selectedItem: mediaViewerSelectedItem, onClose: _this.onMediaViewerClose }), document.body);
        };
        _this.renderCard = function () {
            var _a = _this.props, isLazy = _a.isLazy, appearance = _a.appearance, resizeMode = _a.resizeMode, dimensions = _a.dimensions, selectable = _a.selectable, selected = _a.selected, onMouseEnter = _a.onMouseEnter, onSelectChange = _a.onSelectChange, disableOverlay = _a.disableOverlay, identifier = _a.identifier;
            var _b = _this.state, progress = _b.progress, metadata = _b.metadata, dataURI = _b.dataURI, previewOrientation = _b.previewOrientation;
            var _c = _this, analyticsContext = _c.analyticsContext, onRetry = _c.onRetry, onClick = _c.onClick, actions = _c.actions;
            var status = getCardStatus(_this.state, _this.props);
            var card = (React.createElement(AnalyticsContext, { data: analyticsContext },
                React.createElement(CardView, { status: status, metadata: metadata, dataURI: dataURI, mediaItemType: identifier.mediaItemType, appearance: appearance, resizeMode: resizeMode, dimensions: dimensions, actions: actions, selectable: selectable, selected: selected, onClick: onClick, onMouseEnter: onMouseEnter, onSelectChange: onSelectChange, disableOverlay: disableOverlay, progress: progress, onRetry: onRetry, previewOrientation: previewOrientation })));
            return isLazy ? (React.createElement(LazyContent, { placeholder: card, onRender: _this.onCardInViewport }, card)) : (card);
        };
        _this.onCardInViewport = function () {
            _this.setState({ isCardVisible: true }, function () {
                var _a = _this.props, identifier = _a.identifier, context = _a.context;
                _this.subscribe(identifier, context);
            });
        };
        return _this;
    }
    Card.prototype.componentDidMount = function () {
        var _a = this.props, identifier = _a.identifier, context = _a.context;
        this.hasBeenMounted = true;
        this.subscribe(identifier, context);
    };
    Card.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, currentContext = _a.context, currentIdentifier = _a.identifier, currentDimensions = _a.dimensions;
        var nextContext = nextProps.context, nextIdenfifier = nextProps.identifier, nextDimensions = nextProps.dimensions;
        var isDifferent = isDifferentIdentifier(currentIdentifier, nextIdenfifier);
        if (currentContext !== nextContext ||
            isDifferent ||
            this.shouldRefetchImage(currentDimensions, nextDimensions)) {
            this.subscribe(nextIdenfifier, nextContext);
        }
    };
    Card.prototype.componentWillUnmount = function () {
        this.hasBeenMounted = false;
        this.unsubscribe();
        this.releaseDataURI();
    };
    Card.prototype.subscribe = function (identifier, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isCardVisible, dataURI, name_1, id, collectionName, occurrenceKey, resolvedId, _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isCardVisible = this.state.isCardVisible;
                        if (!isCardVisible) {
                            return [2 /*return*/];
                        }
                        if (identifier.mediaItemType === 'external-image') {
                            dataURI = identifier.dataURI, name_1 = identifier.name;
                            this.setState({
                                status: 'complete',
                                dataURI: dataURI,
                                metadata: {
                                    id: dataURI,
                                    name: name_1 || dataURI,
                                    mediaType: 'image',
                                },
                            });
                            return [2 /*return*/];
                        }
                        id = identifier.id, collectionName = identifier.collectionName, occurrenceKey = identifier.occurrenceKey;
                        if (!(typeof id === 'string')) return [3 /*break*/, 1];
                        _a = id;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, id];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        resolvedId = _a;
                        this.unsubscribe();
                        this.subscription = context.file
                            .getFileState(resolvedId, { collectionName: collectionName, occurrenceKey: occurrenceKey })
                            .subscribe({
                            next: function (fileState) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var currentDataURI, currentMetadata, metadata, _a, src, previewOrientation, progress, _b, appearance, dimensions, resizeMode, options, width, height, mode, blob, dataURI, e_1;
                                return tslib_1.__generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            currentDataURI = this.state.dataURI;
                                            currentMetadata = this.state.metadata;
                                            metadata = extendMetadata(fileState, currentMetadata);
                                            if (!!currentDataURI) return [3 /*break*/, 2];
                                            return [4 /*yield*/, getDataURIFromFileState(fileState)];
                                        case 1:
                                            _a = _c.sent(), src = _a.src, previewOrientation = _a.orientation;
                                            currentDataURI = src;
                                            this.notifyStateChange({
                                                dataURI: currentDataURI,
                                                previewOrientation: previewOrientation,
                                            });
                                            _c.label = 2;
                                        case 2:
                                            switch (fileState.status) {
                                                case 'uploading':
                                                    progress = fileState.progress;
                                                    this.notifyStateChange({
                                                        status: 'uploading',
                                                        progress: progress,
                                                        metadata: metadata,
                                                    });
                                                    break;
                                                case 'processing':
                                                    if (currentDataURI) {
                                                        this.notifyStateChange({
                                                            progress: 1,
                                                            status: 'complete',
                                                            metadata: metadata,
                                                        });
                                                    }
                                                    else {
                                                        this.notifyStateChange({
                                                            status: 'processing',
                                                            metadata: metadata,
                                                        });
                                                    }
                                                    break;
                                                case 'processed':
                                                    this.notifyStateChange({ status: 'complete', metadata: metadata });
                                                    break;
                                                case 'failed-processing':
                                                    this.notifyStateChange({ status: 'failed-processing', metadata: metadata });
                                                    break;
                                                case 'error':
                                                    this.notifyStateChange({ status: 'error' });
                                            }
                                            if (!(!currentDataURI &&
                                                isImageRepresentationReady(fileState) &&
                                                metadata.mediaType &&
                                                isPreviewableType(metadata.mediaType))) return [3 /*break*/, 6];
                                            _b = this.props, appearance = _b.appearance, dimensions = _b.dimensions, resizeMode = _b.resizeMode;
                                            options = {
                                                appearance: appearance,
                                                dimensions: dimensions,
                                                component: this,
                                            };
                                            width = getDataURIDimension('width', options);
                                            height = getDataURIDimension('height', options);
                                            _c.label = 3;
                                        case 3:
                                            _c.trys.push([3, 5, , 6]);
                                            mode = resizeMode === 'stretchy-fit' ? 'full-fit' : resizeMode;
                                            return [4 /*yield*/, context.getImage(resolvedId, {
                                                    collection: collectionName,
                                                    mode: mode,
                                                    height: height,
                                                    width: width,
                                                    allowAnimated: true,
                                                })];
                                        case 4:
                                            blob = _c.sent();
                                            dataURI = URL.createObjectURL(blob);
                                            this.releaseDataURI();
                                            if (this.hasBeenMounted) {
                                                this.setState({ dataURI: dataURI });
                                            }
                                            return [3 /*break*/, 6];
                                        case 5:
                                            e_1 = _c.sent();
                                            return [3 /*break*/, 6];
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); },
                            error: function (error) {
                                _this.notifyStateChange({ error: error, status: 'error' });
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Card.prototype, "analyticsContext", {
        get: function () {
            var identifier = this.props.identifier;
            var id = isExternalImageIdentifier(identifier)
                ? 'external-image'
                : identifier.id;
            return getBaseAnalyticsContext('Card', id);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "actions", {
        get: function () {
            var _this = this;
            var _a = this.props, _b = _a.actions, actions = _b === void 0 ? [] : _b, identifier = _a.identifier;
            var _c = this.state, status = _c.status, metadata = _c.metadata;
            if (isFileIdentifier(identifier) && status === 'failed-processing') {
                actions.unshift({
                    label: 'Download',
                    icon: React.createElement(DownloadIcon, { label: "Download" }),
                    handler: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return tslib_1.__generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = (_a = this.props.context.file).downloadBinary;
                                    return [4 /*yield*/, identifier.id];
                                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                        metadata.name,
                                        identifier.collectionName])];
                            }
                        });
                    }); },
                });
            }
            return actions;
        },
        enumerable: true,
        configurable: true
    });
    Card.prototype.render = function () {
        var _a = this.state, isPlayingFile = _a.isPlayingFile, mediaViewerSelectedItem = _a.mediaViewerSelectedItem;
        var content = isPlayingFile
            ? this.renderInlinePlayer()
            : this.renderCard();
        return this.context.intl ? (content) : (React.createElement(IntlProvider, { locale: "en" },
            React.createElement(React.Fragment, null,
                content,
                mediaViewerSelectedItem ? this.renderMediaViewer() : null)));
    };
    Card.defaultProps = {
        appearance: 'auto',
        resizeMode: 'crop',
        isLazy: true,
        disableOverlay: false,
    };
    return Card;
}(Component));
export { Card };
//# sourceMappingURL=index.js.map