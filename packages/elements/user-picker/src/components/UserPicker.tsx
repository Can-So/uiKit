import Select from '@atlaskit/select';
import * as debounce from 'lodash.debounce';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  InputActionTypes,
  User,
  UserPickerProps,
  UserPickerState,
} from '../types';
import { batchByKey } from './batch';
import { getComponents } from './components';
import { messages } from './i18n';
import { getStyles } from './styles';
import {
  extractUserValue,
  getOptions,
  isIterable,
  usersToOptions,
} from './utils';

export class UserPicker extends React.Component<
  UserPickerProps,
  UserPickerState
> {
  static defaultProps = {
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
    if (nextProps.value) {
      derivedState.value = usersToOptions(nextProps.value);
    } else if (nextProps.defaultValue && !prevState.value) {
      derivedState.value = usersToOptions(nextProps.defaultValue);
    }
    return derivedState;
  }

  private selectRef;

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      resultVersion: 0,
      inflightRequest: 0,
      count: 0,
      hoveringClearIndicator: false,
      menuIsOpen: false,
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

  public selectOption = this.withSelectRef(select => {
    const focusedOption = select.state.focusedOption;
    select.selectOption(focusedOption);
  });

  private handleChange = (value, { action, removedValue }) => {
    if (removedValue && removedValue.user.fixed) {
      return;
    }
    const { onChange, onSelection } = this.props;

    if (onChange) {
      onChange(extractUserValue(value), action);
    }

    if (action === 'select-option' && onSelection) {
      onSelection(value.user);
    }

    if (!this.props.value) {
      this.setState({ value });
    }
  };

  private handleSelectRef = ref => {
    this.selectRef = ref;
  };

  private addUsers = batchByKey(
    (request: string, newUsers: (User | User[])[]) => {
      this.setState(({ inflightRequest, users, resultVersion, count }) => {
        if (inflightRequest.toString() === request) {
          return {
            users: (resultVersion === inflightRequest ? users : []).concat(
              newUsers.reduce<User[]>(
                (nextUsers, item) => nextUsers.concat(item[0]),
                [],
              ),
            ),
            resultVersion: inflightRequest,
            count: count - newUsers.length,
          };
        }
        return null;
      });
    },
  );

  private executeLoadOptions = debounce((search?: string) => {
    const { loadUsers } = this.props;
    if (loadUsers) {
      this.setState(({ inflightRequest: previousRequest }) => {
        const inflightRequest = previousRequest + 1;
        const result = loadUsers(search);
        const addUsers = this.addUsers.bind(this, inflightRequest.toString());
        let count = 0;
        if (isIterable(result)) {
          for (const value of result) {
            Promise.resolve(value).then(addUsers);
            count++;
          }
        } else {
          Promise.resolve(result).then(addUsers);
          count++;
        }
        return {
          inflightRequest,
          count,
        };
      });
    }
  }, 200);

  private handleFocus = () => {
    this.setState({ menuIsOpen: true });
  };

  private handleBlur = () => {
    this.setState({ menuIsOpen: false });
  };

  private handleInputChange = (
    search: string,
    { action }: { action: InputActionTypes },
  ) => {
    const { onInputChange } = this.props;
    // TODO FS-3184: If isClearable = false, have value persist unless
    // another option is explicitly selected
    if (action === 'input-change') {
      if (onInputChange) {
        onInputChange(search);
      }
      this.executeLoadOptions(search);
    }
  };

  private triggerInputChange = this.withSelectRef(select => {
    select.onInputChange(this.props.search, { action: 'input-change' });
  });

  componentDidUpdate(prevProps: UserPickerProps, prevState: UserPickerState) {
    // trigger onInputChange
    if (this.props.search !== prevProps.search) {
      this.triggerInputChange();
    }

    // load options when the picker open
    if (this.state.menuIsOpen && !prevState.menuIsOpen) {
      this.executeLoadOptions();
    }
  }

  private handleKeyDown = (event: React.KeyboardEvent) => {
    // Escape
    if (event.keyCode === 27) {
      this.selectRef.blur();
    }
  };

  handleClearIndicatorHover = (hoveringClearIndicator: boolean) => {
    this.setState({ hoveringClearIndicator });
  };

  private configureNoOptionsMessage = (): string | undefined =>
    this.props.noOptionsMessage;

  render() {
    const {
      width,
      isMulti,
      search,
      anchor,
      users,
      isLoading,
      appearance,
      subtle,
      placeholder,
      isClearable,
      isDisabled,
    } = this.props;
    const {
      users: usersFromState,
      count,
      hoveringClearIndicator,
      menuIsOpen,
      value,
    } = this.state;

    const numValues: number = value ? value.length : 0;
    const hasValue = numValues > 0;

    const options = getOptions(usersFromState, users) || [];
    const hasSelectedAll: boolean = numValues === options.length && !isLoading;

    return (
      <Select
        value={value}
        ref={this.handleSelectRef}
        isMulti={isMulti}
        options={options}
        onChange={this.handleChange}
        styles={getStyles(width, hasValue)}
        components={getComponents(isMulti, hasValue && !hasSelectedAll, anchor)}
        inputValue={search}
        menuIsOpen={menuIsOpen}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        isLoading={count > 0 || isLoading}
        onInputChange={this.handleInputChange}
        menuPlacement="auto"
        placeholder={
          placeholder || <FormattedMessage {...messages.placeholder} />
        }
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
      />
    );
  }
}
