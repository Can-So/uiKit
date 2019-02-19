// tslint:disable-next-line no-implicit-dependencies
import {
  DEFAULT_SOURCE,
  GasPayload,
  UI_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { mount } from 'enzyme';
import * as React from 'react';
import { createButtonWithAnalytics } from '../../../../examples/helpers';
import Logger from '../../../helpers/logger';
import MediaAnalyticsListener from '../../../media/MediaAnalyticsListener';
import { AnalyticsWebClient, FabricChannel } from '../../../types';
import { createLoggerMock } from '../../_testUtils';

describe('MediaAnalyticsListener', () => {
  let analyticsWebClientMock: AnalyticsWebClient;
  let loggerMock: Logger;

  beforeEach(() => {
    analyticsWebClientMock = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };
    loggerMock = createLoggerMock();
  });

  const fireAndVerify = (eventPayload: GasPayload, expectedEvent: any) => {
    const spy = jest.fn();
    const ButtonWithAnalytics = createButtonWithAnalytics(
      eventPayload,
      FabricChannel.media,
    );

    const component = mount(
      <MediaAnalyticsListener
        client={analyticsWebClientMock}
        logger={loggerMock}
      >
        <ButtonWithAnalytics onClick={spy} />
      </MediaAnalyticsListener>,
    );
    component.find(ButtonWithAnalytics).simulate('click');

    expect(analyticsWebClientMock.sendUIEvent).toBeCalledWith(expectedEvent);
  };

  it('should register an Analytics listener on the media channel', () => {
    const component = mount(
      <MediaAnalyticsListener
        client={analyticsWebClientMock}
        logger={loggerMock}
      >
        <div />
      </MediaAnalyticsListener>,
    );

    const analyticsListener = component.find(AnalyticsListener);
    expect(analyticsListener.props()).toHaveProperty(
      'channel',
      FabricChannel.media,
    );
  });

  it('should send event with default source', () => {
    fireAndVerify(
      {
        eventType: UI_EVENT_TYPE,
        action: 'someAction',
        actionSubject: 'someComponent',
      },
      {
        action: 'someAction',
        actionSubject: 'someComponent',
        source: DEFAULT_SOURCE,
        tags: expect.arrayContaining(['media']),
      },
    );
  });

  it('should keep original source if set', () => {
    fireAndVerify(
      {
        eventType: UI_EVENT_TYPE,
        action: 'someAction',
        actionSubject: 'someComponent',
        source: 'mySource',
      },
      {
        action: 'someAction',
        actionSubject: 'someComponent',
        source: 'mySource',
        tags: expect.arrayContaining(['media']),
      },
    );
  });

  it('should append media tag if tags are not empty', () => {
    fireAndVerify(
      {
        eventType: UI_EVENT_TYPE,
        action: 'someAction',
        actionSubject: 'someComponent',
        source: 'mySource',
        tags: ['atlaskit'],
      },
      {
        action: 'someAction',
        actionSubject: 'someComponent',
        source: 'mySource',
        tags: expect.arrayContaining(['media']),
      },
    );
  });

  it('should not remove any existing tags if tags are not empty', () => {
    fireAndVerify(
      {
        eventType: UI_EVENT_TYPE,
        action: 'someAction',
        actionSubject: 'someComponent',
        source: 'mySource',
        tags: ['atlaskit'],
      },
      {
        action: 'someAction',
        actionSubject: 'someComponent',
        source: 'mySource',
        tags: expect.arrayContaining(['media', 'atlaskit']),
      },
    );
  });
});
