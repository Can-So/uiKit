import {
  RequestServiceOptions,
  ServiceConfig,
  utils,
} from '@atlaskit/util-service-support';
import { Comment, Content, MetaData, User } from '../types';

export interface ShareClient {
  share(
    content: Content,
    recipients: User[],
    metadata: MetaData,
    comment?: Comment,
  ): Promise<ShareResponse>;

  getConfig(product: string, cloudId: string): Promise<ConfigResponse>;
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

export type ConfigResponse = {
  mode: ConfigResponseMode;
  allowedDomains?: string[];
  allowComment: boolean;
};

export type ConfigResponseMode =
  | 'EXISTING_USERS_ONLY'
  | 'INVITE_NEEDS_APPROVAL'
  | 'ONLY_DOMAIN_BASED_INVITE'
  | 'DOMAIN_BASED_INVITE'
  | 'ANYONE';

export const DEFAULT_SHARE_PATH = 'share';
export const SHARE_CONFIG_PATH = 'share/config';
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

  public getConfig(product: string, cloudId: string): Promise<ConfigResponse> {
    const options = {
      path: SHARE_CONFIG_PATH,
      queryParams: { product, cloudId },
      requestInit: { method: 'get' },
    };
    return utils.requestService(this.serviceConfig, options);
  }
}
