import * as React from 'react';
import { PureComponent } from 'react';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { colors } from '@atlaskit/theme';
import { ColorCardOption, ColorCardContent } from '../styled/ColorCard';

export interface Props {
  value: string;
  label: string;
  onClick?: (value: string) => void;
  checkMarkColor?: string;
  selected?: boolean;
  focused?: boolean;
  isOption?: boolean;
}

export default class ColorCard extends PureComponent<Props> {
  onMouseDown = event => {
    event.preventDefault();
  };

  onClick = event => {
    const { onClick, value } = this.props;

    if (onClick) {
      event.preventDefault();
      onClick(value);
    }
  };

  ref: React.RefObject<HTMLButtonElement> = React.createRef();

  render() {
    const {
      value,
      label,
      selected,
      focused,
      checkMarkColor = colors.N0,
    } = this.props;

    return (
      <ColorCardOption
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        focused={focused}
        aria-label={`${label}${selected ? ' selected' : ''}`}
      >
        <ColorCardContent color={value || 'transparent'}>
          {selected && (
            <EditorDoneIcon primaryColor={checkMarkColor} label="" />
          )}
        </ColorCardContent>
      </ColorCardOption>
    );
  }
}
