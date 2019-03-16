import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import ResizerButtonInner from '../styled/ResizerButtonInner';

var ResizerButton =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ResizerButton, _PureComponent);

  function ResizerButton() {
    _classCallCheck(this, ResizerButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(ResizerButton).apply(this, arguments));
  }

  _createClass(ResizerButton, [{
    key: "render",
    // Note: we always render the ResizerButtonInner here (instead of returning null immediately
    // when isVisible = false) because we want the user to be able to tab to the button always.
    value: function render() {
      return React.createElement(ResizerButtonInner, {
        "aria-expanded": !this.props.isPointingRight,
        isPointingRight: this.props.isPointingRight,
        onClick: this.props.onClick,
        isVisible: this.props.isVisible,
        onMouseDown: function onMouseDown(e) {
          return e.preventDefault();
        }
      });
    }
  }]);

  return ResizerButton;
}(PureComponent);

_defineProperty(ResizerButton, "defaultProps", {
  isPointingRight: false,
  isVisible: false
});

export { ResizerButton as default };