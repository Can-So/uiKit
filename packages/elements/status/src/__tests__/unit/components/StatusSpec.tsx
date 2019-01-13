import * as React from 'react';
import { Status } from '../../../components/Status';
import Lozenge from '@atlaskit/lozenge';
import { AnalyticsListener as AnalyticsListenerNext } from '@atlaskit/analytics-next';
import { ANALYTICS_HOVER_DELAY } from '../../../components/constants';
import { ELEMENTS_CHANNEL } from '../../../components/analytics';
import { mountWithIntl } from 'enzyme-react-intl';

const createPayload = (actionSubject, action, localId) => ({
  payload: {
    action,
    actionSubject,
    attributes: {
      packageName: '@atlaskit/status',
      packageVersion: expect.any(String),
      componentName: 'status',
      localId,
    },
    eventType: 'ui',
  },
});

describe('Status', () => {
  it('should render', () => {
    const component = mountWithIntl(<Status text="In progress" color="blue" />);
    expect(component.find(Lozenge).length).toBe(1);
  });

  it('should have max-width 200px', () => {
    const component = mountWithIntl(<Status text="In progress" color="blue" />);
    expect(component.find(Lozenge).prop('maxWidth')).toBe(200);
  });

  it('should map colors to lozenge appearances', () => {
    const colorToLozengeAppearanceMap = {
      neutral: 'default',
      purple: 'new',
      blue: 'inprogress',
      red: 'removed',
      yellow: 'moved',
      green: 'success',
    };

    function checkColorMapping(color, appearance) {
      const component = mountWithIntl(
        <Status text="In progress" color={color} />,
      );
      expect(component.find(Lozenge).prop('appearance')).toBe(appearance);
    }

    for (let color in colorToLozengeAppearanceMap) {
      checkColorMapping(color, colorToLozengeAppearanceMap[color]);
    }
  });

  it('should use default color if color is unknown', () => {
    const component = mountWithIntl(
      // @ts-ignore: passing an invalid color
      <Status text="In progress" color="unknown" />,
    );

    expect(component.find(Lozenge).prop('appearance')).toBe('default');
  });

  it('should not render it if text is empty', () => {
    const component = mountWithIntl(<Status text=" " color="blue" />);

    expect(component.find(Lozenge).length).toBe(0);
  });

  it('should use render data attributes for copy/paste', () => {
    const component = mountWithIntl(
      <Status text="TODO" color="blue" style="subtle" />,
    );

    const span = component.find('span[className="status-lozenge-span"]');
    expect(span.prop('data-node-type')).toBe('status');
    expect(span.prop('data-style')).toBe('subtle');
    expect(span.prop('data-color')).toBe('blue');
    expect(span.prop('data-local-id')).toBeUndefined();
  });

  describe('Status onHover', () => {
    let realDateNow;
    let dateNowStub;
    let analyticsNextHandler;

    beforeEach(() => {
      realDateNow = Date.now;
      dateNowStub = jest.fn();
      Date.now = dateNowStub;
      analyticsNextHandler = jest.fn();
    });

    afterEach(() => {
      Date.now = realDateNow;
    });

    const createStatus = (localId: string, onClick: any, onHover: any) =>
      mountWithIntl(
        <AnalyticsListenerNext
          onEvent={analyticsNextHandler}
          channel={ELEMENTS_CHANNEL}
        >
          <Status
            localId={localId}
            text="boo"
            color="green"
            onClick={onClick}
            onHover={onHover}
          />
        </AnalyticsListenerNext>,
      );

    it('should fire analytics Status onHover', () => {
      const now = realDateNow();
      const onHover = jest.fn();
      const component = createStatus('123', jest.fn(), onHover);

      dateNowStub.mockReturnValue(now);
      const lozengeContainer = component.find(
        'span[className="status-lozenge-span"]',
      );

      lozengeContainer.simulate('mouseenter');
      dateNowStub.mockReturnValue(now + ANALYTICS_HOVER_DELAY + 10);
      lozengeContainer.simulate('mouseleave');

      expect(onHover).toHaveBeenCalled();
      expect(analyticsNextHandler).toHaveBeenCalledWith(
        expect.objectContaining(
          createPayload('statusLozenge', 'hovered', '123'),
        ),
        ELEMENTS_CHANNEL,
      );
    });

    it('should fire analytics Status onClick', () => {
      const onClick = jest.fn();
      const component = createStatus('456', onClick, jest.fn());

      const lozengeContainer = component.find(
        'span[className="status-lozenge-span"]',
      );
      lozengeContainer.simulate('click');

      expect(onClick).toHaveBeenCalled();
      expect(analyticsNextHandler).toHaveBeenCalledWith(
        expect.objectContaining(
          createPayload('statusLozenge', 'clicked', '456'),
        ),
        ELEMENTS_CHANNEL,
      );
    });
  });
});
