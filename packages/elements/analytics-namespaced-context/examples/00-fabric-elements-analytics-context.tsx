import { FabricChannel } from '@atlaskit/analytics-listeners';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next-types';

import * as React from 'react';
import { createDummyComponentWithAnalytics } from '../examples/helpers';
import { FabricElementsAnalyticsContext } from '../src';

const myOnClickHandler = () => {};

const listenerHandler = (event: UIAnalyticsEvent, channel?: string) => {
  console.log('listenerHandler, event: ', event, ' channel: ', channel);
};

const ElementsComponentWithAnalytics = createDummyComponentWithAnalytics(
  FabricChannel.elements,
);

export default function Example() {
  return (
    <AnalyticsListener
      onEvent={listenerHandler}
      channel={FabricChannel.elements}
    >
      <div>
        <FabricElementsAnalyticsContext data={{ greeting: 'hello' }}>
          <ElementsComponentWithAnalytics onClick={myOnClickHandler} />
        </FabricElementsAnalyticsContext>
      </div>
    </AnalyticsListener>
  );
}
