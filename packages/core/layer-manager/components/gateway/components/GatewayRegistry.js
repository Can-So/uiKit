import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import withContextFromProps from '../../withContextFromProps';
var contextTypes = {
  blockChildGatewayRender: PropTypes.bool
};
var ContextProvider = withContextFromProps(contextTypes, null);

var GatewayRegistry =
/*#__PURE__*/
function () {
  function GatewayRegistry() {
    _classCallCheck(this, GatewayRegistry);

    _defineProperty(this, "containers", {});

    _defineProperty(this, "children", {});

    _defineProperty(this, "currentId", 0);
  }

  _createClass(GatewayRegistry, [{
    key: "renderContainer",
    // Unique key for children of a gateway

    /**
     *   NOTE: this is where we deviate from cloudflare/react-gateway
     *   https://github.com/cloudflare/react-gateway/blob/master/src/GatewayRegistry.js#L10
     *
     *   Rather than passing children through directly, they're cloned with:
     *   - stackIndex
     *   - stackTotal
     */
    value: function renderContainer(name, addedGateway) {
      var _this = this;

      if (!this.containers[name] || !this.children[name]) {
        return;
      }

      var childrenKeys = Object.keys(this.children[name]).sort();
      var stackTotal = childrenKeys.length;
      var addedGatewayIndex = childrenKeys.indexOf(addedGateway);
      this.containers[name].setState({
        children: childrenKeys.map(function (key, i) {
          var stackIndex = stackTotal - (i + 1);
          var element = cloneElement(_this.children[name][key].child, {
            stackIndex: stackIndex,
            stackTotal: stackTotal
          }); // Do not re-render nested gateways when a gateway is added to prevent an infinite loop
          // caused by an added gateway triggering a re-render of its parent and then itself.

          var blockChildGatewayRender = addedGateway != null && i < addedGatewayIndex;
          return React.createElement(ContextProvider, {
            blockChildGatewayRender: blockChildGatewayRender,
            key: key
          }, element);
        })
      });
    }
  }, {
    key: "addContainer",
    value: function addContainer(name, container) {
      this.containers[name] = container;
      this.renderContainer(name);
    }
  }, {
    key: "removeContainer",
    value: function removeContainer(name) {
      this.containers[name] = null;
    }
  }, {
    key: "addChild",
    value: function addChild(name, gatewayId, child) {
      this.children[name][gatewayId] = {
        child: child
      };
      this.renderContainer(name, gatewayId);
    }
  }, {
    key: "clearChild",
    value: function clearChild(name, gatewayId) {
      delete this.children[name][gatewayId];
    }
  }, {
    key: "register",
    value: function register(name, child) {
      this.children[name] = this.children[name] || {};
      var gatewayId = "".concat(name, "_").concat(this.currentId);
      this.children[name][gatewayId] = {
        child: child
      };
      this.currentId += 1;
      return gatewayId;
    }
  }, {
    key: "unregister",
    value: function unregister(name, gatewayId) {
      this.clearChild(name, gatewayId);
      this.renderContainer(name);
    }
  }]);

  return GatewayRegistry;
}();

export { GatewayRegistry as default };