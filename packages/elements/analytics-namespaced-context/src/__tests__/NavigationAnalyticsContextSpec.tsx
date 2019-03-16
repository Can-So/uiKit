import * as React from 'react';
import { mount } from 'enzyme';
import { FabricChannel } from '@findable/analytics-listeners';
import { AnalyticsListener } from '@findable/analytics-next';
import { createDummyComponentWithAnalytics } from '../../examples/helpers';
import { NavigationAnalyticsContext } from '../NavigationAnalyticsContext';

const NavigationComponentWithAnalytics = createDummyComponentWithAnalytics(
  FabricChannel.navigation,
);

describe('<NavigationAnalyticsContext />', () => {
  it('should fire event with Navigation contextual data', () => {
    const compOnClick = jest.fn();
    const listenerHandler = jest.fn();

    const component = mount(
      <AnalyticsListener
        onEvent={listenerHandler}
        channel={FabricChannel.navigation}
      >
        <NavigationAnalyticsContext data={{ greeting: 'hello' }}>
          <NavigationComponentWithAnalytics onClick={compOnClick} />
        </NavigationAnalyticsContext>
      </AnalyticsListener>,
    );

    const analyticsListener = component.find(AnalyticsListener);
    expect(analyticsListener.props()).toHaveProperty(
      'channel',
      FabricChannel.navigation,
    );

    const dummy = analyticsListener.find('#dummy');
    dummy.simulate('click');

    expect(listenerHandler).toBeCalledWith(
      expect.objectContaining({
        context: [{ navigationCtx: { greeting: 'hello' } }],
        payload: {
          action: 'someAction',
          actionSubject: 'someComponent',
          attributes: {
            componentName: 'foo',
            foo: 'bar',
            packageName: '@findable/foo',
            packageVersion: '1.0.0',
          },
          eventType: 'ui',
        },
      }),
      FabricChannel.navigation,
    );
  });
});
