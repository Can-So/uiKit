import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Component } from 'react';
import PropTypes from 'prop-types';
import GatewayRegistry from './GatewayRegistry';

var Gateway =
/*#__PURE__*/
function (_Component) {
  _inherits(Gateway, _Component);

  function Gateway(props, context) {
    var _this;

    _classCallCheck(this, Gateway);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Gateway).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "gatewayRegistry", void 0);

    _defineProperty(_assertThisInitialized(_this), "id", '');

    _this.gatewayRegistry = context.gatewayRegistry;
    return _this;
  }

  _createClass(Gateway, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.id = this.gatewayRegistry.register(this.props.into, this.props.children);
      this.renderIntoGatewayNode(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (!props.shouldBlockRender) {
        this.gatewayRegistry.clearChild(this.props.into, this.id);
        this.renderIntoGatewayNode(props);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.gatewayRegistry.unregister(this.props.into, this.id);
    }
  }, {
    key: "renderIntoGatewayNode",
    value: function renderIntoGatewayNode(props) {
      this.gatewayRegistry.addChild(this.props.into, this.id, props.children);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Gateway;
}(Component);

_defineProperty(Gateway, "contextTypes", {
  gatewayRegistry: PropTypes.instanceOf(GatewayRegistry).isRequired
});

export { Gateway as default };