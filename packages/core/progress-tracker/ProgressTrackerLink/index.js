import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import { Link } from './styled';

var ProgressTrackerLink =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ProgressTrackerLink, _PureComponent);

  function ProgressTrackerLink() {
    _classCallCheck(this, ProgressTrackerLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProgressTrackerLink).apply(this, arguments));
  }

  _createClass(ProgressTrackerLink, [{
    key: "render",
    value: function render() {
      var _this$props$item = this.props.item,
          href = _this$props$item.href,
          onClick = _this$props$item.onClick,
          label = _this$props$item.label;
      return React.createElement(Link, {
        href: href,
        onClick: onClick
      }, label);
    }
  }]);

  return ProgressTrackerLink;
}(PureComponent);

export { ProgressTrackerLink as default };