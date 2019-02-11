import * as React from 'react';
import memoizeOne from 'memoize-one';
import { LoadOptions } from '@atlaskit/user-picker';
import { ShareDialogWithTrigger } from './ShareDialogWithTrigger';
import {
  Client,
  Content,
  InvitationsCapabilitiesResponse,
  InvitationsCapabilitiesProvider,
  MetaData,
  OriginTracing,
  OriginTracingFactory,
  ShareClient,
  ShareResponse,
  ShareContentState,
} from '../types';
import { InvitationsCapabilitiesResource } from '../api/InvitationsCapabilitiesResource';
import { ShareServiceClient } from '../clients/ShareServiceClient';

type Props = {
  client?: Client;
  cloudId: string;
  formatCopyLink?: Function;
  loadUserOptions: LoadOptions;
  originTracingFactory: OriginTracingFactory;
  productId: string;
  shareAri: string;
  shareLink: string;
  shareTitle: string;
  shouldShowCommentField?: boolean;
  shouldCloseOnEscapePress?: boolean;
};

type State = {
  capabilities: InvitationsCapabilitiesResponse | undefined;
  copyLinkOrigin: OriginTracing | null;
  prevShareLink: string | null;
  shareActionCount: number;
  shareToAtlassianAccuntHoldersOrigin: OriginTracing | null;
  shareToNewUsersOrigin: OriginTracing | null;
};

const memoizedFormatCopyLink: string = memoizeOne(
  (origin: OriginTracing, link: string): string => {
    return origin.addToUrl(link);
  },
);

/**
 * This component serves as a Provider to provide customizable implementations
 * to ShareDialogTrigger component
 */
export class ShareDialogContainer extends React.Component<Props, State> {
  private client: Client;

  static defaultProps = {
    shareLink: window && window.location!.href,
    formatCopyLink: memoizedFormatCopyLink,
  };

  constructor(props) {
    super(props);

    if (props.client) {
      this.client = props.client;
    } else {
      const defaultInvitationsCapabilitiesResource: InvitationsCapabilitiesProvider = new InvitationsCapabilitiesResource(
        props.cloudId,
      );
      const defaultShareSericeClient: ShareClient = new ShareServiceClient();
      this.client = {
        getCapabilities: defaultInvitationsCapabilitiesResource.getCapabilities,
        share: defaultShareSericeClient.share,
      };
    }

    this.state = {
      capabilities: undefined,
      copyLinkOrigin: null,
      prevShareLink: null,
      shareActionCount: 0,
      shareToAtlassianAccuntHoldersOrigin: null,
      shareToNewUsersOrigin: null,
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    // Whenever there is change in share link, new origins should be created
    // ***
    // memorization is recommended on React doc, but here the Origin Tracing does not reply on shareLink
    // in getDerivedStateFormProps it makes shareLink as determinant of renewal to stand out better
    // ***
    if (prevState.prevShareLink !== nextProps.shareLink) {
      return {
        copyLinkOrigin: nextProps.originTracingFactory(),
        prevShareLink: nextProps.shareLink,
        shareToAtlassianAccuntHoldersOrigin: nextProps.originTracingFactory(),
        shareToNewUsersOrigin: nextProps.originTracingFactory(),
      };
    }

    return null;
  }

  componentDidMount() {
    this.fetchCapabilities();
  }

  fetchCapabilities = () => {
    this.client
      .getCapabilities()
      .then((capabilities: InvitationsCapabilitiesResponse) => {
        // TODO: Send analytics event
        this.setState({
          capabilities,
        });
      })
      .catch(err => {
        // TODO: Send analytics event
      });
  };

  handleSubmitShare = ({
    users,
    comment,
  }: ShareContentState): Promise<ShareResponse> => {
    const {
      originTracingFactory,
      productId,
      shareAri,
      shareLink,
      shareTitle,
    } = this.props;
    const content: Content = {
      ari: shareAri,
      // original share link is used here
      link: shareLink,
      title: shareTitle,
    };
    const metaData: MetaData = {
      productId,
      tracking: {
        toAtlassianAccountHolders: {
          atlOriginId: this.state.shareToAtlassianAccuntHoldersOrigin!.id,
        },
        toNewUsers: {
          atlOriginId: this.state.shareToNewUsersOrigin!.id,
        },
      },
    };

    return this.client
      .share(content, users, metaData, comment)
      .then((response: ShareResponse) => {
        const newShareCount = this.state.shareActionCount + 1;
        // TODO: send analytic event

        // renew Origin Tracing Ids per share action succeeded
        this.setState({
          shareActionCount: newShareCount,
          shareToAtlassianAccuntHoldersOrigin: originTracingFactory(),
          shareToNewUsersOrigin: originTracingFactory(),
        });

        return response;
      })
      .catch((err: Error) => {
        // TODO: send analytic event
        return Promise.reject(err);
      });
  };

  handleCopyLink = () => {
    // @ts-ignore usused for now until analytics are added
    const originAttributes = this.state.copyLinkOrigin!.toAnalyticsAttributes({
      hasGeneratedId: true,
    });

    // TODO: send analytic event
  };

  render() {
    const {
      formatCopyLink,
      loadUserOptions,
      shareLink,
      shouldShowCommentField,
      shouldCloseOnEscapePress,
    } = this.props;
    const copyLink = formatCopyLink!(this.state.copyLinkOrigin, shareLink);
    return (
      <ShareDialogWithTrigger
        capabilities={this.state.capabilities}
        copyLink={copyLink}
        loadUserOptions={loadUserOptions}
        onLinkCopy={this.handleCopyLink}
        onShareSubmit={this.handleSubmitShare}
        shouldShowCommentField={shouldShowCommentField}
        shouldCloseOnEscapePress={shouldCloseOnEscapePress}
      />
    );
  }
}
