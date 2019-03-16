import * as tslib_1 from "tslib";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/*
 * Simple implementation of popup while waiting for ak-inline-dialog
 */
var Popup = /** @class */ (function (_super) {
    tslib_1.__extends(Popup, _super);
    function Popup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popup.prototype.componentDidMount = function () {
        this.popup = document.createElement('div');
        document.body.appendChild(this.popup);
        this.popup.style.position = 'absolute';
        this._applyAbsolutePosition();
        this._renderContent();
    };
    Popup.prototype.componentDidUpdate = function () {
        this._renderContent();
    };
    Popup.prototype.componentWillUnmount = function () {
        if (this.popup) {
            ReactDOM.unmountComponentAtNode(this.popup);
            document.body.removeChild(this.popup);
        }
    };
    Popup.prototype._applyBelowPosition = function () {
        var targetNode = this.props.target && document.getElementById(this.props.target);
        if (targetNode) {
            var box = targetNode.getBoundingClientRect();
            var top_1 = box.bottom + (this.props.offsetY || 0);
            var left = box.left + (this.props.offsetX || 0);
            if (this.popup) {
                this.popup.style.top = top_1 + "px";
                this.popup.style.bottom = '';
                this.popup.style.left = left + "px";
            }
        }
    };
    Popup.prototype._applyAbovePosition = function () {
        var targetNode = this.props.target && document.getElementById(this.props.target);
        if (targetNode) {
            var box = targetNode.getBoundingClientRect();
            var bottom = window.innerHeight - box.top + (this.props.offsetY || 0);
            var left = box.left + (this.props.offsetX || 0);
            if (this.popup) {
                this.popup.style.top = '';
                this.popup.style.bottom = bottom + "px";
                this.popup.style.left = left + "px";
            }
        }
    };
    Popup.prototype._applyAbsolutePosition = function () {
        if (this.props.relativePosition === 'above') {
            this._applyAbovePosition();
        }
        else if (this.props.relativePosition === 'below') {
            this._applyBelowPosition();
        }
        else {
            var targetNode = this.props.target && document.getElementById(this.props.target);
            if (targetNode) {
                var box = targetNode.getBoundingClientRect();
                var viewPortHeight = window.innerHeight;
                if (box.top < viewPortHeight / 2) {
                    this._applyBelowPosition();
                }
                else {
                    this._applyAbovePosition();
                }
            }
        }
        if (this.props.zIndex && this.popup) {
            this.popup.style.zIndex = "" + this.props.zIndex;
        }
    };
    Popup.prototype._renderContent = function () {
        if (this.popup) {
            ReactDOM.render(this.props.children, this.popup);
        }
    };
    Popup.prototype.render = function () {
        // Placeholder element for react to render inplace
        return React.createElement("div", null);
    };
    Popup.defaultProps = {
        relativePosition: 'auto',
        offsetX: 0,
        offsetY: 0,
        zIndex: 0,
    };
    return Popup;
}(React.PureComponent));
export default Popup;
//# sourceMappingURL=index.js.map