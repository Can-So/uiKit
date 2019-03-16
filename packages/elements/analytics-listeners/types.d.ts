/// <reference types="react" />
import Logger from './helpers/logger';
import { GasPurePayload, GasPureScreenEventPayload } from '@findable/analytics-gas-types';
export declare type AnalyticsWebClient = {
    sendUIEvent: (event: GasPurePayload) => void;
    sendOperationalEvent: (event: GasPurePayload) => void;
    sendTrackEvent: (event: GasPurePayload) => void;
    sendScreenEvent: (event: GasPureScreenEventPayload) => void;
};
export declare type ListenerProps = {
    children?: React.ReactNode;
    client?: AnalyticsWebClient | Promise<AnalyticsWebClient>;
    logger: Logger;
};
export declare enum FabricChannel {
    atlaskit = "atlaskit",
    elements = "fabric-elements",
    navigation = "navigation",
    editor = "editor",
    media = "media"
}
