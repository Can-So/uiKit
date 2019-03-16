import { css as _css2 } from "emotion";
import { css as _css } from "emotion";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Fragment, Component } from 'react';
import Spinner from '@atlaskit/spinner';
import { externalContent, spinnerWrapper } from './styles';
import addParamToUrl from '../../add-param-to-url';
export var CONTENT_URL = '/home/notificationsDrawer/iframe.html';

var NotificationDrawer =
/*#__PURE__*/
function (_Component) {
  _inherits(NotificationDrawer, _Component);

  function NotificationDrawer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NotificationDrawer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NotificationDrawer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasIframeLoaded: false
    });

    _defineProperty(_assertThisInitialized(_this), "iframe", null);

    _defineProperty(_assertThisInitialized(_this), "handleMessage", function (event) {
      if (event.source && _this.iframe && event.source.window === _this.iframe.contentWindow && event.data === 'readyForUser') {
        _this.setState({
          hasIframeLoaded: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleIframeLoad", function () {
      _this.setState({
        hasIframeLoaded: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "storeIFrame", function (component) {
      _this.iframe = component;
    });

    return _this;
  }

  _createClass(NotificationDrawer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('message', this.handleMessage);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('message', this.handleMessage);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          locale = _this$props.locale,
          product = _this$props.product;
      var drawerUrl = CONTENT_URL;
      drawerUrl = locale ? addParamToUrl(drawerUrl, 'locale', locale) : drawerUrl;
      drawerUrl = product ? addParamToUrl(drawerUrl, 'product', product) : drawerUrl;
      return React.createElement(Fragment, null, !this.state.hasIframeLoaded && React.createElement("div", {
        className: _css(spinnerWrapper)
      }, React.createElement(Spinner, {
        size: "large",
        isCompleting: this.state.hasIframeLoaded
      })), React.createElement("iframe", {
        className: _css2(externalContent(!!this.state.hasIframeLoaded)),
        ref: this.storeIFrame,
        title: "Notifications",
        src: drawerUrl,
        onLoad: this.handleIframeLoad
      }));
    }
  }]);

  return NotificationDrawer;
}(Component);

export default NotificationDrawer;