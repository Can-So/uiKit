import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import InlineDialog from '@atlaskit/inline-dialog';
import { ShareButton } from './ShareButton';
import { ShareForm } from './ShareForm';
import { messages } from '../i18n';
import { InvitationsCapabilities } from '../clients/IdentityClient';

export type Props = {
  buttonStyle?: 'default' | 'withText';
  children?: RenderChildren;
  capabilities?: InvitationsCapabilities;
  isCapabilitiesRequired?: boolean;
  isDisable?: boolean;
  loadOptions?: any;
  // TODO: work out the Promise return
  onSubmit?: (dialogContentState: DialogContentState) => Promise<any>;
  shouldCloseOnEscapePress?: boolean;
};

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
    isCapabilitiesRequired: false,
    isDisable: false,
    shouldCloseOnEscapePress: false,
  };

  state = {
    isDialogOpen: false,
    ...defaultDialogContentState,
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

  handleOpenDialog = () => {
    // TODO: send analytics

    this.setState({
      isDialogOpen: true,
    });
  };

  handleCloseDialog = ({ isOpen, event }) => {
    // retain the state when it is a click, let the state cleared when it is an escape press
    if (event!.type === 'click') {
      const dialogContentState: DialogContentState = { users: [], comment: '' };
      this.retainDialogContentState(dialogContentState);
      // may not need this if this component is going to be the only form state holder
    } else if (event!.type === 'keyPress' || event!.type === 'submit') {
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

  // may not need this if this component is going to be the only form state holder
  retainDialogContentState = (contentState: DialogContentState) => {
    this.setState({
      users: contentState.users,
      comment: contentState.comment,
    });
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
    const { isDialogOpen } = this.state;
    const {
      isCapabilitiesRequired,
      isDisable,
      capabilities,
      loadOptions,
    } = this.props;

    // if it cannot share without capabilities and if capabilities are not provided
    // should the component be not rendered or disabled?
    if (isCapabilitiesRequired && !Object.keys(capabilities!).length) {
      // TODO: send analytics event
      return null;
    }

    // for performance purposes, we may want to have a lodable content i.e. ShareForm
    return (
      <div>
        <InlineDialog
          content={
            <ShareForm
              loadOptions={loadOptions}
              onShareClick={this.handleShareSubmit}
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
                  <FormattedMessage {...messages.shareButtonText} />
                ) : null
              }
              onClick={this.handleOpenDialog}
              isSelected={isDialogOpen}
              isDisable={isDialogOpen || isDisable}
            />
          )}
        </InlineDialog>
      </div>
    );
  }
}
