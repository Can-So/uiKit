import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { Popup } from '@atlaskit/editor-common';
import { Container } from './styles';
export { handlePositionCalculatedWith, getOffsetParent, getNearestNonTextNode, } from './utils';
var FloatingToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(FloatingToolbar, _super);
    function FloatingToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FloatingToolbar.prototype.render = function () {
        var _a = this.props, containerRef = _a.containerRef, children = _a.children, target = _a.target, offset = _a.offset, fitWidth = _a.fitWidth, _b = _a.fitHeight, fitHeight = _b === void 0 ? 40 : _b, onPositionCalculated = _a.onPositionCalculated, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, className = _a.className, alignX = _a.alignX, alignY = _a.alignY, zIndex = _a.zIndex;
        if (!target) {
            return null;
        }
        return (React.createElement(Popup, { alignX: alignX, alignY: alignY, target: target, zIndex: zIndex, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, offset: offset, fitWidth: fitWidth, fitHeight: fitHeight, onPositionCalculated: onPositionCalculated },
            React.createElement(Container, { height: fitHeight, className: className, innerRef: containerRef }, children)));
    };
    return FloatingToolbar;
}(PureComponent));
export default FloatingToolbar;
//# sourceMappingURL=index.js.map