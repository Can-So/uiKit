import FieldTextArea from '@atlaskit/field-text-area';
import { Field } from '@atlaskit/form';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';
import { Comment, FieldChildrenArgs } from '../types';

export type Props = {
  defaultValue?: Comment;
};

export const CommentField: React.StatelessComponent<Props> = ({
  defaultValue,
}) => (
  <Field name="comment" defaultValue={defaultValue}>
    {({ fieldProps }: FieldChildrenArgs<Comment>) => (
      <FormattedMessage {...messages.commentPlaceholder}>
        {placeholder => (
          <FieldTextArea
            {...fieldProps}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              fieldProps.onChange({
                format: 'plain_text',
                value: event.target.value,
              })
            }
            value={fieldProps.value && fieldProps.value.value}
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
