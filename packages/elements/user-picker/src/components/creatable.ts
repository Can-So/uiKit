import memoizeOne from 'memoize-one';
import { EmailType, Option } from '../types';
import { EmailValidationResponse, isValidEmail } from './emailValidation';
import { isEmail } from './utils';

const validOption: EmailValidationResponse[] = ['VALID', 'POTENTIAL'];

const isValidNewOption = (inputValue?: string) =>
  inputValue && validOption.indexOf(isValidEmail(inputValue)) !== -1;

const getNewOptionData = (inputValue: string): Option => ({
  label: inputValue,
  value: inputValue,
  data: {
    id: inputValue,
    name: inputValue,
    type: EmailType,
  },
});

const formatCreateLabel = (inputText?: string) => {
  if (inputText) {
    return inputText.trim();
  }
  return '';
};

const isOptionDisabled = (option: Option) => {
  if (isEmail(option.data)) {
    return isValidEmail(option.data.id) !== 'VALID';
  }
  return false;
};

export const getCreatableProps = memoizeOne((isCreatable?: boolean) => {
  if (isCreatable) {
    return {
      allowCreateWhileLoading: true,
      createOptionPosition: 'first',
      isValidNewOption,
      getNewOptionData,
      formatCreateLabel,
      isOptionDisabled,
    };
  }
  return {};
});
