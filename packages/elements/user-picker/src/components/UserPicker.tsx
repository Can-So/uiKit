import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import Select from '@atlaskit/select';
import * as debounce from 'lodash.debounce';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  cancelEvent,
  clearEvent,
  createAndFireEventInElementsChannel,
  deleteEvent,
  EventCreator,
  failedEvent,
  focusEvent,
  searchedEvent,
  selectEvent,
  startSession,
  UserPickerSession,
} from '../analytics';
import {
  AtlasKitSelectChange,
  InputActionTypes,
  Option,
  OptionData,
  UserPickerProps,
  UserPickerState,
} from '../types';
import { batchByKey } from './batch';
import { getComponents } from './components';
import { messages } from './i18n';
import { getStyles } from './styles';
import {
  callCallback,
  extractOptionValue,
  getOptions,
  isIterable,
  isSingleValue,
  optionToSelectableOptions,
} from './utils';

class UserPickerInternal extends React.Component<
  UserPickerProps & WithAnalyticsEventProps,
  UserPickerState
> {
  static defaultProps: UserPickerProps = {
    width: 350,
    isMulti: false,
    appearance: 'normal',
    subtle: false,
    isClearable: true,
  };

  static getDerivedStateFromProps(
    nextProps: UserPickerProps,
    prevState: UserPickerState,
  ) {
    const derivedState: Partial<UserPickerState> = {};
    if (nextProps.open !== undefined) {
      derivedState.menuIsOpen = nextProps.open;
    }
    if (nextProps.value !== undefined) {
      derivedState.value = optionToSelectableOptions(nextProps.value);
    } else if (nextProps.defaultValue && !prevState.value) {
      derivedState.value = optionToSelectableOptions(nextProps.defaultValue);
    }
    if (
      nextProps.search !== undefined &&
      nextProps.search !== prevState.inputValue
    ) {
      derivedState.inputValue = nextProps.search;
    }

    if (nextProps.options !== undefined) {
      derivedState.options = nextProps.options;
    }

    return derivedState;
  }

  private selectRef;

  private session?: UserPickerSession;

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      inflightRequest: 0,
      count: 0,
      hoveringClearIndicator: false,
      menuIsOpen: !!this.props.open,
      inputValue: props.search || '',
      preventFilter: false,
    };
  }

  private withSelectRef = (callback: (selectRef: any) => void) => () => {
    if (this.selectRef) {
      callback(this.selectRef.select.select);
    }
  };

  public nextOption = this.withSelectRef(select => select.focusOption('down'));

  public previousOption = this.withSelectRef(select =>
    select.focusOption('up'),
  );

  public focus = () => {
    if (this.selectRef) {
      this.selectRef.focus();
    }
  };

  public blur = () => {
    if (this.selectRef) {
      this.selectRef.blur();
    }
  };

  public selectOption = this.withSelectRef(select => {
    const focusedOption = select.state.focusedOption;
    select.selectOption(focusedOption);
  });

  private handleChange: AtlasKitSelectChange = (
    value,
    { action, removedValue, option },
  ) => {
    if (removedValue && removedValue.data.fixed) {
      return;
    }
    this.setState({ inputValue: '' });
    const { onChange, onSelection, isMulti } = this.props;
    callCallback(onChange, extractOptionValue(value), action);

    switch (action) {
      case 'select-option':
        if (value && !Array.isArray(value)) {
          callCallback(onSelection, value.data);
        }
        this.fireEvent(selectEvent, isMulti ? option : value);
        this.session = isMulti ? startSession() : undefined;
        break;
      case 'clear':
        this.fireEvent(clearEvent);
        break;
      case 'remove-value':
      case 'pop-value':
        this.fireEvent(deleteEvent, removedValue && removedValue.data);
        break;
    }

    if (!this.props.value) {
      this.setState({ value });
    }
  };

  private handleSelectRef = ref => {
    this.selectRef = ref;
  };

  private addOptions = batchByKey(
    (request: string, newOptions: (OptionData | OptionData[])[]) => {
      this.setState(({ inflightRequest, options, count }) => {
        if (inflightRequest.toString() === request) {
          return {
            options: options.concat(
              newOptions.reduce<OptionData[]>(
                (nextOptions, item) => nextOptions.concat(item[0]),
                [],
              ),
            ),
            count: count - newOptions.length,
          };
        }
        return null;
      });
    },
  );

  private handleLoadOptionsError = () => {
    this.fireEvent(failedEvent);
  };

  private executeLoadOptions = debounce((search?: string) => {
    const { loadOptions } = this.props;
    if (loadOptions) {
      this.setState(({ inflightRequest: previousRequest }) => {
        const inflightRequest = previousRequest + 1;
        const result = loadOptions(search);
        const addOptions = this.addOptions.bind(
          this,
          inflightRequest.toString(),
        );
        let count = 0;
        if (isIterable(result)) {
          for (const value of result) {
            Promise.resolve(value)
              .then(addOptions)
              .catch(this.handleLoadOptionsError);
            count++;
          }
        } else {
          Promise.resolve(result)
            .then(addOptions)
            .catch(this.handleLoadOptionsError);
          count++;
        }
        return {
          inflightRequest,
          count,
          options: [],
        };
      });
    }
  }, 200);

  private handleFocus = (event: React.FocusEvent) => {
    const { value } = this.state;
    this.setState({ menuIsOpen: true });
    callCallback(this.props.onFocus);
    if (!this.props.isMulti && isSingleValue(value)) {
      const input = event.target;
      this.setState({ inputValue: value.label, preventFilter: true }, () => {
        if (input instanceof HTMLInputElement) {
          input.select();
        }
      });
    }
  };

  private handleBlur = () => {
    callCallback(this.props.onBlur);
    this.setState({
      menuIsOpen: false,
      inputValue: '',
      preventFilter: false,
    });
  };

  private handleInputChange = (
    search: string,
    { action }: { action: InputActionTypes },
  ) => {
    if (action === 'input-change') {
      this.setState({ inputValue: search, preventFilter: false });

      this.executeLoadOptions(search);
    }
  };

  private fireEvent = (eventCreator: EventCreator, ...args: any[]) => {
    const { createAnalyticsEvent } = this.props;
    if (createAnalyticsEvent) {
      createAndFireEventInElementsChannel(
        eventCreator(this.props, this.state, this.session, ...args),
      )(createAnalyticsEvent);
    }
  };

  private startSession = () => {
    this.session = startSession();
    this.fireEvent(focusEvent);
  };

  componentDidUpdate(prevProps: UserPickerProps, prevState: UserPickerState) {
    const { menuIsOpen, options } = this.state;
    // load options when the picker open
    if (menuIsOpen && !prevState.menuIsOpen) {
      this.startSession();
      this.executeLoadOptions();
    }

    if (!menuIsOpen && prevState.menuIsOpen && this.session) {
      this.fireEvent(cancelEvent, prevState);
      this.session = undefined;
    }

    if (
      menuIsOpen &&
      ((!prevState.menuIsOpen && options.length > 0) ||
        options !== prevState.options)
    ) {
      this.fireEvent(searchedEvent);
    }

    if (
      !this.state.preventFilter &&
      this.state.inputValue !== prevState.inputValue
    ) {
      if (this.session) {
        this.session.inputChangeTime = Date.now();
      }
      callCallback(this.props.onInputChange, this.state.inputValue);
    }
  }

  private handleKeyDown = (event: React.KeyboardEvent) => {
    // Escape
    if (event.keyCode === 27) {
      this.selectRef.blur();
    }

    // Space
    if (event.keyCode === 32 && !this.state.inputValue) {
      event.preventDefault();
      this.setState({ inputValue: ' ' });
    }

    if (this.session) {
      this.session.lastKey = event.keyCode;
      switch (event.keyCode) {
        // KeyUp 38
        case 38:
          this.session.upCount++;
          break;
        // KeyDown 40
        case 40:
          this.session.downCount++;
          break;
      }
    }
  };

  handleClearIndicatorHover = (hoveringClearIndicator: boolean) => {
    this.setState({ hoveringClearIndicator });
  };

  private configureNoOptionsMessage = (): string | undefined =>
    this.props.noOptionsMessage;

  private getOptions = (): Option[] => getOptions(this.state.options) || [];

  render() {
    const {
      width,
      isMulti,
      anchor,
      isLoading,
      appearance,
      subtle,
      placeholder,
      isClearable,
      isDisabled,
      clearValueLabel,
      menuMinWidth,
      menuPortalTarget,
      addMoreMessage,
    } = this.props;
    const {
      count,
      hoveringClearIndicator,
      menuIsOpen,
      value,
      inputValue,
    } = this.state;
    return (
      <Select
        value={value}
        autoFocus={menuIsOpen}
        ref={this.handleSelectRef}
        isMulti={isMulti}
        options={this.getOptions()}
        onChange={this.handleChange}
        styles={getStyles(width)}
        components={getComponents(isMulti, anchor)}
        inputValue={inputValue}
        menuIsOpen={menuIsOpen}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        isLoading={count > 0 || isLoading}
        onInputChange={this.handleInputChange}
        menuPlacement="auto"
        placeholder={
          placeholder || <FormattedMessage {...messages.placeholder} />
        }
        addMoreMessage={addMoreMessage}
        classNamePrefix="fabric-user-picker"
        onClearIndicatorHover={this.handleClearIndicatorHover}
        hoveringClearIndicator={hoveringClearIndicator}
        appearance={isMulti ? 'compact' : appearance}
        isClearable={isClearable}
        subtle={isMulti ? false : subtle}
        blurInputOnSelect={!isMulti}
        closeMenuOnSelect={!isMulti}
        noOptionsMessage={this.configureNoOptionsMessage}
        openMenuOnFocus
        onKeyDown={this.handleKeyDown}
        isDisabled={isDisabled}
        isFocused={menuIsOpen}
        backspaceRemovesValue={isMulti}
        filterOption={null} // disable local filtering
        clearValueLabel={clearValueLabel}
        menuMinWidth={menuMinWidth}
        menuPortalTarget={menuPortalTarget}
      />
    );
  }
}

export const UserPicker: React.ComponentClass<
  UserPickerProps
> = withAnalyticsEvents()(UserPickerInternal);
