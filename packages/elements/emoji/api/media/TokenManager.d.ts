import { MediaApiToken } from '../../types';
import { ServiceConfig } from '@atlaskit/util-service-support';
export declare const expireAdjustment = 30;
export declare type TokenType = 'read' | 'upload';
export default class TokenManager {
    private siteServiceConfig;
    private tokens;
    constructor(siteServiceConfig: ServiceConfig);
    addToken(type: TokenType, mediaApiToken: MediaApiToken): void;
    getToken(type: TokenType, forceRefresh?: boolean): Promise<MediaApiToken>;
}
