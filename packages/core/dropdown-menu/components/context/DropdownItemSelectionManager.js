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
import { selectionCacheContext, selectionManagerContext } from '../../util/contextNamespace';

var DropdownItemSelectionManager =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownItemSelectionManager, _Component);

  function DropdownItemSelectionManager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownItemSelectionManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownItemSelectionManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "setItemSelected", function (itemId, isSelected, defaultSelected) {
      var _this$props = _this.props,
          behavior = _this$props.behavior,
          groupId = _this$props.groupId;

      var setSelected = function setSelected(finalBool) {
        if (behavior === 'checkbox' || behavior === 'menuitemcheckbox') {
          _this.setCheckboxItemSelected(itemId, finalBool);
        } else if (behavior === 'radio' || behavior === 'menuitemradio') {
          _this.setRadioItemSelected(itemId, finalBool);
        }
      }; // If a radio or checkbox item has defaultSelected set on it, that it will try to set its
      // selected state to true each time it mounts (which happens whenever the dropdown is re-
      // opened by the user. The following check makes sure that the defaultSelected behaviour
      // only applies on the first mount of the radio/checkbox.


      if (typeof isSelected === 'boolean') {
        // If isSelected is explicitly provided, set it to that
        setSelected(isSelected);
      } else if (defaultSelected) {
        if (!_this.hasAlreadyAppliedDefaultSelected(itemId)) {
          // If using defaultSelected and this is first mount, select the item
          setSelected(true);

          _this.context[selectionCacheContext].markItemAsDefaultApplied(groupId, itemId);
        } else {
          // If using defaultSelected and not first mount, set isSelected to cached value
          setSelected(_this.isItemSelectedInCache(itemId));
        }
      } else {
        setSelected(_this.isItemSelectedInCache(itemId));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setCheckboxItemSelected", function (itemId, isSelected) {
      var cache = _this.context[selectionCacheContext];
      var alreadySelected = cache.itemsInGroup(_this.props.groupId);
      var isAlreadySelected = cache.isItemSelected(_this.props.groupId, itemId);

      if (isSelected && !isAlreadySelected) {
        _this.updateCacheContextWithSelections([].concat(_toConsumableArray(alreadySelected), [{
          id: itemId,
          groupId: _this.props.groupId
        }]));
      } else if (!isSelected && isAlreadySelected) {
        var withoutCurrentItem = alreadySelected.filter(function (item) {
          return item.id !== itemId;
        });

        _this.updateCacheContextWithSelections(withoutCurrentItem);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setRadioItemSelected", function (itemId, isSelected) {
      var cache = _this.context[selectionCacheContext];
      var isAlreadySelected = cache.isItemSelected(_this.props.groupId, itemId);

      if (isAlreadySelected && !isSelected) {
        _this.updateCacheContextWithSelections([]);
      } else if (!isAlreadySelected && isSelected) {
        _this.updateCacheContextWithSelections([{
          id: itemId,
          groupId: _this.props.groupId
        }]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isItemSelectedInCache", function (itemId) {
      return _this.context[selectionCacheContext].isItemSelected(_this.props.groupId, itemId);
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemClicked", function (clickedItemId) {
      var behavior = _this.props.behavior;

      if (behavior === 'checkbox' || behavior === 'menuitemcheckbox') {
        _this.handleCheckboxItemClicked(clickedItemId);
      } else if (behavior === 'radio' || behavior === 'menuitemradio') {
        _this.handleRadioItemClicked(clickedItemId);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "hasAlreadyAppliedDefaultSelected", function (itemId) {
      return _this.context[selectionCacheContext].hasItemAlreadyHadDefaultSelectedApplied(_this.props.groupId, itemId);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCheckboxItemClicked", function (clickedItemId) {
      var cache = _this.context[selectionCacheContext];
      var itemsInGroup = cache.itemsInGroup(_this.props.groupId);
      var newSelections = cache.isItemSelected(_this.props.groupId, clickedItemId) ? itemsInGroup.filter(function (item) {
        return item.id !== clickedItemId;
      }) : [].concat(_toConsumableArray(itemsInGroup), [{
        id: clickedItemId,
        groupId: _this.props.groupId
      }]);

      _this.updateCacheContextWithSelections(newSelections);
    });

    _defineProperty(_assertThisInitialized(_this), "handleRadioItemClicked", function (clickedItemId) {
      _this.updateCacheContextWithSelections([{
        id: clickedItemId,
        groupId: _this.props.groupId
      }]);
    });

    _defineProperty(_assertThisInitialized(_this), "updateCacheContextWithSelections", function (itemSelections) {
      _this.context[selectionCacheContext].itemSelectionsChanged(_this.props.groupId, itemSelections);
    });

    return _this;
  }

  _createClass(DropdownItemSelectionManager, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this2 = this;

      return _defineProperty({}, selectionManagerContext, {
        isItemSelected: function isItemSelected(itemId) {
          return _this2.context[selectionCacheContext].isItemSelected(_this2.props.groupId, itemId);
        },
        itemClicked: this.handleItemClicked,
        setItemSelected: this.setItemSelected
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, this.props.children);
    }
  }]);

  return DropdownItemSelectionManager;
}(Component);

_defineProperty(DropdownItemSelectionManager, "childContextTypes", _defineProperty({}, selectionManagerContext, PropTypes.object));

_defineProperty(DropdownItemSelectionManager, "contextTypes", _defineProperty({}, selectionCacheContext, PropTypes.object.isRequired));

export { DropdownItemSelectionManager as default };