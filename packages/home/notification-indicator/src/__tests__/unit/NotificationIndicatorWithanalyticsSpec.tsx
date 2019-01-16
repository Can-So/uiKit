import * as React from 'react';
import { mount } from 'enzyme';

import {
  NotificationLogClient,
  NotificationCountResponse,
} from '@atlaskit/notification-log-client';

import NotificationIndicator from '../../NotificationIndicator';

class MockNotificationLogClient extends NotificationLogClient {
  private response: Promise<NotificationCountResponse>;

  constructor(response: Promise<NotificationCountResponse>) {
    super('', '');
    this.response = response;
  }

  public async countUnseenNotifications() {
    return this.response;
  }

  public setResponse(response: Promise<NotificationCountResponse>) {
    this.response = response;
  }
}

describe('NotificationIndicator', () => {
  let notificationLogClient;
  let mockCreateAnalyticsEvent;
  let mockClientPromise;
  let notificationLogResponse;

  function setMockResponseCount(count: number) {
    notificationLogResponse = Promise.resolve({ count });
    notificationLogClient.setResponse(notificationLogResponse);
    mockClientPromise = Promise.resolve(notificationLogClient);
  }

  async function renderNotificationIndicator(props: Object = {}) {
    const wrapper = mount(
      <NotificationIndicator
        notificationLogProvider={mockClientPromise}
        refreshOnHidden={true}
        createAnalyticsEvent={mockCreateAnalyticsEvent}
        {...props}
      />,
    );

    try {
      await mockClientPromise;
    } catch (e) {}

    try {
      await notificationLogResponse;
    } catch (e) {}

    return wrapper;
  }

  beforeEach(() => {
    notificationLogClient = new MockNotificationLogClient(
      Promise.resolve({ count: 0 }),
    );
    mockCreateAnalyticsEvent = jest.fn(analytics => {
      return {
        fire: () => null,
      };
    });
  });

  it('Should trigger analytics event when activating on mount', async () => {
    setMockResponseCount(7);
    const wrapper = await renderNotificationIndicator({
      max: 10,
      appearance: 'primary',
    });
    wrapper.update();

    expect(mockCreateAnalyticsEvent.mock.calls.length).toBe(1);
    expect(mockCreateAnalyticsEvent.mock.calls[0][0]).toEqual({
      name: 'notificationIndicator',
      action: 'activated',
      attributes: {
        badgeCount: 7,
        refreshSource: 'mount',
      },
    });
  });

  it('Should trigger analytics event when activating on timer', async done => {
    setMockResponseCount(0);
    let wrapper = await renderNotificationIndicator({
      max: 10,
      appearance: 'primary',
      refreshRate: 10,
    });
    wrapper.update();
    setMockResponseCount(10);
    wrapper.update();

    setTimeout(() => {
      expect(mockCreateAnalyticsEvent.mock.calls.length).toBe(1);
      expect(mockCreateAnalyticsEvent.mock.calls[0][0]).toEqual({
        name: 'notificationIndicator',
        action: 'activated',
        attributes: {
          badgeCount: 10,
          refreshSource: 'timer',
        },
      });
      done();
    }, 50);
  });

  it('Should not trigger analytics event if already activated', async done => {
    setMockResponseCount(7);
    let wrapper = await renderNotificationIndicator({
      max: 10,
      appearance: 'primary',
      refreshRate: 10,
    });
    wrapper.update();
    setMockResponseCount(10);
    wrapper.update();

    setTimeout(() => {
      expect(mockCreateAnalyticsEvent.mock.calls.length).toBe(1);
      expect(mockCreateAnalyticsEvent.mock.calls[0][0]).toEqual({
        name: 'notificationIndicator',
        action: 'activated',
        attributes: {
          badgeCount: 7,
          refreshSource: 'mount',
        },
      });
      done();
    }, 50);
  });
});
