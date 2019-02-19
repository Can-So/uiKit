import { ErrorMessage, Field, HelperMessage } from '@atlaskit/form';
import UserPicker, {
  LoadOptions,
  OptionData,
  Value,
} from '@atlaskit/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';
import { FieldChildrenArgs, InvitationsCapabilitiesResponse } from '../types';
import { showInviteWarning } from './utils';

export const REQUIRED = 'REQUIRED';
const validate = (value: OptionData[]) =>
  value && value.length > 0 ? undefined : REQUIRED;

export type Props = {
  loadOptions?: LoadOptions;
  defaultValue?: OptionData[];
  capabilities?: InvitationsCapabilitiesResponse;
  capabilitiesInfoMessage?: React.ReactNode;
};

export const UserPickerField: React.StatelessComponent<Props> = props => (
  <Field name="users" validate={validate} defaultValue={props.defaultValue}>
    {({ fieldProps, error, meta: { valid } }: FieldChildrenArgs<Value>) => (
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
              allowEmail
            />
          )}
        </FormattedMessage>
        {showInviteWarning(props.capabilities, fieldProps.value) && (
          <HelperMessage>
            {props.capabilitiesInfoMessage || (
              <FormattedMessage {...messages.capabilitiesInfoMessage} />
            )}
          </HelperMessage>
        )}
        {!valid && error === REQUIRED && (
          <ErrorMessage>
            <FormattedMessage {...messages.userPickerRequiredMessage} />
          </ErrorMessage>
        )}
      </>
    )}
  </Field>
);
