import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Provider } from 'unstated';
import { UIController, ViewController } from '../index';
import { CONTENT_NAV_WIDTH } from '../common/constants';
var LS_KEY = 'ATLASKIT_NAVIGATION_UI_STATE';
var DEFAULT_UI_STATE = {
  isCollapsed: false,
  productNavWidth: CONTENT_NAV_WIDTH,
  isResizeDisabled: false
};

function defaultGetCache() {
  if (typeof localStorage !== 'undefined') {
    var stored = localStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_UI_STATE;
  }

  return DEFAULT_UI_STATE;
}

function defaultSetCache(state) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }
}

var NavigationProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(NavigationProvider, _Component);

  function NavigationProvider(props) {
    var _this;

    _classCallCheck(this, NavigationProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavigationProvider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "uiState", void 0);

    _defineProperty(_assertThisInitialized(_this), "viewController", void 0);

    var cache = props.cache,
        initialUIController = props.initialUIController,
        isDebugEnabled = props.isDebugEnabled;
    _this.uiState = new UIController(initialUIController, cache);
    _this.viewController = new ViewController({
      isDebugEnabled: isDebugEnabled
    });
    return _this;
  }

  _createClass(NavigationProvider, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var viewController = this.viewController;
      var isDebugEnabled = this.props.isDebugEnabled;

      if (isDebugEnabled !== prevProps.isDebugEnabled) {
        viewController.setIsDebugEnabled(!!isDebugEnabled);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var uiState = this.uiState,
          viewController = this.viewController;
      return React.createElement(Provider, {
        inject: [uiState, viewController]
      }, children);
    }
  }]);

  return NavigationProvider;
}(Component);

_defineProperty(NavigationProvider, "defaultProps", {
  cache: {
    get: defaultGetCache,
    set: defaultSetCache
  },
  isDebugEnabled: false
});

export { NavigationProvider as default };