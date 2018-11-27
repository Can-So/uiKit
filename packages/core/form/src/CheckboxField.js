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
  /* The value of the checkbox. This will be the value used when the checkbox is checked */
  value?: string,
};

const getIsChecked = (value, current) => {
  if (value !== undefined) {
    return !!current.find(v => v === value);
  }
  return current;
};

const getDefaultValue = (value, defaultIsChecked) => {
  if (value !== undefined) {
    return defaultIsChecked ? [value] : [];
  }
  return defaultIsChecked;
};

const CheckboxField = ({
  children,
  defaultIsChecked = false,
  value,
  ...rest
}: Props) => {
  return (
    <Field
      defaultValue={getDefaultValue(value, defaultIsChecked)}
      {...rest}
      transform={(event: SyntheticInputEvent<>, current) => {
        if (value !== undefined) {
          return event.target.checked
            ? [...current, value]
            : current.filter(v => v !== value);
        }
        return event.target.checked;
      }}
    >
      {({ fieldProps: { value: fieldValue, ...otherFieldProps }, ...others }) =>
        children({
          fieldProps: {
            ...otherFieldProps,
            isChecked: getIsChecked(value, fieldValue),
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
