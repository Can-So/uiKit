// @flow

import React, { Component, type Node } from 'react';
import { Label } from '@atlaskit/field-base';
import { DatePicker, DateTimePicker, TimePicker } from '../src';

type Props = {
  initialValue?: string,
  initialIsOpen?: boolean,
  children: ({
    value: string,
    onValueChange: (value: string) => void,
    isOpen: boolean,
    onBlur: () => void,
  }) => Node,
};

type State = {
  value: string,
  isOpen: boolean,
};

class Controlled extends Component<Props, State> {
  state: State;
  recentlySelected: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.initialValue || '',
      isOpen: props.initialIsOpen || false,
    };
  }

  handleClick = () => {
    if (!this.recentlySelected) {
      this.setState({ isOpen: true });
    }
  };

  onValueChange = (value: string) => {
    console.log(value);
    this.recentlySelected = true;
    this.setState(
      {
        value,
        isOpen: false,
      },
      () => {
        setTimeout(() => {
          this.recentlySelected = false;
        }, 200);
      },
    );
  };

  onBlur = () => {
    this.setState({
      isOpen: false,
    });
  };

  onFocus = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onClick={this.handleClick}>
        {this.props.children({
          value: this.state.value,
          onValueChange: this.onValueChange,
          isOpen: this.state.isOpen,
          onBlur: this.onBlur,
        })}
      </div>
    );
  }
}

export default () => {
  return (
    <div>
      <h3>Date picker</h3>
      <Label htmlFor="react-select-datepicker-1--input" label="default" />
      <DatePicker id="datepicker-1" onChange={console.log} />

      <Label
        htmlFor="react-select-datepicker-2--input"
        label="controlled (value, isOpen)"
      />
      <Controlled initialValue="2018-01-02">
        {({ value, onValueChange, isOpen, onBlur }) => (
          <DatePicker
            id="datepicker-2"
            value={value}
            onChange={onValueChange}
            isOpen={isOpen}
            onBlur={onBlur}
          />
        )}
      </Controlled>

      <Label
        htmlFor="react-select-datepicker-3--input"
        label="uncontrolled (defaultValue)"
      />
      <DatePicker
        id="datepicker-3"
        defaultValue="2018-01-02"
        onChange={console.log}
      />

      <h3>Time picker</h3>
      <Label htmlFor="react-select-timepicker-1--input" label="default" />
      <TimePicker id="timepicker-1" onChange={console.log} />

      <Label
        htmlFor="react-select-timepicker-2--input"
        label="controlled (value, isOpen)"
      />
      <Controlled initialValue="14:30">
        {({ value, onValueChange, isOpen, onBlur }) => (
          <TimePicker
            id="timepicker-2"
            value={value}
            onChange={onValueChange}
            onBlur={onBlur}
            isOpen={isOpen}
          />
        )}
      </Controlled>

      <Label
        htmlFor="react-select-timepicker-3--input"
        label="uncontrolled (defaultValue)"
      />
      <TimePicker
        id="timepicker-3"
        defaultValue="14:30"
        onChange={console.log}
      />

      <Label
        htmlFor="react-select-timepicker-4--input"
        label="editable times"
      />
      <TimePicker
        id="timepicker-4"
        defaultValue="14:30"
        onChange={console.log}
        timeIsEditable
      />

      <h3>Date / time picker</h3>
      <Label htmlFor="react-select-datetimepicker-1--input" label="default" />
      <DateTimePicker id="datetimepicker-1" onChange={console.log} />

      <Label
        htmlFor="react-select-datetimepicker-2--input"
        label="controlled (UTC-08:00)"
      />
      <Controlled initialValue="2018-01-02T14:30-08:00">
        {({ value, onValueChange }) => (
          <DateTimePicker
            id="datetimepicker-2"
            value={value}
            onChange={onValueChange}
          />
        )}
      </Controlled>

      <Label
        htmlFor="react-select-datetimepicker-3--input"
        label="uncontrolled (UTC+10:00)"
      />
      <DateTimePicker
        id="datetimepicker-3"
        defaultValue="2018-01-02T14:30+10:00"
        onChange={console.log}
      />

      <Label
        htmlFor="react-select-datetimepicker-4--input"
        label="editable times (UTC+10:00)"
      />
      <DateTimePicker
        id="datetimepicker-4"
        defaultValue="2018-01-02T14:30+10:00"
        onChange={console.log}
        timeIsEditable
      />
    </div>
  );
};
