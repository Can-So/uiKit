import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import find from 'array-find';
import { selectionCacheContext } from '../../util/contextNamespace';

var isItemInList = function isItemInList(itemList, itemId, groupId) {
  return Boolean(find(itemList, function (item) {
    return item.id === itemId && item.groupId === groupId;
  }));
};

var DropdownItemSelectionCache =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownItemSelectionCache, _Component);

  function DropdownItemSelectionCache() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownItemSelectionCache);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownItemSelectionCache)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      lastCacheUpdate: 0
    });

    _defineProperty(_assertThisInitialized(_this), "selectedItems", []);

    _defineProperty(_assertThisInitialized(_this), "alreadyDefaultedItems", []);

    _defineProperty(_assertThisInitialized(_this), "handleItemSelectionsChanged", function (groupId, newGroupSelections) {
      var newSelectedItems = [].concat(_toConsumableArray(_this.selectedItems.filter(function (item) {
        return item.groupId !== groupId;
      })), _toConsumableArray(newGroupSelections));
      _this.selectedItems = newSelectedItems; // We store selectedItems in an instance variable (this.selectedItems) instead of state,
      // because if multiple children update the cache at the same time it causes unexpected
      // behaviour due to the asynchronous behaviour of setState. So we need to trigger setState
      // with a different value to cause the children to be updated with their new selection values.

      _this.setState({
        lastCacheUpdate: Date.now()
      });
    });

    return _this;
  }

  _createClass(DropdownItemSelectionCache, [{
    key: "getChildContext",
    // eslint-disable-line react/sort-comp
    value: function getChildContext() {
      var _this2 = this;

      return _defineProperty({}, selectionCacheContext, {
        // This function returns true/false describing whether the supplied navigation item
        // (which must have a unique item and group ID) is currently selected - this is used
        // by radio and checkbox dropdown items to retreive their 'selected' state when they
        // re-mount, which happens when the dropdown is closed and then re-opened.
        isItemSelected: function isItemSelected(groupId, itemId) {
          return isItemInList(_this2.selectedItems, itemId, groupId);
        },
        itemsInGroup: function itemsInGroup(groupId) {
          return _this2.selectedItems.filter(function (item) {
            return item.groupId === groupId;
          });
        },
        itemSelectionsChanged: this.handleItemSelectionsChanged,
        hasItemAlreadyHadDefaultSelectedApplied: function hasItemAlreadyHadDefaultSelectedApplied(groupId, itemId) {
          return isItemInList(_this2.alreadyDefaultedItems, itemId, groupId);
        },
        markItemAsDefaultApplied: function markItemAsDefaultApplied(groupId, itemId) {
          _this2.alreadyDefaultedItems.push({
            id: itemId,
            groupId: groupId
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, this.props.children);
    }
  }]);

  return DropdownItemSelectionCache;
}(Component);

_defineProperty(DropdownItemSelectionCache, "childContextTypes", _defineProperty({}, selectionCacheContext, PropTypes.shape({
  isItemSelected: PropTypes.func,
  itemsInGroup: PropTypes.func,
  itemSelectionsChanged: PropTypes.func
})));

export { DropdownItemSelectionCache as default };