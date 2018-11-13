import * as React from 'react';
import { PureComponent } from 'react';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { colors } from '@atlaskit/theme';
import { ColorCardOption, ColorCardButton } from '../styled/ColorCard';

export interface Props {
  value: string;
  label?: string;
  onClick?: (value: string) => void;
  checkMarkColor?: string;
  selected?: boolean;
  focused?: boolean;
  isOption?: boolean;
}

export default class ColorCard extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const { focused } = this.props;
    if (!prevProps.focused && focused && this.ref.current) {
      this.ref.current.focus();
    }
  }

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
      isOption,
    } = this.props;

    const Component = isOption ? ColorCardOption : ColorCardButton;

    return (
      <Component
        innerRef={this.ref}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        title={label}
        color={value || 'transparent'}
        focused={focused}
      >
        {selected && <EditorDoneIcon primaryColor={checkMarkColor} label="" />}
      </Component>
    );
  }
}
