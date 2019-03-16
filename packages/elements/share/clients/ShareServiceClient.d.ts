import { ServiceConfig } from '@atlaskit/util-service-support';
import { Comment, Content, MetaData, User } from '../types';
export interface ShareClient {
    share(content: Content, recipients: User[], metadata: MetaData, comment?: Comment): Promise<ShareResponse>;
    getConfig(product: string, cloudId: string): Promise<ConfigResponse>;
}
export declare type ShareRequest = (content: Content, recipients: User[], metadata: MetaData, comment?: Comment) => Promise<ShareResponse>;
export declare type ShareResponse = {
    shareRequestId: string;
};
export declare type ConfigResponse = {
    mode: ConfigResponseMode;
    allowedDomains?: string[];
    allowComment: boolean;
};
export declare type ConfigResponseMode = 'EXISTING_USERS_ONLY' | 'INVITE_NEEDS_APPROVAL' | 'ONLY_DOMAIN_BASED_INVITE' | 'DOMAIN_BASED_INVITE' | 'ANYONE';
export declare const DEFAULT_SHARE_PATH = "share";
export declare const SHARE_CONFIG_PATH = "share/config";
export declare const DEFAULT_SHARE_SERVICE_URL = "/gateway/api";
export declare class ShareServiceClient implements ShareClient {
    private serviceConfig;
    constructor(serviceConfig?: ServiceConfig);
    /**
     * To send a POST request to the share endpoint in Share service
     */
    share(content: Content, recipients: User[], metadata: MetaData, comment?: Comment): Promise<ShareResponse>;
    getConfig(product: string, cloudId: string): Promise<ConfigResponse>;
}
