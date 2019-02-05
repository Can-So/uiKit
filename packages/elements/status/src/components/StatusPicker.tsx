import * as React from 'react';
import { PureComponent, FormEvent } from 'react';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import { FieldTextStateless } from '@atlaskit/field-text';
import ColorPalette from './internal/color-palette';
import { Color as ColorType } from './Status';

const FieldTextWrapper = styled.div`
  margin: 0 ${gridSize()}px;
`;

export interface Props {
  selectedColor: ColorType;
  text: string;
  onEnter: () => void;
  onColorClick: (value: ColorType) => void;
  onColorHover?: (value: ColorType) => void;
  onTextChanged: (value: string) => void;
  autoFocus?: boolean;
}

export class StatusPicker extends PureComponent<Props, any> {
  private fieldTextWrapperKey = Math.random().toString();
  private colorPaletteKey = Math.random().toString();

  static defaultProps = {
    autoFocus: true,
  };

  render() {
    const { text, selectedColor, onColorClick, onColorHover } = this.props;

    // Using <React.Fragment> instead of [] to workaround Enzyme
    // (https://github.com/airbnb/enzyme/issues/1149)
    return (
      <React.Fragment>
        <FieldTextWrapper key={this.fieldTextWrapperKey}>
          <FieldTextStateless
            value={text}
            isLabelHidden={true}
            shouldFitContainer={true}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            compact={true}
            innerRef={this.handleInputRef}
            autoComplete="off"
            isSpellCheckEnabled={false}
          />
        </FieldTextWrapper>
        <ColorPalette
          key={this.colorPaletteKey}
          onClick={onColorClick}
          onHover={onColorHover}
          selectedColor={selectedColor}
        />
      </React.Fragment>
    );
  }

  private onChange = (evt: FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.props.onTextChanged(evt.target.value);
  };

  private onKeyPress = event => {
    if (event.key === 'Enter') {
      this.props.onEnter();
    }
  };

  private handleInputRef = ref => {
    if (ref && this.props.autoFocus) {
      // Defer to prevent editor scrolling to top (See FS-3227, also ED-2992)
      setTimeout(() => {
        ref.focus();
      });
    }
  };
}
