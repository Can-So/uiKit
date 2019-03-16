import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import AkFieldRadioGroup from './RadioGroupStateless';
var defaultItems = [];

var FieldRadioGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldRadioGroup, _Component);

  function FieldRadioGroup() {
    var _this;

    _classCallCheck(this, FieldRadioGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FieldRadioGroup).call(this));

    _defineProperty(_assertThisInitialized(_this), "getItems", function () {
      // If there is a user-selected value, then select that item
      if (_this.props.items) {
        if (_this.state.selectedValue) {
          return _this.props.items.map(function (item) {
            return item.value === _this.state.selectedValue ? _objectSpread({}, item, {
              isSelected: true
            }) : item;
          });
        } // Otherwise, look for a defaultSelected item and select that item


        var hasDefaultSelected = _this.props.items.some(function (item) {
          return item.defaultSelected;
        });

        if (hasDefaultSelected && _this.props.items) {
          return _this.props.items.map(function (item) {
            return item.defaultSelected ? _objectSpread({}, item, {
              isSelected: true
            }) : item;
          });
        }
      }

      return _this.props.items;
    });

    _defineProperty(_assertThisInitialized(_this), "changeHandler", function (event) {
      _this.props.onRadioChange(event);

      _this.setState({
        selectedValue: event.target.value
      });
    });

    _this.state = {
      selectedValue: null // Overrides default once user selects a value.

    };
    return _this;
  }

  _createClass(FieldRadioGroup, [{
    key: "render",
    value: function render() {
      return React.createElement(AkFieldRadioGroup, {
        label: this.props.label,
        onRadioChange: this.changeHandler,
        isRequired: this.props.isRequired,
        items: this.getItems()
      });
    }
  }]);

  return FieldRadioGroup;
}(Component);

_defineProperty(FieldRadioGroup, "defaultProps", {
  isRequired: false,
  items: defaultItems,
  onRadioChange: function onRadioChange() {}
});

export { FieldRadioGroup as default };