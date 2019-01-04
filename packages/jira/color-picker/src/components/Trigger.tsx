import * as React from 'react';
import { PureComponent } from 'react';
import { ColorCardButton, ColorCardContent } from '../styled/ColorCard';

export interface Props {
  value: string;
  label?: string;
  onClick?: () => void;
  expanded?: boolean;
}

export default class ColorCard extends PureComponent<Props> {
  onMouseDown = event => {
    event.preventDefault();
  };

  onClick = event => {
    const { onClick } = this.props;

    if (onClick) {
      event.preventDefault();
      onClick();
    }
  };

  render() {
    const { value, label, expanded } = this.props;

    return (
      <ColorCardButton
        title={label}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        focused={expanded}
        aria-label={label}
        aria-expanded={expanded}
        aria-haspopup
      >
        <ColorCardContent color={value || 'transparent'} />
      </ColorCardButton>
    );
  }
}
