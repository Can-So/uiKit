import * as React from 'react';
import { Component } from 'react';
import CheckIcon from '@atlaskit/icon/glyph/check';
import { Color } from '@atlaskit/media-editor';

import {
  Container,
  HoverArea,
  MainArea,
  ColorSample,
  CheckArea,
} from './colorButtonStyles';

export interface ColorButtonProps {
  readonly color: Color;
  readonly currentColor: Color;
  readonly onClick: (color: Color) => void;
}

export class ColorButton extends Component<ColorButtonProps> {
  render(): JSX.Element {
    const { color, onClick: onColorClick } = this.props;
    const { red, green, blue } = color;
    const onClick = () => onColorClick(color);
    const style = {
      backgroundColor: `rgb(${red}, ${green}, ${blue})`,
    };

    return (
      <Container onClick={onClick}>
        <HoverArea>
          <MainArea>
            <ColorSample style={style}>{this.checkMark()}</ColorSample>
          </MainArea>
        </HoverArea>
      </Container>
    );
  }

  private checkMark(): JSX.Element | null {
    const { color, currentColor } = this.props;

    if (
      color.red === currentColor.red &&
      color.green === currentColor.green &&
      color.blue === currentColor.blue
    ) {
      return (
        <CheckArea>
          <CheckIcon label="check" size="medium" />
        </CheckArea>
      );
    }

    return null;
  }
}
