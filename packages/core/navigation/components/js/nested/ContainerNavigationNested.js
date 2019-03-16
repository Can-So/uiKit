import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { Transition } from 'react-transition-group';
import NestedNavigationPage from '../../styled/NestedNavigationPage';
import NestedNavigationWrapper from '../../styled/NestedNavigationWrapper';

var ContainerNavigationNested =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ContainerNavigationNested, _PureComponent);

  function ContainerNavigationNested() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ContainerNavigationNested);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ContainerNavigationNested)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      stack: _this.props.stack,
      traversalDirection: 'down'
    });

    _defineProperty(_assertThisInitialized(_this), "handleAnimationEnd", function () {
      if (_this.props.onAnimationEnd) {
        _this.props.onAnimationEnd({
          traversalDirection: _this.state.traversalDirection
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function () {
      return React.createElement(Transition, {
        addEndListener: function addEndListener(node, done) {
          node.addEventListener('animationend', done);
        },
        key: _this.state.stack.length,
        onExited: _this.handleAnimationEnd
      }, function (transitionState) {
        return React.createElement(NestedNavigationPage, {
          transitionState: transitionState,
          traversalDirection: _this.state.traversalDirection
        }, _this.state.stack[_this.state.stack.length - 1]);
      });
    });

    return _this;
  }

  _createClass(ContainerNavigationNested, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref) {
      var _this2 = this;

      var stack = _ref.stack;

      var traversalDirection = function () {
        if (stack.length !== _this2.props.stack.length) {
          return stack.length < _this2.props.stack.length ? 'up' : 'down';
        }

        return _this2.state.traversalDirection;
      }();

      this.setState({
        traversalDirection: traversalDirection
      }, function () {
        _this2.setState({
          stack: stack
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(NestedNavigationWrapper, {
        component: "div",
        traversalDirection: this.state.traversalDirection
      }, this.renderChildren());
    }
  }]);

  return ContainerNavigationNested;
}(PureComponent);

export { ContainerNavigationNested as default };