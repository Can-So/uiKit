import { ErrorMessage, Field } from '@atlaskit/form';
import UserPicker, { LoadOptions, OptionData } from '@atlaskit/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';

export const REQUIRED = 'REQUIRED';
const validate = (value: OptionData[]) =>
  value && value.length > 0 ? undefined : REQUIRED;

export type Props = {
  loadOptions: LoadOptions;
};

export const UserPickerField: React.StatelessComponent<Props> = props => (
  <Field name="users" validate={validate}>
    {({ fieldProps, error, meta: { valid } }) => (
      <>
        <FormattedMessage {...messages.userPickerAddMoreMessage}>
          {addMore => (
            <UserPicker
              {...fieldProps}
              loadOptions={props.loadOptions}
              isMulti
              width="100%"
              placeholder={
                <FormattedMessage {...messages.userPickerPlaceholder} />
              }
              addMoreMessage={addMore as string}
            />
          )}
        </FormattedMessage>
        {!valid && error === REQUIRED && (
          <ErrorMessage>
            <FormattedMessage {...messages.userPickerRequiredMessage} />
          </ErrorMessage>
        )}
      </>
    )}
  </Field>
);
