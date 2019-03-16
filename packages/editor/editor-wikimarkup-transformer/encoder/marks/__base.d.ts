/**
 * For text that has leading and ending space. We don't want to
 * convert it to `* strong *. Instead, we need it to be ` *strong* `
 */
export declare const baseMarkPattern: (text: string, token: string) => string;
