import * as React from 'react';
import { mount } from 'enzyme';
import { AnalyticsContext } from '@atlaskit/analytics-next';
import FabricAnalyticsListeners from '../src/FabricAnalyticsListeners';
import {
  DummyComponentWithAnalytics,
  DummyAtlaskitComponentWithAnalytics,
  DummyComponentWithAttributesWithAnalytics,
} from '../examples/helpers';

const myOnClickHandler = () => {
  console.log('Button clicked ! Yay!');
};

const analyticsWebClientMock = {
  sendUIEvent: event => {
    console.log('sendUIEvent: ', event);
  },
  sendOperationalEvent: event => {
    console.log('sendOperationalEvent: ', event);
  },
  sendTrackEvent: (event: any) => {
    console.log('sendTrackEvent: ', event);
  },
  sendScreenEvent: (event: any) => {
    console.log('sendScreenEvent: ', event);
  },
};

export default function Example() {
  return (
    <FabricAnalyticsListeners client={Promise.resolve(analyticsWebClientMock)}>
      <div>
        <DummyComponentWithAnalytics
          text="Fabric Elements event - component without attributes"
          onClick={myOnClickHandler}
        />

        <AnalyticsContext data={{ issueId: 100, greeting: 'hello' }}>
          <AnalyticsContext data={{ issueId: 200 }}>
            <DummyComponentWithAttributesWithAnalytics
              text="Fabric Elements event - component with attributes"
              onClick={myOnClickHandler}
            />
          </AnalyticsContext>
        </AnalyticsContext>

        <DummyAtlaskitComponentWithAnalytics onClick={myOnClickHandler} />
      </div>
    </FabricAnalyticsListeners>
  );
}
