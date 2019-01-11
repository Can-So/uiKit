import * as React from 'react';
import { mount } from 'enzyme';

import {
  NotificationLogClient,
  NotificationCountResponse,
} from '@atlaskit/notification-log-client';

import NotificationIndicator from '../../NotificationIndicator';

class MockNotificationLogClient extends NotificationLogClient {
  private response?: Promise<NotificationCountResponse>;

  constructor() {
    super('', '');
  }

  public async countUnseenNotifications() {
    return (
      this.response ||
      Promise.resolve({
        count: 0,
      })
    );
  }

  public setResponse(response: Promise<NotificationCountResponse>) {
    this.response = response;
  }
}

describe('NotificationIndicator', () => {
  let notificationLogClient;

  function returnCount(count: number): Promise<NotificationCountResponse> {
    return Promise.resolve({ count });
  }

  var mockCreateAnalyticsEvent = jest.fn(analyticsEvent => {
    return;
  });

  async function renderNotificationIndicator(
    response: Promise<NotificationCountResponse>,
    props: Object = {},
  ) {
    notificationLogClient.setResponse(response);
    const clientPromise = Promise.resolve(notificationLogClient);

    const wrapper = mount(
      <NotificationIndicator
        notificationLogProvider={clientPromise}
        refreshOnHidden={true}
        createAnalyticsEvent={mockCreateAnalyticsEvent}
        {...props}
      />,
    );

    try {
      await clientPromise;
    } catch (e) {}

    try {
      await response;
    } catch (e) {}

    return wrapper;
  }

  beforeEach(() => {
    notificationLogClient = new MockNotificationLogClient();
  });

  it('Should trigger analytics event when activating', async () => {
    const wrapper = await renderNotificationIndicator(returnCount(7), {
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
});
