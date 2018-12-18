// @flow
import React, { type Node } from 'react';
import Field from './Field';

type FieldProps = {
  isChecked: boolean,
  onChange: any => any,
  onBlur: () => any,
  onFocus: () => any,
  value: any,
};

type Meta = {
  dirty: boolean,
  touched: boolean,
  valid: boolean,
  error: any,
  submitError: any,
};

type Props = {
  /* Children to render in the field. Called with form information. */
  children: ({ fieldProps: FieldProps, error: any, meta: Meta }) => Node,
  /* The default checked state of the checkbox */
  defaultIsChecked: boolean,
  /* Whether the field is required for submission */
  isRequired?: boolean,
  /* Label displayed above the field */
  label?: Node,
  /* The name of the field */
  name: string,
  /* The value of the checkbox. Used as the value in the form state when the checkbox is checked */
  value?: string,
};

const CheckboxField = (props: Props) => {
  const { children, defaultIsChecked = false, value, ...rest } = props;
  return value !== undefined ? (
    <Field
      {...rest}
      defaultValue={(currentValue = []) =>
        defaultIsChecked ? [...currentValue, value] : currentValue
      }
      transform={(event: SyntheticInputEvent<>, currentValue) =>
        event.target.checked
          ? [...currentValue, value]
          : currentValue.filter(v => v !== value)
      }
    >
      {({ fieldProps: { value: fieldValue, ...otherFieldProps }, ...others }) =>
        children({
          fieldProps: {
            ...otherFieldProps,
            isChecked: !!fieldValue.find(v => v === value),
            value,
          },
          ...others,
        })
      }
    </Field>
  ) : (
    <Field
      {...rest}
      defaultValue={defaultIsChecked}
      transform={(event: SyntheticInputEvent<>) => event.target.checked}
    >
      {({ fieldProps: { value: fieldValue, ...otherFieldProps }, ...others }) =>
        children({
          fieldProps: {
            ...otherFieldProps,
            isChecked: fieldValue,
            value,
          },
          ...others,
        })
      }
    </Field>
  );
};

CheckboxField.defaultProps = {
  defaultIsChecked: false,
};

export default CheckboxField;
