import * as React from 'react';
import { EmailValidator } from './components/emailValidation';
export declare type UserPickerProps = {
    /** List of users or teams to be used as options by the user picker. */
    options?: OptionData[];
    /** Width of the user picker field. It can be the amount of pixels as numbers or a string with the percentage. */
    width?: number | string;
    /** Sets the minimum width for the menu. If not set, menu will always have the same width of the field. */
    menuMinWidth?: number;
    /** Function used to load options asynchronously. */
    loadOptions?: LoadOptions;
    /** Callback for value change events fired whenever a selection is inserted or removed. */
    onChange?: OnChange;
    /** To enable multi user picker. */
    isMulti?: boolean;
    /** Input text value. */
    search?: string;
    /** Anchor for the user picker popup. */
    anchor?: React.ComponentType<any>;
    /** Controls if user picker menu is open or not. If not provided, UserPicker will control menu state internally. */
    open?: boolean;
    /** Show the loading indicator. */
    isLoading?: boolean;
    /** Callback for search input text change events. */
    onInputChange?: OnInputChange;
    /** Callback for when a selection is made. */
    onSelection?: OnOption;
    /** Callback for when the field gains focus. */
    onFocus?: OnPicker;
    /** Callback for when the field loses focus. */
    onBlur?: OnPicker;
    /** Callback for when the value/s in the picker is cleared. */
    onClear?: OnPicker;
    /** Callback that is triggered when popup picker is closed */
    onClose?: OnPicker;
    /** Appearance of the user picker. */
    appearance?: Appearance;
    /** Display the picker with a subtle style. */
    subtle?: boolean;
    /** Default value for the field to be used on initial render. */
    defaultValue?: Value;
    /** Placeholder text to be shown when there is no value in the field. */
    placeholder?: React.ReactNode;
    /** Message to encourage the user to add more items to user picker. */
    addMoreMessage?: string;
    /** Message to be shown when the menu is open but no options are provided. */
    noOptionsMessage?: string;
    /** Controls if the user picker has a value or not. If not provided, UserPicker will control the value internally. */
    value?: Value;
    /** Disable all interactions with the picker, putting it in a read-only state. */
    isDisabled?: boolean;
    /** Display a remove button on the single picker. True by default. */
    isClearable?: boolean;
    /** Optional tooltip to display on hover over the clear indicator. */
    clearValueLabel?: string;
    /** Whether the menu should use a portal, and where it should attach. */
    menuPortalTarget?: HTMLElement;
    /** Whether the user is allowed to enter emails as a value. */
    allowEmail?: boolean;
    /** Email option label */
    emailLabel?: string;
    /** Whether to disable interaction with the input */
    disableInput?: boolean;
    /** Override default email validation function. */
    isValidEmail?: EmailValidator;
};
export declare type PopupUserPickerProps = UserPickerProps & {
    /** Whether to use the popup version of the single picker */
    target: Target;
    /** Optional title assigned to popup picker */
    popupTitle?: string;
};
export declare type UserPickerState = {
    options: OptionData[];
    value?: AtlaskitSelectValue;
    inflightRequest: number;
    count: number;
    hoveringClearIndicator: boolean;
    menuIsOpen: boolean;
    inputValue: string;
};
export interface HighlightRange {
    start: number;
    end: number;
}
export interface UserHighlight {
    name: HighlightRange[];
    publicName: HighlightRange[];
}
export interface TeamHighlight {
    name: HighlightRange[];
    description?: HighlightRange[];
}
export interface OptionData {
    id: string;
    name: string;
    type?: 'user' | 'team' | 'email';
    fixed?: boolean;
}
export declare const UserType = "user";
export interface User extends OptionData {
    avatarUrl?: string;
    publicName?: string;
    highlight?: UserHighlight;
    byline?: string;
    type?: 'user';
}
export declare const TeamType = "team";
export interface Team extends OptionData {
    avatarUrl?: string;
    description?: string;
    memberCount?: number;
    includesYou?: boolean;
    highlight?: TeamHighlight;
    type: 'team';
}
export declare type Value = OptionData | OptionData[] | null | undefined;
export declare const EmailType = "email";
export interface Email extends OptionData {
    type: 'email';
}
export declare type ActionTypes = 'select-option' | 'deselect-option' | 'remove-value' | 'pop-value' | 'set-value' | 'clear' | 'create-option';
export declare type OnChange = (value: Value, action: ActionTypes) => void;
export declare type OnInputChange = (query?: string) => void;
export declare type OnPicker = () => void;
export declare type OnOption = (value: Value) => void;
export declare type Option = {
    label: string;
    value: string;
    data: OptionData;
};
export interface LoadOptions {
    (searchText?: string): Promisable<OptionData | OptionData[]> | Iterable<Promisable<OptionData[] | OptionData> | OptionData | OptionData[]>;
}
export declare type Promisable<T> = T | PromiseLike<T>;
export declare type InputActionTypes = 'set-value' | 'input-change' | 'input-blur' | 'menu-close';
export declare type AtlaskitSelectValue = Option | Array<Option> | null | undefined;
export declare type AtlasKitSelectChange = (value: AtlaskitSelectValue, extraInfo: {
    removedValue?: Option;
    option?: Option;
    action: ActionTypes;
}) => void;
export declare type Appearance = 'normal' | 'compact';
export declare type Target = (withRef: {
    ref: any;
}) => any;
