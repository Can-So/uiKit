import {
  RequestServiceOptions,
  utils,
  ServiceConfig,
} from '@atlaskit/util-service-support';
import { Content, Comment, MetaData, User } from '../types';

export interface ShareClient {
  share: ShareRequest;
}

export type ShareRequest = (
  content: Content,
  recipients: User[],
  metadata: MetaData,
  comment?: Comment,
) => Promise<ShareResponse>;

export type ShareResponse = {
  shareRequestId: string;
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
