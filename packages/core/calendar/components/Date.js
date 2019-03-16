import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { DateDiv, DateTd } from '../styled/Date';

var _default =
/*#__PURE__*/
function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isActive: false
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (e) {
      // Prevent mousedown triggering an ancestor onBlur event in IE11 resulting
      // in dates not being selectable.
      e.preventDefault();

      _this.setState({
        isActive: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function () {
      _this.setState({
        isActive: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var _this$props = _this.props,
          day = _this$props.children,
          month = _this$props.month,
          onClick = _this$props.onClick,
          year = _this$props.year,
          disabled = _this$props.disabled;

      if (!disabled && onClick) {
        onClick({
          year: year,
          month: month,
          day: day
        });
      }
    });

    return _this;
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          disabled = _this$props2.disabled,
          focused = _this$props2.focused,
          isToday = _this$props2.isToday,
          previouslySelected = _this$props2.previouslySelected,
          selected = _this$props2.selected,
          sibling = _this$props2.sibling;
      return React.createElement(DateTd, {
        "aria-selected": selected ? 'true' : 'false',
        role: "gridcell",
        onClick: this.onClick,
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp
      }, React.createElement(DateDiv, {
        disabled: disabled,
        focused: focused,
        isToday: isToday,
        previouslySelected: previouslySelected,
        selected: selected,
        sibling: sibling,
        isActive: this.state.isActive
      }, children));
    }
  }]);

  return _default;
}(Component);

_defineProperty(_default, "defaultProps", {
  disabled: false,
  focused: false,
  isToday: false,
  onClick: function onClick() {},
  previouslySelected: false,
  selected: false,
  sibling: false,
  today: ''
});

export { _default as default };