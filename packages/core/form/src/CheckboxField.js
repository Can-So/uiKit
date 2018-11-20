// @flow
import React, { type Node } from 'react';
import Field from './FieldNext';

type Props = {
  /* Children to render in the field. Called with form information. */
  children: ({ fieldProps: { isChecked: boolean, value?: string } }) => Node,
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

const CheckboxField = ({
  children,
  defaultIsChecked = false,
  value,
  ...rest
}: Props) => {
  const defaultValue = (() => {
    if (value) {
      return defaultIsChecked ? value : undefined;
    }
    return defaultIsChecked;
  })();
  return (
    <Field defaultValue={defaultValue} {...rest}>
      {({ fieldProps: { value: fieldValue, ...otherFieldProps }, ...others }) =>
        children({
          fieldProps: { ...otherFieldProps, isChecked: !!fieldValue, value },
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
