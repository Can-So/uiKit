import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import { GatewayDest, GatewayProvider } from './gateway'; // NOTE: lock the app wrapper to a 0 z-index. This allows layer manager to
// render all gateways hierarchically, on top of the app, without needing
// incremental z-indexes.

var AppWrapper = styled.div.withConfig({
  displayName: "LayerManager__AppWrapper",
  componentId: "ues105-0"
})(["\n  position: relative;\n  z-index: 0;\n"]);

var LayerManager =
/*#__PURE__*/
function (_Component) {
  _inherits(LayerManager, _Component);

  function LayerManager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LayerManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LayerManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      ariaHiddenNode: undefined
    });

    _defineProperty(_assertThisInitialized(_this), "getAppRef", function (ref) {
      if (_this.state.ariaHiddenNode) return;

      _this.setState({
        ariaHiddenNode: ref
      });
    });

    return _this;
  }

  _createClass(LayerManager, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        ariaHiddenNode: this.state.ariaHiddenNode
      };
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return React.createElement(GatewayProvider, null, React.createElement(AppWrapper, {
        innerRef: this.getAppRef
      }, Children.only(children)), React.createElement(GatewayDest, {
        name: "modal",
        component: TransitionGroup
      }), React.createElement(GatewayDest, {
        name: "spotlight",
        component: TransitionGroup
      }), React.createElement(GatewayDest, {
        name: "flag"
      }), React.createElement(GatewayDest, {
        name: "tooltip",
        component: TransitionGroup
      }));
    }
  }]);

  return LayerManager;
}(Component);

_defineProperty(LayerManager, "childContextTypes", {
  ariaHiddenNode: PropTypes.object
});

export { LayerManager as default };