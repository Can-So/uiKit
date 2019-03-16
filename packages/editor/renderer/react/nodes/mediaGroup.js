import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { defaultImageCardDimensions } from '@atlaskit/media-card';
import { FilmstripView, } from '@atlaskit/media-filmstrip';
var MediaGroup = /** @class */ (function (_super) {
    tslib_1.__extends(MediaGroup, _super);
    function MediaGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            animate: false,
            offset: 0,
        };
        _this.handleSize = function (_a) {
            var offset = _a.offset;
            return _this.setState({ offset: offset });
        };
        _this.handleScroll = function (_a) {
            var animate = _a.animate, offset = _a.offset;
            return _this.setState({ animate: animate, offset: offset });
        };
        _this.onMediaClick = function (cardClickHandler, child, surroundingItems) { return function (event, analyticsEvent) {
            var surroundings = {
                collectionName: child.props.collection,
                list: surroundingItems,
            };
            cardClickHandler(event, surroundings, analyticsEvent);
        }; };
        return _this;
    }
    MediaGroup.prototype.render = function () {
        var numChildren = React.Children.count(this.props.children);
        var content;
        if (numChildren === 1) {
            var card = React.Children.toArray(this.props.children)[0];
            switch (card.props.type) {
                case 'file':
                    content = this.renderSingleFile(card);
                    break;
                case 'link':
                    content = null;
                    break;
                default:
                    content = this.renderSingleLink(card);
            }
        }
        else {
            content = this.renderStrip();
        }
        return React.createElement("div", { className: "MediaGroup" }, content);
    };
    MediaGroup.prototype.renderSingleFile = function (child) {
        return React.cloneElement(child, {
            resizeMode: 'stretchy-fit',
            cardDimensions: defaultImageCardDimensions,
            useInlinePlayer: false,
        });
    };
    MediaGroup.prototype.renderSingleLink = function (child) {
        return React.cloneElement(child, {
            appearance: 'auto',
        });
    };
    MediaGroup.prototype.cloneFileCard = function (child, surroundingItems) {
        var cardClickHandler = this.props &&
            this.props.eventHandlers &&
            this.props.eventHandlers.media &&
            this.props.eventHandlers.media.onClick;
        var onClick = cardClickHandler
            ? this.onMediaClick(cardClickHandler, child, surroundingItems)
            : undefined;
        return React.cloneElement(child, {
            useInlinePlayer: false,
            eventHandlers: tslib_1.__assign({}, child.props.eventHandlers, { media: {
                    onClick: onClick,
                } }),
        });
    };
    MediaGroup.prototype.renderStrip = function () {
        var _this = this;
        var children = this.props.children;
        var _a = this.state, animate = _a.animate, offset = _a.offset;
        var surroundingItems = React.Children.map(children, function (child) {
            return _this.mapMediaPropsToIdentifier(child.props);
        }).filter(function (identifier) { return !!identifier; });
        return (React.createElement(FilmstripView, { animate: animate, offset: offset, onSize: this.handleSize, onScroll: this.handleScroll }, React.Children.map(children, function (rawChild) {
            var child = rawChild;
            switch (child.props.type) {
                case 'file':
                    return _this.cloneFileCard(child, surroundingItems);
                case 'link':
                    return null;
                default:
                    return React.cloneElement(child);
            }
        })));
    };
    MediaGroup.prototype.mapMediaPropsToIdentifier = function (_a) {
        var id = _a.id, type = _a.type, occurrenceKey = _a.occurrenceKey, collection = _a.collection;
        switch (type) {
            case 'file':
                return {
                    id: id,
                    mediaItemType: type,
                    occurrenceKey: occurrenceKey,
                    collectionName: collection,
                };
            case 'link':
                return undefined;
            case 'external':
                return {
                    id: id,
                    mediaItemType: 'file',
                    occurrenceKey: occurrenceKey,
                    collectionName: collection,
                };
        }
    };
    return MediaGroup;
}(PureComponent));
export default MediaGroup;
//# sourceMappingURL=mediaGroup.js.map