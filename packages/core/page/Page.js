import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
var Wrapper = styled.div.withConfig({
  displayName: "Page__Wrapper",
  componentId: "oj2x06-0"
})(["\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  width: 100%;\n"]);
var NavigationAndContent = styled.div.withConfig({
  displayName: "Page__NavigationAndContent",
  componentId: "oj2x06-1"
})(["\n  display: flex;\n  flex: 1 1 auto;\n"]);
var BannerContainer = styled.div.withConfig({
  displayName: "Page__BannerContainer",
  componentId: "oj2x06-2"
})(["\n  flex: 1 0 auto;\n  transition: height 0.25s ease-in-out;\n  height: ", "px;\n  position: relative;\n  width: 100%;\n  z-index: 3;\n"], function (props) {
  return props.isBannerOpen ? props.bannerHeight : 0;
});
var Banner = styled.div.withConfig({
  displayName: "Page__Banner",
  componentId: "oj2x06-3"
})(["\n  position: fixed;\n  width: 100%;\n"]);
var Navigation = styled.div.withConfig({
  displayName: "Page__Navigation",
  componentId: "oj2x06-4"
})(["\n  position: relative;\n  z-index: 2;\n"]);
var PageContent = styled.div.withConfig({
  displayName: "Page__PageContent",
  componentId: "oj2x06-5"
})(["\n  flex: 1 1 auto;\n  position: relative;\n  z-index: 1;\n  min-width: 0;\n"]);
var emptyTheme = {};

var Page =
/*#__PURE__*/
function (_Component) {
  _inherits(Page, _Component);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, _getPrototypeOf(Page).apply(this, arguments));
  }

  _createClass(Page, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isBannerOpen = _this$props.isBannerOpen,
          banner = _this$props.banner,
          navigation = _this$props.navigation,
          children = _this$props.children,
          bannerHeight = _this$props.bannerHeight;
      return React.createElement(ThemeProvider, {
        theme: emptyTheme
      }, React.createElement(Wrapper, null, this.props.banner ? React.createElement(BannerContainer, {
        "aria-hidden": isBannerOpen,
        isBannerOpen: isBannerOpen,
        bannerHeight: bannerHeight
      }, React.createElement(Banner, null, banner)) : null, React.createElement(NavigationAndContent, null, React.createElement(Navigation, null, navigation), React.createElement(PageContent, null, children))));
    }
  }]);

  return Page;
}(Component);

_defineProperty(Page, "displayName", 'AkPage');

_defineProperty(Page, "defaultProps", {
  isBannerOpen: false,
  bannerHeight: 52
});

export { Page as default };