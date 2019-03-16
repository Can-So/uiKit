import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import NothingWasFoundElement from '../styled/NothingWasFound';

var NothingWasFound =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(NothingWasFound, _PureComponent);

  function NothingWasFound() {
    _classCallCheck(this, NothingWasFound);

    return _possibleConstructorReturn(this, _getPrototypeOf(NothingWasFound).apply(this, arguments));
  }

  _createClass(NothingWasFound, [{
    key: "render",
    value: function render() {
      return React.createElement(NothingWasFoundElement, null, this.props.noMatchesFound);
    }
  }]);

  return NothingWasFound;
}(PureComponent);

export { NothingWasFound as default };