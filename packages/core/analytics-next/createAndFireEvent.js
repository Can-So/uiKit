export default (function (channel) {
  return function (payload) {
    return function (createAnalyticsEvent) {
      var consumerEvent = createAnalyticsEvent(payload);
      consumerEvent.clone().fire(channel);
      return consumerEvent;
    };
  };
});