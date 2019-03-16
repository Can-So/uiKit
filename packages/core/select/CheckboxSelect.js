import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import Select from './Select';
import { CheckboxOption } from './components/input-options';

var CheckboxSelect = function CheckboxSelect(_ref) {
  var components = _ref.components,
      props = _objectWithoutProperties(_ref, ["components"]);

  return React.createElement(Select, _extends({
    closeMenuOnSelect: false,
    hideSelectedOptions: false,
    isMulti: true,
    components: _objectSpread({}, components, {
      Option: CheckboxOption
    })
  }, props));
};

export default CheckboxSelect;