import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import CalendarIcon from '@findable/icon/glyph/calendar';
import { mergeStyles } from '@findable/select';
import { borderRadius, colors } from '@findable/theme';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import pick from 'lodash.pick';
import React, { Component } from 'react';
import styled from 'styled-components';
import { parse, format, isValid } from 'date-fns';
import { name as packageName, version as packageVersion } from '../version.json';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { defaultTimes, defaultDateFormat, defaultTimeFormat, formatDateTimeZoneIntoIso } from '../internal';
/* eslint-disable react/no-unused-prop-types */

var getBorder = function getBorder(_ref) {
  var appearance = _ref.appearance,
      isFocused = _ref.isFocused,
      isInvalid = _ref.isInvalid;
  var color = colors.N20;
  if (appearance === 'subtle') color = 'transparent';
  if (isFocused) color = colors.B100;
  if (isInvalid) color = colors.R400;
  return "border: 2px solid ".concat(color);
};

var getBorderColorHover = function getBorderColorHover(_ref2) {
  var isFocused = _ref2.isFocused,
      isInvalid = _ref2.isInvalid,
      isDisabled = _ref2.isDisabled;
  var color = colors.N30;
  if (isFocused || isDisabled) return "";
  if (isInvalid) color = colors.R400;
  return "border-color: ".concat(color);
};

var getBackgroundColor = function getBackgroundColor(_ref3) {
  var appearance = _ref3.appearance,
      isFocused = _ref3.isFocused;
  var color = colors.N20;
  if (isFocused) color = colors.N0;
  if (appearance === 'subtle') color = 'transparent';
  return "background-color: ".concat(color);
};

var getBackgroundColorHover = function getBackgroundColorHover(_ref4) {
  var isFocused = _ref4.isFocused,
      isInvalid = _ref4.isInvalid,
      isDisabled = _ref4.isDisabled;
  var color = colors.N30;
  if (isFocused || isDisabled) return "";
  if (isInvalid) color = colors.N0;
  return "background-color: ".concat(color);
};

var Flex = styled.div.withConfig({
  displayName: "DateTimePicker__Flex",
  componentId: "sc-1kybx8t-0"
})(["\n  ", "\n  ", "\n  border-radius: ", "px;\n  display: flex;\n  transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;\n  &:hover {\n    cursor: ", ";\n    ", "\n    ", "\n  }\n"], getBackgroundColor, getBorder, borderRadius(), function (props) {
  return props.isDisabled ? 'default' : 'pointer';
}, getBackgroundColorHover, getBorderColorHover);
var FlexItem = styled.div.withConfig({
  displayName: "DateTimePicker__FlexItem",
  componentId: "sc-1kybx8t-1"
})(["\n  flex-basis: 0;\n  flex-grow: 1;\n"]); // react-select overrides (via @findable/select).

var styles = {
  control: function control(style) {
    return _objectSpread({}, style, {
      backgroundColor: 'transparent',
      border: 2,
      borderRadius: 0,
      paddingLeft: 0,
      ':hover': {
        backgroundColor: 'transparent',
        cursor: 'inherit'
      }
    });
  }
};

var DateTimePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DateTimePicker, _Component);

  function DateTimePicker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DateTimePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DateTimePicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      active: 0,
      dateValue: '',
      isFocused: false,
      timeValue: '',
      value: _this.props.defaultValue,
      zoneValue: ''
    });

    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      var mappedState = _objectSpread({}, _this.state, pick(_this.props, ['value']));

      return _objectSpread({}, mappedState, _this.parseValue(mappedState.value, mappedState.dateValue, mappedState.timeValue, mappedState.zoneValue));
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      _this.setState({
        isFocused: false
      });

      _this.props.onBlur();
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      _this.setState({
        isFocused: true
      });

      _this.props.onFocus();
    });

    _defineProperty(_assertThisInitialized(_this), "onDateChange", function (dateValue) {
      _this.onValueChange(_objectSpread({}, _this.getState(), {
        dateValue: dateValue
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onTimeChange", function (timeValue) {
      _this.onValueChange(_objectSpread({}, _this.getState(), {
        timeValue: timeValue
      }));
    });

    return _this;
  }

  _createClass(DateTimePicker, [{
    key: "parseValue",
    value: function parseValue(value, dateValue, timeValue, zoneValue) {
      if (this.props.parseValue) {
        return this.props.parseValue(value, dateValue, timeValue, zoneValue);
      }

      var parsed = parse(value);
      var valid = isValid(parsed);
      return valid ? {
        dateValue: format(parsed, 'YYYY-MM-DD'),
        timeValue: format(parsed, 'HH:mm'),
        zoneValue: format(parsed, 'ZZ')
      } : {
        dateValue: dateValue,
        timeValue: timeValue,
        zoneValue: zoneValue
      };
    }
  }, {
    key: "onValueChange",
    value: function onValueChange(_ref5) {
      var dateValue = _ref5.dateValue,
          timeValue = _ref5.timeValue,
          zoneValue = _ref5.zoneValue;
      this.setState({
        dateValue: dateValue,
        timeValue: timeValue,
        zoneValue: zoneValue
      });

      if (dateValue && timeValue) {
        var value = formatDateTimeZoneIntoIso(dateValue, timeValue, zoneValue);
        this.setState({
          value: value
        });
        this.props.onChange(value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          autoFocus = _this$props.autoFocus,
          id = _this$props.id,
          innerProps = _this$props.innerProps,
          isDisabled = _this$props.isDisabled,
          name = _this$props.name,
          timeIsEditable = _this$props.timeIsEditable,
          dateFormat = _this$props.dateFormat,
          datePickerProps = _this$props.datePickerProps,
          datePickerSelectProps = _this$props.datePickerSelectProps,
          timePickerProps = _this$props.timePickerProps,
          timePickerSelectProps = _this$props.timePickerSelectProps,
          times = _this$props.times,
          timeFormat = _this$props.timeFormat;

      var _this$getState = this.getState(),
          isFocused = _this$getState.isFocused,
          value = _this$getState.value,
          dateValue = _this$getState.dateValue,
          timeValue = _this$getState.timeValue;

      var icon = this.props.appearance === 'subtle' || this.props.hideIcon ? null : CalendarIcon;
      var bothProps = {
        isDisabled: isDisabled,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        isInvalid: this.props.isInvalid,
        appearance: this.props.appearance,
        spacing: this.props.spacing
      };
      var _ref6 = datePickerSelectProps,
          _ref6$styles = _ref6.styles,
          datePickerStyles = _ref6$styles === void 0 ? {} : _ref6$styles;
      var _ref7 = timePickerSelectProps,
          _ref7$styles = _ref7.styles,
          timePickerStyles = _ref7$styles === void 0 ? {} : _ref7$styles;

      var mergedDatePickerSelectProps = _objectSpread({}, datePickerSelectProps, {
        styles: mergeStyles(styles, datePickerStyles)
      });

      var mergedTimePickerSelectProps = _objectSpread({}, timePickerSelectProps, {
        styles: mergeStyles(styles, timePickerStyles)
      });

      return React.createElement(Flex, _extends({}, innerProps, {
        isFocused: isFocused,
        isDisabled: isDisabled,
        isInvalid: bothProps.isInvalid,
        appearance: bothProps.appearance
      }), React.createElement("input", {
        name: name,
        type: "hidden",
        value: value
      }), React.createElement(FlexItem, null, React.createElement(DatePicker, _extends({}, bothProps, {
        autoFocus: autoFocus,
        dateFormat: dateFormat,
        icon: null,
        id: id,
        onChange: this.onDateChange,
        selectProps: mergedDatePickerSelectProps,
        value: dateValue
      }, datePickerProps))), React.createElement(FlexItem, null, React.createElement(TimePicker, _extends({}, bothProps, {
        icon: icon,
        onChange: this.onTimeChange,
        selectProps: mergedTimePickerSelectProps,
        value: timeValue,
        timeIsEditable: timeIsEditable,
        times: times,
        timeFormat: timeFormat
      }, timePickerProps))));
    }
  }]);

  return DateTimePicker;
}(Component);

_defineProperty(DateTimePicker, "defaultProps", {
  appearance: 'default',
  autoFocus: false,
  isDisabled: false,
  name: '',
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  innerProps: {},
  id: '',
  defaultValue: '',
  timeIsEditable: false,
  isInvalid: false,
  hideIcon: false,
  datePickerProps: {},
  timePickerProps: {},
  datePickerSelectProps: {},
  timePickerSelectProps: {},
  times: defaultTimes,
  timeFormat: defaultTimeFormat,
  dateFormat: defaultDateFormat,
  spacing: 'default'
});

export { DateTimePicker as DateTimePickerWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'dateTimePicker',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onChange: createAndFireEventOnAtlaskit({
    action: 'changed',
    actionSubject: 'dateTimePicker',
    attributes: {
      componentName: 'dateTimePicker',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(DateTimePicker));