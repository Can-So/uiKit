import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
// This is the source of truth for open modals
var stackConsumers = []; // This component provides the position of a modal dialog in the list of all open dialogs.
// The key behaviours are:
// - When a modal renders for the first time it takes the first stack position
// - When a modal mounts, all other modals have to adjust their position
// - When a modal unmounts, all other modals have to adjust their position

var StackConsumer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(StackConsumer, _React$Component);

  function StackConsumer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StackConsumer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StackConsumer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      stackIndex: 0
    });

    _defineProperty(_assertThisInitialized(_this), "update", function () {
      var stackIndex = stackConsumers.indexOf(_this.update);

      if (_this.state.stackIndex !== stackIndex) {
        _this.setState({
          stackIndex: stackIndex
        });
      }
    });

    return _this;
  }

  _createClass(StackConsumer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      stackConsumers.forEach(function (updateFn) {
        return updateFn();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      // This check will pass if the <Transition><Modal/></Transition> pattern has not been
      // implemented correctly. In this case, will still need to make sure we remove ourselves
      // from the stack list.
      if (stackConsumers.indexOf(this.update) !== -1) {
        stackConsumers = stackConsumers.filter(function (stack) {
          return stack !== _this2.update;
        });
        stackConsumers.forEach(function (updateFn) {
          return updateFn();
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      if (prevProps.isOpen && !this.props.isOpen) {
        stackConsumers = stackConsumers.filter(function (stack) {
          return stack !== _this3.update;
        });
        stackConsumers.forEach(function (updateFn) {
          return updateFn();
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (stackConsumers.indexOf(this.update) === -1) {
        // add this instance to stack consumer list
        stackConsumers = [this.update].concat(_toConsumableArray(stackConsumers));
      }

      return this.props.children(this.state.stackIndex);
    }
  }]);

  return StackConsumer;
}(React.Component);

export default StackConsumer;