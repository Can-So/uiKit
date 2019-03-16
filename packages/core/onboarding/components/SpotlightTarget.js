import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import NodeResolver from 'react-node-resolver';
import { TargetConsumer } from './SpotlightManager';

var SpotlightTarget =
/*#__PURE__*/
function (_Component) {
  _inherits(SpotlightTarget, _Component);

  function SpotlightTarget() {
    _classCallCheck(this, SpotlightTarget);

    return _possibleConstructorReturn(this, _getPrototypeOf(SpotlightTarget).apply(this, arguments));
  }

  _createClass(SpotlightTarget, [{
    key: "render",
    value: function render() {
      var _this = this;

      return React.createElement(TargetConsumer, null, function (targetRef) {
        return targetRef ? React.createElement(NodeResolver, {
          innerRef: targetRef(_this.props.name)
        }, _this.props.children) : _this.props.children;
      });
    }
  }]);

  return SpotlightTarget;
}(Component);

export default SpotlightTarget;