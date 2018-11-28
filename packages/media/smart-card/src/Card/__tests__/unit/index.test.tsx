jest.mock('react-lazily-render', () => {
  return {
    default: (data: any) => data.content,
  };
});

import * as React from 'react';
import { mount } from 'enzyme';
import { Provider, Client, ResolveResponse, ObjectState } from '../../..';
import { Card } from '../..';
import { from } from 'rxjs/observable/from';
import { CardWithUrl } from '../../types';
import {
  BlockCardResolvingView,
  BlockCardErroredView,
  BlockCardForbiddenView,
  BlockCardUnauthorisedView,
  BlockCardResolvedView,
  InlineCardResolvedView,
  InlineCardResolvingView,
  CardLinkView,
} from '@atlaskit/media-ui';
import { ClientConfig } from '../../../Client';

function createClient(
  consequentStates?: ObjectState[],
  config?: ClientConfig,
): Client {
  const client = new Client(config);
  jest
    .spyOn(client, 'startStreaming')
    .mockReturnValue(
      from([
        { status: 'resolving', services: [] } as ObjectState,
        ...(consequentStates ? consequentStates : []),
      ]),
    );
  return client;
}

const getNow = (nows: number[]) => () => nows.shift() || new Date().getTime();
const waitFor = (time = 1) => new Promise(res => setTimeout(res, time));

describe('Card', () => {
  // tslint:disable-next-line:no-console
  console.error = jest.fn();

  describe('Client.config.loadingStateDelay', () => {
    it('should render the link placeholder for the initial state', () => {
      const client = createClient();
      const url = 'https://www.atlassian.com/';
      const wrapper = mount(
        <Card appearance="block" client={client} url={url} />,
      );
      expect(wrapper.find(CardLinkView).exists()).toBeTruthy();
    });

    it('should render a link placeholder first, and if data comes within the delay, it should transition to resolved state', async () => {
      class CustomClient extends Client {
        fetchData() {
          return Promise.resolve({
            meta: {
              visibility: 'public',
              access: 'granted',
              auth: [],
              definitionId: 'd1',
            },
            data: {
              name: 'foobar',
            },
          } as ResolveResponse);
        }
      }
      const client = new CustomClient({
        cacheLifespan: 1,
        getNowTimeFn: getNow([1, 2]),
        loadingStateDelay: 10,
      });

      const url = 'https://www.atlassian.com/';
      const wrapper = mount(
        <Card appearance="block" client={client} url={url} />,
      );
      expect(wrapper.find(CardLinkView).exists()).toBeTruthy();
      await waitFor(1);
      wrapper.update();
      expect(wrapper.find(BlockCardResolvedView).exists()).toBeTruthy();
    });

    it('should work correctly with cache', async () => {
      class CustomClient extends Client {
        fetchData() {
          return Promise.resolve({
            meta: {
              visibility: 'restricted',
              access: 'unauthorized',
              auth: [],
              definitionId: 'd1',
            },
            data: {},
          } as ResolveResponse);
        }
      }
      const client = new CustomClient({
        cacheLifespan: 9000,
        getNowTimeFn: getNow([1, 2, 3, 4]),
        loadingStateDelay: 10,
      });

      const url = 'https://www.atlassian.com/';
      let wrapper = mount(
        <Card appearance="block" client={client} url={url} />,
      );
      expect(wrapper.find(CardLinkView).exists()).toBeTruthy();
      await waitFor(1);
      wrapper.update();
      expect(wrapper.find(BlockCardUnauthorisedView).exists()).toBeTruthy();
      wrapper.unmount();

      // We're mounting the card again and we should now be using the data from cache
      wrapper = mount(<Card appearance="block" client={client} url={url} />);
      expect(wrapper.find(BlockCardUnauthorisedView).exists()).toBeTruthy();
    });

    it('should work the same with stale cache after remounting', async () => {
      class CustomClient extends Client {
        fetchData() {
          return Promise.resolve({
            meta: {
              visibility: 'restricted',
              access: 'unauthorized',
              auth: [],
              definitionId: 'd1',
            },
            data: {},
          } as ResolveResponse);
        }
      }
      const client = new CustomClient({
        cacheLifespan: 1,
        getNowTimeFn: getNow([1, 10]),
        loadingStateDelay: 10,
      });

      const url = 'https://www.atlassian.com/';
      let wrapper = mount(
        <Card appearance="block" client={client} url={url} />,
      );
      expect(wrapper.find(CardLinkView).exists()).toBeTruthy();
      await waitFor(1);
      wrapper.update();
      expect(wrapper.find(BlockCardUnauthorisedView).exists()).toBeTruthy();
      wrapper.unmount();

      // We're mounting the card again, which should trigger a reload
      wrapper = mount(<Card appearance="block" client={client} url={url} />);
      expect(wrapper.find(CardLinkView).exists()).toBeTruthy();
      await waitFor(1);
      wrapper.update();
      expect(wrapper.find(BlockCardUnauthorisedView).exists()).toBeTruthy();
    });
  });

  it('should render the errored view when errored', async () => {
    const client = createClient([
      { status: 'errored', definitionId: undefined },
    ]);

    const wrapper = mount(
      <Card
        appearance="block"
        client={client}
        url="https://www.atlassian.com/"
      />,
    );

    wrapper.update();
    expect(wrapper.find(BlockCardErroredView).exists()).toBeTruthy();
  });

  it('should render the errored view when not-found', async () => {
    const client = createClient([{ status: 'not-found' } as ObjectState]);
    const wrapper = mount(
      <Card
        appearance="block"
        client={client}
        url="https://www.atlassian.com/"
      />,
    );

    wrapper.update();
    expect(wrapper.find(BlockCardErroredView).exists()).toBeTruthy();
  });

  it('should render the forbidden view when forbidden', async () => {
    const client = createClient([{ status: 'forbidden' } as ObjectState]);
    const wrapper = mount(
      <Card
        appearance="block"
        client={client}
        url="https://www.atlassian.com/"
      />,
    );

    wrapper.update();
    expect(wrapper.find(BlockCardForbiddenView).exists()).toBeTruthy();
  });

  // LB: Should we skip
  it('should render the unauthorized view when unauthorized', async () => {
    const client = createClient([{ status: 'unauthorized' } as ObjectState]);
    const wrapper = mount(
      <Card
        appearance="block"
        client={client}
        url="https://www.atlassian.com/"
      />,
    );

    wrapper.update();
    expect(wrapper.find(BlockCardUnauthorisedView).exists()).toBeTruthy();
  });

  it('should render the resolved view when resolved', async () => {
    const client = createClient([
      { status: 'resolved', data: {} } as ObjectState,
    ]);
    const wrapper = mount(
      <Card
        appearance="block"
        client={client}
        url="https://www.atlassian.com/"
      />,
    );

    wrapper.update();
    expect(wrapper.find(BlockCardResolvedView)).toHaveLength(1);
  });

  it('should be able to be selected when inline and resolved', async () => {
    const client = createClient([
      { status: 'resolved', data: {} } as ObjectState,
    ]);
    const wrapper = mount(
      <Card
        appearance="inline"
        isSelected={true}
        client={client}
        url="https://www.atlassian.com/"
      />,
    );

    wrapper.update();
    expect(wrapper.find(InlineCardResolvedView).props()).toEqual(
      expect.objectContaining({
        isSelected: true,
      }),
    );
  });

  it('should be able to be selected when block and resolved', async () => {
    const client = createClient([
      { status: 'resolved', data: {} } as ObjectState,
    ]);
    const wrapper = mount(
      <Card
        appearance="block"
        isSelected={true}
        client={client}
        url="https://www.atlassian.com/"
      />,
    );

    wrapper.update();
    expect(wrapper.find(BlockCardResolvedView).props()).toEqual(
      expect.objectContaining({
        isSelected: true,
      }),
    );
  });

  it('should reload the object state when the url changes', async () => {
    const client = createClient([
      { status: 'resolved', definitionId: 'a', data: {} } as ObjectState,
    ]);

    const wrapper = mount(
      <Card
        appearance="block"
        client={client}
        url="https://www.atlassian.com/"
      />,
    );

    wrapper.update();
    expect(wrapper.find(BlockCardResolvedView).exists()).toBeTruthy();

    wrapper.setProps({ url: 'https://www.google.com/' }).update();

    expect(client.startStreaming).toHaveBeenCalledWith(
      'https://www.google.com/',
    );

    expect(wrapper.find(BlockCardResolvedView).exists()).toBeTruthy();
  });

  it('should extract view props from data', async () => {
    const client = createClient([
      {
        status: 'resolved',
        definitionId: '1',
        services: [],
        data: {
          name: 'The best of EAC',
          summary:
            'The most popular voted pages and posts from EAC as voted for all time.',
        },
      },
    ]);
    const wrapper = mount(
      <Card
        appearance="block"
        client={client}
        url="https://www.atlassian.com/"
      />,
    );

    // wait for the data to be loaded

    wrapper.update();
    expect(wrapper.find(BlockCardResolvedView).props()).toEqual(
      expect.objectContaining({
        title: { text: 'The best of EAC' },
        description: {
          text:
            'The most popular voted pages and posts from EAC as voted for all time.',
        },
      }),
    );
  });

  it('should render the resolved view when data is provided', async () => {
    const wrapper = mount(
      <Card appearance="block" data={{ name: 'foobar' }} />,
    );

    await waitFor();
    wrapper.update();

    expect(wrapper.find(BlockCardResolvedView)).toHaveLength(1);
    expect(wrapper.find(BlockCardResolvedView).props()).toEqual(
      expect.objectContaining({
        title: { text: 'foobar' },
      }),
    );
  });

  it('should render the inline view with props when the appearance is inline and the object is resolving', async () => {
    const client = createClient();
    const wrapper = mount(
      <Card
        appearance="inline"
        client={client}
        url="https://www.atlassian.com/"
      />,
    );
    wrapper.update();
    await waitFor();
    expect(wrapper.find(InlineCardResolvingView)).toHaveLength(1);
  });

  it('should render the block view with props when the appearance is inline and the object is resolving', async () => {
    const client = createClient();
    const wrapper = mount(
      <Card
        appearance="block"
        client={client}
        url="https://www.atlassian.com/"
      />,
    );
    wrapper.update();
    await waitFor();
    expect(wrapper.find(BlockCardResolvingView)).toHaveLength(1);
  });

  it('should render the inline view with props when the appearance is inline', async () => {
    const wrapper = mount(
      <Card appearance="inline" data={{ name: 'foobar' }} />,
    );
    wrapper.update();
    await waitFor();
    expect(wrapper.find(InlineCardResolvedView)).toHaveLength(1);
    expect(wrapper.find(InlineCardResolvedView).props()).toEqual(
      expect.objectContaining({
        title: 'foobar',
      }),
    );
  });

  it('should render the block view with props when the appearance is block', async () => {
    const wrapper = mount(
      <Card appearance="block" data={{ name: 'foobar' }} />,
    );
    wrapper.update();
    await waitFor();
    expect(wrapper.find(BlockCardResolvedView)).toHaveLength(1);
    expect(wrapper.find(BlockCardResolvedView).props()).toEqual(
      expect.objectContaining({
        title: { text: 'foobar' },
      }),
    );
  });

  it('should not reload when appearance changes', () => {
    const client = createClient();
    const wrapper = mount<CardWithUrl>(
      <Card
        appearance="block"
        client={client}
        url="https://www.atlassian.com/"
      />,
    );

    expect(client.startStreaming).toHaveBeenCalledTimes(1);

    wrapper.setProps({ appearance: 'inline' }).update();

    expect(client.startStreaming).toHaveBeenCalledTimes(1);

    wrapper.setProps({ appearance: 'block' }).update();

    expect(client.startStreaming).toHaveBeenCalledTimes(1);
  });

  it('should render the data passed by a custom data fetch implementation', async () => {
    const specialCaseUrl = 'http://some.jira.com/board/ISS-1234';

    const customResponse = {
      meta: {
        visibility: 'public',
        access: 'granted',
        auth: [],
        definitionId: 'custom-def',
      },
      data: {
        name: 'Doc 1',
      },
    } as ResolveResponse;

    class CustomClient extends Client {
      fetchData(url: string) {
        if (url === specialCaseUrl) {
          return Promise.resolve(customResponse);
        }
        return super.fetchData(url);
      }
    }

    const wrapper = mount(
      <Provider client={new CustomClient()}>
        <Card appearance="block" url={specialCaseUrl} />
      </Provider>,
    );

    // need this delay because of the promise within customFetch
    await new Promise(resolve => window.setTimeout(resolve, 1));
    wrapper.update();

    expect(wrapper.find(BlockCardResolvedView).exists()).toBeTruthy();
    expect(wrapper.find(BlockCardResolvedView).props()).toEqual(
      expect.objectContaining({
        title: {
          text: 'Doc 1',
        },
      }),
    );
  });
});
