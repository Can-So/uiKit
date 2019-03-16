import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import ExpanderInternal from './styledExpander';

var Expander =
/*#__PURE__*/
function (_Component) {
  _inherits(Expander, _Component);

  function Expander() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Expander);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Expander)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isAnimating: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleTransitionEnd", function () {
      _this.setState({
        isAnimating: false
      });
    });

    return _this;
  }

  _createClass(Expander, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.isExpanded !== nextProps.isExpanded) {
        this.setState({
          isAnimating: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          isExpanded = _this$props.isExpanded;
      var isAnimating = this.state.isAnimating; // Need to always render the ExpanderInternal otherwise the
      // reveal transiton doesn't happen. We can't use CSS animation for
      // the the reveal because we don't know the height of the content.

      var childrenIfExpanded = isAnimating || isExpanded ? children : null;
      return React.createElement(ExpanderInternal, {
        "aria-hidden": !isExpanded,
        isExpanded: isExpanded,
        onTransitionEnd: this.handleTransitionEnd
      }, childrenIfExpanded);
    }
  }]);

  return Expander;
}(Component);

_defineProperty(Expander, "defaultProps", {
  isExpanded: false
});

export { Expander as default };