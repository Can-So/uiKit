import _extends from "@babel/runtime/helpers/extends";
import _typeof from "@babel/runtime/helpers/typeof";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import Tooltip from '@findable/tooltip';
import { name as packageName, version as packageVersion } from '../version.json';
import { validIconSizes, propsOmittedFromClickData } from './constants';
import Presence from './Presence';
import AvatarImage from './AvatarImage';
import Status from './Status';
import Outer, { PresenceWrapper, StatusWrapper } from '../styled/Avatar';
import { omit } from '../utils';
import { getProps, getStyledAvatar } from '../helpers';
import { mapProps, withPseudoState } from '../hoc';
import { Theme } from '../theme';

var warn = function warn(message) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message); // eslint-disable-line no-console
  }
};

var Avatar =
/*#__PURE__*/
function (_Component) {
  _inherits(Avatar, _Component);

  function Avatar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Avatar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Avatar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "ref", void 0);

    _defineProperty(_assertThisInitialized(_this), "createAndFireEventOnAtlaskit", createAndFireEvent('atlaskit'));

    _defineProperty(_assertThisInitialized(_this), "clickAnalyticsCaller", function () {
      var createAnalyticsEvent = _this.props.createAnalyticsEvent;

      if (createAnalyticsEvent) {
        return _this.createAndFireEventOnAtlaskit({
          action: 'clicked',
          actionSubject: 'avatar',
          attributes: {
            componentName: 'avatar',
            packageName: packageName,
            packageVersion: packageVersion
          }
        })(createAnalyticsEvent);
      }

      return undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "blur", function () {
      if (_this.ref) _this.ref.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      if (_this.ref) _this.ref.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "guardedClick", function (event) {
      var _this$props = _this.props,
          isDisabled = _this$props.isDisabled,
          onClick = _this$props.onClick;
      if (isDisabled || typeof onClick !== 'function') return;
      var item = omit.apply(void 0, [_this.props].concat(_toConsumableArray(propsOmittedFromClickData)));

      var analyticsEvent = _this.clickAnalyticsCaller();

      onClick({
        item: item,
        event: event
      }, analyticsEvent);
    });

    _defineProperty(_assertThisInitialized(_this), "renderIcon", function () {
      var _this$props2 = _this.props,
          appearance = _this$props2.appearance,
          borderColor = _this$props2.borderColor,
          presence = _this$props2.presence,
          status = _this$props2.status;
      var showPresence = Boolean(presence);
      var showStatus = Boolean(status); // no icon needed

      if (!showStatus && !showPresence) {
        return null;
      } // cannot display both


      if (showStatus && showPresence) {
        warn('Avatar supports `presence` OR `status` properties, not both.');
        return null;
      } // only support particular sizes


      if (validIconSizes.indexOf(_this.props.size) === -1) {
        warn("Avatar size \"".concat(String(_this.props.size), "\" does NOT support ").concat(showPresence ? 'presence' : 'status'));
        return null;
      } // we can cast here because we already know that it is a valid icon size


      var size = _this.props.size;

      var indicator = function () {
        if (showPresence) {
          var customPresenceNode = _typeof(presence) === 'object' ? presence : null;
          return React.createElement(PresenceWrapper, {
            appearance: appearance,
            size: size
          }, React.createElement(Presence, {
            borderColor: borderColor,
            presence: !customPresenceNode && presence,
            size: size
          }, customPresenceNode));
        } // showStatus


        var customStatusNode = _typeof(status) === 'object' ? status : null;
        return React.createElement(StatusWrapper, {
          appearance: appearance,
          size: size
        }, React.createElement(Status, {
          borderColor: borderColor,
          status: !customStatusNode && status,
          size: size
        }, customStatusNode));
      }();

      return indicator;
    });

    _defineProperty(_assertThisInitialized(_this), "setRef", function (ref) {
      _this.ref = ref;
    });

    return _this;
  }

  _createClass(Avatar, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          appearance = _this$props3.appearance,
          enableTooltip = _this$props3.enableTooltip,
          name = _this$props3.name,
          size = _this$props3.size,
          src = _this$props3.src,
          stackIndex = _this$props3.stackIndex,
          onClick = _this$props3.onClick,
          theme = _this$props3.theme; // distill props from context, props, and state

      var enhancedProps = getProps(this); // provide element type based on props
      // TODO: why not enhanced props?

      var Inner = getStyledAvatar(this.props);
      Inner.displayName = 'Inner';
      var AvatarNode = React.createElement(Theme.Provider, {
        value: theme
      }, React.createElement(Outer, {
        size: size,
        stackIndex: stackIndex
      }, React.createElement(Inner, _extends({
        innerRef: this.setRef
      }, enhancedProps, {
        onClick: onClick != null ? this.guardedClick : undefined
      }), React.createElement(AvatarImage, {
        alt: name,
        appearance: appearance,
        size: size,
        src: src
      })), this.renderIcon()));
      return enableTooltip && name ? React.createElement(Tooltip, {
        content: name
      }, AvatarNode) : AvatarNode;
    }
  }]);

  return Avatar;
}(Component);

_defineProperty(Avatar, "defaultProps", {
  appearance: 'circle',
  enableTooltip: true,
  size: 'medium'
});

export var AvatarWithoutAnalytics = mapProps({
  appearance: function appearance(props) {
    return props.appearance || Avatar.defaultProps.appearance;
  },
  // 1
  isInteractive: function isInteractive(props) {
    return Boolean((typeof props.enableTooltip !== 'undefined' ? props.enableTooltip : Avatar.defaultProps.enableTooltip) && props.name);
  } // 2

})(withPseudoState(Avatar));
export default withAnalyticsContext({
  componentName: 'avatar',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents()(AvatarWithoutAnalytics));