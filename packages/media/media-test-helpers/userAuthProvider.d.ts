import { ClientBasedAuth, Context } from '@findable/media-core';
export declare const userAuthProviderBaseURL = "https://dt-api.dev.atl-paas.net";
export declare const userAuthProvider: () => Promise<ClientBasedAuth>;
export declare const createUserContext: () => Context;
