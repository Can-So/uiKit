// @flow

import React, { createContext, type ComponentType, type Node } from 'react';

export default function createTheme<ThemeTokens, ThemeProps>(
  themeDefault: ThemeProps => ThemeTokens,
): {
  Consumer: ComponentType<{
    children: ThemeTokens => Node,
    props?: ThemeProps,
    theme?: (ThemeTokens, ThemeProps) => ThemeTokens,
  }>,
  Provider: ComponentType<{
    children: *,
    theme?: (ThemeTokens, ThemeProps) => ThemeTokens,
  }>,
} {
  const emptyPropsObj: $Shape<ThemeProps> = {};
  const emptyTokenObj: $Shape<ThemeTokens> = {};
  const emptyThemeDefaultFn: ThemeProps => ThemeTokens = () => emptyTokenObj;
  const emptyThemeFn: (ThemeTokens, ThemeProps) => ThemeTokens = tokens =>
    tokens;
  const ThemeContext = createContext(emptyThemeFn);

  function Consumer(props: {
    children: ThemeTokens => Node,
    props?: ThemeProps,
    theme?: (ThemeTokens, ThemeProps) => ThemeTokens,
  }) {
    return (
      <ThemeContext.Consumer>
        {themeContext => {
          const themeFn = props.theme || emptyThemeFn;
          const themeProps = props.props || emptyPropsObj;
          const themeContextFn = themeContext || emptyThemeFn;
          const themeDefaultFn = themeDefault || emptyThemeDefaultFn;
          return props.children(
            themeFn(
              themeContextFn(themeDefaultFn(themeProps), themeProps),
              themeProps,
            ),
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  function Provider(props: {
    children: Node,
    theme?: (ThemeTokens, ThemeProps) => ThemeTokens,
  }) {
    return (
      <ThemeContext.Provider value={props.theme}>
        {props.children}
      </ThemeContext.Provider>
    );
  }

  return { Consumer, Provider };
}
