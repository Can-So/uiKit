import React from 'react';
export var ClearIndicator = null;
export var defaultTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];
export var defaultTimeFormat = 'h:mma';
export var defaultDateFormat = 'YYYY/MM/DD';
export function padToTwo(number) {
  return number <= 99 ? "0".concat(number).slice(-2) : "".concat(number);
}
export var DropdownIndicator = function DropdownIndicator() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      Icon = _ref.selectProps.dropdownIndicatorIcon;

  return Icon ? React.createElement(Icon, null) : null;
};
export function formatDateTimeZoneIntoIso(date, time, zone) {
  return "".concat(date, "T").concat(time).concat(zone);
}