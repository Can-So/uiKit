import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { DropdownMenuStateless } from '@atlaskit/dropdown-menu';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { GlobalItem } from '@atlaskit/navigation-next';

var DropdownItem =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownItem, _Component);

  function DropdownItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpenChange", function (_ref) {
      var isOpen = _ref.isOpen;
      return _this.setState({
        isOpen: isOpen
      });
    });

    return _this;
  }

  _createClass(DropdownItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          items = _this$props.items,
          Trigger = _this$props.trigger;
      var isOpen = this.state.isOpen;
      return React.createElement(DropdownMenuStateless, {
        appearance: "tall",
        boundariesElement: "window",
        isOpen: isOpen,
        onOpenChange: this.handleOpenChange,
        position: "right bottom",
        trigger: React.createElement(Trigger, {
          isOpen: isOpen
        })
      }, items);
    }
  }]);

  return DropdownItem;
}(Component);

var ItemComponent = function ItemComponent(props) {
  var DropdownItems = props.dropdownItems,
      CustomItemComponent = props.itemComponent,
      badgeCount = props.badgeCount,
      itemProps = _objectWithoutProperties(props, ["dropdownItems", "itemComponent", "badgeCount"]);

  if (CustomItemComponent) {
    return React.createElement(CustomItemComponent, itemProps);
  }

  if (DropdownItems) {
    return React.createElement(DropdownItem, {
      trigger: function trigger(_ref2) {
        var isOpen = _ref2.isOpen;
        return React.createElement(GlobalItem, _extends({
          isSelected: isOpen
        }, itemProps));
      },
      items: React.createElement(DropdownItems, null)
    });
  }

  if (badgeCount !== undefined) {
    return React.createElement(NavigationAnalyticsContext, {
      data: {
        attributes: {
          badgeCount: badgeCount
        }
      }
    }, React.createElement(GlobalItem, itemProps));
  }

  return React.createElement(GlobalItem, itemProps);
};

export default ItemComponent;