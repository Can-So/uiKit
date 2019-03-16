import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import Theme from './components/Theme'; // Pre-executes the theme and passes it as a prop to the supplied component.
// This is useful for ensuring that the current theme is accessible as props
// in styled-components.

export function withTheme(InnerComponent) {
  return function ComponentWithTheme(props) {
    return React.createElement(Theme.Consumer, null, function (tokens) {
      return React.createElement(InnerComponent, _extends({}, props, {
        theme: tokens
      }));
    });
  };
}