export type EmailValidationResponse = 'INVALID' | 'POTENTIAL' | 'VALID';

const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const potentialRegex = /^[^\s@]+@[^\s@]*$/i;

export const isValidEmail = (inputText: string): EmailValidationResponse => {
  if (inputText.match(validRegex)) {
    return 'VALID';
  }
  if (inputText.match(potentialRegex)) {
    return 'POTENTIAL';
  }
  return 'INVALID';
};
