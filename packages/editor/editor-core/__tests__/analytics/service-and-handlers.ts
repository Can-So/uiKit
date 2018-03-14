import {
  AnalyticsHandler,
  AnalyticsProperties,
  detectHandler,
  hermentHandler,
} from '../../src/analytics/handler';
import service from '../../src/analytics/service';

describe('analytics service', () => {
  it('auto-detects Herment', () => {
    window.AJS = { EventQueue: { push() {} } };
    expect(detectHandler()).toBe(hermentHandler);
    delete window.AJS;
  });

  it('allows setting the handler', () => {
    let eventName;
    const handler: AnalyticsHandler = (
      name: string,
      props: AnalyticsProperties,
    ) => {
      eventName = name;
    };
    service.handler = handler;
    service.trackEvent('test.event');
    expect(eventName).toEqual('test.event');
  });

  it('allows removing the handler', () => {
    let called = false;
    const handler: AnalyticsHandler = (
      name: string,
      props: AnalyticsProperties,
    ) => {
      called = true;
    };
    service.handler = handler;
    service.handler = null;
    service.trackEvent('test.event');
    expect(called).toBe(false);
  });
});
