import {
  RequestServiceOptions,
  utils,
  ServiceConfig,
} from '@atlaskit/util-service-support';

export interface ShareServiceClient {
  share: (
    content: Content,
    recipients: Recipient[],
    metadata: MetaData,
    comment?: string,
  ) => Promise<ShareResponse>;
}

type ShareResponse = {
  contentAri: string;
  statuses: ResponseStatus[];
  // This is not from swagger and TBC
  // it will contain any additional attributes to the invite endpoint response
  // mainly for atlOrigin
  metadata?: MetaData;
};

type ResponseStatus = {
  // This is not from swagger and TBC
  // we may have to deal with the timeout / long time taking process from the invite v2 endpoint
  // depending on the frontend solution we will come up with
  // polling status by shareId may be needed
  shareId: string;
  recipient: Recipient;
  status: Status;
};

type Recipient = RecipientWithId | RecipientWithEmail;

type RecipientWithId = {
  id: string;
};

type RecipientWithEmail = {
  email: string;
};

type Status = 'PENDING_INVITE' | 'SHARED' | 'ERROR';

type Content = {
  ari: string;
  link: string;
  title: string;
};

// In Draft and TBC
// This pair of metadata is required for every invite call
// AtlOrigin is used to track the life of a share action
// A share action is divided into 2 types, i.e. Atlassian Account holder and New users,
// with corresponding expected follow up actions, i.e. Login and Sign up.
// for more info, visit:
// https://hello.atlassian.net/wiki/spaces/~804672962/pages/379043535/Draft+Origin+Tracing+in+Common+Share+Component
type MetaData = {
  toAtlassianAccountHolders: {
    atlOriginId: string;
    userIds?: string[];
  };
  toNewUsers: {
    atlOriginId: string;
    userIds?: string[];
  };
};

export const DEFAULT_SHARE_PATH = 'share';
// TODO: replace with the real stargate namespace
export const DEFAULT_SHARE_SERVICE_URL = '/gateway/api';

export class ShareServiceClientImpl implements ShareServiceClient {
  private serviceConfig: ServiceConfig;

  constructor(serviceConfig?: ServiceConfig) {
    this.serviceConfig = serviceConfig || {
      url: DEFAULT_SHARE_SERVICE_URL,
    };
  }

  /**
   * Share service accepts batch invite request, and it will break it down to separated request
   * to Invite v2 endpoint with corresponding continueUrl
   */
  public share(
    content: Content,
    recipients: Recipient[],
    metadata: MetaData,
    comment?: string,
  ): Promise<ShareResponse> {
    const options: RequestServiceOptions = {
      path: DEFAULT_SHARE_PATH,
      requestInit: {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          content,
          recipients,
          metadata,
          comment,
        }),
      },
    };

    return utils.requestService(this.serviceConfig, options);
  }
}
