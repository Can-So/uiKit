import * as React from 'react';
import { ColorPalette } from '../src';
import { colors } from '@atlaskit/theme';

export default () => (
  <ColorPalette
    palette={[
      {
        label: 'Purple',
        value: colors.P200,
      },
      {
        label: 'Blue',
        value: colors.B200,
      },
      {
        label: 'Green',
        value: colors.G200,
      },
      {
        label: 'Teal',
        value: colors.T200,
      },
      {
        label: 'Yellow',
        value: colors.Y200,
      },
      {
        label: 'Red',
        value: colors.R200,
      },
    ]}
    onClick={color => console.log(color)}
  />
);
