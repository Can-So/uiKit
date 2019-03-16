import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { TabPane } from '../styled';

var TabContent =
/*#__PURE__*/
function (_Component) {
  _inherits(TabContent, _Component);

  function TabContent() {
    _classCallCheck(this, TabContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(TabContent).apply(this, arguments));
  }

  _createClass(TabContent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          elementProps = _this$props.elementProps;
      return React.createElement(TabPane, elementProps, data.content);
    }
  }]);

  return TabContent;
}(Component);

_defineProperty(TabContent, "defaultProps", {
  data: {},
  elementProps: {}
});

export { TabContent as default };