import FieldTextArea from '@atlaskit/field-text-area';
import { Field } from '@atlaskit/form';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';

type Props = {
  onChange?: Function;
};

export const CommentField: React.StatelessComponent<Props> = props => (
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
            onChange={props.onChange}
          />
        )}
      </FormattedMessage>
    )}
  </Field>
);
