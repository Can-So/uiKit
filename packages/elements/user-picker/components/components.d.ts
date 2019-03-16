/// <reference types="react" />
import { ClearIndicator } from './ClearIndicator';
import { MultiValue } from './MultiValue';
import { MultiValueContainer } from './MultiValueContainer';
import { Input } from './Input';
import { SingleValueContainer } from './SingleValueContainer';
import { PopupInput } from './PopupInput';
import { PopupControl } from './PopupControl';
/**
 * Memoize getComponents to avoid rerenders.
 */
export declare const getComponents: (multi?: boolean | undefined, anchor?: import("react").ComponentClass<any, any> | import("react").StatelessComponent<any> | undefined) => {
    Control: import("react").ComponentType<any>;
    Option: import("react").StatelessComponent<import("./Option").OptionProps>;
    MultiValue?: undefined;
    DropdownIndicator?: undefined;
    SingleValue?: undefined;
    ClearIndicator?: undefined;
    ValueContainer?: undefined;
    Input?: undefined;
} | {
    MultiValue: typeof MultiValue;
    DropdownIndicator: null;
    SingleValue: (props: {
        data: import("../types").Option;
        selectProps: any;
    }) => JSX.Element | null;
    ClearIndicator: typeof ClearIndicator | null;
    Option: import("react").StatelessComponent<import("./Option").OptionProps>;
    ValueContainer: typeof MultiValueContainer | typeof SingleValueContainer;
    Input: typeof Input;
    Control?: undefined;
};
export declare const getPopupComponents: (hasPopupTitle: boolean) => {
    DropdownIndicator: null;
    SingleValue: (props: {
        data: import("../types").Option;
        selectProps: any;
    }) => JSX.Element | null;
    ClearIndicator: typeof ClearIndicator;
    Option: import("react").StatelessComponent<import("./Option").OptionProps>;
    ValueContainer: typeof SingleValueContainer;
    Input: typeof PopupInput;
} | {
    Control: typeof PopupControl;
    DropdownIndicator: null;
    SingleValue: (props: {
        data: import("../types").Option;
        selectProps: any;
    }) => JSX.Element | null;
    ClearIndicator: typeof ClearIndicator;
    Option: import("react").StatelessComponent<import("./Option").OptionProps>;
    ValueContainer: typeof SingleValueContainer;
    Input: typeof PopupInput;
};
