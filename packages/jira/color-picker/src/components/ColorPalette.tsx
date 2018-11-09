import * as React from 'react';
import { PureComponent } from 'react';
import ColorCard from './ColorCard';

import {
  ColorPaletteContainer,
  ColorCardWrapper,
} from '../styled/ColorPalette';
import { Palette } from '../types';

export interface Props {
  /** list of available colors */
  palette: Palette;
  /** selected color */
  selectedColor?: string;
  /** click handler */
  onClick?: (value: string) => void;
  /** maximum column length */
  cols?: number;
  /** color of checkmark on selected color */
  checkMarkColor?: string;
  /** Passed implicitly. index of focused item */
  focusedItemIndex?: number;
}

export class ColorPalette extends PureComponent<Props> {
  render() {
    const {
      palette,
      cols,
      onClick,
      selectedColor,
      checkMarkColor,
      focusedItemIndex,
    } = this.props;

    return (
      // HARDCODE: color card width and container padding
      <ColorPaletteContainer
        style={{ maxWidth: cols ? cols * 26 + 12 : undefined }}
      >
        {palette.map((color, index) => (
          <ColorCardWrapper key={color.value}>
            <ColorCard
              value={color.value}
              label={color.label}
              onClick={onClick}
              selected={color.value === selectedColor}
              checkMarkColor={checkMarkColor}
              tabIndex={focusedItemIndex !== undefined ? -1 : undefined}
              focused={
                focusedItemIndex !== undefined
                  ? focusedItemIndex === index
                  : undefined
              }
            />
          </ColorCardWrapper>
        ))}
      </ColorPaletteContainer>
    );
  }
}
