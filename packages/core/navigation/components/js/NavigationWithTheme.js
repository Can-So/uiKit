import React from 'react';
import { withTheme, ThemeProvider } from 'styled-components';
import Navigation from './Navigation';
var NavigationWithTheme = withTheme(Navigation);
var emptyTheme = {};
export default function (props) {
  return React.createElement(ThemeProvider, {
    theme: emptyTheme
  }, React.createElement(NavigationWithTheme, props));
}