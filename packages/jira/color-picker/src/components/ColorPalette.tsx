import * as React from 'react';
import { PureComponent } from 'react';
import ColorCard from './ColorCard';

import { ColorPaletteContainer } from '../styled/ColorPalette';

export interface Color {
  label: string;
  value: string;
  borderColor?: string;
}

export interface Props {
  palette: Color[];
  selectedColor?: string;
  selectedLabel?: string;
  onClick: (value: string) => void;
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
      selectedLabel = 'Selected',
      className,
      checkMarkColor,
    } = this.props;

    return (
      <ColorPaletteContainer
        className={className}
        style={{ maxWidth: cols * 32 }}
      >
        {palette.map(color => (
          <ColorCard
            key={color.value}
            value={color.value}
            borderColor={color.borderColor || 'trasparent'}
            label={color.label}
            selectedLabel={selectedLabel}
            onClick={onClick}
            isSelected={color.value === selectedColor}
            checkMarkColor={checkMarkColor}
          />
        ))}
      </ColorPaletteContainer>
    );
  }
}
