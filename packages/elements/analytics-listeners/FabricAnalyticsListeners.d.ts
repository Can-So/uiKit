import * as React from 'react';
import { AnalyticsWebClient, FabricChannel } from './types';
import Logger from './helpers/logger';
export declare type Props = {
    /** Children! */
    children?: React.ReactNode;
    client?: AnalyticsWebClient | Promise<AnalyticsWebClient>;
    logLevel?: number;
    /** A list of individual listeners to exclude, identified by channel */
    excludedChannels?: FabricChannel[];
};
declare class FabricAnalyticsListeners extends React.Component<Props> {
    logger: Logger;
    constructor(props: Props);
    render(): React.ReactNode;
}
export default FabricAnalyticsListeners;
