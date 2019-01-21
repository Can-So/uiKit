import FieldTextArea from '@atlaskit/field-text-area';
import { Field } from '@atlaskit/form';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';

export const CommentField: React.StatelessComponent<{}> = () => (
  <Field name="comment">
    {({ fieldProps }) => (
      <FormattedMessage {...messages.commentPlaceholder}>
        {placeholder => (
          <FieldTextArea
            {...fieldProps}
            minimumRows={3}
            shouldFitContainer
            isLabelHidden
            placeholder={placeholder as string}
          />
        )}
      </FormattedMessage>
    )}
  </Field>
);
