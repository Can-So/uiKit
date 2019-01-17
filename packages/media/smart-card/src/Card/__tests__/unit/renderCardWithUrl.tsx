import * as React from 'react';
import { CardWithUrlContent } from '../../renderCardWithUrl';
import { mount } from 'enzyme';
import { Client, ResolveResponse } from '../../../Client';
import Button from '@atlaskit/button';
import {
  AnalyticsEventPayload,
  UIAnalyticsEventInterface,
} from '@atlaskit/analytics-next-types';
import { InlineCardUnauthorizedView } from '@atlaskit/media-ui';

namespace Mock {
  export class FakeClient extends Client {
    fetchData(): Promise<ResolveResponse> {
      return Promise.resolve({
        meta: {
          visibility: 'restricted' as any,
          access: 'unauthorized' as any,
          auth: [
            {
              key: 'string',
              displayName: 'string',
              url: 'string',
            },
          ],
          definitionId: 'd1',
        },
      });
    }
  }
  export const positiveAuthFn = () => Promise.resolve();
  export const negativeAuthFn = () =>
    Promise.reject(new Error('rejected auth'));
  export const winClosedAuthFn = () =>
    Promise.reject(new Error('The auth window was closed'));
  export const mockedFireFn = jest.fn();
  export const fakeCreateAnalyticsEvent = jest.fn().mockImplementation(
    (payload: AnalyticsEventPayload): UIAnalyticsEventInterface => {
      return ({
        fire: mockedFireFn,
        payload,
      } as any) as UIAnalyticsEventInterface;
    },
  );
}

const delay = (n: number) => new Promise(res => setTimeout(res, n));

describe('Render Card With URL', () => {
  afterEach(() => {
    Mock.fakeCreateAnalyticsEvent.mockClear();
  });

  it('should fire connectSucceededEvent when auth fn resolved', async () => {
    const fakeClient = new Mock.FakeClient({ loadingStateDelay: 0 });
    const wrapper = mount(
      <CardWithUrlContent
        url="http://some.url"
        client={fakeClient}
        appearance="inline"
        onClick={() => {}}
        isSelected={false}
        createAnalyticsEvent={Mock.fakeCreateAnalyticsEvent}
        authFn={Mock.positiveAuthFn}
      />,
    );
    // pending state for now...
    await delay(1); // wait for client to respond...
    wrapper.update();

    wrapper
      .find(InlineCardUnauthorizedView)
      .find(Button)
      .simulate('click');

    await delay(1); // wait for async auth mock...

    const calls = Mock.fakeCreateAnalyticsEvent.mock.calls.map(
      ([obj]) => obj.action,
    );

    expect(calls).toEqual(['unresolved', 'connected', 'connectSucceeded']);
  });

  it('should fire connectSucceededEvent when auth fn resolved', async () => {
    const fakeClient = new Mock.FakeClient({ loadingStateDelay: 0 });
    const wrapper = mount(
      <CardWithUrlContent
        url="http://some.url"
        client={fakeClient}
        appearance="inline"
        onClick={() => {}}
        isSelected={false}
        createAnalyticsEvent={Mock.fakeCreateAnalyticsEvent}
        authFn={Mock.negativeAuthFn}
      />,
    );
    // pending state for now...
    await delay(1); // wait for client to respond...
    wrapper.update();

    wrapper
      .find(InlineCardUnauthorizedView)
      .find(Button)
      .simulate('click');

    await delay(1); // wait for async auth mock...

    const calls = Mock.fakeCreateAnalyticsEvent.mock.calls.map(
      ([obj]) => obj.action,
    );

    expect(calls).toEqual(['unresolved', 'connectFailed']);
  });
});
