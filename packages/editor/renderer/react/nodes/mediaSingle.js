import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { MediaSingle as UIMediaSingle, WidthConsumer, akEditorFullPageMaxWidth, mapBreakpointToLayoutMaxWidth, } from '@findable/editor-common';
import { FullPagePadding } from '../../ui/Renderer/style';
var DEFAULT_WIDTH = 250;
var DEFAULT_HEIGHT = 200;
var ExtendedUIMediaSingle = styled(UIMediaSingle)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", " transition: all 0.1s linear;\n"], ["\n  ",
    " transition: all 0.1s linear;\n"])), function (_a) {
    var layout = _a.layout;
    return layout === 'full-width' || layout === 'wide'
        ? "\n  margin-left: 50%;\n  transform: translateX(-50%);\n  "
        : "";
});
var MediaSingle = /** @class */ (function (_super) {
    tslib_1.__extends(MediaSingle, _super);
    function MediaSingle(props) {
        var _this = _super.call(this, props) || this;
        _this.onExternalImageLoaded = function (_a) {
            var width = _a.width, height = _a.height;
            _this.setState({
                width: width,
                height: height,
            });
        };
        _this.state = {}; // Need to initialize with empty state.
        return _this;
    }
    MediaSingle.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var child = React.Children.only(React.Children.toArray(props.children)[0]);
        var _a = child.props, width = _a.width, height = _a.height, type = _a.type;
        if (type === 'external') {
            var _b = this.state, stateWidth = _b.width, stateHeight = _b.height;
            if (width === null) {
                width = stateWidth || DEFAULT_WIDTH;
            }
            if (height === null) {
                height = stateHeight || DEFAULT_HEIGHT;
            }
        }
        if (width === null) {
            width = DEFAULT_WIDTH;
            height = DEFAULT_HEIGHT;
        }
        // TODO: put appearance-based padding into theme instead
        var padding = this.props.rendererAppearance === 'full-page' ? FullPagePadding * 2 : 0;
        return (React.createElement(WidthConsumer, null, function (_a) {
            var containerWidth = _a.width, breakpoint = _a.breakpoint;
            var cardWidth = containerWidth;
            var cardHeight = (height / width) * cardWidth;
            var cardDimensions = {
                width: cardWidth + "px",
                height: cardHeight + "px",
            };
            return (React.createElement(ExtendedUIMediaSingle, { layout: props.layout, width: width, height: height, containerWidth: containerWidth, lineLength: containerWidth - padding >= akEditorFullPageMaxWidth
                    ? _this.props.allowDynamicTextSizing
                        ? mapBreakpointToLayoutMaxWidth(breakpoint)
                        : akEditorFullPageMaxWidth
                    : containerWidth - padding, pctWidth: props.width }, React.cloneElement(child, {
                resizeMode: 'stretchy-fit',
                cardDimensions: cardDimensions,
                onExternalImageLoaded: _this.onExternalImageLoaded,
                disableOverlay: true,
            })));
        }));
    };
    return MediaSingle;
}(Component));
export default MediaSingle;
var templateObject_1;
//# sourceMappingURL=mediaSingle.js.map