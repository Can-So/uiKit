import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shouldReportItemHeight } from './shared-variables';

var OverflowHeightReportEnabler =
/*#__PURE__*/
function (_Component) {
  _inherits(OverflowHeightReportEnabler, _Component);

  function OverflowHeightReportEnabler() {
    _classCallCheck(this, OverflowHeightReportEnabler);

    return _possibleConstructorReturn(this, _getPrototypeOf(OverflowHeightReportEnabler).apply(this, arguments));
  }

  _createClass(OverflowHeightReportEnabler, [{
    key: "getChildContext",
    value: function getChildContext() {
      return _defineProperty({}, shouldReportItemHeight, true);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, this.props.children);
    }
  }]);

  return OverflowHeightReportEnabler;
}(Component);

_defineProperty(OverflowHeightReportEnabler, "childContextTypes", _defineProperty({}, shouldReportItemHeight, PropTypes.bool));

export { OverflowHeightReportEnabler as default };