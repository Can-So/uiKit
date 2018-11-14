// @flow

import React, { createContext, type ComponentType, type Node } from 'react';

export default function createTheme<ThemeTokens, ThemeProps>(
  themeDefault: ThemeProps => ThemeTokens,
): ComponentType<{
  children: Node | (ThemeTokens => Node),
  props?: ThemeProps,
  theme?: (ThemeTokens, ThemeProps) => ThemeTokens,
}> {
  const emptyPropsObj: $Shape<ThemeProps> = {};
  const emptyTokenObj: $Shape<ThemeTokens> = {};
  const emptyThemeDefaultFn: ThemeProps => ThemeTokens = () => emptyTokenObj;
  const emptyThemeFn: (ThemeTokens, ThemeProps) => ThemeTokens = tokens =>
    tokens;
  const ThemeContext = createContext(emptyThemeFn);
  function cascade(
    children: ThemeTokens => Node,
    themeFn?: (ThemeTokens, ThemeProps) => ThemeTokens = emptyThemeFn,
    themeProps?: ThemeProps = emptyPropsObj,
  ) {
    return (
      <ThemeContext.Consumer>
        {themeContext => {
          const themeContextFn = themeContext || emptyThemeFn;
          const themeDefaultFn = themeDefault || emptyThemeDefaultFn;
          return children(
            themeFn(
              themeContextFn(themeDefaultFn(themeProps), themeProps),
              themeProps,
            ),
          );
        }}
      </ThemeContext.Consumer>
    );
  }
  return ({
    children,
    props,
    theme,
  }: {
    children: Node | (ThemeTokens => Node),
    props?: ThemeProps,
    theme?: (ThemeTokens, ThemeProps) => ThemeTokens,
  }) => {
    return typeof children === 'function' ? (
      cascade(children, theme, props)
    ) : (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
  };
}
