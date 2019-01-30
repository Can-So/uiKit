import Button from '@atlaskit/button';
import Form, { FormFooter, FormSection, HelperMessage } from '@atlaskit/form';
import { LoadOptions } from '@atlaskit/user-picker';
import Spinner from '@atlaskit/spinner';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from '../i18n';
import { CommentField } from './CommentField';
import { ShareHeader } from './ShareHeader';
import { UserPickerField } from './UserPickerField';
import { CopyLinkButton } from './CopyLinkButton';
import { User } from '../types';

const LeftAlignmentContainer = styled.div`
  margin-right: auto;
`;

type ShareError = {
  message: string;
} | null;

export type Props = {
  capabilitiesInfoMessage?: React.ReactNode;
  copyLink: string;
  isSharing?: boolean;
  loadOptions: LoadOptions;
  onCommentChange?: (event: React.SyntheticEvent) => void;
  onLinkCopy?: (link: string) => void;
  onShareClick?: Function;
  onUsersChange?: (users: User[]) => void;
  shareError?: ShareError;
  shouldShowCapabilitiesInfoMessage?: boolean;
  submitButtonLabel?: React.ReactNode;
  title?: React.ReactNode;
};

export const ShareForm: React.StatelessComponent<Props> = props => (
  <Form onSubmit={props.onShareClick}>
    {({ formProps }) => (
      <form {...formProps}>
        <ShareHeader title={props.title} />
        <FormSection>
          <UserPickerField loadOptions={props.loadOptions} />
          {props.shouldShowCapabilitiesInfoMessage && (
            <HelperMessage>
              {props.capabilitiesInfoMessage || (
                <FormattedMessage {...messages.capabilitiesInfoMessage} />
              )}
            </HelperMessage>
          )}
          <CommentField />
        </FormSection>
        <FormFooter>
          <LeftAlignmentContainer>
            <CopyLinkButton
              onLinkCopy={props.onLinkCopy}
              link={props.copyLink}
            />
          </LeftAlignmentContainer>
          {props.isSharing ? (
            <Spinner size="medium" />
          ) : (
            <Button appearance="primary" type="submit">
              {props.submitButtonLabel || (
                <FormattedMessage {...messages.formSend} />
              )}
            </Button>
          )}
        </FormFooter>
      </form>
    )}
  </Form>
);

ShareForm.defaultProps = {
  isSharing: false,
  onShareClick: () => {},
  shouldShowCapabilitiesInfoMessage: false,
};
