import { SyntheticEvent } from 'react';

/* @atlaskit/form types. Should be removed when they migrate to TS */
interface OnChange<T> {
  (value: T): void;
  (event: SyntheticEvent): void;
}

export type FieldChildrenArgs<T> = {
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

export type FormChildrenArgs<T> = {
  formProps: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
  getState: () => T;
};
