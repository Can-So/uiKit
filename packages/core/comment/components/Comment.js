import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import CommentLayout from './Layout';
import HeaderItems from './Header';
import FooterItems from './Footer';
import { Content } from '../styled/CommentStyles';

var Comment =
/*#__PURE__*/
function (_Component) {
  _inherits(Comment, _Component);

  function Comment() {
    _classCallCheck(this, Comment);

    return _possibleConstructorReturn(this, _getPrototypeOf(Comment).apply(this, arguments));
  }

  _createClass(Comment, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          actions = _this$props.actions,
          author = _this$props.author,
          avatar = _this$props.avatar,
          children = _this$props.children,
          content = _this$props.content,
          edited = _this$props.edited,
          errorActions = _this$props.errorActions,
          errorIconLabel = _this$props.errorIconLabel,
          highlighted = _this$props.highlighted,
          isError = _this$props.isError,
          isSaving = _this$props.isSaving,
          restrictedTo = _this$props.restrictedTo,
          savingText = _this$props.savingText,
          time = _this$props.time,
          type = _this$props.type,
          id = _this$props.id;
      var headerProps = {
        author: author,
        edited: edited,
        isError: isError,
        isSaving: isSaving,
        restrictedTo: restrictedTo,
        savingText: savingText,
        time: time,
        type: type
      };
      var footerProps = {
        actions: actions,
        errorActions: errorActions,
        errorIconLabel: errorIconLabel,
        isError: isError,
        isSaving: isSaving
      };
      var layoutContent = React.createElement("div", null, React.createElement(HeaderItems, headerProps), React.createElement(Content, {
        isDisabled: isSaving || isError
      }, content), React.createElement(FooterItems, footerProps));
      return React.createElement(CommentLayout, {
        id: id,
        avatar: avatar,
        content: layoutContent,
        highlighted: highlighted
      }, children);
    }
  }]);

  return Comment;
}(Component);

_defineProperty(Comment, "defaultProps", {
  actions: [],
  restrictedTo: '',
  highlighted: false,
  isSaving: false,
  savingText: 'Sending...',
  isError: false,
  errorActions: [],
  errorIconLabel: ''
});

export { Comment as default };