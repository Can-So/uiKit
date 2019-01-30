import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import InlineDialog from '@atlaskit/inline-dialog';
import { ShareButton } from './ShareButton';
import { ShareForm } from './ShareForm';
import { messages } from '../i18n';

type RenderChildren = (
  openModal: Function,
  { loading, error }: { loading: boolean; error: ShareError },
) => React.ReactNode;

type DialogState = {
  isDialogOpen: boolean;
  isSharing: boolean;
  isStateValidWithCapabilities: boolean;
  shareError: ShareError;
};

export type DialogContentState = {
  users: User[];
  comment?: Comment;
};

type State = DialogState & DialogContentState;

export type User = UserWithId | UserWithEmail;

type UserWithId = {
  type: 'user' | 'group' | 'team';
  id: string;
};

type UserWithEmail = {
  email: string;
};

type Comment = {
  format: 'plain_text' | 'adf';
  value: string;
};

type ShareError = {
  message: string;
} | null;

type InvitationsCapabilities = {
  directInvite: DirectInviteCapabilities;
  invitePendingApproval: RequestAccessCapabilities;
};

type DirectInviteCapabilities = {
  mode: 'NONE' | 'ANYONE' | 'DOMAIN_RESTRICTED';
  domains?: string[];
  permittedResources: string[];
};

type RequestAccessCapabilities = {
  mode: 'NONE' | 'ANYONE';
  permittedResources: string[];
};

type Props = {
  buttonStyle?: 'default' | 'withText';
  capabilities?: InvitationsCapabilities;
  copyLink: string;
  children?: RenderChildren;
  isDisabled?: boolean;
  loadOptions?: any;
  onLinkCopy?: Function;
  onCommentChange?: (comment: Comment) => any;
  onSubmit?: (dialogContentState: DialogContentState) => Promise<any>;
  onUsersChange?: (users: User[]) => any;
  shouldShowCommentField?: boolean;
  shouldCloseOnEscapePress?: boolean;
  validateStateWithCapabilities?: (
    state: DialogContentState,
    capabilities: InvitationsCapabilities,
  ) => boolean;
};

export const defaultDialogContentState: DialogContentState = {
  users: [],
  comment: {
    format: 'plain_text' as 'plain_text',
    value: '',
  },
};

export class ShareDialogWithTrigger extends React.Component<Props, State> {
  static defaultProps = {
    buttonAppearance: 'default',
    capabilities: {},
    isDisabled: false,
    isSharing: false,
    shouldCloseOnEscapePress: false,
  };

  escapeIsHeldDown: boolean = false;

  state: State = {
    isDialogOpen: false,
    isSharing: false,
    isStateValidWithCapabilities: true,
    shareError: null,
    ...defaultDialogContentState,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const { capabilities, validateStateWithCapabilities } = props;

    if (
      !state.isDialogOpen ||
      !validateStateWithCapabilities ||
      !capabilities
    ) {
      return state;
    }

    return {
      ...state,
      isStateValidWithCapabilities: validateStateWithCapabilities(
        state,
        capabilities,
      ),
    };
  }

  componentDidMount() {
    if (typeof document === 'undefined') {
      return;
    }

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (typeof document === 'undefined') {
      return;
    }

    if (!prevState.isDialogOpen && this.state.isDialogOpen) {
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('keyup', this.handleKeyUp);
    } else if (prevState.isDialogOpen && !this.state.isDialogOpen) {
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('keyup', this.handleKeyUp);
    }
  }

  componentWillUnmount() {
    if (typeof document === 'undefined') {
      return;
    }

    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('keyup', this.handleKeyUp, false);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const { isDialogOpen } = this.state;

    if (isDialogOpen) {
      // this is to prevent from unintentionally closing modal dialog
      event.stopImmediatePropagation();
    }

    // this is to prevent from continuous firing if an user holds escape key.
    if (this.escapeIsHeldDown) {
      return;
    }

    switch (event.key) {
      case 'Escape':
        this.escapeIsHeldDown = true;
        if (isDialogOpen) {
          this.handleCloseDialog({ isOpen: false, event });
        }
    }
  };

  handleKeyUp = (event: KeyboardEvent) => {
    this.escapeIsHeldDown = false;
  };

  handleOpenDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: send analytics

    this.setState({
      isDialogOpen: true,
    });
  };

  handleCloseDialog = ({ isOpen, event }: { isOpen: boolean; event: any }) => {
    // clear the state when it is an escape press or a succesful submit
    if (event!.type === 'keydown' || event!.type === 'submit') {
      this.clearDialogContentState();
    }

    // TODO: send analytics

    this.setState({
      isDialogOpen: false,
    });
  };

  clearDialogContentState = () => {
    this.setState(defaultDialogContentState);
  };

  handleShareUsersChange = (users: User[]) => {
    this.setState({ users });

    if (this.props.onUsersChange) {
      this.props.onUsersChange!(users);
    }
  };

  handleShareCommentChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const comment: Comment = {
      format: 'plain_text' as 'plain_text',
      value: target!.value,
    };

    this.setState({ comment });

    if (this.props.onCommentChange) {
      this.props.onCommentChange!(comment);
    }
  };

  handleShareSubmit = (event: React.SyntheticEvent) => {
    if (!this.props.onSubmit) {
      return;
    }

    const dialogContentState = {
      users: this.state.users,
      comment: this.state.comment,
    };

    this.setState({ isSharing: true });

    this.props.onSubmit!(dialogContentState)
      .then(() => {
        this.handleCloseDialog({ isOpen: false, event });
        this.setState({ isSharing: false });
      })
      .catch((err: Error) => {
        this.handleShareFailure(err);
        this.setState({ isSharing: false });
      });
  };

  handleShareFailure = (err: Error) => {
    // TBC: FS-3429 replace send button with retry button
    // will need a prop to pass through the error message to the ShareForm
  };

  render() {
    const {
      isDialogOpen,
      isSharing,
      isStateValidWithCapabilities,
      shareError,
    } = this.state;
    const { copyLink, isDisabled, loadOptions } = this.props;

    // for performance purposes, we may want to have a lodable content i.e. ShareForm
    return (
      <div>
        <InlineDialog
          content={
            <ShareForm
              copyLink={copyLink}
              loadOptions={loadOptions}
              isSharing={isSharing}
              onCommentChange={this.handleShareCommentChange}
              onUsersChange={this.handleShareUsersChange}
              onShareClick={this.handleShareSubmit}
              shareError={shareError}
              shouldShowCapabilitiesInfoMessage={!isStateValidWithCapabilities}
            />
          }
          isOpen={isDialogOpen}
          onClose={this.handleCloseDialog}
        >
          {this.props.children ? (
            this.props.children(this.handleOpenDialog, {
              loading: isSharing,
              error: shareError,
            })
          ) : (
            <ShareButton
              text={
                this.props.buttonStyle === 'withText' ? (
                  <FormattedMessage {...messages.shareTriggerButtonText} />
                ) : null
              }
              onClick={this.handleOpenDialog}
              isSelected={isDialogOpen}
              isDisabled={isDisabled}
            />
          )}
        </InlineDialog>
      </div>
    );
  }
}
