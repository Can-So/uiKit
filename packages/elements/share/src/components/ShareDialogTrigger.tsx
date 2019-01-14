import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import InlineDialog from '@atlaskit/inline-dialog';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next-types';
import { ShareButton } from './ShareButton';
import { ShareForm } from './ShareForm';
import { messages } from '../i18n';
import { InvitationsCapabilities } from '../clients/IdentityClient';

export type RenderChildren = (openModal: Function) => React.ReactNode;

export type DialogState = {
  isDialogOpen: boolean;
};

export type DialogContentState = {
  users: User[];
  comment?: string;
};

export type User = {
  id?: string;
  email?: string;
};

export type Props = {
  buttonStyle?: 'default' | 'withText';
  children?: RenderChildren;
  capabilities?: InvitationsCapabilities;
  isDisabled?: boolean;
  loadOptions?: any;
  onUsersChange?: (users: User[]) => any;
  onCommentChange?: (comment: string) => any;
  // TODO: work out the Promise return
  onSubmit?: (dialogContentState: DialogContentState) => Promise<any>;
  shouldCloseOnEscapePress?: boolean;
  validateStateWithCapabilities?: (
    state: DialogContentState,
    capabilities: InvitationsCapabilities,
  ) => boolean;
};

export const defaultDialogContentState: DialogContentState = {
  users: [],
  comment: '',
};

export class ShareDialogTrigger extends React.Component<
  Props,
  DialogState & DialogContentState
> {
  static defaultProps = {
    buttonAppearance: 'default',
    capabilities: {},
    isDisabled: false,
    shouldCloseOnEscapePress: false,
  };

  state = {
    isDialogOpen: false,
    ...defaultDialogContentState,
    isStateValidWithCapabilities: true,
  };

  componentDidMount() {
    if (this.props.shouldCloseOnEscapePress) {
      // add event listener
    }
  }

  componentWillUnmount() {
    if (this.props.shouldCloseOnEscapePress) {
      // remove event listener
    }
  }

  static getDerivedStateFromProps(props, state) {
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

  handleOpenDialog = (
    e: React.MouseEvent<HTMLButtonElement>,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    // TODO: send analytics

    this.setState({
      isDialogOpen: true,
    });
  };

  handleCloseDialog = ({ isOpen, event }) => {
    // clear the state when it is an escape press or a succesful submit
    if (event!.type === 'keyPress' || event!.type === 'submit') {
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

  handleShareCommentChange = (comment: string) => {
    this.setState({ comment });

    if (this.props.onCommentChange) {
      this.props.onCommentChange!(comment);
    }
  };

  handleShareSubmit = event => {
    const dialogContentState = {
      users: this.state.users,
      comment: this.state.comment,
    };

    this.props.onSubmit!(dialogContentState)
      .then(res => {
        this.handleCloseDialog({ isOpen: false, event });

        // TODO: show successful flag
      })
      .catch(err => {
        // TODO: show failure flag
      });
  };

  render() {
    const { isDialogOpen, isStateValidWithCapabilities } = this.state;
    const { isDisabled, loadOptions } = this.props;

    // for performance purposes, we may want to have a lodable content i.e. ShareForm
    return (
      <div>
        <InlineDialog
          content={
            <ShareForm
              loadOptions={loadOptions}
              onCommentChange={this.handleShareCommentChange}
              onUsersChange={this.handleShareUsersChange}
              onShareClick={this.handleShareSubmit}
              shouldCapabilitiesWarningShow={isStateValidWithCapabilities}
            />
          }
          isOpen={isDialogOpen}
          onClose={this.handleCloseDialog}
        >
          {this.props.children ? (
            this.props.children(this.handleOpenDialog)
          ) : (
            <ShareButton
              text={
                this.props.buttonStyle === 'withText' ? (
                  <FormattedMessage {...messages.shareTriggerButtonText} />
                ) : null
              }
              onClick={this.handleOpenDialog}
              isSelected={isDialogOpen}
              isDisabled={isDialogOpen || isDisabled}
            />
          )}
        </InlineDialog>
      </div>
    );
  }
}
