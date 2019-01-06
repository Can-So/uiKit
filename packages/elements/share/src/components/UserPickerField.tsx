import { Field } from '@atlaskit/form';
import UserPicker, { OptionData } from '@atlaskit/user-picker';
import { userPickerData } from '@atlaskit/util-data-test';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';

const validate = (value: OptionData[]) => {
  console.log('validate');
  return value && value.length > 0 ? undefined : 'REQUIRED';
};

export const UserPickerField = () => (
  <Field name="users" validate={validate}>
    {({ fieldProps }) => (
      <FormattedMessage {...messages.userPickerAddMoreMessage}>
        {addMore => (
          <FormattedMessage {...messages.userPickerPlaceholder}>
            {placeholder => (
              <UserPicker
                {...fieldProps}
                options={userPickerData}
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
