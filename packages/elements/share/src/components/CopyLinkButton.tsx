import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import Button from '@atlaskit/button';
import LinkFilledIcon from '@atlaskit/icon/glyph/link-filled';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import InlineDialog from '@atlaskit/inline-dialog';
import { messages } from '../i18n';

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin: -10px -15px;
`;

const MessageSpan = styled.span`
  text-indent: 6px;
`;

type InputProps = {
  ref?: React.RefObject<HTMLInputElement>;
  text: string;
};

export const HiddenInput: React.ComponentType<InputProps> = React.forwardRef(
  (props: { text: string }, ref?: React.Ref<HTMLInputElement>) => (
    <input
      style={{ position: 'absolute', left: '-9999px' }}
      ref={ref}
      value={props.text}
    />
  ),
);

type Props = {
  onLinkCopy?: (link: string) => void;
  link: string;
};

export const NoPaddingButton = styled(Button)`
  padding: 0;
`;

export class CopyLinkButton extends React.Component<Props> {
  private inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  state = {
    shouldShowCopiedMessage: false,
  };

  private handleClick = () => {
    if (this.inputRef.current) {
      this.inputRef.current!.select();
    }
    document.execCommand('copy');

    if (this.props.onLinkCopy) {
      this.props.onLinkCopy!(this.props.link);
    }
    this.setState({ shouldShowCopiedMessage: true });
  };

  handleDismissCopiedMessage = () => {
    this.setState({ shouldShowCopiedMessage: false });
  };

  render() {
    const { shouldShowCopiedMessage } = this.state;

    return (
      <>
        <HiddenInput ref={this.inputRef} text={this.props.link} />
        <InlineDialog
          content={
            <MessageContainer>
              <CheckCircleIcon
                label="check circle icon"
                primaryColor={colors.G300}
              />
              <MessageSpan>
                <FormattedMessage {...messages.copiedToClipboardMessage} />
              </MessageSpan>
            </MessageContainer>
          }
          isOpen={shouldShowCopiedMessage}
          onClose={this.handleDismissCopiedMessage}
          placement="top-start"
        >
          <NoPaddingButton
            appearance="subtle-link"
            iconBefore={<LinkFilledIcon label="copy link icon" />}
            onClick={this.handleClick}
          >
            <FormattedMessage {...messages.copyLinkButtonText} />
          </NoPaddingButton>
        </InlineDialog>
      </>
    );
  }
}
