import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Button from '@findable/button';
import ChevronDownIcon from '@findable/icon/glyph/chevron-down';
import ChevronRightIcon from '@findable/icon/glyph/chevron-right';
import { ChevronContainer, ChevronIconContainer, iconColor } from '../styled';

var Chevron =
/*#__PURE__*/
function (_Component) {
  _inherits(Chevron, _Component);

  function Chevron() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Chevron);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Chevron)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      if (_this.props.onExpandToggle) {
        _this.props.onExpandToggle();
      }
    });

    return _this;
  }

  _createClass(Chevron, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isExpanded = _this$props.isExpanded,
          ariaControls = _this$props.ariaControls,
          collapseLabel = _this$props.collapseLabel,
          expandLabel = _this$props.expandLabel;
      var iconProps = {
        size: 'medium',
        primaryColor: iconColor
      };
      return React.createElement(ChevronContainer, null, React.createElement(Button, {
        spacing: "none",
        appearance: "subtle",
        ariaControls: ariaControls,
        onClick: this.handleClick
      }, React.createElement(ChevronIconContainer, null, isExpanded ? React.createElement(ChevronDownIcon, _extends({
        label: collapseLabel
      }, iconProps)) : React.createElement(ChevronRightIcon, _extends({
        label: expandLabel
      }, iconProps)))));
    }
  }]);

  return Chevron;
}(Component);

_defineProperty(Chevron, "defaultProps", {
  expandLabel: 'Expand',
  collapseLabel: 'Collapse'
});

export { Chevron as default };