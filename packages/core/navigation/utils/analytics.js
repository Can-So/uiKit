import { withAnalyticsEvents } from '@atlaskit/analytics-next';
export var navigationChannel = 'navigation';
export var navigationExpandedCollapsed = function navigationExpandedCollapsed(createAnalyticsEvent, _ref) {
  var isCollapsed = _ref.isCollapsed,
      trigger = _ref.trigger;
  return createAnalyticsEvent({
    action: isCollapsed ? 'collapsed' : 'expanded',
    actionSubject: 'productNavigation',
    attributes: {
      trigger: trigger
    }
  }).fire(navigationChannel);
};
/** Internal analytics fired on the fabric navigation channel. Not intended to
 * pass event instances to consumers.
 */

export var withGlobalItemAnalytics = function withGlobalItemAnalytics(Component) {
  return withAnalyticsEvents({
    onClick: function onClick(createAnalyticsEvent, props) {
      if (props.id) {
        var event = createAnalyticsEvent({
          action: 'clicked',
          actionSubject: 'navigationItem',
          actionSubjectId: props.id,
          attributes: {
            navigationLayer: 'global'
          }
        });
        event.fire(navigationChannel);
      }

      return null;
    }
  })(Component);
};