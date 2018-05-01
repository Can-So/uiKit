// @flow

import Calendar from '@atlaskit/calendar';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import Select from '@atlaskit/select';
import { borderRadius, colors, layers } from '@atlaskit/theme';
import { format, isValid, parse } from 'date-fns';
import pick from 'lodash.pick';
import React, { Component, type Node, type ElementRef } from 'react';
import styled from 'styled-components';

import { ClearIndicator, DropdownIndicator } from '../internal';
import FixedLayer from '../internal/FixedLayer';
import type { Event } from '../types';

/* eslint-disable react/no-unused-prop-types */
type Props = {
  /** Whether or not to auto-focus the field. */
  autoFocus: boolean,
  /** Default for `isOpen`. */
  defaultIsOpen: boolean,
  /** Default for `value`. */
  defaultValue: string,
  /** An array of ISO dates that should be disabled on the calendar. */
  disabled: Array<string>,
  /** The icon to show in the field. */
  icon: Node,
  /** The id of the field. Currently, react-select transforms this to have a "react-select-" prefix, and an "--input" suffix when applied to the input. For example, the id "my-input" would be transformed to "react-select-my-input--input". Keep this in mind when needing to refer to the ID. This will be fixed in an upcoming release. */
  id: string,
  /** Props to apply to the container. **/
  innerProps: Object,
  /** Whether or not the field is disabled. */
  isDisabled?: boolean,
  /** Whether or not the dropdown is open. */
  isOpen?: boolean,
  /** The name of the field. */
  name: string,
  /** Called when the field is blurred. */
  onBlur: (e: SyntheticFocusEvent<>) => void,
  /** Called when the value changes. The only argument is an ISO time. */
  onChange: string => void,
  /** Called when the field is focused. */
  onFocus: (e: SyntheticFocusEvent<>) => void,
  /** Props to apply to the select. */
  selectProps: Object,
  /** The ISO time that should be used as the input value. */
  value?: string,
  /** Indicates current value is invalid & changes border color */
  isInvalid?: boolean,
};

type State = {
  isOpen: boolean,
  value: string,
  view: string,
};

// TODO see if there's a different way to control the display value.
//
// react-select retains the value the user typed in until the field is
// blurred. Since we're controlling the open state and value, we need a
// way explicitly ensure the value is respected. By blurring and then
// immedately refocusing, we ensure the value is formatted and the input
// retains focus.
function ensureValueIsDisplayed() {
  const { activeElement } = document;
  if (activeElement) {
    activeElement.blur();
    activeElement.focus();
  }
}

function isoToObj(iso: string) {
  const parsed = parse(iso);
  return isValid(parsed)
    ? {
        day: parsed.getDate(),
        month: parsed.getMonth() + 1,
        year: parsed.getFullYear(),
      }
    : {};
}

const arrowKeys = {
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
};

const StyledMenu = styled.div`
  background-color: ${colors.N0};
  border: 1px solid ${colors.N40};
  border-radius: ${borderRadius()}px;
  box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.1);
  margin: 7px 0;
  overflow: hidden;
  text-align: center;
  z-index: ${layers.dialog};
`;

export default class DatePicker extends Component<Props, State> {
  // $FlowFixMe - Calendar isn't being correctly detected as a react component
  calendar: ElementRef<Calendar>;
  containerRef: ?HTMLElement;
  input: Element | null;

  static defaultProps = {
    autoFocus: false,
    disabled: [],
    icon: CalendarIcon,
    name: '',
    isDisabled: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    innerProps: {},
    selectProps: {},
    id: '',
    defaultIsOpen: false,
    defaultValue: '',
    isInvalid: false,
  };

  state = {
    isOpen: this.props.defaultIsOpen,
    value: this.props.defaultValue,
    view: '',
  };

  // All state needs to be accessed via this function so that the state is mapped from props
  // correctly to allow controlled/uncontrolled usage.
  getState = () => {
    return {
      ...this.state,
      ...pick(this.props, ['value', 'isOpen']),
    };
  };

  onCalendarChange = ({ iso }: { iso: string }) => {
    this.setState({ view: iso });
  };

  onCalendarSelect = ({ iso: value }: { iso: string }) => {
    this.triggerChange(value);
    this.setState({ isOpen: false });
  };

  onInputClick = () => {
    this.setState({ isOpen: true });
  };

  onSelectBlur = (e: SyntheticFocusEvent<>) => {
    this.setState({ isOpen: false });
    this.props.onBlur(e);
  };

  onSelectFocus = (e: SyntheticFocusEvent<>) => {
    this.setState({ isOpen: true });
    this.props.onFocus(e);
  };

  onSelectInput = (e: Event) => {
    let value = e.target.value;
    if (value) {
      const parsed = parse(value);
      if (isValid(parsed)) {
        value = format(parsed, 'YYYY-MM-DD');
        this.triggerChange(value);
      }
    }
    this.setState({ isOpen: true });
  };

  onSelectKeyDown = (e: Event) => {
    const { key } = e;
    const dir = arrowKeys[key];
    const { isOpen, view } = this.getState();

    if (dir) {
      // Calendar will not exist if it's not open and this also doubles as a
      // ref check since it may not exist.
      if (this.calendar) {
        // We don't want to move the caret if the calendar is open.
        if (dir === 'left' || dir === 'right') {
          e.preventDefault();
        }
        this.calendar.navigate(dir);
      } else if (dir === 'down' || dir === 'up') {
        this.setState({ isOpen: true });
      }
    } else if (key === 'Escape') {
      if (isOpen) {
        this.setState({ isOpen: false });
      } else {
        this.triggerChange('');
      }
    } else if (key === 'Enter' || key === 'Tab') {
      this.triggerChange(view);
      this.setState({ isOpen: false });
    }
  };

  refCalendar = (ref: ElementRef<Calendar>) => {
    this.calendar = ref;
  };

  triggerChange = (value: string) => {
    this.props.onChange(value);
    this.setState({ value, view: value });
    ensureValueIsDisplayed();
  };

  getContainerRef = (ref: ?HTMLElement) => {
    const oldRef = this.containerRef;
    this.containerRef = ref;
    // Cause a re-render if we're getting the container ref for the first time
    // as the layered menu requires it for dimension calculation
    if (oldRef == null && ref != null) {
      this.forceUpdate();
    }
  };

  render() {
    const {
      autoFocus,
      disabled,
      icon,
      id,
      innerProps,
      isDisabled,
      name,
      selectProps,
    } = this.props;
    const { isOpen, value, view } = this.getState();
    const validationState = this.props.isInvalid ? 'error' : 'default';
    const Menu = ({ innerProps: menuInnerProps }) => (
      <StyledMenu>
        <Calendar
          {...isoToObj(value)}
          {...isoToObj(view)}
          disabled={disabled}
          onChange={this.onCalendarChange}
          onSelect={this.onCalendarSelect}
          // $FlowFixMe
          ref={this.refCalendar}
          selected={[value]}
          innerProps={menuInnerProps}
        />
      </StyledMenu>
    );

    const FixedLayeredMenu = props => (
      <FixedLayer
        containerRef={this.containerRef}
        content={<Menu {...props} />}
      />
    );

    return (
      <div
        {...innerProps}
        role="presentation"
        onClick={this.onInputClick}
        onInput={this.onSelectInput}
        onKeyDown={this.onSelectKeyDown}
        ref={this.getContainerRef}
      >
        <input name={name} type="hidden" value={value} />
        {/* $FlowFixMe - complaining about required args that aren't required. */}
        <Select
          autoFocus={autoFocus}
          instanceId={id}
          isDisabled={isDisabled}
          menuIsOpen={isOpen && !isDisabled}
          onBlur={this.onSelectBlur}
          onFocus={this.onSelectFocus}
          components={{
            ClearIndicator,
            DropdownIndicator: () => <DropdownIndicator icon={icon} />,
            Menu: FixedLayeredMenu,
          }}
          placeholder="e.g. 2018/12/31"
          value={
            value && {
              label: format(parse(value), 'YYYY/MM/DD'),
              value,
            }
          }
          {...selectProps}
          validationState={validationState}
        />
      </div>
    );
  }
}
