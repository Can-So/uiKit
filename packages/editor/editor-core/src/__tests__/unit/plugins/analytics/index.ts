import {
  fireAnalyticsEvent,
  analyticsChannel,
} from '../../../../plugins/analytics';

describe('analytics', () => {
  const payload = {
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'helpButton',
    attributes: { inputMethod: 'toolbar' },
  };

  describe('fireAnalyticsEvent', () => {
    let mockFire;
    let mockCreateAnalyticsEvent;
    let triggerAnalyticsEvent;

    beforeEach(() => {
      mockFire = jest.fn();
      mockCreateAnalyticsEvent = jest.fn(() => ({
        fire: mockFire,
      }));
      triggerAnalyticsEvent = fireAnalyticsEvent(mockCreateAnalyticsEvent);
    });

    it('fires analytics event payload', () => {
      triggerAnalyticsEvent({ payload });
      expect(mockCreateAnalyticsEvent).toHaveBeenCalledWith(payload);
    });

    it('fires analytics event to default channel if none specified', () => {
      triggerAnalyticsEvent({ payload });
      expect(mockFire).toHaveBeenCalledWith(analyticsChannel);
    });

    it('fires analytics event payload to specific channel', () => {
      triggerAnalyticsEvent({ payload, channel: 'atlassian' });
      expect(mockFire).toHaveBeenCalledWith('atlassian');
    });
  });
});
