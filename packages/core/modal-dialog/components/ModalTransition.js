import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { createContext } from 'react';

var _createContext = createContext({
  isOpen: true,
  onExited: undefined
}),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider; // checks if children exist and are truthy


var hasChildren = function hasChildren(children) {
  return React.Children.count(children) > 0 && React.Children.map(children, function (child) {
    return !!child;
  }).filter(Boolean).length > 0;
};

var Transition =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Transition);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Transition)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      currentChildren: undefined
    });

    _defineProperty(_assertThisInitialized(_this), "onExited", function () {
      _this.setState({
        currentChildren: _this.props.children
      });
    });

    return _this;
  }

  _createClass(Transition, [{
    key: "render",
    value: function render() {
      return React.createElement(Provider, {
        value: {
          onExited: this.onExited,
          isOpen: hasChildren(this.props.children)
        }
      }, this.state.currentChildren);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var previousChildren = state.currentChildren;
      var exiting = hasChildren(previousChildren) && !hasChildren(props.children);
      return {
        currentChildren: exiting ? previousChildren : props.children
      };
    }
  }]);

  return Transition;
}(React.Component);

export var ModalTransitionConsumer = Consumer;
export default Transition;