import { SyntheticEvent } from 'react';
interface OnChange<T> {
    (value: T): void;
    (event: SyntheticEvent): void;
}
export declare type FieldChildrenArgs<T> = {
    fieldProps: {
        value: T;
        onChange: OnChange<T>;
    };
    error?: string;
    meta: {
        valid: boolean;
        dirty: boolean;
    };
};
export declare type FormChildrenArgs<T> = {
    formProps: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
    getValues: () => T;
};
export {};
