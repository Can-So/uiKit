import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { Container } from './styled';

var TagGroup =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TagGroup, _PureComponent);

  function TagGroup() {
    _classCallCheck(this, TagGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(TagGroup).apply(this, arguments));
  }

  _createClass(TagGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          alignment = _this$props.alignment,
          children = _this$props.children;
      return React.createElement(Container, {
        justify: alignment
      }, children);
    }
  }]);

  return TagGroup;
}(PureComponent);

_defineProperty(TagGroup, "defaultProps", {
  alignment: 'start'
});

export { TagGroup as default };