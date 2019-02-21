import { SyntheticEvent } from 'react';

// @atlaskit/form types
// TODO remove this when Form is migrated to TypeScript.
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
  getValues: () => T;
};
