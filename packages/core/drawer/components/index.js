import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Children, Component, Fragment } from 'react';
import { canUseDOM } from 'exenv';
import { createPortal } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import { createAndFireEvent, withAnalyticsEvents, withAnalyticsContext } from '@atlaskit/analytics-next';
import Blanket from '@atlaskit/blanket';
import { name as packageName, version as packageVersion } from '../version.json';
import drawerItemTheme from '../theme/drawer-item-theme';
import DrawerPrimitive from './primitives';
import { Fade } from './transitions';

var OnlyChild = function OnlyChild(_ref) {
  var children = _ref.children;
  return Children.toArray(children)[0] || null;
};

var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

var createAndFireOnClick = function createAndFireOnClick(createAnalyticsEvent, trigger) {
  return createAndFireEventOnAtlaskit({
    action: 'dismissed',
    actionSubject: 'drawer',
    attributes: {
      componentName: 'drawer',
      packageName: packageName,
      packageVersion: packageVersion,
      trigger: trigger
    }
  })(createAnalyticsEvent);
};

export var DrawerBase =
/*#__PURE__*/
function (_Component) {
  _inherits(DrawerBase, _Component);

  function DrawerBase() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DrawerBase);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DrawerBase)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "body", canUseDOM ? document.querySelector('body') : undefined);

    _defineProperty(_assertThisInitialized(_this), "handleBlanketClick", function (event) {
      _this.handleClose(event, 'blanket');
    });

    _defineProperty(_assertThisInitialized(_this), "handleBackButtonClick", function (event) {
      _this.handleClose(event, 'backButton');
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function (event, trigger) {
      var _this$props = _this.props,
          createAnalyticsEvent = _this$props.createAnalyticsEvent,
          onClose = _this$props.onClose;
      var analyticsEvent = createAndFireOnClick(createAnalyticsEvent, trigger);

      if (onClose) {
        onClose(event, analyticsEvent);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      var _this$props2 = _this.props,
          isOpen = _this$props2.isOpen,
          onKeyDown = _this$props2.onKeyDown;

      if (event.key === 'Escape' && isOpen) {
        _this.handleClose(event, 'escKey');
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    });

    return _this;
  }

  _createClass(DrawerBase, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var isOpen = this.props.isOpen;

      if (isOpen) {
        window.addEventListener('keydown', this.handleKeyDown);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var isOpen = this.props.isOpen;

      if (isOpen !== prevProps.isOpen) {
        if (isOpen) {
          window.addEventListener('keydown', this.handleKeyDown);
        } else {
          window.removeEventListener('keydown', this.handleKeyDown);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.body) {
        return null;
      }

      var _this$props3 = this.props,
          isOpen = _this$props3.isOpen,
          children = _this$props3.children,
          icon = _this$props3.icon,
          width = _this$props3.width,
          shouldUnmountOnExit = _this$props3.shouldUnmountOnExit,
          onCloseComplete = _this$props3.onCloseComplete;
      return createPortal(React.createElement(TransitionGroup, {
        component: OnlyChild
      }, React.createElement(Fragment, null, React.createElement(Fade, {
        in: isOpen
      }, React.createElement(Blanket, {
        isTinted: true,
        onBlanketClicked: this.handleBlanketClick
      })), React.createElement(DrawerPrimitive, {
        icon: icon,
        in: isOpen,
        onClose: this.handleBackButtonClick,
        onCloseComplete: onCloseComplete,
        width: width,
        shouldUnmountOnExit: shouldUnmountOnExit
      }, children))), this.body);
    }
  }]);

  return DrawerBase;
}(Component);

_defineProperty(DrawerBase, "defaultProps", {
  width: 'narrow'
});

export var DrawerItemTheme = function DrawerItemTheme(props) {
  return React.createElement(ThemeProvider, {
    theme: drawerItemTheme
  }, props.children);
};
export default withAnalyticsContext({
  componentName: 'drawer',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents()(DrawerBase));