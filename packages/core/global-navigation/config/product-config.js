import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React from 'react';
import QuestionIcon from '@findable/icon/glyph/question-circle';
import Badge from '@findable/badge';
import Avatar from '@findable/avatar';
import SignInIcon from '@findable/icon/glyph/sign-in';
var MAX_NOTIFICATIONS_COUNT = 9;

var isNotEmpty = function isNotEmpty(obj) {
  var values = Object.values(obj);
  return !!(values.length && values.reduce(function (acc, curr) {
    return acc || !!curr;
  }, false));
};

var generateAvatar = function generateAvatar(profileIconUrl) {
  var GeneratedAvatar = function GeneratedAvatar(_ref) {
    var className = _ref.className,
        onClick = _ref.onClick;
    return React.createElement("span", {
      className: className
    }, React.createElement(Avatar, {
      borderColor: "transparent",
      src: profileIconUrl,
      isActive: false,
      isHover: false,
      size: "small",
      onClick: onClick
    }));
  };

  return GeneratedAvatar;
};

function configFactory(onClick, tooltip) {
  var otherConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var href = otherConfig.href;
  var shouldNotRenderItem = !onClick && !href;

  if (shouldNotRenderItem && (tooltip || isNotEmpty(otherConfig))) {
    // eslint-disable-next-line no-console
    console.warn("One of the items in the Global Navigation is missing an onClick (or an href in case of the productIcon). This item will not be rendered in Global Navigation.");
  }

  if (shouldNotRenderItem) return null;
  return _objectSpread({}, href ? {
    href: href
  } : null, onClick ? {
    onClick: onClick
  } : null, tooltip ? {
    tooltip: tooltip,
    label: tooltip
  } : null, otherConfig);
}

function helpConfigFactory(items, tooltip) {
  var otherConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!items && (tooltip || isNotEmpty(otherConfig))) {
    // eslint-disable-next-line no-console
    console.warn('You have provided some prop(s) for help, but not helpItems. Help will not be rendered in Global Navigation');
  }

  if (!items) return null;
  return _objectSpread({
    icon: QuestionIcon,
    dropdownItems: items
  }, tooltip ? {
    tooltip: tooltip,
    label: tooltip
  } : null, otherConfig);
}

function profileConfigFactory(items, tooltip, href, profileIconUrl) {
  var otherConfig = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var shouldNotRenderProfile = !items && !href;

  if (shouldNotRenderProfile && (tooltip || isNotEmpty(otherConfig))) {
    // eslint-disable-next-line no-console
    console.warn('You provided some prop(s) for profile, but not profileItems or loginHref. Profile will not be rendered in Global Navigation');
  }

  if (shouldNotRenderProfile) return null;

  if (items && href) {
    // eslint-disable-next-line no-console
    console.warn('You have provided both loginHref and profileItems. loginUrl prop will be ignored by Global Navigation');
  }

  var profileComponent = items ? {
    icon: generateAvatar(profileIconUrl),
    dropdownItems: items
  } : {
    icon: SignInIcon,
    href: href
  };
  return _objectSpread({}, profileComponent, tooltip ? {
    tooltip: tooltip,
    label: tooltip
  } : null, otherConfig);
}

function notificationBadge(badgeCount) {
  return {
    badge: badgeCount ? function () {
      return React.createElement(Badge, {
        max: MAX_NOTIFICATIONS_COUNT,
        appearance: "important",
        value: badgeCount
      });
    } : null,
    badgeCount: badgeCount
  };
}

function notificationConfigFactory(notificationTooltip, badgeCount, notificationDrawerContents, onNotificationClick, isNotificationInbuilt, openDrawer) {
  var notificationOnClickHandler = function notificationOnClickHandler() {
    if (onNotificationClick) {
      onNotificationClick();
    }

    openDrawer();
  };

  return isNotificationInbuilt ? configFactory(notificationOnClickHandler, notificationTooltip, {
    badgeCount: badgeCount
  }) : configFactory(onNotificationClick || notificationDrawerContents && openDrawer, notificationTooltip, notificationBadge(badgeCount));
}

export default function generateProductConfig(props, openDrawer, isNotificationInbuilt) {
  var product = props.product,
      cloudId = props.cloudId,
      onProductClick = props.onProductClick,
      productTooltip = props.productTooltip,
      productIcon = props.productIcon,
      productHref = props.productHref,
      onCreateClick = props.onCreateClick,
      createTooltip = props.createTooltip,
      createDrawerContents = props.createDrawerContents,
      enableAtlassianSwitcher = props.enableAtlassianSwitcher,
      searchTooltip = props.searchTooltip,
      onSearchClick = props.onSearchClick,
      searchDrawerContents = props.searchDrawerContents,
      onStarredClick = props.onStarredClick,
      starredTooltip = props.starredTooltip,
      starredDrawerContents = props.starredDrawerContents,
      notificationTooltip = props.notificationTooltip,
      notificationCount = props.notificationCount,
      notificationDrawerContents = props.notificationDrawerContents,
      onNotificationClick = props.onNotificationClick,
      appSwitcherComponent = props.appSwitcherComponent,
      appSwitcherTooltip = props.appSwitcherTooltip,
      helpItems = props.helpItems,
      helpTooltip = props.helpTooltip,
      onSettingsClick = props.onSettingsClick,
      settingsTooltip = props.settingsTooltip,
      settingsDrawerContents = props.settingsDrawerContents,
      profileItems = props.profileItems,
      profileTooltip = props.profileTooltip,
      loginHref = props.loginHref,
      profileIconUrl = props.profileIconUrl;
  var shouldRenderAtlassianSwitcher = enableAtlassianSwitcher && cloudId && product;

  if (enableAtlassianSwitcher && !shouldRenderAtlassianSwitcher) {
    console.warn('When using the enableAtlassianSwitcher prop, be sure to send the cloudId and product props. Falling back to the legacy app-switcher');
  }

  return {
    product: configFactory(onProductClick, productTooltip, {
      icon: productIcon,
      href: productHref
    }),
    create: configFactory(onCreateClick || createDrawerContents && openDrawer('create'), createTooltip),
    search: configFactory(onSearchClick || searchDrawerContents && openDrawer('search'), searchTooltip),
    starred: configFactory(onStarredClick || starredDrawerContents && openDrawer('starred'), starredTooltip),
    settings: configFactory(onSettingsClick || settingsDrawerContents && openDrawer('settings'), settingsTooltip),
    atlassianSwitcher: shouldRenderAtlassianSwitcher ? configFactory(openDrawer('atlassianSwitcher')) : null,
    notification: notificationConfigFactory(notificationTooltip, notificationCount, notificationDrawerContents, onNotificationClick, isNotificationInbuilt, openDrawer('notification')),
    help: helpConfigFactory(helpItems, helpTooltip),
    profile: profileConfigFactory(profileItems, profileTooltip, loginHref, profileIconUrl),
    appSwitcher: appSwitcherComponent && !shouldRenderAtlassianSwitcher ? {
      itemComponent: appSwitcherComponent,
      label: appSwitcherTooltip,
      tooltip: appSwitcherTooltip
    } : null
  };
}