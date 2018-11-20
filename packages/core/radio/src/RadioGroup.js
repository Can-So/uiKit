// @flow
import React, { Component, Fragment, type Element } from 'react';
import Radio from './Radio';
import type { OptionsPropType, OptionPropType } from './types';
/* eslint-disable react/no-array-index-key */

export type RadioGroupProps = {
  value?: string | number | null,
  defaultValue?: string | number | null,
  isRequired?: boolean,
  options: OptionsPropType,
  onInvalid?: (event: SyntheticEvent<*>) => void,
  onChange: (event: SyntheticEvent<*>) => void,
};

type RadioElementArray = Array<Element<typeof Radio>>;

type State = { value?: string | number | null };

export default class RadioGroup extends Component<RadioGroupProps, State> {
  static defaultProps = {
    onChange: () => {},
    options: [],
  };

  constructor(props: RadioGroupProps) {
    super(props);
    this.state = {
      value:
        this.props.value !== undefined
          ? this.props.value
          : this.props.defaultValue,
    };
  }

  getProp = (key: string) => {
    return this.props[key] ? this.props[key] : this.state[key];
  };

  onChange = (event: SyntheticEvent<*>) => {
    this.setState({
      value: event.currentTarget.value,
    });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }
  };

  buildOptions = () => {
    const { options, isRequired, onInvalid } = this.props;
    const value = this.getProp('value');
    if (!options.length) return null;

    return (options.map((option: OptionPropType, index: number) => {
      let optionProps = { ...option };
      if (value !== null && option.value === value) {
        optionProps = { ...option, isChecked: true };
      }
      return (
        <Radio
          {...optionProps}
          key={index}
          onChange={this.onChange}
          onInvalid={onInvalid}
          isRequired={isRequired}
        />
      );
    }): RadioElementArray);
  };

  render() {
    const options = this.buildOptions();
    return <Fragment>{options}</Fragment>;
  }
}
