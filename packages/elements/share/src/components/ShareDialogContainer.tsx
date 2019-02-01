import * as React from 'react';
import memoizeOne from 'memoize-one';
import { LoadOptions } from '@atlaskit/user-picker';
import OriginTracing from '@atlassiansox/origin-tracing';
import { ShareDialogWithTrigger } from './ShareDialogWithTrigger';
import {
  Content,
  InvitationsCapabilitiesResponse,
  InvitationsCapabilitiesProvider,
  ShareClient,
  ShareResponse,
  MetaData,
  ShareContentState,
} from '../types';
import { InvitationsCapabilitiesResource } from '../api/InvitationsCapabilitiesResource';
import { ShareServiceClient } from '../clients/ShareServiceClient';

type Props = {
  cloudId: string;
  formatCopyLink?: Function;
  loadUserOptions: LoadOptions;
  productId: string;
  shareLink: string;
  shareTitle: string;
  shouldShowCommentField?: boolean;
  shouldCloseOnEscapePress?: boolean;
  resourceId?: string;
  resourceType: string;
};

type State = {
  capabilities: InvitationsCapabilitiesResponse | undefined;
  copyLinkOrigin: OriginTracing | null;
  prevShareLink: string | null;
  shareActionCount: number;
  shareToAtlassianAccuntHoldersOrigin: OriginTracing | null;
  shareToNewUsersOrigin: OriginTracing | null;
};

const originTracingFactory: OriginTracing = (
  product,
  attributes = {},
): { product: string; attributes?: {} } => {
  return new OriginTracing({ product, ...attributes });
};

const memoizedFormatCopyLink: string = memoizeOne(
  (origin, link): { origin: OriginTracing; link: string } => {
    return origin.addToUrl(link);
  },
);

/**
 * This component serves as a Provider to provide customizable implementations
 * to ShareDialogTrigger component
 */
export class ShareDialogContainer extends React.Component<Props, State> {
  private invitationsCapabilitiesResource: InvitationsCapabilitiesProvider;
  private shareServiceClient: ShareClient;

  static defaultProps = {
    shareLink: window && window.location!.href,
    formatCopyLink: memoizedFormatCopyLink,
  };

  constructor(props) {
    super(props);
    this.invitationsCapabilitiesResource = new InvitationsCapabilitiesResource(
      props.cloudId,
    );
    this.shareServiceClient = new ShareServiceClient();

    this.state = {
      capabilities: undefined,
      copyLinkOrigin: props.shareLink
        ? originTracingFactory(props.productId)
        : null,
      prevShareLink: null,
      shareActionCount: 1,
      shareToAtlassianAccuntHoldersOrigin: props.shareLink
        ? originTracingFactory(props.productId)
        : null,
      shareToNewUsersOrigin: props.shareLink
        ? originTracingFactory(props.productId)
        : null,
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
        copyLinkOrigin: originTracingFactory(nextProps.productId),
        prevShareLink: nextProps.shareLink,
        shareToAtlassianAccuntHoldersOrigin: originTracingFactory(
          nextProps.productId,
        ),
        shareToNewUsersOrigin: originTracingFactory(nextProps.productId),
      };
    }

    return null;
  }

  componentDidMount() {
    this.fetchCapabilities();
  }

  fetchCapabilities = () => {
    this.invitationsCapabilitiesResource
      .getCapabilities()
      .then((capabilities: InvitationsCapabilitiesResponse) => {
        // Send analytics event
        this.setState({
          capabilities,
        });
      })
      .catch(err => {
        // Send analytics event
      });
  };

  parseAri = (
    productId: string,
    cloudId: string,
    resourceType: string,
    resourceId?: string,
  ): string => {
    let ari = `ari:cloud:${productId}`;

    // Implementations by Jira and Confluence are different from others
    // https://hello.atlassian.net/wiki/spaces/ARCH/pages/161909906/ARI+Resource+Owners+Inventory
    if (productId.startsWith('jira') || productId === 'confluence') {
      if (resourceType === 'site') {
        ari += `::${resourceType}/${cloudId}`;
      } else {
        ari += `:${cloudId}:${resourceType}/${resourceId}`;
      }
    } else {
      ari += `::${resourceType}/${resourceId}`;
    }

    return ari;
  };

  handleSubmitShare = ({
    users,
    comment,
  }: ShareContentState): Promise<ShareResponse> => {
    const {
      cloudId,
      productId,
      shareLink,
      shareTitle,
      resourceId,
      resourceType,
    } = this.props;
    const content: Content = {
      ari: this.parseAri(productId, cloudId, resourceType, resourceId),
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

    return this.shareServiceClient
      .share(content, users, metaData, comment)
      .then((response: ShareResponse) => {
        // send analytic event

        // renew Origin Tracing Ids per share action succeeded
        this.setState({
          shareActionCount: this.state.shareActionCount + 1,
          shareToAtlassianAccuntHoldersOrigin: originTracingFactory(productId),
          shareToNewUsersOrigin: originTracingFactory(productId),
        });

        return response;
      })
      .catch((err: Error) => {
        // send analytic event
        return Promise.reject(err);
      });
  };

  handleCopyLink = () => {
    // @ts-ignore usused for now until analytics are added
    const originAttributes = this.state.copyLinkOrigin!.toAnalyticsAttributes({
      hasGeneratedId: true,
    });

    // Send analytics event
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
