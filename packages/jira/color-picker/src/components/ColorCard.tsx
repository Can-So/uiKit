import * as React from 'react';
import { PureComponent } from 'react';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { colors } from '@atlaskit/theme';
import { ColorCardContent } from '../styled/ColorCard';

export interface Props {
  value: string;
  label: string;
  selectedLabel?: string;
  tabIndex?: number;
  isSelected?: boolean;
  onClick?: (value: string) => void;
  checkMarkColor?: string;
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

  render() {
    const {
      tabIndex,
      value,
      label,
      selectedLabel = 'Selected',
      isSelected,
      checkMarkColor = colors.N0,
    } = this.props;
    return (
      <ColorCardContent
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        tabIndex={tabIndex}
        className={`${isSelected ? 'selected' : ''}`}
        title={label}
        style={{
          backgroundColor: value || 'transparent',
        }}
        role="button"
      >
        {isSelected && (
          <EditorDoneIcon primaryColor={checkMarkColor} label={selectedLabel} />
        )}
      </ColorCardContent>
    );
  }
}
