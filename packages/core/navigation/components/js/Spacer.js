import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import SpacerInner from '../styled/SpacerInner';

var Spacer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Spacer, _PureComponent);

  function Spacer() {
    _classCallCheck(this, Spacer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Spacer).apply(this, arguments));
  }

  _createClass(Spacer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          innerRef = _this$props.innerRef,
          onTransitionEnd = _this$props.onTransitionEnd,
          shouldAnimate = _this$props.shouldAnimate,
          width = _this$props.width;
      return React.createElement(SpacerInner, {
        innerRef: innerRef,
        onTransitionEnd: onTransitionEnd,
        shouldAnimate: shouldAnimate,
        style: {
          width: width
        }
      }, children);
    }
  }]);

  return Spacer;
}(PureComponent);

_defineProperty(Spacer, "defaultProps", {
  shouldAnimate: false,
  width: 0
});

export { Spacer as default };