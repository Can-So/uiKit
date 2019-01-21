import { FabricChannel } from '@atlaskit/analytics-listeners';
import {
  AnalyticsListener,
  UIAnalyticsEventInterface,
} from '@atlaskit/analytics-next';
import * as React from 'react';
import { createDummyComponentWithAnalytics } from '../examples/helpers';
import { FabricElementsAnalyticsContext } from '../src';

const myOnClickHandler = () => {};

const listenerHandler = (
  event: UIAnalyticsEventInterface,
  channel?: string,
) => {
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
