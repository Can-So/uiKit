import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { MediaSingle, WithProviders, DEFAULT_IMAGE_HEIGHT, DEFAULT_IMAGE_WIDTH, browser, } from '@findable/editor-common';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { stateKey } from '../pm-plugins/main';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import MediaItem from './media';
import WithPluginState from '../../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../../width';
import { stateKey as reactNodeViewStateKey } from '../../../plugins/base/pm-plugins/react-nodeview';
import { setNodeSelection } from '../../../utils';
import ResizableMediaSingle from '../ui/ResizableMediaSingle';
import { createDisplayGrid } from '../../../plugins/grid';
var MediaSingleNode = /** @class */ (function (_super) {
    tslib_1.__extends(MediaSingleNode, _super);
    function MediaSingleNode(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            height: undefined,
            width: undefined,
            viewContext: undefined,
        };
        _this.onExternalImageLoaded = function (_a) {
            var width = _a.width, height = _a.height;
            _this.setState({
                width: width,
                height: height,
            }, function () {
                _this.forceUpdate();
            });
        };
        _this.selectMediaSingle = function (_a) {
            var event = _a.event;
            // We need to call "stopPropagation" here in order to prevent the browser from navigating to
            // another URL if the media node is wrapped in a link mark.
            event.stopPropagation();
            setNodeSelection(_this.props.view, _this.props.getPos());
        };
        _this.updateSize = function (width, layout) {
            var _a = _this.props.view, state = _a.state, dispatch = _a.dispatch;
            var pos = _this.props.getPos();
            if (typeof pos === 'undefined') {
                return;
            }
            return dispatch(state.tr.setNodeMarkup(pos, undefined, tslib_1.__assign({}, _this.props.node.attrs, { layout: layout,
                width: width })));
        };
        _this.mediaPluginState = stateKey.getState(_this.props.view.state);
        return _this;
    }
    MediaSingleNode.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mediaProvider, viewContext, updatedDimensions;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.mediaProvider];
                    case 1:
                        mediaProvider = _a.sent();
                        if (!mediaProvider) return [3 /*break*/, 3];
                        return [4 /*yield*/, mediaProvider.viewContext];
                    case 2:
                        viewContext = _a.sent();
                        this.setState({
                            viewContext: viewContext,
                        });
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.getRemoteDimensions()];
                    case 4:
                        updatedDimensions = _a.sent();
                        if (updatedDimensions) {
                            this.mediaPluginState.updateMediaNodeAttrs(updatedDimensions.id, {
                                height: updatedDimensions.height,
                                width: updatedDimensions.width,
                            }, true);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaSingleNode.prototype.getRemoteDimensions = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mediaProvider, firstChild, _a, height, type, width, _b, id, collection, viewContext, state;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.props.mediaProvider];
                    case 1:
                        mediaProvider = _c.sent();
                        firstChild = this.props.node.firstChild;
                        if (!mediaProvider || !firstChild) {
                            return [2 /*return*/, false];
                        }
                        _a = firstChild.attrs, height = _a.height, type = _a.type, width = _a.width;
                        if (type === 'external') {
                            return [2 /*return*/, false];
                        }
                        _b = firstChild.attrs, id = _b.id, collection = _b.collection;
                        if (height && width) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, mediaProvider.viewContext];
                    case 2:
                        viewContext = _c.sent();
                        return [4 /*yield*/, viewContext.getImageMetadata(id, {
                                collection: collection,
                            })];
                    case 3:
                        state = _c.sent();
                        if (!state || !state.original) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, {
                                id: id,
                                height: state.original.height || DEFAULT_IMAGE_HEIGHT,
                                width: state.original.width || DEFAULT_IMAGE_WIDTH,
                            }];
                }
            });
        });
    };
    MediaSingleNode.prototype.render = function () {
        var _a = this.props, selected = _a.selected, getPos = _a.getPos, node = _a.node, state = _a.view.state, editorAppearance = _a.editorAppearance;
        var _b = node.attrs, layout = _b.layout, mediaSingleWidth = _b.width;
        var childNode = node.firstChild;
        var _c = childNode.attrs, width = _c.width, height = _c.height, type = _c.type;
        if (type === 'external') {
            var _d = this.state, stateWidth = _d.width, stateHeight = _d.height;
            if (width === null) {
                width = stateWidth || DEFAULT_IMAGE_WIDTH;
            }
            if (height === null) {
                height = stateHeight || DEFAULT_IMAGE_HEIGHT;
            }
        }
        var canResize = !!this.mediaPluginState.options.allowResizing;
        var pos = getPos();
        if (pos) {
            var $pos = state.doc.resolve(pos);
            var _e = state.schema.nodes, table = _e.table, layoutSection = _e.layoutSection;
            var disabledNode = !!findParentNodeOfTypeClosestToPos($pos, [
                table,
                layoutSection,
            ]);
            canResize = canResize && !disabledNode;
        }
        if (width === null || height === null) {
            width = DEFAULT_IMAGE_WIDTH;
            height = DEFAULT_IMAGE_HEIGHT;
        }
        var cardWidth = this.props.width;
        var cardHeight = (height / width) * cardWidth;
        var cardDimensions = {
            width: cardWidth + "px",
            height: cardHeight + "px",
        };
        var props = {
            layout: layout,
            width: width,
            height: height,
            containerWidth: this.props.width,
            lineLength: this.props.lineLength,
            pctWidth: mediaSingleWidth,
        };
        var MediaChild = (React.createElement(MediaItem, { node: childNode, view: this.props.view, getPos: this.props.getPos, cardDimensions: cardDimensions, viewContext: this.state.viewContext, selected: selected(), onClick: this.selectMediaSingle, onExternalImageLoaded: this.onExternalImageLoaded, editorAppearance: editorAppearance }));
        return canResize ? (React.createElement(ResizableMediaSingle, tslib_1.__assign({}, props, { view: this.props.view, getPos: getPos, updateSize: this.updateSize, displayGrid: createDisplayGrid(this.props.eventDispatcher), gridSize: 12, viewContext: this.state.viewContext, state: this.props.view.state, appearance: this.mediaPluginState.options.appearance, selected: this.props.selected() }), MediaChild)) : (React.createElement(MediaSingle, tslib_1.__assign({}, props), MediaChild));
    };
    return MediaSingleNode;
}(Component));
export default MediaSingleNode;
var MediaSingleNodeView = /** @class */ (function (_super) {
    tslib_1.__extends(MediaSingleNodeView, _super);
    function MediaSingleNodeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastOffsetLeft = 0;
        return _this;
    }
    MediaSingleNodeView.prototype.createDomRef = function () {
        var domRef = document.createElement('div');
        if (browser.chrome) {
            // workaround Chrome bug in https://product-fabric.atlassian.net/browse/ED-5379
            // see also: https://github.com/ProseMirror/prosemirror/issues/884
            domRef.contentEditable = 'true';
        }
        return domRef;
    };
    MediaSingleNodeView.prototype.render = function () {
        var _this = this;
        var _a = this.reactComponentProps, eventDispatcher = _a.eventDispatcher, editorAppearance = _a.editorAppearance;
        var mediaPluginState = stateKey.getState(this.view.state);
        return (React.createElement(WithProviders, { providers: ['mediaProvider'], providerFactory: mediaPluginState.options.providerFactory, renderNode: function (_a) {
                var mediaProvider = _a.mediaProvider;
                return (React.createElement(WithPluginState, { editorView: _this.view, plugins: {
                        width: widthPluginKey,
                        reactNodeViewState: reactNodeViewStateKey,
                    }, render: function (_a) {
                        var width = _a.width, reactNodeViewState = _a.reactNodeViewState;
                        return (React.createElement(MediaSingleNode, { width: width.width, lineLength: width.lineLength, node: _this.node, getPos: _this.getPos, mediaProvider: mediaProvider, view: _this.view, selected: function () { return _this.getPos() === reactNodeViewState; }, eventDispatcher: eventDispatcher, editorAppearance: editorAppearance }));
                    } }));
            } }));
    };
    MediaSingleNodeView.prototype.ignoreMutation = function () {
        if (this.dom) {
            var offsetLeft = this.dom.offsetLeft;
            if (offsetLeft !== this.lastOffsetLeft) {
                this.lastOffsetLeft = offsetLeft;
                this.update(this.node, [], function () { return true; });
            }
        }
        return true;
    };
    return MediaSingleNodeView;
}(ReactNodeView));
export var ReactMediaSingleNode = function (portalProviderAPI, eventDispatcher, editorAppearance) { return function (node, view, getPos) {
    return new MediaSingleNodeView(node, view, getPos, portalProviderAPI, {
        eventDispatcher: eventDispatcher,
        editorAppearance: editorAppearance,
    }).init();
}; };
//# sourceMappingURL=mediaSingle.js.map