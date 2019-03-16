import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Container, Content, Icon, Text, Visibility } from '../styled';

var Banner =
/*#__PURE__*/
function (_Component) {
  _inherits(Banner, _Component);

  function Banner() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Banner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Banner)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      height: 0
    });

    _defineProperty(_assertThisInitialized(_this), "containerRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "getHeight", function () {
      if (_this.containerRef) _this.setState({
        height: _this.containerRef.clientHeight
      });
    });

    _defineProperty(_assertThisInitialized(_this), "innerRef", function (ref) {
      _this.containerRef = ref;
      if (_this.props.innerRef) _this.props.innerRef(ref);

      _this.getHeight();
    });

    return _this;
  }

  _createClass(Banner, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          children = _this$props.children,
          icon = _this$props.icon,
          isOpen = _this$props.isOpen;
      return React.createElement(Visibility, {
        bannerHeight: this.state.height,
        isOpen: isOpen
      }, React.createElement(Container, {
        innerRef: this.innerRef,
        appearance: appearance,
        "aria-hidden": !isOpen,
        isOpen: isOpen,
        role: "alert"
      }, React.createElement(Content, {
        appearance: appearance
      }, React.createElement(Icon, null, icon), React.createElement(Text, {
        appearance: appearance
      }, children))));
    }
  }]);

  return Banner;
}(Component);

_defineProperty(Banner, "defaultProps", {
  appearance: 'warning',
  isOpen: false
});

export { Banner as default };