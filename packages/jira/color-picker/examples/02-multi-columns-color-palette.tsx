import * as React from 'react';
import { ColorPalette } from '../src';
import { simplePalette } from '../examples-helpers/constants';
import { colors } from '@atlaskit/theme';

export default () => (
  <ColorPalette
    palette={simplePalette}
    selectedColor={colors.P200}
    cols={3}
    onClick={color => console.log(color)}
  />
);
