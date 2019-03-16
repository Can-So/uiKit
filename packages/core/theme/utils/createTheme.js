import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React, { createContext } from 'react';
export function createTheme(defaultThemeFn) {
  var emptyThemeFn = function emptyThemeFn(tokens, props) {
    return tokens(props);
  };

  var ThemeContext = createContext(defaultThemeFn);

  function Consumer(props) {
    var children = props.children,
        themeProps = _objectWithoutProperties(props, ["children"]);

    return React.createElement(ThemeContext.Consumer, null, function (theme) {
      var themeFn = theme || emptyThemeFn;
      return props.children(themeFn(themeProps));
    });
  }

  function Provider(props) {
    return React.createElement(ThemeContext.Consumer, null, function (themeFn) {
      var valueFn = props.value || emptyThemeFn;

      var mixedFn = function mixedFn(themeProps) {
        return valueFn(themeFn, themeProps);
      };

      return React.createElement(ThemeContext.Provider, {
        value: mixedFn
      }, props.children);
    });
  }

  return {
    Consumer: Consumer,
    Provider: Provider
  };
}