// @flow

import { type ThemeProp } from '@atlaskit/theme';
import React, { Component } from 'react';
import { Input } from './styled';
import { Theme, type ThemeTokens } from './theme';

type Props = {
  /** if the field range needs to be disabled */
  isDisabled?: boolean,
  /** Maximum value of the range */
  max: number,
  /** Minimum value of the range */
  min: number,
  /** Hook to be invoked on change of the range */
  onChange?: (value: number) => mixed,
  /** Step value for the range */
  step?: number,
  /** Value of the range */
  value?: number,
  /** The default value */
  defaultValue: number,
  /** Callback to receive a reference. */
  inputRef?: (input: ?HTMLInputElement) => mixed,
  /** The theme object to be passed down. See
  [@atlaskit/theme](https://atlaskit.atlassian.com/packages/core/theme) for more details on themeing.
  */
  theme?: ThemeProp<ThemeTokens>,
};

type State = {
  value: number,
};

const getPercentValue = (value: number, min: number, max: number): string => {
  let percent = '0';
  if (min < max && value > min) {
    percent = (((value - min) / (max - min)) * 100).toFixed(2);
  }
  return percent;
};

export default class Slider extends Component<Props, State> {
  static defaultProps = {
    isDisabled: false,
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    onChange: () => {},
  };

  state: State = {
    value:
      this.props.value !== undefined
        ? this.props.value
        : this.props.defaultValue,
  };

  range: ?HTMLInputElement;

  componentDidMount() {
    if (this.range) {
      if (this.props.inputRef) {
        this.props.inputRef(this.range);
      }
    }
  }

  getValue = () =>
    this.props.value !== undefined ? this.props.value : this.state.value;

  handleChange = (e: Event) => {
    // Event.target is typed as an EventTarget but we need to access properties on it which are
    // specific to HTMLInputElement. Due limitations of the HTML spec flow doesn't know that an
    // EventTarget can have these properties, so we cast it to Element through Object. This is
    // the safest thing we can do in this situation.
    // https://flow.org/en/docs/types/casting/#toc-type-casting-through-any
    const target: HTMLInputElement = (e.target: Object);
    const value = parseFloat(target.value);
    const { onChange } = this.props;

    this.setState({ value });

    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { isDisabled, defaultValue, theme, ...rest } = this.props;
    const { min, max } = this.props;
    const value = this.getValue();

    return (
      <Theme.Provider value={theme}>
        <Theme.Consumer>
          {computedTheme => (
            <Input
              {...rest}
              {...computedTheme}
              type="range"
              value={value}
              onChange={this.handleChange}
              disabled={isDisabled}
              valuePercent={getPercentValue(value, min, max)}
              innerRef={r => {
                this.range = r;
              }}
            />
          )}
        </Theme.Consumer>
      </Theme.Provider>
    );
  }
}
