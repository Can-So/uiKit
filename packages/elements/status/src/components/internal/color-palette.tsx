import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { colors, gridSize } from '@atlaskit/theme';
import Color from './color';
import { Color as ColorType } from '../Status';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { messages } from '../i18n';

// color value, label, background, borderColor
const palette: [ColorType, string, string, string][] = [
  ['neutral', 'Grey', colors.N40, colors.N400],
  ['purple', 'Purple', colors.P50, colors.P400],
  ['blue', 'Blue', colors.B50, colors.B400],
  ['red', 'Red', colors.R50, colors.R400],
  ['yellow', 'Yellow', colors.Y75, colors.Y400],
  ['green', 'Green', colors.G50, colors.G400],
];

const ColorPaletteWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  margin: ${gridSize()}px ${gridSize()}px 0 ${gridSize()}px;
  /* Firefox bug fix: https://product-fabric.atlassian.net/browse/ED-1789 */
  display: flex;
  flex-wrap: wrap;
`;

interface ColorPaletteProps {
  selectedColor?: ColorType;
  onClick: (value: ColorType) => void;
  onHover?: (value: ColorType) => void;
  cols?: number;
  className?: string;
}

class ColorPalette extends PureComponent<
  ColorPaletteProps & InjectedIntlProps,
  any
> {
  render() {
    const {
      cols = 7,
      onClick,
      selectedColor,
      className,
      onHover,
      intl: { formatMessage },
    } = this.props;
    return (
      <ColorPaletteWrapper
        className={className}
        style={{ maxWidth: cols * 32 }}
      >
        {palette.map(([colorValue, label, backgroundColor, borderColor]) => {
          return (
            <Color
              key={colorValue}
              value={colorValue}
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              label={formatMessage(messages[`statusColor${label}`])}
              onClick={onClick}
              onHover={onHover}
              isSelected={colorValue === selectedColor}
            />
          );
        })}
      </ColorPaletteWrapper>
    );
  }
}

export default injectIntl(ColorPalette);
