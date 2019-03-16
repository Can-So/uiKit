import _extends from "@babel/runtime/helpers/extends";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { Calendar as CalendarBase } from 'calendar-base';
import pick from 'lodash.pick';
import React, { Component } from 'react';
import { uid } from 'react-uid';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import { name as packageName, version as packageVersion } from '../version.json';
import { dateToString, getShortDayName, makeArrayFromNumber } from '../util';
import DateComponent from './Date';
import Heading from './Heading';
import { Announcer, CalendarTable, CalendarTbody, CalendarTh, CalendarThead, Wrapper } from '../styled/Calendar';
var arrowKeys = {
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up'
};
var daysPerWeek = 7;
var monthsPerYear = 12;

function getUniqueId(prefix) {
  return "".concat(prefix, "-").concat(uid({
    id: prefix
  }));
}

function padToTwo(number) {
  return number <= 99 ? "0".concat(number).slice(-2) : "".concat(number);
}

var Calendar =
/*#__PURE__*/
function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "calendar", void 0);

    _defineProperty(_assertThisInitialized(_this), "container", void 0);

    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return _objectSpread({}, _this.state, pick(_this.props, ['day', 'disabled', 'selected', 'month', 'previouslySelected', 'year', 'today']));
    });

    _defineProperty(_assertThisInitialized(_this), "handleContainerKeyDown", function (e) {
      var key = e.key;
      var arrowKey = arrowKeys[key];

      if (key === 'Enter' || key === ' ') {
        var _this$getState = _this.getState(),
            selectDay = _this$getState.day,
            selectMonth = _this$getState.month,
            selectYear = _this$getState.year;

        e.preventDefault();

        _this.triggerOnSelect({
          day: selectDay,
          year: selectYear,
          month: selectMonth
        });
      } else if (arrowKey) {
        e.preventDefault();

        _this.navigate(arrowKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickDay", function (_ref) {
      var year = _ref.year,
          month = _ref.month,
          day = _ref.day;

      _this.triggerOnSelect({
        year: year,
        month: month,
        day: day
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickNext", function () {
      var _this$getState$_this$ = _objectSpread({}, _this.getState(), _this.getNextMonth()),
          day = _this$getState$_this$.day,
          month = _this$getState$_this$.month,
          year = _this$getState$_this$.year;

      _this.triggerOnChange({
        day: day,
        month: month,
        year: year,
        type: 'next'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickPrev", function () {
      var _this$getState$_this$2 = _objectSpread({}, _this.getState(), _this.getPrevMonth()),
          day = _this$getState$_this$2.day,
          month = _this$getState$_this$2.month,
          year = _this$getState$_this$2.year;

      _this.triggerOnChange({
        day: day,
        month: month,
        year: year,
        type: 'prev'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleContainerBlur", function () {
      _this.setState({
        day: 0
      });

      _this.props.onBlur();
    });

    _defineProperty(_assertThisInitialized(_this), "handleContainerFocus", function () {
      _this.setState({
        day: _this.getState().day || 1
      });

      _this.props.onFocus();
    });

    _defineProperty(_assertThisInitialized(_this), "refContainer", function (e) {
      _this.container = e;
    });

    _defineProperty(_assertThisInitialized(_this), "triggerOnChange", function (_ref2) {
      var year = _ref2.year,
          month = _ref2.month,
          day = _ref2.day,
          type = _ref2.type;
      var iso = dateToString({
        year: year,
        month: month,
        day: day
      });

      _this.props.onChange({
        day: day,
        month: month,
        year: year,
        iso: iso,
        type: type
      });

      _this.setState({
        day: day,
        month: month,
        year: year
      });
    });

    _defineProperty(_assertThisInitialized(_this), "triggerOnSelect", function (_ref3) {
      var year = _ref3.year,
          month = _ref3.month,
          day = _ref3.day;
      var iso = dateToString({
        year: year,
        month: month,
        day: day
      });

      _this.props.onSelect({
        day: day,
        month: month,
        year: year,
        iso: iso
      });

      _this.setState({
        previouslySelected: _this.getState().selected,
        selected: [iso]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getCalendarWeeks", function (mappedState) {
      var day = mappedState.day,
          year = mappedState.year,
          month = mappedState.month,
          disabled = mappedState.disabled,
          previouslySelected = mappedState.previouslySelected,
          selected = mappedState.selected,
          today = mappedState.today;

      var calendar = _this.calendar.getCalendar(year, month - 1);

      var weeks = [];
      var shouldDisplaySixthWeek = calendar.length % 6; // Some months jump between 5 and 6 weeks to display. In some cases 4 (Feb
      // with the 1st on a Monday etc). This ensures the UI doesn't jump around by
      // catering to always showing 6 weeks.

      if (shouldDisplaySixthWeek) {
        var lastDayIsSibling = calendar[calendar.length - 1].siblingMonth;
        var sliceStart = lastDayIsSibling ? daysPerWeek : 0;
        calendar.push.apply(calendar, _toConsumableArray(_this.calendar.getCalendar(year, month).slice(sliceStart, sliceStart + daysPerWeek).map(function (e) {
          return _objectSpread({}, e, {
            siblingMonth: true
          });
        })));
      }

      calendar.forEach(function (date) {
        var dateAsString = dateToString(date, {
          fixMonth: true
        });
        var week;

        if (date.weekDay === 0) {
          week = {
            key: dateAsString,
            components: []
          };
          weeks.push(week);
        } else {
          week = weeks[weeks.length - 1];
        }

        var isDisabled = disabled.indexOf(dateAsString) > -1;
        var isFocused = day === date.day && !date.siblingMonth;
        var isPreviouslySelected = !isDisabled && previouslySelected.indexOf(dateAsString) > -1;
        var isSelected = !isDisabled && selected.indexOf(dateAsString) > -1;
        var isSiblingMonth = date.siblingMonth;
        var isToday = today === dateAsString;
        week.components.push(React.createElement(DateComponent, {
          disabled: isDisabled,
          focused: isFocused,
          isToday: isToday,
          key: dateAsString,
          month: date.month + 1,
          onClick: _this.handleClickDay,
          previouslySelected: isPreviouslySelected,
          selected: isSelected,
          sibling: isSiblingMonth,
          year: date.year
        }, date.day));
      });
      return weeks;
    });

    var now = new Date();
    var thisDay = now.getDate();
    var thisMonth = now.getMonth() + 1;
    var thisYear = now.getFullYear();
    _this.state = {
      day: _this.props.defaultDay || thisDay,
      disabled: _this.props.defaultDisabled,
      selected: _this.props.defaultSelected,
      month: _this.props.defaultMonth || thisMonth,
      previouslySelected: _this.props.defaultPreviouslySelected,
      year: _this.props.defaultYear || thisYear,
      today: _this.props.today || "".concat(thisYear, "-").concat(padToTwo(thisMonth), "-").concat(padToTwo(thisDay))
    };
    _this.calendar = new CalendarBase({
      siblingMonths: true,
      weekNumbers: true
    });
    return _this;
  } // All state needs to be accessed via this function so that the state is mapped from props
  // correctly to allow controlled/uncontrolled usage.


  _createClass(Calendar, [{
    key: "getNextMonth",
    value: function getNextMonth() {
      var _this$getState2 = this.getState(),
          month = _this$getState2.month,
          year = _this$getState2.year;

      if (month === monthsPerYear) {
        month = 1;
        year += 1;
      } else {
        month += 1;
      }

      return {
        month: month,
        year: year
      };
    }
  }, {
    key: "getPrevMonth",
    value: function getPrevMonth() {
      var _this$getState3 = this.getState(),
          month = _this$getState3.month,
          year = _this$getState3.year;

      if (month === 1) {
        month = monthsPerYear;
        year -= 1;
      } else {
        month -= 1;
      }

      return {
        month: month,
        year: year
      };
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.container) {
        this.container.focus();
      }
    }
  }, {
    key: "navigate",
    value: function navigate(type) {
      var _this$getState4 = this.getState(),
          day = _this$getState4.day,
          month = _this$getState4.month,
          year = _this$getState4.year;

      if (type === 'down') {
        var next = day + daysPerWeek;
        var daysInMonth = CalendarBase.daysInMonth(year, month - 1);

        if (next > daysInMonth) {
          var _this$getNextMonth = this.getNextMonth(),
              nextMonth = _this$getNextMonth.month,
              nextYear = _this$getNextMonth.year;

          this.triggerOnChange({
            year: nextYear,
            month: nextMonth,
            day: next - daysInMonth,
            type: type
          });
        } else {
          this.triggerOnChange({
            year: year,
            month: month,
            day: next,
            type: type
          });
        }
      } else if (type === 'left') {
        var prev = day - 1;

        if (prev < 1) {
          var _this$getPrevMonth = this.getPrevMonth(),
              prevMonth = _this$getPrevMonth.month,
              prevYear = _this$getPrevMonth.year;

          var prevDay = CalendarBase.daysInMonth(prevYear, prevMonth - 1);
          this.triggerOnChange({
            year: prevYear,
            month: prevMonth,
            day: prevDay,
            type: type
          });
        } else {
          this.triggerOnChange({
            year: year,
            month: month,
            day: prev,
            type: type
          });
        }
      } else if (type === 'right') {
        var _next = day + 1;

        var _daysInMonth = CalendarBase.daysInMonth(year, month - 1);

        if (_next > _daysInMonth) {
          var _this$getNextMonth2 = this.getNextMonth(),
              _nextMonth = _this$getNextMonth2.month,
              _nextYear = _this$getNextMonth2.year;

          this.triggerOnChange({
            year: _nextYear,
            month: _nextMonth,
            day: 1,
            type: type
          });
        } else {
          this.triggerOnChange({
            year: year,
            month: month,
            day: _next,
            type: type
          });
        }
      } else if (type === 'up') {
        var _prev = day - daysPerWeek;

        if (_prev < 1) {
          var _this$getPrevMonth2 = this.getPrevMonth(),
              _prevMonth = _this$getPrevMonth2.month,
              _prevYear = _this$getPrevMonth2.year;

          var _prevDay = CalendarBase.daysInMonth(_prevYear, _prevMonth - 1) + _prev;

          this.triggerOnChange({
            year: _prevYear,
            month: _prevMonth,
            day: _prevDay,
            type: type
          });
        } else {
          this.triggerOnChange({
            year: year,
            month: month,
            day: _prev,
            type: type
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var mappedState = this.getState();
      var innerProps = this.props.innerProps;
      var announceId = getUniqueId('announce');
      return React.createElement("div", _extends({}, innerProps, {
        onBlur: this.handleContainerBlur,
        onFocus: this.handleContainerFocus,
        onKeyDown: this.handleContainerKeyDown,
        role: "presentation"
      }), React.createElement(Announcer, {
        id: announceId,
        "aria-live": "assertive",
        "aria-relevant": "text"
      }, new Date(mappedState.year, mappedState.month, mappedState.day).toString()), React.createElement(Wrapper, {
        "aria-describedby": announceId,
        "aria-label": "calendar",
        innerRef: this.refContainer,
        role: "grid",
        tabIndex: 0
      }, React.createElement(Heading, {
        month: mappedState.month,
        year: mappedState.year,
        handleClickNext: this.handleClickNext,
        handleClickPrev: this.handleClickPrev
      }), React.createElement(CalendarTable, {
        role: "presentation"
      }, React.createElement(CalendarThead, null, React.createElement("tr", null, makeArrayFromNumber(daysPerWeek).map(function (i) {
        return React.createElement(CalendarTh, {
          key: i
        }, getShortDayName(i));
      }))), React.createElement(CalendarTbody, null, this.getCalendarWeeks(mappedState).map(function (week) {
        return React.createElement("tr", {
          key: week.key
        }, week.components);
      })))));
    }
  }]);

  return Calendar;
}(Component);

_defineProperty(Calendar, "defaultProps", {
  onBlur: function onBlur() {},
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onSelect: function onSelect() {},
  innerProps: {},
  defaultDay: 0,
  defaultDisabled: [],
  defaultSelected: [],
  defaultPreviouslySelected: []
});

export { Calendar as CalendarWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'calendar',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onChange: createAndFireEventOnAtlaskit({
    action: 'changed',
    actionSubject: 'calendarDate',
    attributes: {
      componentName: 'calendar',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onSelect: createAndFireEventOnAtlaskit({
    action: 'selected',
    actionSubject: 'calendarDate',
    attributes: {
      componentName: 'calendar',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Calendar));