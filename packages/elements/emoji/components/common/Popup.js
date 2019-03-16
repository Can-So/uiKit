import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
var getTargetNode = function (target) {
    if (typeof target === 'string') {
        return document.querySelector(target);
    }
    // Expect to be an element
    return target;
};
/*
 * Simple implementation of popup while waiting for ak-inline-dialog
 */
var Popup = /** @class */ (function (_super) {
    tslib_1.__extends(Popup, _super);
    function Popup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.debounced = null;
        _this.handleResize = function () {
            if (_this.debounced) {
                clearTimeout(_this.debounced);
                _this.debounced = null;
            }
            // Timeout set to 30ms as to not throttle IE11
            _this.debounced = window.setTimeout(function () {
                _this.applyAbsolutePosition();
                _this.debounced = null;
            }, 30);
        };
        return _this;
    }
    Popup.prototype.componentDidMount = function () {
        this.popup = document.createElement('div');
        document.body.appendChild(this.popup);
        this.popup.style.position = 'absolute';
        window.addEventListener('resize', this.handleResize);
        this.applyAbsolutePosition();
        this.renderContent();
    };
    Popup.prototype.componentDidUpdate = function () {
        this.applyAbsolutePosition();
        this.renderContent();
    };
    Popup.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.handleResize);
        if (this.popup) {
            ReactDOM.unmountComponentAtNode(this.popup);
            document.body.removeChild(this.popup);
        }
    };
    // Internal
    Popup.prototype.applyBelowPosition = function () {
        var targetNode = getTargetNode(this.props.target);
        if (targetNode && this.popup) {
            var box = targetNode.getBoundingClientRect();
            var top_1 = box.bottom + (this.props.offsetY || 0);
            var left = box.left + (this.props.offsetX || 0);
            this.popup.style.top = top_1 + "px";
            this.popup.style.bottom = '';
            this.popup.style.left = left + "px";
        }
    };
    Popup.prototype.applyAbovePosition = function () {
        var targetNode = getTargetNode(this.props.target);
        if (targetNode && this.popup) {
            var box = targetNode.getBoundingClientRect();
            var bottom = window.innerHeight - box.top + (this.props.offsetY || 0);
            var left = box.left + (this.props.offsetX || 0);
            this.popup.style.top = '';
            this.popup.style.bottom = bottom + "px";
            this.popup.style.left = left + "px";
        }
    };
    Popup.prototype.applyAbsolutePosition = function () {
        if (this.props.relativePosition === 'above') {
            this.applyAbovePosition();
        }
        else if (this.props.relativePosition === 'below') {
            this.applyBelowPosition();
        }
        else {
            var targetNode = getTargetNode(this.props.target);
            if (targetNode) {
                var box = targetNode.getBoundingClientRect();
                var viewPortHeight = window.innerHeight;
                if (box.top < viewPortHeight / 2) {
                    this.applyBelowPosition();
                }
                else {
                    this.applyAbovePosition();
                }
            }
        }
        if (this.props.zIndex && this.popup) {
            this.popup.style.zIndex = "" + this.props.zIndex;
        }
    };
    Popup.prototype.renderContent = function () {
        if (this.popup) {
            ReactDOM.render(this.props.children, this.popup);
        }
    };
    Popup.prototype.render = function () {
        // inline placeholder element for react to render inplace
        return React.createElement("div", null);
    };
    Popup.defaultProps = {
        relativePosition: 'auto',
        offsetX: 0,
        offsetY: 0,
        zIndex: 0,
    };
    return Popup;
}(PureComponent));
export default Popup;
//# sourceMappingURL=Popup.js.map