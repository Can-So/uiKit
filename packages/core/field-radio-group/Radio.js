import React from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import Radio from './RadioBase';
var RadioWithTheme = withTheme(Radio);
var emptyTheme = {};
export default function (props) {
  return React.createElement(ThemeProvider, {
    theme: emptyTheme
  }, React.createElement(RadioWithTheme, props));
}