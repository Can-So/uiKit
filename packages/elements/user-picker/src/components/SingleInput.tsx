import * as React from 'react';
import { components } from '@atlaskit/select';

export interface State {
  value?: string;
}

const INPUT_CHANGE_ACTION = { action: 'input-change' };

export class SingleInput extends React.Component<any, State> {
  private inputRef;
  state = {
    value: undefined,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.selectProps.isFocused && this.props.selectProps.isFocused) {
      this.inputRef.select();
    }
  }

  private onBlur = () => {
    this.props.onBlur();
    this.setState({ value: undefined });
  };

  private onFocus = () => {
    const { onFocus, selectProps } = this.props;
    const { value } = selectProps;
    onFocus();

    if (value) {
      this.setState({ value: selectProps.value.label });
    }
  };

  private onInputChange = event => {
    this.props.selectProps.onInputChange(
      event.target.value,
      INPUT_CHANGE_ACTION,
    );
    this.setState({ value: undefined });
  };

  private handleInnerRef = ref => {
    this.props.innerRef(ref);
    this.inputRef = ref;
  };

  render() {
    const { selectProps, ...inputProps } = this.props;
    const value = this.state.value || inputProps.value;

    return (
      <components.Input
        {...inputProps}
        value={value}
        onFocus={this.onFocus}
        onChange={this.onInputChange}
        onBlur={this.onBlur}
        innerRef={this.handleInnerRef}
      />
    );
  }
}
