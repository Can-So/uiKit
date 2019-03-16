import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Outer, TitleWrapper, StyledTitle, ActionsWrapper, BottomBarWrapper, TitleContainer } from './styled';

var PageHeader =
/*#__PURE__*/
function (_Component) {
  _inherits(PageHeader, _Component);

  function PageHeader() {
    _classCallCheck(this, PageHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(PageHeader).apply(this, arguments));
  }

  _createClass(PageHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          breadcrumbs = _this$props.breadcrumbs,
          actions = _this$props.actions,
          bottomBar = _this$props.bottomBar,
          children = _this$props.children,
          disableTitleStyles = _this$props.disableTitleStyles,
          truncateTitle = _this$props.truncateTitle;
      return React.createElement(Outer, null, breadcrumbs, React.createElement(TitleWrapper, {
        truncate: truncateTitle
      }, React.createElement(TitleContainer, {
        truncate: truncateTitle
      }, disableTitleStyles ? children : React.createElement(StyledTitle, {
        truncate: truncateTitle
      }, children)), React.createElement(ActionsWrapper, null, actions)), bottomBar && React.createElement(BottomBarWrapper, null, " ", bottomBar, " "));
    }
  }]);

  return PageHeader;
}(Component);

_defineProperty(PageHeader, "defaultProps", {
  disableTitleStyles: false,
  truncateTitle: false
});

export { PageHeader as default };