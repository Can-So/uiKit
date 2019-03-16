import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

var _defineProperty2;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { overflowGroupNamespace, shouldReportItemHeight } from './shared-variables';

var OverflowItem =
/*#__PURE__*/
function (_Component) {
  _inherits(OverflowItem, _Component);

  function OverflowItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, OverflowItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(OverflowItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "measureHeight", function (ref) {
      if (ref) {
        _this.context[overflowGroupNamespace].reportItemHeightToGroup(_this.props.overflowItemIndex, ref.clientHeight);
      }
    });

    return _this;
  }

  _createClass(OverflowItem, [{
    key: "render",
    value: function render() {
      if (!this.context[overflowGroupNamespace].shouldRenderItem(this.props.overflowItemIndex)) {
        return null;
      }

      if (this.context[shouldReportItemHeight]) {
        return React.createElement("div", {
          ref: this.measureHeight
        }, this.props.children);
      }

      return this.props.children;
    }
  }]);

  return OverflowItem;
}(Component);

_defineProperty(OverflowItem, "contextTypes", (_defineProperty2 = {}, _defineProperty(_defineProperty2, overflowGroupNamespace, PropTypes.object), _defineProperty(_defineProperty2, shouldReportItemHeight, PropTypes.bool), _defineProperty2));

export { OverflowItem as default };