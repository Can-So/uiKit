import * as tslib_1 from "tslib";
import * as React from 'react';
import { createPortal } from 'react-dom';
import rafSchedule from 'raf-schd';
import { akEditorFloatingPanelZIndex } from '../../styles';
import { calculatePosition, calculatePlacement, findOverflowScrollParent, } from './utils';
var Popup = /** @class */ (function (_super) {
    tslib_1.__extends(Popup, _super);
    function Popup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            overflowScrollParent: false,
        };
        _this.placement = ['', ''];
        _this.handleRef = function (popup) {
            if (!popup) {
                return;
            }
            _this.initPopup(popup);
        };
        _this.scheduledUpdatePosition = rafSchedule(function (props) {
            return _this.updatePosition(props);
        });
        _this.onResize = function () { return _this.scheduledUpdatePosition(); };
        return _this;
    }
    /**
     * Calculates new popup position
     */
    Popup.prototype.updatePosition = function (props, state) {
        if (props === void 0) { props = this.props; }
        if (state === void 0) { state = this.state; }
        var target = props.target, fitHeight = props.fitHeight, fitWidth = props.fitWidth, boundariesElement = props.boundariesElement, offset = props.offset, onPositionCalculated = props.onPositionCalculated, onPlacementChanged = props.onPlacementChanged, alignX = props.alignX, alignY = props.alignY, stick = props.stick, forcePlacement = props.forcePlacement;
        var popup = state.popup;
        if (!target || !popup) {
            return;
        }
        var placement = calculatePlacement(target, boundariesElement || document.body, fitWidth, fitHeight, alignX, alignY, forcePlacement);
        if (onPlacementChanged && this.placement.join('') !== placement.join('')) {
            onPlacementChanged(placement);
            this.placement = placement;
        }
        var position = calculatePosition({
            placement: placement,
            popup: popup,
            target: target,
            stick: stick,
            offset: offset,
        });
        position = onPositionCalculated ? onPositionCalculated(position) : position;
        this.setState({ position: position });
    };
    Popup.prototype.cannotSetPopup = function (popup, target, overflowScrollParent) {
        /**
         * Check whether:
         * 1. Popup's offset targets which means whether or not its possible to correctly position popup along with given target.
         * 2. Popup is inside "overflow: scroll" container, but its offset parent isn't.
         *
         * Currently Popup isn't capable of position itself correctly in case 2,
         * Add "position: relative" to "overflow: scroll" container or to some other FloatingPanel wrapper inside it.
         */
        return (!target ||
            (document.body.contains(target) &&
                (popup.offsetParent && !popup.offsetParent.contains(target))) ||
            (overflowScrollParent &&
                !overflowScrollParent.contains(popup.offsetParent)));
    };
    /**
     * Popup initialization.
     * Checks whether it's possible to position popup along given target, and if it's not throws an error.
     */
    Popup.prototype.initPopup = function (popup) {
        var target = this.props.target;
        var overflowScrollParent = findOverflowScrollParent(popup);
        if (this.cannotSetPopup(popup, target, overflowScrollParent)) {
            return;
        }
        this.setState({ popup: popup, overflowScrollParent: overflowScrollParent }, this.scheduledUpdatePosition);
    };
    Popup.prototype.componentWillReceiveProps = function (newProps) {
        // We are delaying `updatePosition` otherwise it happens before the children
        // get rendered and we end up with a wrong position
        this.scheduledUpdatePosition(newProps);
    };
    Popup.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.onResize);
        var stick = this.props.stick;
        if (stick) {
            this.scrollElement = findOverflowScrollParent(this.props.target);
        }
        else {
            this.scrollElement = this.props.scrollableElement;
        }
        if (this.scrollElement) {
            this.scrollElement.addEventListener('scroll', this.onResize);
        }
    };
    Popup.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.onResize);
        if (this.scrollElement) {
            this.scrollElement.removeEventListener('scroll', this.onResize);
        }
        this.scheduledUpdatePosition.cancel();
    };
    Popup.prototype.renderPopup = function () {
        var position = this.state.position;
        return (React.createElement("div", { ref: this.handleRef, style: tslib_1.__assign({ position: 'absolute', zIndex: this.props.zIndex || akEditorFloatingPanelZIndex }, position), "aria-label": this.props.ariaLabel || 'Popup', "data-editor-popup": true }, this.props.children));
    };
    Popup.prototype.render = function () {
        if (!this.props.target) {
            return null;
        }
        if (this.props.mountTo) {
            return createPortal(this.renderPopup(), this.props.mountTo);
        }
        // Without mountTo property renders popup as is,
        // which means it will be cropped by "overflow: hidden" container.
        return this.renderPopup();
    };
    Popup.defaultProps = {
        offset: [0, 0],
    };
    return Popup;
}(React.Component));
export default Popup;
//# sourceMappingURL=index.js.map