import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { omit, getDisplayName } from '../utils';
var INTERNAL_HANDLERS = ['onBlur', 'onFocus', 'onKeyDown', 'onKeyUp', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseUp'];
export default function withPseudoState(WrappedComponent) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ComponentWithPseudoState, _Component);

    function ComponentWithPseudoState() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ComponentWithPseudoState);

      for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ComponentWithPseudoState)).call.apply(_getPrototypeOf2, [this].concat(_args)));

      _defineProperty(_assertThisInitialized(_this), "component", void 0);

      _defineProperty(_assertThisInitialized(_this), "actionKeys", void 0);

      _defineProperty(_assertThisInitialized(_this), "state", {
        isActive: Boolean(_this.props.isActive),
        isFocus: Boolean(_this.props.isActive),
        isHover: Boolean(_this.props.isActive),
        isInteractive: Boolean(_this.props.href || _this.props.isInteractive || _this.props.onClick)
      });

      _defineProperty(_assertThisInitialized(_this), "blur", function () {
        if (_this.component && _this.component.blur) _this.component.blur();
      });

      _defineProperty(_assertThisInitialized(_this), "focus", function () {
        if (_this.component && _this.component.focus) _this.component.focus();
      });

      _defineProperty(_assertThisInitialized(_this), "setComponent", function (component) {
        _this.component = component;
      });

      _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
        return _this.setState({
          isActive: false,
          isFocus: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
        return _this.setState({
          isFocus: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
        return _this.setState({
          isActive: false,
          isHover: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
        return _this.setState({
          isHover: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onMouseUp", function () {
        return _this.setState({
          isActive: false
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onMouseDown", function () {
        return _this.setState({
          isActive: true
        });
      });

      _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
        if (_this.actionKeys.indexOf(event.key) > -1) {
          _this.setState({
            isActive: true
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (event) {
        if (_this.actionKeys.indexOf(event.key) > -1) {
          _this.setState({
            isActive: false
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "getProps", function () {
        var isInteractive = _this.state.isInteractive; // strip the consumer's handlers off props, then merge with our handlers
        // if the element is interactive
        // We cannot properly type omit because of the inability to convert from
        // an array to a union of the array's items. See https://github.com/facebook/flow/issues/961
        // if you want to learn more about this
        // $FlowFixMe

        var props = omit.apply(void 0, [_this.props].concat(INTERNAL_HANDLERS));

        var self = _assertThisInitialized(_this);

        if (isInteractive) {
          INTERNAL_HANDLERS.forEach(function (handler) {
            if (_this.props[handler]) {
              props[handler] = function () {
                var _this$props;

                self[handler].apply(self, arguments);

                (_this$props = _this.props)[handler].apply(_this$props, arguments);
              };
            } else {
              props[handler] = self[handler];
            }
          });
        }

        return props;
      });

      return _this;
    }

    _createClass(ComponentWithPseudoState, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this$props2 = this.props,
            href = _this$props2.href,
            isInteractive = _this$props2.isInteractive,
            onClick = _this$props2.onClick;

        if (href || isInteractive || onClick) {
          this.actionKeys = onClick || isInteractive ? ['Enter', ' '] : ['Enter'];
        }
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(WrappedComponent, _extends({
          ref: this.setComponent
        }, this.state, this.getProps()));
      }
    }]);

    return ComponentWithPseudoState;
  }(Component), _defineProperty(_class, "displayName", getDisplayName('withPseudoState', WrappedComponent)), _temp;
}