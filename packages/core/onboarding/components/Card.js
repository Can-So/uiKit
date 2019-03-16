import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import { borderRadius, gridSize, layers, math, typography, createTheme } from '@atlaskit/theme';
import { ActionItems, ActionItem } from '../styled/Dialog';
var Container = styled.div.withConfig({
  displayName: "Card__Container",
  componentId: "sc-1vayiwt-0"
})(["\n  ", ";\n"], function (_ref) {
  var theme = _ref.theme;
  return theme;
});
var Body = styled.div.withConfig({
  displayName: "Card__Body",
  componentId: "sc-1vayiwt-1"
})(["\n  display: flex;\n  flex-direction: column;\n  padding: ", "px ", "px;\n"], math.multiply(gridSize, 2), math.multiply(gridSize, 2.5));
var Heading = styled.h4.withConfig({
  displayName: "Card__Heading",
  componentId: "sc-1vayiwt-2"
})(["\n  ", ";\n  color: inherit;\n"], typography.h600);
var DefaultHeader = styled.div.withConfig({
  displayName: "Card__DefaultHeader",
  componentId: "sc-1vayiwt-3"
})(["\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  padding-bottom: ", "px;\n"], gridSize);
var DefaultFooter = styled.div.withConfig({
  displayName: "Card__DefaultFooter",
  componentId: "sc-1vayiwt-4"
})(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: ", "px;\n"], gridSize);
var Theme = createTheme(function () {
  return {
    container: {
      overflow: 'auto',
      borderRadius: "".concat(borderRadius(), "px"),
      height: 'fit-content',
      zIndex: "".concat(layers.spotlight() + 1)
    }
  };
});

var Card = function Card(_ref2) {
  var _ref2$actions = _ref2.actions,
      actions = _ref2$actions === void 0 ? [] : _ref2$actions,
      actionsBeforeElement = _ref2.actionsBeforeElement,
      children = _ref2.children,
      _ref2$components = _ref2.components,
      components = _ref2$components === void 0 ? {} : _ref2$components,
      image = _ref2.image,
      heading = _ref2.heading,
      headingAfterElement = _ref2.headingAfterElement,
      theme = _ref2.theme,
      innerRef = _ref2.innerRef;
  var _components$Header = components.Header,
      Header = _components$Header === void 0 ? DefaultHeader : _components$Header,
      _components$Footer = components.Footer,
      Footer = _components$Footer === void 0 ? DefaultFooter : _components$Footer;
  return React.createElement(Theme.Provider, {
    value: theme
  }, React.createElement(Theme.Consumer, null, function (_ref3) {
    var container = _ref3.container;
    return React.createElement(Container, {
      theme: container,
      innerRef: innerRef
    }, typeof image === 'string' ? React.createElement("img", {
      src: image,
      alt: ""
    }) : image, React.createElement(Body, null, heading || headingAfterElement ? React.createElement(Header, null, React.createElement(Heading, null, heading), headingAfterElement || React.createElement("span", null)) : null, children, actions.length > 0 || actionsBeforeElement ? React.createElement(Footer, null, actionsBeforeElement || React.createElement("span", null), React.createElement(ActionItems, null, actions.map(function (_ref4, idx) {
      var text = _ref4.text,
          key = _ref4.key,
          rest = _objectWithoutProperties(_ref4, ["text", "key"]);

      return React.createElement(ActionItem, {
        key: key || (typeof text === 'string' ? text : "".concat(idx))
      }, React.createElement(Button, rest, text));
    }))) : null));
  }));
}; // $FlowFixMe - flow doesn't know about forwardRef


export default React.forwardRef(function (props, ref) {
  return React.createElement(Card, _extends({}, props, {
    innerRef: ref
  }));
});