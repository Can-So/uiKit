import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { stateKey as mediaStateKey, } from '../pm-plugins/main';
import { Card, CardView, } from '@atlaskit/media-card';
import { withImageLoader } from '@atlaskit/editor-common';
// This is being used by DropPlaceholder now
export var MEDIA_HEIGHT = 125;
export var FILE_WIDTH = 156;
var MediaNode = /** @class */ (function (_super) {
    tslib_1.__extends(MediaNode, _super);
    function MediaNode(props) {
        var _this = _super.call(this, props) || this;
        _this.handleNewNode = function (props) {
            var node = props.node;
            // +1 indicates the media node inside the mediaSingle nodeview
            _this.pluginState.handleMediaNodeMount(node, function () { return _this.props.getPos() + 1; });
        };
        var view = _this.props.view;
        _this.pluginState = mediaStateKey.getState(view.state);
        return _this;
    }
    MediaNode.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this.props.selected !== nextProps.selected ||
            this.props.viewContext !== nextProps.viewContext ||
            this.props.node.attrs.id !== nextProps.node.attrs.id ||
            this.props.node.attrs.collection !== nextProps.node.attrs.collection ||
            this.props.cardDimensions !== nextProps.cardDimensions) {
            return true;
        }
        return false;
    };
    MediaNode.prototype.componentDidMount = function () {
        this.handleNewNode(this.props);
    };
    MediaNode.prototype.componentWillUnmount = function () {
        var node = this.props.node;
        this.pluginState.handleMediaNodeUnmount(node);
    };
    MediaNode.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.node.attrs.id !== this.props.node.attrs.id) {
            this.pluginState.handleMediaNodeUnmount(prevProps.node);
            this.handleNewNode(this.props);
        }
        this.pluginState.updateElement();
    };
    MediaNode.prototype.render = function () {
        var _a = this.props, node = _a.node, selected = _a.selected, cardDimensions = _a.cardDimensions, onClick = _a.onClick, editorAppearance = _a.editorAppearance;
        var _b = node.attrs, id = _b.id, type = _b.type, collection = _b.collection, url = _b.url;
        var viewContext = this.props.viewContext;
        /**
         * On mobile we don't receive a collectionName until the `upload-end` event.
         * We don't want to render a proper card until we have a valid collection.
         * Render loading until we do.
         */
        var isMobile = editorAppearance === 'mobile';
        var isMobileReady = isMobile
            ? typeof collection === 'string' && collection.length > 0
            : true;
        if (type !== 'external' && (!viewContext || !isMobileReady)) {
            return React.createElement(CardView, { status: "loading", dimensions: cardDimensions });
        }
        var identifier = type === 'external'
            ? {
                dataURI: url,
                name: url,
                mediaItemType: 'external-image',
            }
            : {
                id: id,
                mediaItemType: 'file',
                collectionName: collection,
            };
        return (React.createElement(Card, { context: viewContext, resizeMode: "stretchy-fit", dimensions: cardDimensions, identifier: identifier, selectable: true, selected: selected, disableOverlay: true, onClick: onClick, useInlinePlayer: !isMobile, isLazy: !isMobile }));
    };
    return MediaNode;
}(Component));
export default withImageLoader(MediaNode);
//# sourceMappingURL=media.js.map