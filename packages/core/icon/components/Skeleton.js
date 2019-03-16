import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import StyledSkeleton from '../styled/Skeleton';

var Skeleton =
/*#__PURE__*/
function (_Component) {
  _inherits(Skeleton, _Component);

  function Skeleton() {
    _classCallCheck(this, Skeleton);

    return _possibleConstructorReturn(this, _getPrototypeOf(Skeleton).apply(this, arguments));
  }

  _createClass(Skeleton, [{
    key: "render",
    value: function render() {
      return React.createElement(StyledSkeleton, this.props);
    }
  }]);

  return Skeleton;
}(Component);

_defineProperty(Skeleton, "defaultProps", {
  size: 'medium',
  weight: 'normal'
});

export { Skeleton as default };