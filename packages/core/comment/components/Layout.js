import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { AvatarSectionDiv, Container, ContentSectionDiv, Highlight, NestedCommentsDiv } from '../styled/LayoutStyles';

var Layout =
/*#__PURE__*/
function (_Component) {
  _inherits(Layout, _Component);

  function Layout() {
    _classCallCheck(this, Layout);

    return _possibleConstructorReturn(this, _getPrototypeOf(Layout).apply(this, arguments));
  }

  _createClass(Layout, [{
    key: "renderAvatar",
    value: function renderAvatar() {
      var avatar = this.props.avatar;
      return avatar ? React.createElement(AvatarSectionDiv, null, avatar) : null;
    }
  }, {
    key: "renderNestedComments",
    value: function renderNestedComments() {
      var children = this.props.children;
      return children ? React.createElement(NestedCommentsDiv, null, children) : null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          content = _this$props.content,
          highlighted = _this$props.highlighted,
          id = _this$props.id;
      return React.createElement(Container, {
        id: id
      }, this.renderAvatar(), React.createElement(ContentSectionDiv, null, content), this.renderNestedComments(), highlighted && React.createElement(Highlight, null));
    }
  }]);

  return Layout;
}(Component);

export { Layout as default };