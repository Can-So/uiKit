// @flow

import React, { Component } from 'react';
import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';
import CheckboxIndeterminateIcon from '@atlaskit/icon/glyph/checkbox-indeterminate';
import { ThemeProvider } from 'styled-components';
import { HiddenCheckbox, IconWrapper, Label, Wrapper } from './styled/Checkbox';

type Props = {|
  /** Sets whether the checkbox is checked or unchecked. */
  isChecked: boolean,
  /** Sets whether the checkbox is indeterminate. This only affects the
   style and does not modify the isChecked property. */
  isIndeterminate?: boolean,
  /** Sets whether the checkbox is disabled. */
  isDisabled?: boolean,
  /** Sets whether the checkbox should take up the full width of the parent. */
  isFullWidth?: boolean,
  /** The label to be displayed to the right of the checkbox. The label is part
   of the clickable element to select the checkbox. */
  label: string,
  /** The name of the submitted field in a checkbox. */
  name: string,
  /** Marks the field as invalid. Changes style of unchecked component. */
  isInvalid?: boolean,
  /** Function that is called whenever the state of the checkbox changes. It will
  be called with an object containing the react synthetic event as well as the
  state the checkbox will naturally be set to. The stateless version does not
  automatically update whether the checkbox is checked. */
  onChange: (event: SyntheticEvent<HTMLInputElement>) => mixed,
  /** The value to be used in the checkbox input. This is the value that will
   be returned on form submission. */
  value: number | string,
|};

type State = {|
  isActive: boolean,
  isFocused: boolean,
  isHovered: boolean,
  mouseIsDown: boolean,
|};

const emptyTheme = {};

export default class CheckboxStateless extends Component<Props, State> {
  props: Props; // eslint-disable-line react/sort-comp
  state: State = {
    isActive: false,
    isFocused: false,
    isHovered: false,
    mouseIsDown: false,
  };
  checkbox: ?HTMLInputElement;
  actionKeys = [' '];

  componentDidMount() {
    const { isIndeterminate } = this.props;

    // there is no HTML attribute for indeterminate, and thus no prop equivalent.
    // it must be set via the ref.
    if (this.checkbox) {
      this.checkbox.indeterminate = !!isIndeterminate;
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { isIndeterminate } = this.props;

    if (prevProps.isIndeterminate !== isIndeterminate && this.checkbox) {
      this.checkbox.indeterminate = !!isIndeterminate;
    }
  }

  // expose blur/focus to consumers via ref
  blur = () => {
    if (this.checkbox && this.checkbox.blur) this.checkbox.blur();
  };
  focus = () => {
    if (this.checkbox && this.checkbox.focus) this.checkbox.focus();
  };

  onBlur = () =>
    this.setState({
      // onBlur is called after onMouseDown if the checkbox was focused, however
      // in this case on blur is called immediately after, and we need to check
      // whether the mouse is down.
      isActive: this.state.mouseIsDown && this.state.isActive,
      isFocused: false,
    });
  onFocus = () => this.setState({ isFocused: true });
  onMouseLeave = () => this.setState({ isActive: false, isHovered: false });
  onMouseEnter = () => this.setState({ isHovered: true });
  onMouseUp = () => this.setState({ isActive: false, mouseIsDown: false });
  onMouseDown = () => this.setState({ isActive: true, mouseIsDown: true });

  onKeyDown = (event: KeyboardEvent) => {
    if (this.actionKeys.includes(event.key)) {
      this.setState({ isActive: true });
    }
  };
  onKeyUp = (event: KeyboardEvent) => {
    if (this.actionKeys.includes(event.key)) {
      this.setState({ isActive: false });
    }
  };

  renderCheckboxIcon() {
    const { isIndeterminate } = this.props;

    return isIndeterminate ? (
      <CheckboxIndeterminateIcon
        primaryColor="inherit"
        secondaryColor="inherit"
        isHovered={this.state.isHovered}
        isActive={this.state.isActive}
        label=""
      />
    ) : (
      <CheckboxIcon
        primaryColor="inherit"
        secondaryColor="inherit"
        isHovered={this.state.isHovered}
        isActive={this.state.isActive}
        label=""
      />
    );
  }

  render() {
    const {
      isChecked,
      isDisabled,
      isFullWidth,
      isInvalid,
      label,
      name,
      onChange,
      value,
    } = this.props;
    const { isFocused, isActive, isHovered } = this.state;

    return (
      <ThemeProvider theme={emptyTheme}>
        <Label
          isDisabled={isDisabled}
          isFullWidth={isFullWidth}
          onMouseDown={this.onMouseDown}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onMouseUp={this.onMouseUp}
        >
          <HiddenCheckbox
            disabled={isDisabled}
            checked={isChecked}
            onChange={onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
            type="checkbox"
            value={value}
            name={name}
            innerRef={r => (this.checkbox = r)} // eslint-disable-line
          />
          <Wrapper>
            <IconWrapper
              isChecked={isChecked}
              isDisabled={isDisabled}
              isFocused={isFocused}
              isActive={isActive}
              isHovered={isHovered}
              isInvalid={isInvalid}
            >
              {this.renderCheckboxIcon()}
            </IconWrapper>
            <span>{label}</span>
          </Wrapper>
        </Label>
      </ThemeProvider>
    );
  }
}
