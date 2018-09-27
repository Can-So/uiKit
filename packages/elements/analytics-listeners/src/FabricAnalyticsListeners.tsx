import * as React from 'react';

import { AnalyticsWebClient, FabricChannel, ListenerProps } from './types';
import FabricElementsListener from './fabric/FabricElementsListener';
import AtlaskitListener from './atlaskit/AtlaskitListener';
import Logger from './helpers/logger';
import NavigationListener from './navigation/NavigationListener';
import FabricEditorListener from './fabric/FabricEditorListener';
import MediaAnalyticsListener from './media/MediaAnalyticsListener';

export type Props = {
  /** Children! */
  children?: React.ReactNode;
  client?: AnalyticsWebClient;
  logLevel?: number;
  /** A list of individual listeners to exclude, identified by channel */
  excludedChannels?: FabricChannel[];
};

const listenerMap = {
  [FabricChannel.elements]: FabricElementsListener,
  [FabricChannel.editor]: FabricEditorListener,
  [FabricChannel.atlaskit]: AtlaskitListener,
  [FabricChannel.navigation]: NavigationListener,
  [FabricChannel.media]: MediaAnalyticsListener,
};

class FabricAnalyticsListeners extends React.Component<Props> {
  logger: Logger;

  constructor(props: Props) {
    super(props);

    this.logger = new Logger({ logLevel: props.logLevel });

    if (!props.client) {
      throw new Error('Analytics client not provided');
    }
  }

  render() {
    const { client, children, logLevel, excludedChannels } = this.props;
    if (typeof logLevel === 'number') {
      this.logger.setLogLevel(logLevel);
    }

    const listeners = (Object.keys(listenerMap) as FabricChannel[])
      .filter(
        channel => !excludedChannels || excludedChannels.indexOf(channel) < 0,
      )
      .map(channel => listenerMap[channel])
      .reduce(
        (
          prev: React.ReactNode,
          Listener: React.ComponentClass<ListenerProps>,
        ) => (
          <Listener client={client} logger={this.logger}>
            {prev}
          </Listener>
        ),
        children,
      );

    return listeners;
  }
}

export default FabricAnalyticsListeners;
