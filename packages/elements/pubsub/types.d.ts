import { OnEvent } from './apiTypes';
export declare type ARI = string;
export declare type AVI = string;
export interface SubscribeServiceResponse {
    protocol: ProtocolConfig | undefined;
    errors: {
        statusCode: number;
    }[];
}
export interface ProtocolConfig {
    type: string;
}
export interface Protocol {
    getType(): string;
    subscribe(config: ProtocolConfig): void;
    unsubscribeAll(): void;
    getCapabilities(): string[];
    on(event: EventType, handler: OnEvent): void;
    off(event: EventType, handler: OnEvent): void;
    networkUp(): void;
    networkDown(): void;
}
export declare enum EventType {
    MESSAGE = "MESSAGE",
    CONNECTED = "CONNECTED",
    ACCESS_DENIED = "ACCESS_DENIED",
    NETWORK_DOWN = "NETWORK_DOWN",
    NETWORK_UP = "NETWORK_UP",
    RECONNECT = "RECONNECT"
}
