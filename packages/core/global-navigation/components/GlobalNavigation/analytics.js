import { NAVIGATION_CHANNEL } from '../../constants';
export var analyticsIdMap = {
  search: 'quickSearchDrawer',
  notification: 'notificationsDrawer',
  create: 'createDrawer',
  starred: 'starDrawer',
  settings: 'settingsDrawer',
  atlassianSwitcher: 'atlassianSwitcherDrawer'
};
export var fireDrawerDismissedEvents = function fireDrawerDismissedEvents(drawerName, analyticsEvent) {
  if (analyticsEvent.payload.attributes && analyticsEvent.payload.attributes.trigger === 'escKey') {
    var keyboardShortcutEvent = analyticsEvent.clone().update(function () {
      return {
        action: 'pressed',
        actionSubject: 'keyboardShortcut',
        actionSubjectId: 'dismissDrawer',
        attributes: {
          key: 'Esc'
        }
      };
    });
    keyboardShortcutEvent.fire(NAVIGATION_CHANNEL);
  }

  analyticsEvent.update({
    actionSubjectId: analyticsIdMap[drawerName]
  }).fire(NAVIGATION_CHANNEL);
};