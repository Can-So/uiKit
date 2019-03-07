import { ButtonAppearances } from '@atlaskit/button';
import InlineDialog from '@atlaskit/inline-dialog';
import { LoadOptions } from '@atlaskit/user-picker';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from '../i18n';
import { ConfigResponse, DialogContentState, ShareButtonStyle } from '../types';
import { ShareButton } from './ShareButton';
import { ShareForm } from './ShareForm';

type RenderChildren = (
  args: { onClick: () => void; loading: boolean; error?: ShareError },
) => React.ReactNode;

type DialogState = {
  isDialogOpen: boolean;
  isSharing: boolean;
  shareError?: ShareError;
  ignoreIntermediateState: boolean;
  defaultValue: DialogContentState;
};

export type State = DialogState;

type ShareError = {
  message: string;
};

export type Props = {
  buttonStyle?: ShareButtonStyle;
  config?: ConfigResponse;
  children?: RenderChildren;
  copyLink: string;
  isDisabled?: boolean;
  loadUserOptions?: LoadOptions;
  onLinkCopy?: Function;
  onShareSubmit?: (shareContentState: DialogContentState) => Promise<any>;
  shareFormTitle?: React.ReactNode;
  shouldCloseOnEscapePress?: boolean;
  triggerButtonAppearance?: ButtonAppearances;
  triggerButtonStyle?: ShareButtonStyle;
};

// 448px is the max-width of a inline dialog
const InlineDialogFormWrapper = styled.div`
  width: 448px;
`;

export const defaultShareContentState: DialogContentState = {
  users: [],
  comment: {
    format: 'plain_text' as 'plain_text',
    value: '',
  },
};

export class ShareDialogWithTrigger extends React.Component<Props, State> {
  static defaultProps = {
    isDisabled: false,
    shouldCloseOnEscapePress: false,
    triggerButtonAppearance: 'subtle',
    triggerButtonStyle: 'icon-only' as 'icon-only',
  };
  private containerRef = React.createRef<HTMLDivElement>();

  escapeIsHeldDown: boolean = false;

  state: State = {
    isDialogOpen: false,
    isSharing: false,
    ignoreIntermediateState: false,
    defaultValue: defaultShareContentState,
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { isDialogOpen } = this.state;
    if (isDialogOpen) {
      switch (event.key) {
        case 'Escape':
          event.stopPropagation();
          this.setState({
            isDialogOpen: false,
            ignoreIntermediateState: true,
            defaultValue: defaultShareContentState,
          });
      }
    }
  };

  private onTriggerClick = () => {
    // TODO: send analytics
    if (!this.state.isDialogOpen) {
      this.setState(
        {
          isDialogOpen: true,
          ignoreIntermediateState: false,
        },
        () => {
          if (this.containerRef.current) {
            this.containerRef.current.focus();
          }
        },
      );
    }
  };

  private handleCloseDialog = (_: { isOpen: boolean; event: any }) => {
    // TODO: send analytics
    this.setState({
      isDialogOpen: false,
    });
  };

  private handleShareSubmit = (data: DialogContentState) => {
    if (!this.props.onShareSubmit) {
      return;
    }

    this.setState({ isSharing: true });

    this.props
      .onShareSubmit(data)
      .then(() => {
        this.handleCloseDialog({ isOpen: false, event });
        this.setState({ isSharing: false });
      })
      .catch((err: Error) => {
        this.setState({
          isSharing: false,
          shareError: {
            message: err.message,
          },
        });
        // send analytic event about the err
      });
  };

  private handleFormDismiss = (data: DialogContentState) => {
    this.setState(({ ignoreIntermediateState }) =>
      ignoreIntermediateState ? null : { defaultValue: data },
    );
  };

  handleShareFailure = (_err: Error) => {
    // TBC: FS-3429 replace send button with retry button
    // will need a prop to pass through the error message to the ShareForm
  };

  render() {
    const { isDialogOpen, isSharing, shareError, defaultValue } = this.state;
    const {
      copyLink,
      isDisabled,
      loadUserOptions,
      shareFormTitle,
      config,
      triggerButtonAppearance,
      triggerButtonStyle,
    } = this.props;

    // for performance purposes, we may want to have a lodable content i.e. ShareForm
    return (
      <div
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
        style={{ outline: 'none' }}
        ref={this.containerRef}
      >
        <InlineDialog
          content={
            <InlineDialogFormWrapper>
              <ShareForm
                copyLink={copyLink}
                loadOptions={loadUserOptions}
                isSharing={isSharing}
                onShareClick={this.handleShareSubmit}
                title={shareFormTitle}
                shareError={shareError}
                onDismiss={this.handleFormDismiss}
                defaultValue={defaultValue}
                config={config}
              />
            </InlineDialogFormWrapper>
          }
          isOpen={isDialogOpen}
          onClose={this.handleCloseDialog}
        >
          {this.props.children ? (
            this.props.children({
              onClick: this.onTriggerClick,
              loading: isSharing,
              error: shareError,
            })
          ) : (
            <ShareButton
              appearance={triggerButtonAppearance}
              text={
                triggerButtonStyle === 'icon-with-text' ? (
                  <FormattedMessage {...messages.shareTriggerButtonText} />
                ) : null
              }
              onClick={this.onTriggerClick}
              isSelected={isDialogOpen}
              isDisabled={isDisabled}
            />
          )}
        </InlineDialog>
      </div>
    );
  }
}
