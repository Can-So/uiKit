// @flow

import React from 'react';
import color from 'color';
import { createTheme, Theme } from '../src';

const DisplayThemeColors = () => (
  <Theme>
    {theme =>
      Object.keys(theme).map(k => (
        <div
          key={k}
          style={{
            backgroundColor: theme[k],
            color: color(theme[k]).negate(),
            display: 'inline-block',
            marginBottom: 10,
            marginRight: 10,
            padding: 10,
          }}
        >
          {k}
        </div>
      ))
    }
  </Theme>
);

const Theme1 = createTheme<
  {
    backgroundColor?: string,
    textColor?: string,
  },
  *,
>(() => ({
  backgroundColor: '#333',
  textColor: '#eee',
}));
// const Theme2 = createTheme(t => ({ ...t, backgroundColor: 'palevioletred' }));

export default () => (
  <Theme1>
    <DisplayThemeColors />
    <Theme values={t => ({ ...t, backgroundColor: 'palevioletred' })}>
      <DisplayThemeColors />
    </Theme>
  </Theme1>
);
