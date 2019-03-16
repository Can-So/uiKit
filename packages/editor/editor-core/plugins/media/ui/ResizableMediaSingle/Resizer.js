import * as tslib_1 from "tslib";
import * as React from 'react';
import * as classnames from 'classnames';
import Resizable from 're-resizable';
import { gridTypeForLayout } from '../../../grid';
import { snapTo, handleSides } from './utils';
var Resizer = /** @class */ (function (_super) {
    tslib_1.__extends(Resizer, _super);
    function Resizer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isResizing: false,
        };
        _this.handleResizeStart = function (event) {
            // prevent creating a drag event on Firefox
            event.preventDefault();
            _this.setState({ isResizing: true }, function () {
                _this.props.displayGrid(true, gridTypeForLayout(_this.props.layout), _this.props.highlights(_this.props.width, _this.props.snapPoints));
            });
        };
        _this.handleResize = function (event, direction, elementRef, delta) {
            var resizable = _this.resizable.current;
            if (!resizable || !resizable.state.original) {
                return;
            }
            var newWidth = Math.max(resizable.state.original.width +
                delta.width * (_this.props.scaleFactor || 1), _this.props.snapPoints[0]);
            var newSize = _this.props.calcNewSize(newWidth, false);
            if (newSize.layout !== _this.props.layout) {
                _this.props.updateSize(newSize.width, newSize.layout);
            }
            _this.props.displayGrid(true, gridTypeForLayout(newSize.layout), _this.props.highlights(newWidth, _this.props.snapPoints));
            resizable.updateSize({ width: newWidth, height: 'auto' });
        };
        _this.handleResizeStop = function (event, direction, refToElement, delta) {
            var resizable = _this.resizable.current;
            if (!resizable || !resizable.state.original) {
                return;
            }
            var newWidth = Math.max(resizable.state.original.width + delta.width, _this.props.snapPoints[0]);
            var snapWidth = snapTo(newWidth, _this.props.snapPoints);
            var newSize = _this.props.calcNewSize(snapWidth, true);
            // show committed grid size
            _this.props.displayGrid(true, gridTypeForLayout(newSize.layout), _this.props.highlights(newWidth, _this.props.snapPoints));
            _this.setState({ isResizing: false }, function () {
                _this.props.updateSize(newSize.width, newSize.layout);
                _this.props.displayGrid(false, gridTypeForLayout(_this.props.layout));
            });
        };
        _this.resizable = React.createRef();
        return _this;
    }
    Resizer.prototype.render = function () {
        var handleStyles = {};
        var handles = {};
        handleSides.forEach(function (side) {
            var _a;
            handles[side] = "mediaSingle-resize-handle-" + side;
            handleStyles[side] = (_a = {
                    width: '24px'
                },
                _a[side] = '-13px',
                _a.zIndex = 99,
                _a);
        });
        // Ideally, Resizable would let you pass in the component rather than
        // the div. For now, we just apply the same styles using CSS
        return (React.createElement(Resizable, { ref: this.resizable, onResize: this.handleResize, size: {
                width: this.props.width,
            }, className: classnames('media-single', "image-" + this.props.layout, this.props.className, {
                'is-resizing': this.state.isResizing,
                'not-resized': !this.props.pctWidth,
                'mediaSingle-selected': this.props.selected,
                'media-wrapped': this.props.layout === 'wrap-left' ||
                    this.props.layout === 'wrap-right',
            }), handleWrapperClass: 'mediaSingle-resize-wrapper', handleClasses: handles, handleStyles: handleStyles, enable: this.props.enable, onResizeStop: this.handleResizeStop, onResizeStart: this.handleResizeStart }, this.props.children));
    };
    return Resizer;
}(React.Component));
export default Resizer;
//# sourceMappingURL=Resizer.js.map