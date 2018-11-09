import * as React from 'react';
import { PureComponent } from 'react';
import ColorCard from './ColorCard';
import { gridSize } from '@atlaskit/theme';

import {
  ColorPaletteContainer,
  ColorCardWrapper,
} from '../styled/ColorPalette';
import { Palette } from '../types';

export interface Props {
  palette: Palette;
  selectedColor?: string;
  selectedLabel?: string;
  onClick?: (value: string) => void;
  cols?: number;
  className?: string;
  checkMarkColor?: string;
  focusedItemIndex?: number;
}

export class ColorPalette extends PureComponent<Props> {
  render() {
    const {
      palette,
      cols = 7,
      onClick,
      selectedColor,
      selectedLabel,
      className,
      checkMarkColor,
      focusedItemIndex,
    } = this.props;

    return (
      <ColorPaletteContainer
        className={className}
        style={{ maxWidth: cols * 30 + gridSize() * 2 }}
      >
        {palette.map((color, index) => (
          <ColorCardWrapper key={color.value}>
            <ColorCard
              value={color.value}
              label={color.label}
              selectedLabel={selectedLabel}
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
