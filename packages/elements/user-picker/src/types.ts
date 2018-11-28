export type UserPickerProps = {
  users?: User[];
  width?: number;
  loadUsers?: LoadOptions;
  onChange?: OnChange;
  isMulti?: boolean;
  search?: string;
  anchor?: React.ComponentType<any>;
  open?: boolean;
  isLoading?: boolean;
  onInputChange?: OnInputChange;
  onSelection?: OnUser;
  onFocus?: OnPicker;
  onBlur?: OnPicker;
  blurInputOnSelect?: boolean;
  appearance?: 'normal' | 'compact';
  subtle?: boolean;
  defaultValue?: UserValue;
  placeholder?: string;
  noOptionsMessage?: string;
  value?: UserValue;
  /** Disable all interactions with the picker, putting it in a read-only state. */
  isDisabled?: boolean;
  /** Display a remove button on the single picker. True by default. */
  isClearable?: boolean;
};

export type UserPickerState = {
  users: User[];
  value?: UserOption[] | UserOption;
  resultVersion: number;
  inflightRequest: number;
  count: number;
  hoveringClearIndicator: boolean;
  menuIsOpen: boolean;
  inputValue: string;
  preventFilter: boolean;
};

export interface HighlightRange {
  start: number;
  end: number;
}

export interface Highlight {
  name: HighlightRange[];
  nickname: HighlightRange[];
}

export interface User {
  id: string;
  avatarUrl?: string;
  name?: string;
  nickname: string;
  highlight?: Highlight;
  badge?: string;
  fixed?: boolean;
}

export type UserValue = User | Array<User> | null | undefined;

export type ActionTypes =
  | 'select-option'
  | 'deselect-option'
  | 'remove-value'
  | 'pop-value'
  | 'set-value'
  | 'clear'
  | 'create-option';

export type OnChange = (value: UserValue, action: ActionTypes) => void;

export type OnInputChange = (query?: string) => void;

export type OnPicker = () => void;

export type OnUser = (value: UserValue) => void;

export type UserOption = {
  label: string;
  value: string;
  user: User;
};

export interface LoadOptions {
  (searchText?: string):
    | Promisable<User | User[]>
    | Iterable<Promisable<User[] | User> | User | User[]>;
}

export type Promisable<T> = T | PromiseLike<T>;

export type InputActionTypes =
  | 'set-value'
  | 'input-change'
  | 'input-blur'
  | 'menu-close';
