import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OverflowHeightReportEnabler from './OverflowHeightReportEnabler';
import OverflowDropdown from './OverflowDropdown';
import HeightDetector from './HeightDetector';
import { overflowManagerNamespace, dropdownHeight, reservedGapHeight, isArrayFilled } from './shared-variables';

var OverflowManager =
/*#__PURE__*/
function (_Component) {
  _inherits(OverflowManager, _Component);

  _createClass(OverflowManager, [{
    key: "getChildContext",
    value: function getChildContext() {
      return _defineProperty({}, overflowManagerNamespace, {
        reportGroupHeightToManager: this.handleItemGroupHeightReport,
        isGroupVisibleInNav: this.isGroupVisibleInNav,
        isGroupItemVisibleInNav: this.isGroupItemVisibleInNav,
        isGroupVisibleInDropdown: this.isGroupVisibleInDropdown,
        isGroupItemVisibleInDropdown: this.isGroupItemVisibleInDropdown
      });
    }
  }]);

  function OverflowManager(props) {
    var _this;

    _classCallCheck(this, OverflowManager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OverflowManager).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      // eslint-disable-line react/sort-comp
      breakAt: {
        group: 999,
        item: 999
      }
    });

    _defineProperty(_assertThisInitialized(_this), "availableHeight", 0);

    _defineProperty(_assertThisInitialized(_this), "groupHeights", []);

    _defineProperty(_assertThisInitialized(_this), "isGroupVisibleInNav", function (groupIndex) {
      return groupIndex < _this.state.breakAt.group || groupIndex === _this.state.breakAt.group && _this.state.breakAt.item !== 0;
    });

    _defineProperty(_assertThisInitialized(_this), "isGroupItemVisibleInNav", function (groupIndex, itemIndex) {
      return groupIndex < _this.state.breakAt.group || groupIndex === _this.state.breakAt.group && itemIndex < _this.state.breakAt.item;
    });

    _defineProperty(_assertThisInitialized(_this), "isGroupVisibleInDropdown", function (groupIndex) {
      return groupIndex >= _this.state.breakAt.group;
    });

    _defineProperty(_assertThisInitialized(_this), "isGroupItemVisibleInDropdown", function (groupIndex, itemIndex) {
      return groupIndex > _this.state.breakAt.group || groupIndex === _this.state.breakAt.group && itemIndex >= _this.state.breakAt.item;
    });

    _defineProperty(_assertThisInitialized(_this), "calculateBreakItem", function () {
      if (!_this.hasAllGroupHeights()) {
        return;
      }

      var newBreak = {
        group: 999,
        item: 999
      };

      var _assertThisInitialize = _assertThisInitialized(_this),
          availableHeight = _assertThisInitialize.availableHeight,
          groupHeights = _assertThisInitialize.groupHeights;

      var cumulativeHeight = dropdownHeight + reservedGapHeight; // eslint-disable-line no-restricted-syntax,no-labels

      groupLoop: for (var g = 0; g < _this.props.groupCount; g++) {
        var group = groupHeights[g];
        cumulativeHeight += group.nonItemHeight;

        if (cumulativeHeight >= availableHeight) {
          newBreak.group = g;
          newBreak.item = 0;
          break;
        }

        var itemCount = group.itemHeights.length;

        for (var i = 0; i < itemCount; i++) {
          cumulativeHeight += group.itemHeights[i];

          if (cumulativeHeight >= availableHeight) {
            newBreak.group = g;
            newBreak.item = i;
            break groupLoop; // eslint-disable-line no-restricted-syntax,no-labels
          }
        }
      }

      if (_this.state.breakAt.group !== newBreak.group || _this.state.breakAt.item !== newBreak.item) {
        _this.setState({
          breakAt: newBreak
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "hasAllGroupHeights", function () {
      return isArrayFilled(_this.groupHeights);
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemGroupHeightReport", function (_ref2) {
      var groupIndex = _ref2.groupIndex,
          groupHeightInfo = _objectWithoutProperties(_ref2, ["groupIndex"]);

      _this.groupHeights[groupIndex] = groupHeightInfo;

      _this.calculateBreakItem();
    });

    _defineProperty(_assertThisInitialized(_this), "handleAvailableHeightChange", function (availableHeight) {
      if (availableHeight === _this.availableHeight) {
        return;
      }

      _this.availableHeight = availableHeight;

      _this.calculateBreakItem();
    });

    _this.groupHeights = new Array(_this.props.groupCount);
    return _this;
  }

  _createClass(OverflowManager, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        style: {
          position: 'relative',
          height: '100%'
        }
      }, React.createElement(HeightDetector, {
        onHeightChange: this.handleAvailableHeightChange
      }, React.createElement(OverflowHeightReportEnabler, null, this.props.children), this.state.breakAt.group <= this.props.groupCount ? React.createElement(OverflowDropdown, null, this.props.children) : null));
    }
  }]);

  return OverflowManager;
}(Component);

_defineProperty(OverflowManager, "childContextTypes", _defineProperty({}, overflowManagerNamespace, PropTypes.object));

export { OverflowManager as default };