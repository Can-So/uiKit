import { Auth } from '@atlaskit/media-core';
export { SourceFile } from '@atlaskit/media-store';
export declare type ClientBasedSourceFileOwner = {
    readonly id: string;
    readonly token: string;
    readonly baseUrl: string;
};
export declare type AsapBasedSourceFileOwner = {
    readonly asapIssuer: string;
    readonly token: string;
    readonly baseUrl: string;
};
export declare type SourceFileOwner = ClientBasedSourceFileOwner | AsapBasedSourceFileOwner;
export declare function mapAuthToSourceFileOwner(auth: Auth): SourceFileOwner;
