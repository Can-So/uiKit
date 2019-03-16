import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import SpotlightInner from './SpotlightInner';
import { SpotlightConsumer } from './SpotlightManager';

var Spotlight =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Spotlight, _React$Component);

  function Spotlight() {
    _classCallCheck(this, Spotlight);

    return _possibleConstructorReturn(this, _getPrototypeOf(Spotlight).apply(this, arguments));
  }

  _createClass(Spotlight, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          targetNode = _this$props.targetNode,
          target = _this$props.target,
          rest = _objectWithoutProperties(_this$props, ["targetNode", "target"]);

      return React.createElement(SpotlightConsumer, null, function (_ref) {
        var opened = _ref.opened,
            closed = _ref.closed,
            targets = _ref.targets;
        // use the targetNode prop or try get the target from context targets using name
        var actualTargetNode = targetNode || (typeof target === 'string' ? targets[target] : undefined);
        return actualTargetNode ? React.createElement(SpotlightInner, _extends({}, rest, {
          targetNode: actualTargetNode,
          target: target,
          onOpened: opened,
          onClosed: closed
        })) : null;
      });
    }
  }]);

  return Spotlight;
}(React.Component);

_defineProperty(Spotlight, "defaultProps", {
  dialogWidth: 400,
  pulse: true
});

export default Spotlight;