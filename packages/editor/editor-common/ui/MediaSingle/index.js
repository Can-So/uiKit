import * as React from 'react';
import Wrapper from './styled';
import * as classnames from 'classnames';
import { calcPxFromPct, layoutSupportsWidth } from './grid';
export var DEFAULT_IMAGE_WIDTH = 250;
export var DEFAULT_IMAGE_HEIGHT = 200;
export default function MediaSingle(_a) {
    var children = _a.children, layout = _a.layout, width = _a.width, height = _a.height, _b = _a.containerWidth, containerWidth = _b === void 0 ? width : _b, _c = _a.isLoading, isLoading = _c === void 0 ? false : _c, pctWidth = _a.pctWidth, lineLength = _a.lineLength, className = _a.className;
    var usePctWidth = pctWidth && layoutSupportsWidth(layout);
    if (pctWidth && usePctWidth) {
        var pxWidth = Math.ceil(calcPxFromPct(pctWidth / 100, lineLength || containerWidth));
        // scale, keeping aspect ratio
        height = (height / width) * pxWidth;
        width = pxWidth;
    }
    return (React.createElement(Wrapper, { layout: layout, width: width, height: height, containerWidth: containerWidth, pctWidth: pctWidth, className: classnames('media-single', "image-" + layout, className, {
            'is-loading': isLoading,
            'media-wrapped': layout === 'wrap-left' || layout === 'wrap-right',
        }) }, React.Children.only(children)));
}
//# sourceMappingURL=index.js.map