import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import GoToItem from '../GoToItem';
import PresentationalItem from '../../presentational/Item';

var ConnectedItem =
/*#__PURE__*/
function (_Component) {
  _inherits(ConnectedItem, _Component);

  function ConnectedItem() {
    _classCallCheck(this, ConnectedItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConnectedItem).apply(this, arguments));
  }

  _createClass(ConnectedItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          after = _this$props.after,
          props = _objectWithoutProperties(_this$props, ["after"]);

      return this.props.goTo ? React.createElement(GoToItem, _extends({}, props, {
        after: after
      })) : React.createElement(PresentationalItem, _extends({}, props, {
        after: after === null ? undefined : after
      }));
    }
  }]);

  return ConnectedItem;
}(Component);

export { ConnectedItem as default };