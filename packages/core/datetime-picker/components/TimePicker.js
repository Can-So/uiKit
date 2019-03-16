import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import Select, { CreatableSelect, components, mergeStyles } from '@findable/select';
import { format, isValid } from 'date-fns';
import pick from 'lodash.pick';
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import { colors } from '@findable/theme';
import { name as packageName, version as packageVersion } from '../version.json';
import { ClearIndicator, defaultTimes, DropdownIndicator, defaultTimeFormat } from '../internal';
import parseTime from '../internal/parseTime';
import FixedLayer from '../internal/FixedLayer';

/** Returns a formatted DT string if valid or empty string if not valid */
function formatTime(time, timeFormat) {
  var date = parseTime(time);

  if (date instanceof Date) {
    return isValid(date) ? format(date, timeFormat) : time;
  }

  return '';
}

var menuStyles = {
  /* Need to remove default absolute positioning as that causes issues with position fixed */
  position: 'static',

  /* Need to add overflow to the element with max-height, otherwise causes overflow issues in IE11 */
  overflowY: 'auto'
};

var FixedLayerMenu = function FixedLayerMenu(_ref) {
  var selectProps = _ref.selectProps,
      rest = _objectWithoutProperties(_ref, ["selectProps"]);

  return React.createElement(FixedLayer, {
    inputValue: selectProps.inputValue,
    containerRef: selectProps.fixedLayerRef,
    content: React.createElement(components.Menu, _extends({}, rest, {
      menuShouldScrollIntoView: false
    }))
  });
};

var TimePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(TimePicker, _Component);

  function TimePicker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TimePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TimePicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: _this.props.defaultIsOpen,
      value: _this.props.defaultValue,
      isFocused: false
    });

    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return _objectSpread({}, _this.state, pick(_this.props, ['value', 'isOpen']));
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (v) {
      var value = v ? v.value : '';

      _this.setState({
        value: value
      });

      _this.props.onChange(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onCreateOption", function (inputValue) {
      if (_this.props.timeIsEditable) {
        var _this$props = _this.props,
            parseInputValue = _this$props.parseInputValue,
            _timeFormat = _this$props.timeFormat; // TODO parseInputValue doesn't accept `timeFormat` as an function arg yet...

        var value = format(parseInputValue(inputValue, _timeFormat), 'HH:mma') || '';

        _this.setState({
          value: value
        });

        _this.props.onChange(value);
      } else {
        _this.onChange(inputValue);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMenuOpen", function () {
      _this.setState({
        isOpen: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMenuClose", function () {
      _this.setState({
        isOpen: false
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

    _defineProperty(_assertThisInitialized(_this), "getSubtleControlStyles", function (selectStyles) {
      if (selectStyles.control) return {};
      return {
        border: "2px solid ".concat(_this.getState().isFocused ? "".concat(colors.B100) : "transparent"),
        backgroundColor: 'transparent',
        padding: '1px'
      };
    });

    return _this;
  }

  _createClass(TimePicker, [{
    key: "getOptions",
    value: function getOptions() {
      var _this2 = this;

      return this.props.times.map(function (time) {
        return {
          label: formatTime(time, _this2.props.timeFormat),
          value: time
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          autoFocus = _this$props2.autoFocus,
          formatDisplayLabel = _this$props2.formatDisplayLabel,
          id = _this$props2.id,
          innerProps = _this$props2.innerProps,
          isDisabled = _this$props2.isDisabled,
          name = _this$props2.name,
          placeholder = _this$props2.placeholder,
          selectProps = _this$props2.selectProps,
          spacing = _this$props2.spacing,
          timeFormat = _this$props2.timeFormat;

      var _this$getState = this.getState(),
          _this$getState$value = _this$getState.value,
          value = _this$getState$value === void 0 ? '' : _this$getState$value,
          isOpen = _this$getState.isOpen;

      var validationState = this.props.isInvalid ? 'error' : 'default';
      var icon = this.props.appearance === 'subtle' || this.props.hideIcon ? null : this.props.icon;

      var _selectProps$styles = selectProps.styles,
          selectStyles = _selectProps$styles === void 0 ? {} : _selectProps$styles,
          otherSelectProps = _objectWithoutProperties(selectProps, ["styles"]);

      var controlStyles = this.props.appearance === 'subtle' ? this.getSubtleControlStyles(selectStyles) : {};
      var SelectComponent = this.props.timeIsEditable ? CreatableSelect : Select;
      var labelAndValue = value && {
        label: formatDisplayLabel(value, timeFormat),
        value: value
      };
      return React.createElement("div", _extends({}, innerProps, {
        ref: this.getContainerRef
      }), React.createElement("input", {
        name: name,
        type: "hidden",
        value: value
      }), React.createElement(SelectComponent, _extends({
        autoFocus: autoFocus,
        components: {
          ClearIndicator: ClearIndicator,
          DropdownIndicator: DropdownIndicator,
          Menu: FixedLayerMenu
        },
        instanceId: id,
        isDisabled: isDisabled,
        menuIsOpen: isOpen && !isDisabled,
        menuPlacement: "auto",
        openMenuOnFocus: true,
        onBlur: this.onBlur,
        onCreateOption: this.onCreateOption,
        onChange: this.onChange,
        options: this.getOptions(),
        onFocus: this.onFocus,
        onMenuOpen: this.onMenuOpen,
        onMenuClose: this.onMenuClose,
        placeholder: placeholder,
        styles: mergeStyles(selectStyles, {
          control: function control(base) {
            return _objectSpread({}, base, controlStyles);
          },
          menu: function menu(base) {
            return _objectSpread({}, base, menuStyles, {
              // Fixed positioned elements no longer inherit width from their parent, so we must explicitly set the
              // menu width to the width of our container
              width: _this3.containerRef ? _this3.containerRef.getBoundingClientRect().width : 'auto'
            });
          }
        }),
        value: labelAndValue,
        spacing: spacing,
        dropdownIndicatorIcon: icon,
        fixedLayerRef: this.containerRef,
        validationState: validationState
      }, otherSelectProps)));
    }
  }]);

  return TimePicker;
}(Component);

_defineProperty(TimePicker, "defaultProps", {
  appearance: 'default',
  autoFocus: false,
  defaultIsOpen: false,
  defaultValue: '',
  hideIcon: false,
  formatDisplayLabel: formatTime,
  id: '',
  innerProps: {},
  isDisabled: false,
  isInvalid: false,
  name: '',
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  placeholder: 'e.g. 8:00am',
  parseInputValue: function parseInputValue(time, timeFormat) {
    return parseTime(time);
  },
  // eslint-disable-line no-unused-vars
  selectProps: {},
  spacing: 'default',
  times: defaultTimes,
  timeIsEditable: false,
  timeFormat: defaultTimeFormat
});

export { TimePicker as TimePickerWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'timePicker',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onChange: createAndFireEventOnAtlaskit({
    action: 'selectedTime',
    actionSubject: 'timePicker',
    attributes: {
      componentName: 'timePicker',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(TimePicker));