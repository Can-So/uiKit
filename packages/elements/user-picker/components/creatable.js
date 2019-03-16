import memoizeOne from 'memoize-one';
import { EmailType } from '../types';
import { isValidEmail as defaultIsValidEmail, } from './emailValidation';
import { isEmail } from './utils';
var validOption = ['VALID', 'POTENTIAL'];
var isValidNewOption = function (isValidEmail) {
    if (isValidEmail === void 0) { isValidEmail = defaultIsValidEmail; }
    return function (inputValue) {
        return inputValue && validOption.indexOf(isValidEmail(inputValue)) !== -1;
    };
};
var getNewOptionData = function (inputValue) { return ({
    label: inputValue,
    value: inputValue,
    data: {
        id: inputValue,
        name: inputValue,
        type: EmailType,
    },
}); };
var formatCreateLabel = function (inputText) {
    if (inputText) {
        return inputText.trim();
    }
    return '';
};
var isOptionDisabled = function (isValidEmail) {
    if (isValidEmail === void 0) { isValidEmail = defaultIsValidEmail; }
    return function (option) {
        if (isEmail(option.data)) {
            return isValidEmail(option.data.id) !== 'VALID';
        }
        return false;
    };
};
export var getCreatableProps = memoizeOne(function (isValidEmail) { return ({
    allowCreateWhileLoading: true,
    createOptionPosition: 'first',
    isValidNewOption: isValidNewOption(isValidEmail),
    getNewOptionData: getNewOptionData,
    formatCreateLabel: formatCreateLabel,
    isOptionDisabled: isOptionDisabled(isValidEmail),
}); });
//# sourceMappingURL=creatable.js.map