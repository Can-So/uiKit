import * as tslib_1 from "tslib";
import * as React from 'react';
import rafSchedule from 'raf-schd';
var containerDivStyle = {
    width: '100%',
    position: 'relative',
};
// Not using styled-components here for performance
// and framework-agnostic reasons.
var sizerStyle = {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    height: 0,
    width: '100%',
    opacity: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: -1,
};
var WidthDetector = /** @class */ (function (_super) {
    tslib_1.__extends(WidthDetector, _super);
    function WidthDetector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {};
        _this.handleResize = rafSchedule(function () {
            var container = _this.container;
            if (!container) {
                return;
            }
            var width = container.offsetWidth;
            _this.setState({
                width: width,
            });
            if (_this.props.onResize) {
                _this.props.onResize(width);
            }
        });
        _this.handleContainerRef = function (ref) {
            if (!ref) {
                return;
            }
            _this.container = ref;
        };
        _this.handleObjectRef = function (ref) {
            if (!ref) {
                return;
            }
            _this.resizeObject = ref;
        };
        _this.handleObjectLoad = function () {
            if (!_this.resizeObject) {
                return;
            }
            _this.resizeObjectDocument = _this.resizeObject.contentDocument
                .defaultView;
            _this.resizeObjectDocument.addEventListener('resize', _this.handleResize);
        };
        return _this;
    }
    WidthDetector.prototype.componentDidMount = function () {
        if (this.resizeObject) {
            this.resizeObject.data = 'about:blank';
        }
        // Calculate width first time, after object has loaded.
        // Prevents it from getting in a weird state where width is always 0.
        this.handleResize();
    };
    WidthDetector.prototype.componentWillUnmount = function () {
        this.handleResize.cancel();
        if (this.resizeObjectDocument) {
            this.resizeObjectDocument.removeEventListener('resize', this.handleResize);
        }
    };
    WidthDetector.prototype.render = function () {
        // @TODO: Add alternative method using IntersectionObserver or ResizeObserver
        var sizerEl = (React.createElement("object", { type: "text/html", style: sizerStyle, ref: this.handleObjectRef, onLoad: this.handleObjectLoad, "aria-hidden": true, tabIndex: -1 }));
        // pluck non-DOM props off the props so we can safely spread remaining items
        var _a = this.props, containerStyle = _a.containerStyle, onResize = _a.onResize, children = _a.children, props = tslib_1.__rest(_a, ["containerStyle", "onResize", "children"]);
        return (React.createElement("div", tslib_1.__assign({}, props, { style: tslib_1.__assign({}, containerDivStyle, containerStyle), ref: this.handleContainerRef }),
            children(this.state.width),
            sizerEl));
    };
    WidthDetector.defaultProps = {
        containerStyle: {},
    };
    return WidthDetector;
}(React.Component));
export default WidthDetector;
//# sourceMappingURL=WidthDetector.js.map