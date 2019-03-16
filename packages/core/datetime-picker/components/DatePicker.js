import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import Calendar from '@findable/calendar';
import CalendarIcon from '@findable/icon/glyph/calendar';
import Select, { mergeStyles } from '@findable/select';
import { borderRadius, colors, layers, elevation } from '@findable/theme';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import { format, isValid, parse, getDaysInMonth } from 'date-fns';
import pick from 'lodash.pick';
import React, { Component } from 'react';
import styled from 'styled-components';
import { name as packageName, version as packageVersion } from '../version.json';
import { ClearIndicator, defaultDateFormat, DropdownIndicator, padToTwo } from '../internal';
import FixedLayer from '../internal/FixedLayer';
/* eslint-disable react/no-unused-prop-types */

function getDateObj(date) {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  };
}

function getValidDate(iso) {
  var date = parse(iso);
  return isValid(date) ? getDateObj(date) : {};
}

var arrowKeys = {
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up'
};
var StyledMenu = styled.div.withConfig({
  displayName: "DatePicker__StyledMenu",
  componentId: "sc-15cbiv7-0"
})(["\n  background-color: ", ";\n  border-radius: ", "px;\n  z-index: ", ";\n  ", ";\n"], colors.N20, borderRadius(), layers.dialog, elevation.e200);

var Menu = function Menu(_ref) {
  var selectProps = _ref.selectProps,
      innerProps = _ref.innerProps;
  return React.createElement(FixedLayer, {
    inputValue: selectProps.inputValue,
    containerRef: selectProps.calendarContainerRef,
    content: React.createElement(StyledMenu, null, React.createElement(Calendar, _extends({}, getValidDate(selectProps.calendarValue), getValidDate(selectProps.calendarView), {
      disabled: selectProps.calendarDisabled,
      onChange: selectProps.onCalendarChange,
      onSelect: selectProps.onCalendarSelect,
      ref: selectProps.calendarRef,
      selected: [selectProps.calendarValue],
      innerProps: innerProps
    })))
  });
};

var DatePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePicker, _Component);

  // $FlowFixMe - Calendar isn't being correctly detected as a react component
  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "calendar", void 0);

    _defineProperty(_assertThisInitialized(_this), "containerRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "input", void 0);

    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return _objectSpread({}, _this.state, pick(_this.props, ['value', 'isOpen']), pick(_this.props.selectProps, ['inputValue']));
    });

    _defineProperty(_assertThisInitialized(_this), "isDateDisabled", function (date) {
      return _this.props.disabled.indexOf(date) > -1;
    });

    _defineProperty(_assertThisInitialized(_this), "onCalendarChange", function (_ref2) {
      var iso = _ref2.iso;

      var _iso$split = iso.split('-'),
          _iso$split2 = _slicedToArray(_iso$split, 3),
          year = _iso$split2[0],
          month = _iso$split2[1],
          date = _iso$split2[2];

      var newIso = iso;
      var lastDayInMonth = getDaysInMonth(new Date(parseInt(year, 10), parseInt(month, 10) - 1));

      if (parseInt(lastDayInMonth, 10) < parseInt(date, 10)) {
        newIso = "".concat(year, "-").concat(month, "-").concat(lastDayInMonth);
      }

      _this.setState({
        view: newIso
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCalendarSelect", function (_ref3) {
      var iso = _ref3.iso;

      _this.setState({
        inputValue: '',
        isOpen: false,
        selectedValue: iso,
        view: iso,
        value: iso
      });

      _this.props.onChange(iso);
    });

    _defineProperty(_assertThisInitialized(_this), "onInputClick", function () {
      if (!_this.getState().isOpen) _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectBlur", function (e) {
      _this.setState({
        isOpen: false
      });

      _this.props.onBlur(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectFocus", function (e) {
      var _this$getState = _this.getState(),
          value = _this$getState.value;

      _this.setState({
        isOpen: true,
        view: value
      });

      _this.props.onFocus(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectInput", function (e) {
      var value = e.target.value;
      var _this$props = _this.props,
          dateFormat = _this$props.dateFormat,
          parseInputValue = _this$props.parseInputValue;

      if (value) {
        var parsed = parseInputValue(value, dateFormat); // Only try to set the date if we have month & day

        if (isValid(parsed)) {
          // We format the parsed date to YYYY-MM-DD here because
          // this is the format expected by the @findable/calendar component
          _this.setState({
            view: format(parsed, 'YYYY-MM-DD')
          });
        }
      }

      _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectKeyDown", function (e) {
      var key = e.key,
          target = e.target;

      var _this$getState2 = _this.getState(),
          view = _this$getState2.view,
          selectedValue = _this$getState2.selectedValue;

      var dir = arrowKeys[key];

      if (dir) {
        // Calendar will not exist if it's not open and this also doubles as a
        // ref check since it may not exist.
        if (_this.calendar) {
          // We don't want to move the caret if the calendar is open.
          if (dir === 'left' || dir === 'right') {
            e.preventDefault();
          }

          _this.calendar.navigate(dir);
        }

        if (dir === 'down' || dir === 'up') {
          _this.setState({
            isOpen: true
          });
        }
      } else if (key === 'Escape') {
        _this.setState({
          isOpen: false
        });
      } else if (key === 'Backspace' && selectedValue && target instanceof HTMLInputElement && target.value.length < 1) {
        _this.setState({
          selectedValue: '',
          value: '',
          view: _this.props.defaultValue || format(new Date(), 'YYYY-MM-DD')
        });

        _this.props.onChange(''); // Dates may be disabled

      } else if (!_this.isDateDisabled(view)) {
        if (key === 'Enter') {
          _this.setState({
            inputValue: '',
            isOpen: false,
            selectedValue: view,
            value: view,
            view: view
          });

          _this.props.onChange(view);
        }

        if (key === 'Tab') {
          _this.setState({
            isOpen: false
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "refCalendar", function (ref) {
      _this.calendar = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (inputValue, actionMeta) {
      var onInputChange = _this.props.selectProps.onInputChange;
      if (onInputChange) onInputChange(inputValue, actionMeta);

      _this.setState({
        inputValue: inputValue
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getContainerRef", function (ref) {
      var oldRef = _this.containerRef;
      _this.containerRef = ref; // Cause a re-render if we're getting the container ref for the first time
      // as the layered menu requires it for dimension calculation

      if (oldRef == null && ref != null) {
        _this.forceUpdate();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getSubtleControlStyles", function (isOpen) {
      return {
        border: "2px solid ".concat(isOpen ? colors.B100 : "transparent"),
        backgroundColor: 'transparent',
        padding: '1px'
      };
    });

    var _getDateObj = getDateObj(new Date()),
        day = _getDateObj.day,
        _month = _getDateObj.month,
        _year = _getDateObj.year;

    _this.state = {
      isOpen: _this.props.defaultIsOpen,
      inputValue: _this.props.selectProps.inputValue,
      selectedValue: _this.props.value || _this.props.defaultValue,
      value: _this.props.defaultValue,
      view: _this.props.value || _this.props.defaultValue || "".concat(_year, "-").concat(padToTwo(_month), "-").concat(padToTwo(day))
    };
    return _this;
  } // All state needs to be accessed via this function so that the state is mapped from props
  // correctly to allow controlled/uncontrolled usage.


  _createClass(DatePicker, [{
    key: "isValidDate",
    value: function isValidDate(value) {
      var _this$props2 = this.props,
          parseInputValue = _this$props2.parseInputValue,
          dateFormat = _this$props2.dateFormat;
      var date = parseInputValue(value, dateFormat);
      return isValid(date);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          appearance = _this$props3.appearance,
          autoFocus = _this$props3.autoFocus,
          dateFormat = _this$props3.dateFormat,
          disabled = _this$props3.disabled,
          formatDisplayLabel = _this$props3.formatDisplayLabel,
          hideIcon = _this$props3.hideIcon,
          icon = _this$props3.icon,
          id = _this$props3.id,
          innerProps = _this$props3.innerProps,
          isDisabled = _this$props3.isDisabled,
          isInvalid = _this$props3.isInvalid,
          name = _this$props3.name,
          placeholder = _this$props3.placeholder,
          selectProps = _this$props3.selectProps,
          spacing = _this$props3.spacing;

      var _this$getState3 = this.getState(),
          value = _this$getState3.value,
          view = _this$getState3.view,
          isOpen = _this$getState3.isOpen,
          inputValue = _this$getState3.inputValue;

      var validationState = isInvalid ? 'error' : 'default';
      var dropDownIcon = appearance === 'subtle' || hideIcon ? null : icon;
      var calendarProps = {
        calendarContainerRef: this.containerRef,
        calendarRef: this.refCalendar,
        calendarDisabled: disabled,
        calendarValue: value,
        calendarView: view,
        dropdownIndicatorIcon: dropDownIcon,
        onCalendarChange: this.onCalendarChange,
        onCalendarSelect: this.onCalendarSelect
      };
      var _selectProps$styles = selectProps.styles,
          selectStyles = _selectProps$styles === void 0 ? {} : _selectProps$styles;
      var controlStyles = appearance === 'subtle' ? this.getSubtleControlStyles(isOpen) : {};
      var disabledStyle = isDisabled ? {
        pointerEvents: 'none'
      } : {};
      return React.createElement("div", _extends({}, innerProps, {
        role: "presentation",
        onClick: this.onInputClick,
        onInput: this.onSelectInput,
        onKeyDown: this.onSelectKeyDown,
        ref: this.getContainerRef
      }), React.createElement("input", {
        name: name,
        type: "hidden",
        value: value
      }), React.createElement(Select, _extends({
        menuIsOpen: isOpen && !isDisabled,
        openMenuOnFocus: true,
        closeMenuOnSelect: true,
        autoFocus: autoFocus,
        instanceId: id,
        isDisabled: isDisabled,
        onBlur: this.onSelectBlur,
        onFocus: this.onSelectFocus,
        inputValue: inputValue,
        onInputChange: this.handleInputChange,
        components: {
          ClearIndicator: ClearIndicator,
          DropdownIndicator: DropdownIndicator,
          Menu: Menu
        },
        styles: mergeStyles(selectStyles, {
          control: function control(base) {
            return _objectSpread({}, base, controlStyles, disabledStyle);
          }
        }),
        placeholder: placeholder,
        value: value && {
          label: formatDisplayLabel(value, dateFormat),
          value: value
        }
      }, selectProps, calendarProps, {
        spacing: spacing,
        validationState: validationState
      })));
    }
  }]);

  return DatePicker;
}(Component);

_defineProperty(DatePicker, "defaultProps", {
  appearance: 'default',
  autoFocus: false,
  dateFormat: defaultDateFormat,
  defaultIsOpen: false,
  defaultValue: '',
  disabled: [],
  formatDisplayLabel: function formatDisplayLabel(value, dateFormat) {
    return format(parse(value), dateFormat);
  },
  hideIcon: false,
  icon: CalendarIcon,
  id: '',
  innerProps: {},
  isDisabled: false,
  isInvalid: false,
  name: '',
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  parseInputValue: parse,
  placeholder: 'e.g. 2018/01/01',
  selectProps: {},
  spacing: 'default'
});

export { DatePicker as DatePickerWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'datePicker',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onChange: createAndFireEventOnAtlaskit({
    action: 'selectedDate',
    actionSubject: 'datePicker',
    attributes: {
      componentName: 'datePicker',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(DatePicker));