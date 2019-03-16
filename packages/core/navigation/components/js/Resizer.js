import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components';
import rafSchedule from 'raf-schd';
import ResizerInner from '../styled/ResizerInner';
import ResizerButton from './ResizerButton';
import { globalOpenWidth, standardOpenWidth, resizerClickableWidth } from '../../shared-variables';
import { isElectronMac } from '../../theme/util';

var Resizer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Resizer, _PureComponent);

  function Resizer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Resizer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Resizer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      startScreenX: 0,
      isHovering: false,
      isResizing: false
    });

    _defineProperty(_assertThisInitialized(_this), "scheduleResize", rafSchedule(function (delta) {
      if (_this.state.isResizing && delta) {
        _this.props.onResize(delta);
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "resizerNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "mouseDownHandler", function (e) {
      e.preventDefault();

      if (!_this.resizerNode || e.target !== _this.resizerNode) {
        return;
      }

      if (_this.state.isResizing) {
        // eslint-disable-next-line no-console
        console.error('attempting to start a resize when another is occurring');
        return;
      }

      _this.setState({
        isResizing: true,
        startScreenX: e.screenX
      });

      _this.props.onResizeStart();

      window.addEventListener('mousemove', _this.mouseMoveHandler);
      window.addEventListener('mouseup', _this.mouseUpHandler);
      window.addEventListener('mouseout', _this.handleOutofBounds);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseUpHandler", function (e) {
      var outOfBounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      window.removeEventListener('mousemove', _this.mouseMoveHandler);
      window.removeEventListener('mouseup', _this.mouseUpHandler);
      window.removeEventListener('mouseout', _this.handleOutofBounds);

      _this.setState({
        isResizing: false
      });

      var screenX = outOfBounds ? // If we have gone out of bounds, reduce the nav width so the resizer is still visible
      e.screenX - 2 * resizerClickableWidth : e.screenX;
      var delta = screenX - _this.state.startScreenX;

      if (delta === 0) {
        _this.resizeButtonHandler(null, true);
      } // Perform one final resize before ending


      _this.props.onResize(delta);

      _this.props.onResizeEnd(delta);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseMoveHandler", function (e) {
      _this.scheduleResize(e.screenX - _this.state.startScreenX);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseEnterHandler", function () {
      _this.setState({
        isHovering: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "mouseLeaveHandler", function () {
      _this.setState({
        isHovering: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOutofBounds", function (e) {
      var toEl = e.relatedTarget;
      var disableResizeNodes = ['IFRAME', // Moving into an iframe
      'HTML', // Moving out of an iframe or root window - Safari
      null];

      if (_this.state.isResizing && disableResizeNodes.includes(toEl && toEl.nodeName)) {
        _this.mouseUpHandler(e, true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isElectronMac", function () {
      return isElectronMac(_this.props.theme);
    });

    _defineProperty(_assertThisInitialized(_this), "isPointingRight", function () {
      return _this.props.navigationWidth < standardOpenWidth(_this.isElectronMac());
    });

    _defineProperty(_assertThisInitialized(_this), "resizeButtonHandler", function (e) {
      var resizerClick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var isElectron = _this.isElectronMac();

      var _this$props = _this.props,
          navigationWidth = _this$props.navigationWidth,
          onResizeButton = _this$props.onResizeButton;
      var standardOpenWidthResult = standardOpenWidth(isElectron);
      var isExpanded = navigationWidth > standardOpenWidthResult;

      var isPointingRight = _this.isPointingRight();

      if (isPointingRight || isExpanded) {
        onResizeButton({
          isOpen: true,
          width: standardOpenWidthResult
        }, resizerClick);
      } else {
        onResizeButton({
          isOpen: false,
          width: globalOpenWidth(isElectron)
        }, resizerClick);
      }
    });

    return _this;
  }

  _createClass(Resizer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var resizerButton = this.props.showResizeButton ? React.createElement(ResizerButton, {
        isVisible: this.state.isHovering,
        isPointingRight: this.isPointingRight(),
        onClick: this.resizeButtonHandler
      }) : null;
      return React.createElement(ResizerInner, {
        innerRef: function innerRef(resizerNode) {
          _this2.resizerNode = resizerNode;
        },
        onMouseDown: this.mouseDownHandler,
        onMouseEnter: this.mouseEnterHandler,
        onMouseLeave: this.mouseLeaveHandler
      }, resizerButton);
    }
  }]);

  return Resizer;
}(PureComponent);

_defineProperty(Resizer, "defaultProps", {
  onResizeStart: function onResizeStart() {},
  onResizeEnd: function onResizeEnd() {},
  onResizeButton: function onResizeButton() {},
  onResize: function onResize() {},
  navigationWidth: standardOpenWidth(false),
  showResizeButton: true,
  theme: {}
});

export default withTheme(Resizer);