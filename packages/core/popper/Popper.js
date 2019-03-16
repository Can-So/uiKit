import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import memoizeOne from 'memoize-one';
import { Popper as ReactPopper } from 'react-popper';
export { Manager, Reference } from 'react-popper';

var getFlipBehavior = function getFlipBehavior(side) {
  return {
    auto: [],
    top: ['top', 'bottom', 'top'],
    right: ['right', 'left', 'right'],
    bottom: ['bottom', 'top', 'bottom'],
    left: ['left', 'right', 'left']
  }[side];
};

export var Popper =
/*#__PURE__*/
function (_Component) {
  _inherits(Popper, _Component);

  function Popper() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Popper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Popper)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getModifiers", memoizeOne(function (placement) {
      var flipBehavior = getFlipBehavior(placement.split('-')[0]);
      var modifiers = {
        flip: {
          enabled: true,
          behavior: flipBehavior,
          boundariesElement: 'viewport'
        },
        hide: {
          enabled: true,
          boundariesElement: 'scrollParent'
        },
        offset: {
          enabled: true,
          offset: _this.props.offset
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: 'window'
        }
      };
      return modifiers;
    }));

    return _this;
  }

  _createClass(Popper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          placement = _this$props.placement,
          children = _this$props.children,
          referenceElement = _this$props.referenceElement;
      var modifiers = this.getModifiers(this.props.placement);
      return React.createElement(ReactPopper, _extends({
        positionFixed: true,
        modifiers: modifiers,
        placement: placement
      }, referenceElement ? {
        referenceElement: referenceElement
      } : {}), children);
    }
  }]);

  return Popper;
}(Component);

_defineProperty(Popper, "defaultProps", {
  children: function children() {},
  offset: '0, 8px',
  placement: 'bottom-start'
});