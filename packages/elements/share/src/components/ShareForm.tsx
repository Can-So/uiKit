import Button from '@atlaskit/button';
import Form, { FormFooter, FormSection } from '@atlaskit/form';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { colors } from '@atlaskit/theme';
import Tooltip from '@atlaskit/tooltip';
import { LoadOptions, OptionData } from '@atlaskit/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from '../i18n';
import {
  Comment,
  DialogContentState,
  FormChildrenArgs,
  InvitationsCapabilitiesResponse,
} from '../types';
import { CommentField } from './CommentField';
import { CopyLinkButton } from './CopyLinkButton';
import { ShareHeader } from './ShareHeader';
import { UserPickerField } from './UserPickerField';

const LeftAlignmentContainer = styled.div`
  margin-right: auto;
`;

const CenterAlignedIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

type ShareError = {
  message: string;
} | null;

export type ShareData = {
  users: OptionData[];
  comment: Comment;
};

export type Props = {
  capabilitiesInfoMessage?: React.ReactNode;
  capabilities?: InvitationsCapabilitiesResponse;
  copyLink: string;
  isSharing?: boolean;
  loadOptions?: LoadOptions;
  onLinkCopy?: (link: string) => void;
  onShareClick?: (data: ShareData) => void;
  shareError?: ShareError;
  submitButtonLabel?: React.ReactNode;
  title?: React.ReactNode;
  onDismiss?: (data: ShareData) => void;
  defaultValue?: DialogContentState;
};

export type InternalFormProps = FormChildrenArgs<ShareData> & Props;

class InternalForm extends React.PureComponent<InternalFormProps> {
  componentWillUnmount() {
    const { onDismiss, getValues } = this.props;
    if (onDismiss) {
      onDismiss(getValues());
    }
  }

  render() {
    const {
      formProps,
      title,
      loadOptions,
      capabilitiesInfoMessage,
      onLinkCopy,
      copyLink,
      submitButtonLabel,
      defaultValue,
      capabilities,
      shareError,
      isSharing,
    } = this.props;
    return (
      <form {...formProps}>
        <ShareHeader title={title} />
        <FormSection>
          <UserPickerField
            loadOptions={loadOptions}
            defaultValue={defaultValue && defaultValue.users}
            capabilitiesInfoMessage={capabilitiesInfoMessage}
            capabilities={capabilities}
          />
          <CommentField defaultValue={defaultValue && defaultValue.comment} />
        </FormSection>
        <FormFooter>
          <LeftAlignmentContainer>
            <CopyLinkButton onLinkCopy={onLinkCopy} link={copyLink} />
          </LeftAlignmentContainer>
          {shareError ? (
            <>
              <CenterAlignedIconWrapper>
                <Tooltip
                  content={
                    <FormattedMessage {...messages.shareFailureMessage} />
                  }
                  position="top"
                >
                  <ErrorIcon label="errorIcon" primaryColor={colors.R400} />
                </Tooltip>
              </CenterAlignedIconWrapper>
              <Button appearance="warning" type="submit">
                <strong>
                  <FormattedMessage {...messages.formRetry} />
                </strong>
              </Button>
            </>
          ) : (
            <Button appearance="primary" type="submit" isLoading={isSharing}>
              {submitButtonLabel || <FormattedMessage {...messages.formSend} />}
            </Button>
          )}
        </FormFooter>
      </form>
    );
  }
}

export const ShareForm: React.StatelessComponent<Props> = props => (
  <Form onSubmit={props.onShareClick}>
    {({ formProps, getValues }: FormChildrenArgs<ShareData>) => (
      <InternalForm {...props} formProps={formProps} getValues={getValues} />
    )}
  </Form>
);

ShareForm.defaultProps = {
  isSharing: false,
  onShareClick: () => {},
};
