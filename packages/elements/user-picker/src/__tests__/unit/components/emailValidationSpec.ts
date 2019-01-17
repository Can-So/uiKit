import { isValidEmail } from '../../../components/emailValidation';

describe('emailValidation', () => {
  test.each([
    ['INVALID', ''],
    ['INVALID', ' '],
    ['INVALID', 'abc'],
    ['INVALID', '123'],
    ['POTENTIAL', 'someEmail@'],
    ['VALID', 'someEmail@atlassian.com'],
  ])('should return "%s" for "%s" input text', (expectation, inputText) => {
    expect(isValidEmail(inputText)).toEqual(expectation);
  });
});
