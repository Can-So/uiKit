import { ServiceConfig } from '@atlaskit/util-service-support';
export declare type ARI = string;
export declare type AVI = string;
export interface PubSubClient {
    on(eventAvi: string, listener: OnEvent): PubSubClient;
    off(eventAvi: string, listener: OnEvent): PubSubClient;
    join(aris: ARI[]): Promise<PubSubClient>;
    leave(aris: ARI[]): Promise<PubSubClient>;
}
export interface ActionablePubSubClient extends PubSubClient {
    networkUp(): void;
    networkDown(): void;
}
export interface OnEvent<T = any> {
    (event: string, data: T): void;
}
export declare enum SpecialEventType {
    ERROR = "ERROR",
    CONNECTED = "CONNECTED",
    RECONNECT = "RECONNECT"
}
export interface PubSubClientConfig extends ServiceConfig {
    product: string;
    featureFlags?: {
        [key: string]: boolean;
    };
}
