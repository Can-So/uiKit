import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import Field from './Field';

var CheckboxField = function CheckboxField(props) {
  var children = props.children,
      _props$defaultIsCheck = props.defaultIsChecked,
      defaultIsChecked = _props$defaultIsCheck === void 0 ? false : _props$defaultIsCheck,
      value = props.value,
      rest = _objectWithoutProperties(props, ["children", "defaultIsChecked", "value"]);

  return value !== undefined ? React.createElement(Field, _extends({}, rest, {
    defaultValue: function defaultValue() {
      var currentValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return defaultIsChecked ? [].concat(_toConsumableArray(currentValue), [value]) : currentValue;
    },
    transform: function transform(event, currentValue) {
      return event.target.checked ? [].concat(_toConsumableArray(currentValue), [value]) : currentValue.filter(function (v) {
        return v !== value;
      });
    }
  }), function (_ref) {
    var _ref$fieldProps = _ref.fieldProps,
        fieldValue = _ref$fieldProps.value,
        otherFieldProps = _objectWithoutProperties(_ref$fieldProps, ["value"]),
        others = _objectWithoutProperties(_ref, ["fieldProps"]);

    return children(_objectSpread({
      fieldProps: _objectSpread({}, otherFieldProps, {
        isChecked: !!fieldValue.find(function (v) {
          return v === value;
        }),
        value: value
      })
    }, others));
  }) : React.createElement(Field, _extends({}, rest, {
    defaultValue: defaultIsChecked,
    transform: function transform(event) {
      return event.target.checked;
    }
  }), function (_ref2) {
    var _ref2$fieldProps = _ref2.fieldProps,
        fieldValue = _ref2$fieldProps.value,
        otherFieldProps = _objectWithoutProperties(_ref2$fieldProps, ["value"]),
        others = _objectWithoutProperties(_ref2, ["fieldProps"]);

    return children(_objectSpread({
      fieldProps: _objectSpread({}, otherFieldProps, {
        isChecked: fieldValue,
        value: value
      })
    }, others));
  });
};

CheckboxField.defaultProps = {
  defaultIsChecked: false
};
export default CheckboxField;