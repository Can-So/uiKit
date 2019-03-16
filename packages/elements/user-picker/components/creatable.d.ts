import { Option } from '../types';
import { EmailValidator } from './emailValidation';
export declare const getCreatableProps: (isValidEmail?: EmailValidator | undefined) => {
    allowCreateWhileLoading: boolean;
    createOptionPosition: string;
    isValidNewOption: (inputValue?: string | undefined) => boolean | "" | undefined;
    getNewOptionData: (inputValue: string) => Option;
    formatCreateLabel: (inputText?: string | undefined) => string;
    isOptionDisabled: (option: Option) => boolean;
};
