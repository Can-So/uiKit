import { ButtonAppearances } from '@atlaskit/button';
import { LoadOptions } from '@atlaskit/user-picker';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import {
  ConfigResponse,
  ShareClient,
  ShareServiceClient,
} from '../clients/ShareServiceClient';
import {
  Content,
  DialogContentState,
  MetaData,
  OriginTracing,
  OriginTracingFactory,
  ShareButtonStyle,
  ShareResponse,
} from '../types';
import { ShareDialogWithTrigger } from './ShareDialogWithTrigger';
import { optionDataToUsers } from './utils';

export type Props = {
  buttonStyle?: ShareButtonStyle;
  client?: ShareClient;
  cloudId: string;
  formatCopyLink: (origin: OriginTracing, link: string) => string;
  loadUserOptions: LoadOptions;
  originTracingFactory: OriginTracingFactory;
  productId: string;
  shareAri: string;
  shareLink: string;
  shareTitle: string;
  shareFormTitle?: React.ReactNode;
  shouldCloseOnEscapePress?: boolean;
  triggerButtonAppearance?: ButtonAppearances;
  triggerButtonStyle?: ShareButtonStyle;
};

export type State = {
  config?: ConfigResponse;
  copyLinkOrigin: OriginTracing | null;
  prevShareLink: string | null;
  shareActionCount: number;
  shareOrigin: OriginTracing | null;
};

const memoizedFormatCopyLink: (
  origin: OriginTracing,
  link: string,
) => string = memoizeOne(
  (origin: OriginTracing, link: string): string => origin.addToUrl(link),
);

/**
 * This component serves as a Provider to provide customizable implementations
 * to ShareDialogTrigger component
 */
export class ShareDialogContainer extends React.Component<Props, State> {
  private client: ShareClient;

  static defaultProps = {
    shareLink: window && window.location!.href,
    formatCopyLink: memoizedFormatCopyLink,
  };

  constructor(props: Props) {
    super(props);

    if (props.client) {
      this.client = props.client;
    } else {
      this.client = new ShareServiceClient();
    }

    this.state = {
      copyLinkOrigin: null,
      prevShareLink: null,
      shareActionCount: 0,
      shareOrigin: null,
    };
  }

  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State,
  ): Partial<State> | null {
    // Whenever there is change in share link, new origins should be created
    // ***
    // memorization is recommended on React doc, but here the Origin Tracing does not reply on shareLink
    // in getDerivedStateFormProps it makes shareLink as determinant of renewal to stand out better
    // ***
    if (
      prevState.prevShareLink ||
      prevState.prevShareLink !== nextProps.shareLink
    ) {
      return {
        copyLinkOrigin: nextProps.originTracingFactory(),
        prevShareLink: nextProps.shareLink,
        shareOrigin: nextProps.originTracingFactory(),
      };
    }

    return null;
  }

  componentDidMount() {
    this.fetchConfig();
  }

  fetchConfig = () => {
    this.client
      .getConfig(this.props.productId, this.props.cloudId)
      .then((config: ConfigResponse) => {
        // TODO: Send analytics event
        this.setState({ config });
      })
      .catch(() => {
        // TODO: Send analytics event
      });
  };

  handleSubmitShare = ({
    users,
    comment,
  }: DialogContentState): Promise<ShareResponse> => {
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
      atlOriginId: this.state.shareOrigin!.id,
    };

    return this.client
      .share(content, optionDataToUsers(users), metaData, comment)
      .then((response: ShareResponse) => {
        const newShareCount = this.state.shareActionCount + 1;
        // TODO: send analytic event

        // renew Origin Tracing Id per share action succeeded
        this.setState({
          shareActionCount: newShareCount,
          shareOrigin: originTracingFactory(),
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
      shareFormTitle,
      shouldCloseOnEscapePress,
      triggerButtonAppearance,
      triggerButtonStyle,
    } = this.props;
    const copyLink = formatCopyLink(this.state.copyLinkOrigin!, shareLink);
    return (
      <ShareDialogWithTrigger
        config={this.state.config}
        copyLink={copyLink}
        loadUserOptions={loadUserOptions}
        onLinkCopy={this.handleCopyLink}
        onShareSubmit={this.handleSubmitShare}
        shareFormTitle={shareFormTitle}
        shouldCloseOnEscapePress={shouldCloseOnEscapePress}
        triggerButtonAppearance={triggerButtonAppearance}
        triggerButtonStyle={triggerButtonStyle}
      />
    );
  }
}
