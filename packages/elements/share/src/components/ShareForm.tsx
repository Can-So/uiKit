import Button from '@atlaskit/button';
import Form, { FormFooter, FormSection } from '@atlaskit/form';
import { LoadOptions } from '@atlaskit/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';
import { CommentField } from './CommentField';
import { ShareHeader } from './ShareHeader';
import { UserPickerField } from './UserPickerField';

type Props = {
  title?: string;
  loadOptions: LoadOptions;
  shareActive?: boolean;
  onShareClick?: Function;
};

export const ShareForm: React.StatelessComponent<Props> = (props: Props) => (
  <Form onSubmit={props.onShareClick}>
    {({ formProps }) => (
      <form {...formProps}>
        <ShareHeader title={props.title} />
        <FormSection>
          <UserPickerField />
          <CommentField />
        </FormSection>
        <FormFooter>
          <Button appearance="primary" type="submit">
            <FormattedMessage {...messages.formSend} />
          </Button>
        </FormFooter>
      </form>
    )}
  </Form>
);

ShareForm.defaultProps = {
  onShareClick: () => {},
};
