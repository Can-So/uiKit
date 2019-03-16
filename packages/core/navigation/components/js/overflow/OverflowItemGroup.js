import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

var _defineProperty3;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { overflowManagerNamespace, overflowGroupNamespace, shouldReportItemHeight, isArrayFilled } from './shared-variables';

var OverflowItemGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(OverflowItemGroup, _Component);

  function OverflowItemGroup(props) {
    var _this;

    _classCallCheck(this, OverflowItemGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OverflowItemGroup).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "rootNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "heights", void 0);

    _defineProperty(_assertThisInitialized(_this), "isInNavigation", function () {
      return !!_this.context[shouldReportItemHeight];
    });

    _defineProperty(_assertThisInitialized(_this), "shouldRender", function () {
      var overflowGroupIndex = _this.props.overflowGroupIndex;

      if (_this.isInNavigation()) {
        return _this.context[overflowManagerNamespace].isGroupVisibleInNav(overflowGroupIndex);
      }

      return _this.context[overflowManagerNamespace].isGroupVisibleInDropdown(overflowGroupIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "shouldRenderItem", function (overflowItemIndex) {
      if (_this.isInNavigation()) {
        return _this.context[overflowManagerNamespace].isGroupItemVisibleInNav(_this.props.overflowGroupIndex, overflowItemIndex);
      }

      return _this.context[overflowManagerNamespace].isGroupItemVisibleInDropdown(_this.props.overflowGroupIndex, overflowItemIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "hasAllItemHeights", function () {
      return isArrayFilled(_this.heights);
    });

    _defineProperty(_assertThisInitialized(_this), "combinedItemHeights", function () {
      return _this.heights.reduce(function (sum, value, i) {
        return sum + (_this.shouldRenderItem(i) ? value : 0);
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "nonItemHeight", function () {
      return _this.groupHeight() - _this.combinedItemHeights();
    });

    _defineProperty(_assertThisInitialized(_this), "groupHeight", function () {
      return _this.rootNode ? _this.rootNode.clientHeight : 0;
    });

    _defineProperty(_assertThisInitialized(_this), "reportHeightsToOverflowManager", function () {
      if (!_this.isInNavigation() || !_this.rootNode || !_this.hasAllItemHeights()) {
        return;
      }

      _this.context[overflowManagerNamespace].reportGroupHeightToManager({
        groupIndex: _this.props.overflowGroupIndex,
        itemHeights: _this.heights,
        nonItemHeight: _this.nonItemHeight()
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemHeightReport", function (overflowItemIndex, height) {
      _this.heights[overflowItemIndex] = height;

      _this.reportHeightsToOverflowManager();
    });

    _defineProperty(_assertThisInitialized(_this), "handleRootNodeRef", function (ref) {
      _this.rootNode = ref;

      _this.reportHeightsToOverflowManager();
    });

    _this.heights = new Array(_this.props.itemCount);
    return _this;
  }

  _createClass(OverflowItemGroup, [{
    key: "getChildContext",
    value: function getChildContext() {
      return _defineProperty({}, overflowGroupNamespace, {
        reportItemHeightToGroup: this.handleItemHeightReport,
        shouldRenderItem: this.shouldRenderItem
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.shouldRender()) {
        return null;
      }

      if (this.context[shouldReportItemHeight]) {
        return React.createElement("div", {
          ref: this.handleRootNodeRef
        }, this.props.children);
      }

      return this.props.children;
    }
  }]);

  return OverflowItemGroup;
}(Component);

_defineProperty(OverflowItemGroup, "childContextTypes", _defineProperty({}, overflowGroupNamespace, PropTypes.object));

_defineProperty(OverflowItemGroup, "contextTypes", (_defineProperty3 = {}, _defineProperty(_defineProperty3, overflowManagerNamespace, PropTypes.object), _defineProperty(_defineProperty3, shouldReportItemHeight, PropTypes.bool), _defineProperty3));

export { OverflowItemGroup as default };