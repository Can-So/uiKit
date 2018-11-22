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
      <ThemeContext.Consumer>
        {themeContext => {
          const themeFn = theme || emptyThemeFn;
          const themeProps = props || emptyPropsObj;
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
    ) : (
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
  };
}
