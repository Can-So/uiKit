import { Field } from '@atlaskit/form';
import UserPicker, { LoadOptions, OptionData } from '@atlaskit/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';

const validate = (value: OptionData[]) =>
  value && value.length > 0 ? undefined : 'REQUIRED';

export namespace UserPickerField {
  export type Props = {
    loadOptions: LoadOptions;
  };
}

export const UserPickerField = (props: UserPickerField.Props) => (
  <Field name="users" validate={validate}>
    {({ fieldProps }) => (
      <FormattedMessage {...messages.userPickerAddMoreMessage}>
        {addMore => (
          <FormattedMessage {...messages.userPickerPlaceholder}>
            {placeholder => (
              <UserPicker
                {...fieldProps}
                loadOptions={props.loadOptions}
                isMulti
                width="100%"
                placeholder={placeholder as string}
                addMoreMessage={addMore as string}
              />
            )}
          </FormattedMessage>
        )}
      </FormattedMessage>
    )}
  </Field>
);
