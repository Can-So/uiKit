import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { UIAnalyticsEvent } from '@findable/analytics-next';
import Pagination from '@findable/pagination';

var ManagedPagination =
/*#__PURE__*/
function (_Component) {
  _inherits(ManagedPagination, _Component);

  function ManagedPagination() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ManagedPagination);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ManagedPagination)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event, newValue, analyticsEvent) {
      _this.props.onChange(newValue, analyticsEvent);
    });

    return _this;
  }

  _createClass(ManagedPagination, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          total = _this$props.total,
          _this$props$value = _this$props.value,
          value = _this$props$value === void 0 ? 1 : _this$props$value,
          i18n = _this$props.i18n;

      var pages = _toConsumableArray(Array(total)).map(function (_, index) {
        return index + 1;
      }); // Pagination accepts array now thus selectedIndex starts with 0
      // So, we are substracting value by one thus not breaking dynamic table


      var selectedIndex = value - 1;
      return React.createElement(Pagination, {
        selectedIndex: selectedIndex,
        i18n: i18n,
        onChange: this.onChange,
        pages: pages
      });
    }
  }]);

  return ManagedPagination;
}(Component);

export { ManagedPagination as default };