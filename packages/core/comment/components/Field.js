import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { Anchor, Span } from '../styled/FieldStyles';

var CommentField =
/*#__PURE__*/
function (_Component) {
  _inherits(CommentField, _Component);

  function CommentField() {
    _classCallCheck(this, CommentField);

    return _possibleConstructorReturn(this, _getPrototypeOf(CommentField).apply(this, arguments));
  }

  _createClass(CommentField, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          hasAuthor = _this$props.hasAuthor,
          href = _this$props.href,
          onClick = _this$props.onClick,
          onFocus = _this$props.onFocus,
          onMouseOver = _this$props.onMouseOver;
      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return href ? React.createElement(Anchor, {
        href: href,
        hasAuthor: hasAuthor,
        onClick: onClick,
        onFocus: onFocus,
        onMouseOver: onMouseOver
      }, children) : React.createElement(Span, {
        hasAuthor: hasAuthor,
        onClick: onClick,
        onFocus: onFocus,
        onMouseOver: onMouseOver
      }, children);
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
  }]);

  return CommentField;
}(Component);

export { CommentField as default };