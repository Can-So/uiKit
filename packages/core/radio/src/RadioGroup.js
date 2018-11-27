// @flow
import React, { Component, Fragment, type Element } from 'react';
import Radio from './Radio';
import type { OptionsPropType, OptionPropType } from './types';
/* eslint-disable react/no-array-index-key */

export type RadioGroupProps = {
  /** Once set, controls the selected value on the Radio Group */
  value?: string | number | null,
  /** Sets the initial selected value on the Radio Group */
  defaultValue?: string | number | null,
  /** Sets the disabled state of all Radio elements in the group */
  isDisabled?: boolean,
  /** Sets the required state of all Radio elements in the group */
  isRequired?: boolean,
  /** An array of objects, each object is mapped onto a Radio element within the group */
  options: OptionsPropType,
  /** Function that gets fired after each invalid event */
  onInvalid?: (event: SyntheticEvent<*>) => void,
  /** Function that gets after each change event */
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
    const { options, isDisabled, isRequired, onInvalid } = this.props;
    const value = this.getProp('value');
    if (!options.length) return null;

    return (options.map((option: OptionPropType, index: number) => {
      const optionProps = { ...option };
      if (typeof isDisabled !== 'undefined') {
        optionProps.isDisabled = isDisabled;
      }
      if (value !== null && option.value === value) {
        optionProps.isChecked = true;
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
