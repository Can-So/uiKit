import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import InitialLoadingElement from '../styled/InitialLoading';

var InitialLoading =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InitialLoading, _PureComponent);

  function InitialLoading() {
    _classCallCheck(this, InitialLoading);

    return _possibleConstructorReturn(this, _getPrototypeOf(InitialLoading).apply(this, arguments));
  }

  _createClass(InitialLoading, [{
    key: "render",
    value: function render() {
      return React.createElement(InitialLoadingElement, {
        "aria-live": "polite",
        role: "status"
      }, this.props.children);
    }
  }]);

  return InitialLoading;
}(PureComponent);

export { InitialLoading as default };