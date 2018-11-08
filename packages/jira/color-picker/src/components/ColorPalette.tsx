import * as React from 'react';
import { PureComponent } from 'react';
import ColorCard from './ColorCard';

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
    } = this.props;

    return (
      <ColorPaletteContainer
        className={className}
        style={{ maxWidth: cols * 32 }}
      >
        {palette.map(color => (
          <ColorCardWrapper key={color.value}>
            <ColorCard
              value={color.value}
              label={color.label}
              selectedLabel={selectedLabel}
              onClick={onClick}
              isSelected={color.value === selectedColor}
              checkMarkColor={checkMarkColor}
            />
          </ColorCardWrapper>
        ))}
      </ColorPaletteContainer>
    );
  }
}
