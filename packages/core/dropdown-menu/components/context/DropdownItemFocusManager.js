import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { focusManagerContext } from '../../util/contextNamespace';
import { KEY_DOWN, KEY_UP, KEY_TAB } from '../../util/keys';

var DropdownItemFocusManager =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownItemFocusManager, _Component);

  function DropdownItemFocusManager() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownItemFocusManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownItemFocusManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "registeredItems", []);

    _defineProperty(_assertThisInitialized(_this), "focusedItemId", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleItemRegistered", function (itemId, itemNode) {
      _this.registeredItems.push({
        itemId: itemId,
        itemNode: itemNode
      });

      if (_this.props.autoFocus && _this.registeredItems.length === 1) {
        _this.focusedItemId = itemId;
        itemNode.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemDeregistered", function (itemId) {
      _this.registeredItems = _this.registeredItems.filter(function (item) {
        return item.itemId !== itemId;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemFocused", function (itemId) {
      _this.focusedItemId = itemId;
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemUpdated", function (itemId, itemNode) {
      var matchingIndex = -1;

      for (var i = 0; i < _this.registeredItems.length; i++) {
        if (_this.registeredItems[i].itemId === itemId) {
          matchingIndex = i;
          break;
        }
      }

      if (matchingIndex === -1) {
        _this.handleItemRegistered(itemId, itemNode);

        return;
      }

      _this.registeredItems[matchingIndex].itemNode = itemNode;

      if (_this.focusedItemIndex() === matchingIndex) {
        itemNode.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "focusedItemIndex", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          focusedItemId = _assertThisInitialize.focusedItemId,
          registeredItems = _assertThisInitialize.registeredItems;

      for (var i = 0; i < registeredItems.length; i++) {
        if (registeredItems[i].itemId === focusedItemId) {
          return i;
        }
      }

      return -1;
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboard", function (event) {
      var key = event.key,
          shiftKey = event.shiftKey;

      var focusedItemIndex = _this.focusedItemIndex();

      if (key === KEY_UP || key === KEY_DOWN) {
        // We prevent default here to avoid page scrolling when up/down
        // pressed while dropdown is focused.
        event.preventDefault();

        if (focusedItemIndex < 0) {
          return;
        }

        var nextItemIndex = key === KEY_UP ? Math.max(0, focusedItemIndex - 1) : Math.min(_this.registeredItems.length - 1, focusedItemIndex + 1);

        _this.registeredItems[nextItemIndex].itemNode.focus();
      }

      if (key === KEY_TAB) {
        if (!shiftKey && focusedItemIndex === _this.registeredItems.length - 1) {
          if (_this.props.close) _this.props.close({
            event: event,
            source: 'keydown'
          });
        }

        if (shiftKey && focusedItemIndex === 0) {
          if (_this.props.close) _this.props.close({
            event: event,
            source: 'keydown'
          });
        }
      }
    });

    return _this;
  }

  _createClass(DropdownItemFocusManager, [{
    key: "getChildContext",
    value: function getChildContext() {
      return _defineProperty({}, focusManagerContext, {
        itemFocused: this.handleItemFocused,
        registerItem: this.handleItemRegistered,
        deregisterItem: this.handleItemDeregistered,
        updateItem: this.handleItemUpdated
      });
    }
  }, {
    key: "render",
    value: function render() {
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      return React.createElement("div", {
        onKeyDown: this.handleKeyboard
      }, this.props.children);
    }
  }]);

  return DropdownItemFocusManager;
}(Component);

_defineProperty(DropdownItemFocusManager, "childContextTypes", _defineProperty({}, focusManagerContext, PropTypes.object));

export { DropdownItemFocusManager as default };