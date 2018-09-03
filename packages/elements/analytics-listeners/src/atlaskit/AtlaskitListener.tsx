import * as React from 'react';
import { AnalyticsListener } from '@atlaskit/analytics-next';

import { sendEvent } from '../analytics-web-client-wrapper';
import { ListenerProps, FabricChannel } from '../types';
import { UIAnalyticsEventHandlerSignature } from '@atlaskit/analytics-next-types';
import processEvent from './process-event';

export default class AtlaskitListener extends React.Component<ListenerProps> {
  listenerHandler: UIAnalyticsEventHandlerSignature = event => {
    const { client, logger } = this.props;
    logger.debug('Received Atlaskit event', event);
    const payload = processEvent(event, logger);
    logger.debug('Processed Atlaskit event', payload);

    if (payload) {
      sendEvent(logger, client)(payload);
    }
  };

  render() {
    return (
      <AnalyticsListener
        onEvent={this.listenerHandler}
        channel={FabricChannel.atlaskit}
      >
        {this.props.children}
      </AnalyticsListener>
    );
  }
}
