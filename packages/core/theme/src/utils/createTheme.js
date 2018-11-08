// @flow

import React, { createContext, type ComponentType, type Node } from 'react';

export default function createTheme<ThemeTokens, ThemeProps>(
  themeDefault: ThemeProps => ThemeTokens,
): {
  ThemeContext: {
    Consumer: ComponentType<{
      children: ((ThemeTokens, ThemeProps) => ThemeTokens) => Node,
    }>,
    Provider: ComponentType<{
      value: (ThemeTokens, ThemeProps) => ThemeTokens,
    }>,
  },
  Theme: ComponentType<{
    children: ThemeTokens => Node,
    props: ThemeProps,
    theme?: (ThemeTokens, ThemeProps) => ThemeTokens,
  }>,
} {
  const thru: (ThemeTokens, ThemeProps) => ThemeTokens = tokens => tokens;
  const ThemeContext = createContext(thru);
  return {
    ThemeContext,
    Theme(componentProps: {
      children: ThemeTokens => Node,
      props: ThemeProps,
      theme?: (ThemeTokens, ThemeProps) => ThemeTokens,
    }) {
      const { children, props: themeProps, theme = thru } = componentProps;
      return (
        <ThemeContext.Consumer>
          {themeContext => {
            const tokensDefault = themeDefault(themeProps);
            const tokensContext = themeContext(tokensDefault, themeProps);
            return children(theme(tokensContext, themeProps));
          }}
        </ThemeContext.Consumer>
      );
    },
  };
}
