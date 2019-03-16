import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';

var GatewayProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(GatewayProvider, _Component);

  function GatewayProvider(props, context) {
    var _this;

    _classCallCheck(this, GatewayProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GatewayProvider).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "gatewayRegistry", void 0);

    _this.gatewayRegistry = new GatewayRegistry();
    return _this;
  }

  _createClass(GatewayProvider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        gatewayRegistry: this.gatewayRegistry
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          Tag = _this$props.component;
      return React.createElement(Tag, null, children);
    }
  }]);

  return GatewayProvider;
}(Component);

_defineProperty(GatewayProvider, "childContextTypes", {
  gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired
});

_defineProperty(GatewayProvider, "defaultProps", {
  component: 'div'
});

export { GatewayProvider as default };