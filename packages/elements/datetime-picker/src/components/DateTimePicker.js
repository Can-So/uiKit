// @flow

import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import { borderRadius, colors } from '@atlaskit/theme';
import { format, parse } from 'date-fns';
import React, { Component } from 'react';
import withCtrl from 'react-ctrl';
import styled from 'styled-components';

import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { defaultTimes } from '../internal';

/* eslint-disable react/no-unused-prop-types */
type Props = {
  /** Whether or not to auto-focus the field. */
  autoFocus: boolean,
  /** Default for `focused`. */
  defaultFocused: string,
  /** Default for `isOpen`. */
  defaultIsOpen: boolean,
  /** Default for `times`. */
  defaultTimes: Array<string>,
  /** Default for `value`. */
  defaultValue: string,
  /** An array of ISO dates that should be disabled on the calendar. */
  disabled: Array<string>,
  /** The id of the field. Currently, react-select transforms this to have a "react-select-" prefix, and an "--input" suffix when applied to the input. For example, the id "my-input" would be transformed to "react-select-my-input--input". Keep this in mind when needing to refer to the ID. This will be fixed in an upcoming release. */
  id: string,
  /** Props to apply to the container. **/
  innerProps: Object,
  /** Whether or not the field is disabled. */
  isDisabled: boolean,
  /** Whether or not the dropdown is open. */
  isOpen: boolean,
  /** The time in the dropdown that should be focused. */
  focused: string,
  /** The name of the field. */
  name: string,
  /** Called when the field is blurred. */
  onBlur: () => void,
  /** Called when the value changes and the date / time is a complete value, or empty. The only value is an ISO string. */
  onChange: string => void,
  /** Called when the field is focused. */
  onFocus: () => void,
  /** The times to show in the dropdown. */
  times: Array<string>,
  /** The ISO time that should be used as the input value. */
  value: string,
};

type State = {
  _dateValue: string,
  _timeValue: string,
  _zoneValue: string,
  active: 0 | 1 | 2,
  focused: string,
  isFocused: boolean,
  isOpen: boolean,
  times: Array<string>,
  value: string,
};

const Flex = styled.div`
  background-color: ${colors.N10};
  border-radius: ${borderRadius()}px;
  display: flex;
  transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;
  ${({ isFocused }) => `
    border: ${
      isFocused ? `2px solid ${colors.B100}` : `1px solid ${colors.N20}`
    };
    padding: ${isFocused ? '0' : '1px'};
  `} &:hover {
    background-color: ${({ isFocused }) =>
      isFocused ? 'inherit' : colors.N20};
  }
`;

const FlexItem = styled.div`
  flex-basis: 0;
  flex-grow: 1;
`;

// react-select overrides (via @atlaskit/select).
const styles = {
  control: style => ({
    ...style,
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: 0,
    paddingLeft: 0,
    ':hover': {
      backgroundColor: 'transparent',
    },
  }),
};

function formatDateTimeZoneIntoIso(
  date: string,
  time: string,
  zone: string,
): string {
  return `${date}T${time}${zone}`;
}

function parseDateIntoStateValues(value) {
  const parsed = parse(value);
  return {
    _dateValue: format(parsed, 'YYYY-MM-DD'),
    _timeValue: format(parsed, 'HH:mm'),
    _zoneValue: format(parsed, 'ZZ'),
  };
}

class DateTimePicker extends Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    disabled: [],
    isDisabled: false,
    name: '',
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
  };

  state = {
    _dateValue: '',
    _timeValue: '',
    _zoneValue: '',
    active: 0,
    focused: '',
    isFocused: false,
    isOpen: false,
    times: defaultTimes,
    value: '',
  };

  onBlur = () => {
    this.setState({ isFocused: false });
    this.props.onBlur();
  };

  onDateChange = (_dateValue: string) => {
    this.setState({ _dateValue }, this.onValueChange);
  };

  onFocus = () => {
    this.setState({ isFocused: true });
    this.props.onFocus();
  };

  onTimeChange = (_timeValue: string) => {
    this.setState({ _timeValue }, this.onValueChange);
  };

  onValueChange() {
    const { _dateValue, _timeValue, _zoneValue } = this.state;
    if (_dateValue && _timeValue) {
      const value = formatDateTimeZoneIntoIso(
        _dateValue,
        _timeValue,
        _zoneValue,
      );
      this.setState({ value });
      this.props.onChange(value);
    }
  }

  render() {
    const { autoFocus, id, innerProps, isDisabled, name } = this.props;
    const { _dateValue, _timeValue, isFocused, value } = this.state;
    const bothProps = {
      isDisabled,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
    };
    return (
      <Flex {...innerProps} isFocused={isFocused}>
        <input name={name} type="hidden" value={value} />
        <FlexItem>
          <DatePicker
            {...bothProps}
            autoFocus={autoFocus}
            icon={null}
            id={id}
            onChange={this.onDateChange}
            selectProps={{ styles }}
            value={_dateValue}
          />
        </FlexItem>
        <FlexItem>
          <TimePicker
            {...bothProps}
            icon={CalendarIcon}
            onChange={this.onTimeChange}
            selectProps={{ styles }}
            value={_timeValue}
          />
        </FlexItem>
      </Flex>
    );
  }
}

export default withCtrl(DateTimePicker, {
  mapPropsToState(props) {
    const { value } = props;
    const overridden = {};
    if (value) {
      const parsed = parseDateIntoStateValues(value);
      overridden._dateValue = parsed._dateValue;
      overridden._timeValue = parsed._timeValue;
      overridden._zoneValue = parsed._zoneValue;
    }
    return { ...props, ...overridden };
  },
});
