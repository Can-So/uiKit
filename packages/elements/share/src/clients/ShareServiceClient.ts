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
  metadata?: ResponseMetaData; // this is not from swagger and TBC
};

type ResponseStatus = {
  shareId: string; // this is not from swagger and TBC
  recipient: Recipient;
  status: Status;
};

type Recipient = {
  id?: string;
  email?: string;
};

type Status = 'PENDING_INVITE' | 'SHARED' | 'ERROR';

type Content = {
  ari: string;
  link: string;
  title: string;
};

type MetaData = {
  shareToAtlassianAccountHoldersOriginId?: string;
  shareToNewUsersOriginId?: string;
};

type ResponseMetaData = MetaData & {
  numberOfSharesToAtlassianAccountHolders: number;
  numberOfSharesToNewUsers: number;
};

export const SHARE_PATH = 'share';
// TODO: replace with the real stargate namespace
export const SHARE_SERVICE_URL = '/gateway/api';

export class ShareServiceClientImpl implements ShareServiceClient {
  private serviceConfig: ServiceConfig;

  constructor() {
    this.serviceConfig = {
      url: SHARE_SERVICE_URL,
    };
  }

  /**
   * Share service accepts batch invite request, and it will break it down to separated request
   * to Invite v2 endpoint with corresponding continueUrl
   */
  public async share(
    content: Content,
    recipients: Recipient[],
    metadata: MetaData,
    comment?: string,
  ) {
    const options: RequestServiceOptions = {
      path: SHARE_PATH,
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

    try {
      return await utils.requestService<ShareResponse>(
        this.serviceConfig,
        options,
      );
    } catch (err) {
      return err;
    }
  }
}
