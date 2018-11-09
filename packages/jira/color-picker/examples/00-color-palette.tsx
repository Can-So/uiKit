import * as React from 'react';
import { ColorPalette } from '../src';
import { simplePalette } from '../mock-data';
import { colors } from '@atlaskit/theme';

export default () => (
  <ColorPalette
    palette={simplePalette}
    selectedColor={colors.P200}
    onClick={color => console.log(color)}
  />
);
