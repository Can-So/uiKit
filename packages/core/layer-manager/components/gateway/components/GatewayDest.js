import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';

var GatewayDest =
/*#__PURE__*/
function (_Component) {
  _inherits(GatewayDest, _Component);

  function GatewayDest(props, context) {
    var _this;

    _classCallCheck(this, GatewayDest);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GatewayDest).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "gatewayRegistry", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      children: null
    });

    _this.gatewayRegistry = context.gatewayRegistry;
    return _this;
  }

  _createClass(GatewayDest, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.gatewayRegistry.addContainer(this.props.name, this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.gatewayRegistry.removeContainer(this.props.name);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          component = _this$props.component,
          attrs = _objectWithoutProperties(_this$props, ["component"]);

      delete attrs.name;
      return createElement(component, attrs, this.state.children);
    }
  }]);

  return GatewayDest;
}(Component);

_defineProperty(GatewayDest, "contextTypes", {
  gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired
});

_defineProperty(GatewayDest, "defaultProps", {
  component: 'div'
});

export { GatewayDest as default };