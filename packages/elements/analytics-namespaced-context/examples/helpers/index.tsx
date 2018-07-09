import * as React from 'react';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { GasPayload } from '@atlaskit/analytics-gas-types';
import Button from '@atlaskit/button';

export type Props = {
  text?: string;
  onClick: (e) => void;
};

export const ELEMENTS_CHANNEL = 'fabricElements';

export const DummyComponent: React.StatelessComponent<Props> = props => (
  <div id="dummy" onClick={props.onClick} style={{ paddingBottom: 12 }}>
    <Button appearance="help">{props.text ? props.text : 'Test'}</Button>
  </div>
);

export const DummyComponentWithAnalytics = withAnalyticsEvents({
  onClick: (createEvent, props) => {
    const event: GasPayload = {
      action: 'someAction',
      actionSubject: 'someComponent',
      eventType: 'ui',
      source: 'unknown',
      attributes: {
        packageVersion: '1.0.0',
        packageName: '@atlaskit/foo',
        componentName: 'foo',
        foo: 'bar',
      },
    };
    createEvent(event).fire(ELEMENTS_CHANNEL);
  },
})(DummyComponent);
