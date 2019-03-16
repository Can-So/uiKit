export declare type EmailValidationResponse = 'INVALID' | 'POTENTIAL' | 'VALID';
export declare type EmailValidator = (inputText: string) => EmailValidationResponse;
export declare const isValidEmail: EmailValidator;
