import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
import React, { Component, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@findable/analytics-namespaced-context';
import { NotificationIndicator } from '@findable/notification-indicator';
import { NotificationLogClient } from '@findable/notification-log-client';
import { GlobalNav } from '@findable/navigation-next';
import Drawer from '@findable/drawer';
import AtlassianSwitcher, { AtlassianSwitcherPrefetchTrigger } from '@findable/atlassian-switcher';
import { name as packageName, version as packageVersion } from '../../version.json';
import generateDefaultConfig from '../../config/default-config';
import generateProductConfig from '../../config/product-config';
import ItemComponent from '../ItemComponent';
import ScreenTracker from '../ScreenTracker';
import { analyticsIdMap, fireDrawerDismissedEvents } from './analytics';
import NotificationDrawerContents from '../../platform-integration';

var noop = function noop() {};

var localStorage = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window.localStorage : {};

var GlobalNavigation =
/*#__PURE__*/
function (_Component) {
  _inherits(GlobalNavigation, _Component);

  function GlobalNavigation(_props) {
    var _this;

    _classCallCheck(this, GlobalNavigation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlobalNavigation).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "drawers", {
      search: {
        isControlled: false
      },
      notification: {
        isControlled: false
      },
      starred: {
        isControlled: false
      },
      settings: {
        isControlled: false
      },
      create: {
        isControlled: false
      },
      atlassianSwitcher: {
        isControlled: false
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isNotificationInbuilt", false);

    _defineProperty(_assertThisInitialized(_this), "shouldRenderAtlassianSwitcher", false);

    _defineProperty(_assertThisInitialized(_this), "onCountUpdating", function () {
      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        visibilityChangesSinceTimer: 0
      };

      if (!_this.state.notificationCount || param.visibilityChangesSinceTimer <= 1) {
        // fetch the notificationCount
        return {};
      } // skip fetch, refresh from local storage if newer


      var cachedCount = parseInt(_this.getLocalStorageCount(), 10);
      var result = {};

      if (cachedCount && cachedCount !== _this.state.notificationCount) {
        result.countOverride = cachedCount;
      } else {
        result.skip = true;
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "onCountUpdated", function () {
      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        newCount: 0
      };

      _this.updateLocalStorageCount(param.newCount);

      _this.setState({
        notificationCount: param.newCount
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getLocalStorageCount", function () {
      try {
        return localStorage.getItem('notificationBadgeCountCache');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "updateLocalStorageCount", function (newCount) {
      try {
        localStorage.setItem('notificationBadgeCountCache', newCount);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateDrawerControlledStatus", function (drawerName, props) {
      var capitalisedDrawerName = _this.getCapitalisedDrawerName(drawerName);

      if (props["on".concat(capitalisedDrawerName.replace('Drawer', ''), "Click")]) {
        _this.drawers[drawerName].isControlled = false;
      } else {
        // If a drawer doesn't have an onClick handler, mark it as a controlled drawer.
        _this.drawers[drawerName].isControlled = true;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getCapitalisedDrawerName", function (drawerName) {
      return "".concat(drawerName[0].toUpperCase()).concat(drawerName.slice(1), "Drawer");
    });

    _defineProperty(_assertThisInitialized(_this), "openDrawer", function (drawerName) {
      return function () {
        var capitalisedDrawerName = _this.getCapitalisedDrawerName(drawerName);

        var onOpenCallback = noop;

        if (typeof _this.props["on".concat(capitalisedDrawerName, "Open")] === 'function') {
          onOpenCallback = _this.props["on".concat(capitalisedDrawerName, "Open")];
        }

        if (drawerName === 'notification' && _this.isNotificationInbuilt) {
          _this.onCountUpdated({
            newCount: 0
          });
        } // Update the state only if it's a controlled drawer.
        // componentDidMount takes care of the uncontrolled drawers


        if (_this.drawers[drawerName].isControlled) {
          _this.setState(_defineProperty({}, "is".concat(capitalisedDrawerName, "Open"), true), onOpenCallback);
        } else {
          // invoke callback in both cases
          onOpenCallback();
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "closeDrawer", function (drawerName) {
      return function (event, analyticsEvent) {
        var capitalisedDrawerName = _this.getCapitalisedDrawerName(drawerName);

        var onCloseCallback = noop;

        if (typeof _this.props["on".concat(capitalisedDrawerName, "Close")] === 'function') {
          onCloseCallback = _this.props["on".concat(capitalisedDrawerName, "Close")];
        }

        fireDrawerDismissedEvents(drawerName, analyticsEvent); // Update the state only if it's a controlled drawer.
        // componentDidMount takes care of the uncontrolled drawers

        if (_this.drawers[drawerName].isControlled) {
          _this.setState(_defineProperty({}, "is".concat(capitalisedDrawerName, "Open"), false), onCloseCallback);
        } else {
          // invoke callback in both cases
          onCloseCallback();
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "CustomizedItemComponent", function (props) {
      if (_this.shouldRenderAtlassianSwitcher && props.id === 'atlassianSwitcher') {
        return React.createElement(AtlassianSwitcherPrefetchTrigger, {
          cloudId: _this.props.cloudId
        }, React.createElement(ItemComponent, props));
      }

      return React.createElement(ItemComponent, props);
    });

    _defineProperty(_assertThisInitialized(_this), "renderNotificationBadge", function () {
      if (_this.state.isNotificationDrawerOpen) {
        // Unmount the badge when the drawer is open
        // So that it can remount with the latest badgeCount when the drawer closes.
        return null;
      }

      var _this$props = _this.props,
          cloudId = _this$props.cloudId,
          fabricNotificationLogUrl = _this$props.fabricNotificationLogUrl;
      var refreshRate = _this.state.notificationCount ? 180000 : 60000;
      return React.createElement(NotificationIndicator, {
        notificationLogProvider: new NotificationLogClient(fabricNotificationLogUrl, cloudId),
        refreshRate: refreshRate,
        onCountUpdated: _this.onCountUpdated,
        onCountUpdating: _this.onCountUpdating
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderNotificationDrawerContents", function () {
      var _this$props2 = _this.props,
          locale = _this$props2.locale,
          product = _this$props2.product;
      return React.createElement(NotificationDrawerContents, {
        product: product,
        locale: locale
      });
    });

    _defineProperty(_assertThisInitialized(_this), "constructNavItems", function () {
      var productConfig = generateProductConfig(_this.props, _this.openDrawer, _this.isNotificationInbuilt);
      var defaultConfig = generateDefaultConfig();
      var badge = _this.renderNotificationBadge;

      var _ref = _this.isNotificationInbuilt ? _this.state : _this.props,
          badgeCount = _ref.notificationCount;

      var navItems = Object.keys(productConfig).map(function (item) {
        return _objectSpread({}, productConfig[item] ? _objectSpread({}, item === 'notification' && _this.isNotificationInbuilt ? {
          id: 'notifications',
          badge: badge
        } : {}, defaultConfig[item], productConfig[item], item === 'notification' ? {
          id: 'notifications',
          badgeCount: badgeCount
        } : {}) : null);
      });
      return {
        primaryItems: navItems.filter(function (_ref2) {
          var section = _ref2.section;
          return section === 'primary';
        }).sort(function (_ref3, _ref4) {
          var rank1 = _ref3.rank;
          var rank2 = _ref4.rank;
          return rank1 - rank2;
        }).map(function (navItem) {
          var section = navItem.section,
              rank = navItem.rank,
              props = _objectWithoutProperties(navItem, ["section", "rank"]);

          return props;
        }),
        secondaryItems: navItems.filter(function (_ref5) {
          var section = _ref5.section;
          return section === 'secondary';
        }).sort(function (_ref6, _ref7) {
          var rank1 = _ref6.rank;
          var rank2 = _ref7.rank;
          return rank1 - rank2;
        }).map(function (navItem) {
          var section = navItem.section,
              rank = navItem.rank,
              props = _objectWithoutProperties(navItem, ["section", "rank"]);

          return props;
        })
      };
    });

    _defineProperty(_assertThisInitialized(_this), "triggerXFlow", function (productKey, sourceComponent) {
      var triggerXFlow = _this.props.triggerXFlow;

      _this.setState({
        isAtlassianSwitcherDrawerOpen: false
      });

      if (triggerXFlow) {
        triggerXFlow(productKey, sourceComponent);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderAtlassianSwitcherDrawerContents", function () {
      // eslint-disable-next-line camelcase
      var _this$props3 = _this.props,
          product = _this$props3.product,
          cloudId = _this$props3.cloudId,
          experimental_enableSplitJira = _this$props3.experimental_enableSplitJira;
      return React.createElement(AtlassianSwitcher, {
        cloudId: cloudId,
        product: product,
        triggerXFlow: _this.triggerXFlow // eslint-disable-next-line camelcase
        ,
        enableSplitJira: experimental_enableSplitJira
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getDrawerContents", function (drawerName) {
      switch (drawerName) {
        case 'atlassianSwitcher':
          return _this.shouldRenderAtlassianSwitcher ? _this.renderAtlassianSwitcherDrawerContents : null;

        case 'notification':
          return _this.isNotificationInbuilt ? _this.renderNotificationDrawerContents : _this.props.notificationDrawerContents;

        default:
          return _this.props["".concat(drawerName, "DrawerContents")];
      }
    });

    _this.state = {
      isCreateDrawerOpen: false,
      isSearchDrawerOpen: false,
      isNotificationDrawerOpen: false,
      isStarredDrawerOpen: false,
      isSettingsDrawerOpen: false,
      isAtlassianSwitcherDrawerOpen: false,
      notificationCount: 0
    };
    Object.keys(_this.drawers).forEach(function (drawer) {
      _this.updateDrawerControlledStatus(drawer, _props);

      var capitalisedDrawerName = _this.getCapitalisedDrawerName(drawer);

      if (_props["".concat(drawer, "DrawerContents")] && !_props["on".concat(capitalisedDrawerName, "Close")]) {
        /* eslint-disable no-console */
        console.warn("You have provided an onClick handler for ".concat(drawer, ", but no close handler for the drawer.\n        Please pass on").concat(capitalisedDrawerName, "Close prop to handle closing of the ").concat(drawer, " drawer."));
        /* eslint-enable */
      } // Set it's initial state using a prop with the same name.


      _this.state["is".concat(capitalisedDrawerName, "Open")] = _props["is".concat(capitalisedDrawerName, "Open")];
    });
    var _this$props4 = _this.props,
        _cloudId = _this$props4.cloudId,
        enableAtlassianSwitcher = _this$props4.enableAtlassianSwitcher,
        _fabricNotificationLogUrl = _this$props4.fabricNotificationLogUrl,
        notificationDrawerContents = _this$props4.notificationDrawerContents,
        _product = _this$props4.product;
    _this.isNotificationInbuilt = !!(!notificationDrawerContents && _cloudId && _fabricNotificationLogUrl);
    _this.shouldRenderAtlassianSwitcher = enableAtlassianSwitcher && _cloudId && _product;
    return _this;
  }

  _createClass(GlobalNavigation, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      Object.keys(this.drawers).forEach(function (drawerName) {
        _this2.updateDrawerControlledStatus(drawerName, _this2.props);

        var capitalisedDrawerName = _this2.getCapitalisedDrawerName(drawerName); // Do nothing if it's a controlled drawer


        if (_this2.drawers[drawerName].isControlled) {
          return;
        }

        if (prevProps["is".concat(capitalisedDrawerName, "Open")] !== _this2.props["is".concat(capitalisedDrawerName, "Open")]) {
          // Update the state based on the prop
          _this2.setState(_defineProperty({}, "is".concat(capitalisedDrawerName, "Open"), _this2.props["is".concat(capitalisedDrawerName, "Open")]));
        }
      });
      var _this$props5 = this.props,
          cloudId = _this$props5.cloudId,
          enableAtlassianSwitcher = _this$props5.enableAtlassianSwitcher,
          fabricNotificationLogUrl = _this$props5.fabricNotificationLogUrl,
          notificationDrawerContents = _this$props5.notificationDrawerContents,
          product = _this$props5.product;
      this.isNotificationInbuilt = !!(!notificationDrawerContents && cloudId && fabricNotificationLogUrl);
      this.shouldRenderAtlassianSwitcher = enableAtlassianSwitcher && cloudId && product;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      // TODO: Look into memoizing this to avoid memory bloat
      var _this$constructNavIte = this.constructNavItems(),
          primaryItems = _this$constructNavIte.primaryItems,
          secondaryItems = _this$constructNavIte.secondaryItems;

      return React.createElement(NavigationAnalyticsContext, {
        data: {
          packageName: packageName,
          packageVersion: packageVersion,
          componentName: 'globalNavigation'
        }
      }, React.createElement(Fragment, null, React.createElement(GlobalNav, {
        itemComponent: this.CustomizedItemComponent,
        primaryItems: primaryItems,
        secondaryItems: secondaryItems
      }), Object.keys(this.drawers).map(function (drawerName) {
        var capitalisedDrawerName = _this3.getCapitalisedDrawerName(drawerName);

        var shouldUnmountOnExit = _this3.props["should".concat(capitalisedDrawerName, "UnmountOnExit")];

        var DrawerContents = _this3.getDrawerContents(drawerName);

        if (!DrawerContents) {
          return null;
        }

        var onCloseComplete = _this3.props["on".concat(capitalisedDrawerName, "CloseComplete")];

        return React.createElement(Drawer, {
          key: drawerName,
          isOpen: _this3.state["is".concat(capitalisedDrawerName, "Open")],
          onClose: _this3.closeDrawer(drawerName),
          onCloseComplete: onCloseComplete,
          shouldUnmountOnExit: shouldUnmountOnExit,
          width: drawerName === 'atlassianSwitcher' ? 'narrow' : _this3.props["".concat(drawerName, "DrawerWidth")]
        }, React.createElement(ScreenTracker, {
          name: analyticsIdMap[drawerName],
          isVisible: _this3.state["is".concat(capitalisedDrawerName, "Open")]
        }), React.createElement(DrawerContents, null));
      })));
    }
  }]);

  return GlobalNavigation;
}(Component);

_defineProperty(GlobalNavigation, "defaultProps", {
  enableAtlassianSwitcher: false,
  createDrawerWidth: 'wide',
  searchDrawerWidth: 'wide',
  notificationDrawerWidth: 'wide',
  starredDrawerWidth: 'wide',
  settingsDrawerWidth: 'wide'
});

export { GlobalNavigation as default };