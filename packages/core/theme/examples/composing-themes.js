// @flow

import React from 'react';
import color from 'color';
import { createTheme } from '../src';

const DisplayThemeColors = () => (
  <Theme.Consumer>
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
  </Theme.Consumer>
);

const Theme = createTheme<
  {
    backgroundColor?: string,
    textColor?: string,
  },
  *,
>(() => ({
  backgroundColor: '#333',
  textColor: '#eee',
}));

export default () => (
  <Theme.Provider>
    <DisplayThemeColors />
    <Theme.Provider theme={t => ({ ...t, backgroundColor: 'palevioletred' })}>
      <DisplayThemeColors />
    </Theme.Provider>
  </Theme.Provider>
);
