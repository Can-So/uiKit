import {
  RequestServiceOptions,
  utils,
  ServiceConfig,
} from '@atlaskit/util-service-support';
import { Content, Comment, User } from '../types';

export interface ShareClient {
  share: (
    content: Content,
    recipients: User[],
    metadata: MetaData,
    comment?: Comment,
  ) => Promise<ShareResponse>;
}

export type ShareResponse = {
  shareRequestId: string;
};

// In Draft and TBC
// This pair of metadata is required for every invite call
// AtlOrigin is used to track the life of a share action
// A share action is divided into 2 types, i.e. Atlassian Account holder and New users,
// with corresponding expected follow up actions, i.e. Login and Sign up.
// for more info, visit:
// https://hello.atlassian.net/wiki/spaces/~804672962/pages/379043535/Draft+Origin+Tracing+in+Common+Share+Component
export type MetaData = {
  productId: string;
  tracking: {
    toAtlassianAccountHolders: {
      atlOriginId: string;
    };
    toNewUsers: {
      atlOriginId: string;
    };
  };
};

export const DEFAULT_SHARE_PATH = 'share';
// TODO: replace with the real stargate namespace
export const DEFAULT_SHARE_SERVICE_URL = '/gateway/api';

export class ShareServiceClient implements ShareClient {
  private serviceConfig: ServiceConfig;

  constructor(serviceConfig?: ServiceConfig) {
    this.serviceConfig = serviceConfig || {
      url: DEFAULT_SHARE_SERVICE_URL,
    };
  }

  /**
   * To send a POST request to the share endpoint in Share service
   */
  public share(
    content: Content,
    recipients: User[],
    metadata: MetaData,
    comment?: Comment,
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
