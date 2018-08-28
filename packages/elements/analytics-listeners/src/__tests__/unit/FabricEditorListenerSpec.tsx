import * as React from 'react';
import { mount } from 'enzyme';
import { FabricChannel } from '../../index';
import FabricEditorListener, {
  EDITOR_TAG,
} from '../../fabric/FabricEditorListener';
import {
  DummyComponentWithAnalytics,
  TaggedDummyComponentWithAnalytics,
  Props,
} from '../../../examples/helpers';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { AnalyticsWebClient } from '../../types';

describe('<FabricEditorsListener />', () => {
  let analyticsWebClientMock: AnalyticsWebClient;
  let loggerMock;

  beforeEach(() => {
    analyticsWebClientMock = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };
    loggerMock = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
  });

  const fireAndVerifySentEvent = (
    Component: React.StatelessComponent<Props>,
    expectedEvent: any,
  ) => {
    const compOnClick = jest.fn();
    const component = mount(
      <FabricEditorListener client={analyticsWebClientMock} logger={loggerMock}>
        <Component onClick={compOnClick} />
      </FabricEditorListener>,
    );

    const analyticsListener = component.find(AnalyticsListener);
    expect(analyticsListener.props()).toHaveProperty(
      'channel',
      FabricChannel.editor,
    );

    const dummy = analyticsListener.find('#dummy');
    dummy.simulate('click');

    expect(analyticsWebClientMock.sendUIEvent).toBeCalledWith(expectedEvent);
  };

  describe('Listen and fire an UI event with analyticsWebClient', () => {
    it('should fire event with editor tag', () => {
      fireAndVerifySentEvent(
        DummyComponentWithAnalytics(FabricChannel.editor),
        {
          action: 'someAction',
          actionSubject: 'someComponent',
          source: 'unknown',
          tags: [EDITOR_TAG],
        },
      );
    });

    it('should fire event without duplicating the tag', () => {
      fireAndVerifySentEvent(
        TaggedDummyComponentWithAnalytics(FabricChannel.editor, EDITOR_TAG),
        {
          action: 'someAction',
          actionSubject: 'someComponent',
          source: 'unknown',
          tags: [EDITOR_TAG, 'foo'],
        },
      );
    });
  });
});
