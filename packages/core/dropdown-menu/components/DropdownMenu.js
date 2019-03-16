import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import StatelessMenu from './DropdownMenuStateless';

var DropdownMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownMenu);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownMenu)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: _this.props.defaultOpen,
      items: _toConsumableArray(_this.props.items)
    });

    _defineProperty(_assertThisInitialized(_this), "findActivatedGroup", function (item) {
      return _this.state.items.filter(function (group) {
        return group.items.indexOf(item) > -1;
      })[0];
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemActivation", function (attrs) {
      var activatedItem = attrs.item;

      var activatedGroup = _this.findActivatedGroup(activatedItem);

      var items = _toConsumableArray(_this.state.items);

      switch (activatedItem.type) {
        case 'checkbox':
          activatedItem.isChecked = !activatedItem.isChecked;

          _this.props.onItemActivated({
            item: activatedItem
          });

          _this.setState({
            items: items
          });

          break;

        case 'radio':
          activatedGroup.items.forEach(function (i) {
            if (i === activatedItem) {
              i.isChecked = true; // eslint-disable-line no-param-reassign
            } else {
              i.isChecked = false; // eslint-disable-line no-param-reassign
            }
          });

          _this.props.onItemActivated({
            item: activatedItem
          });

          _this.setState({
            items: items
          });

          break;

        case 'link':
        default:
          _this.props.onItemActivated({
            item: activatedItem
          });

          _this.close();

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpenChange", function (attrs) {
      var _this$props;

      if (_this.state.isOpen === attrs.isOpen) return;

      _this.setState({
        isOpen: attrs.isOpen
      });

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_this$props = _this.props).onOpenChange.apply(_this$props, [attrs].concat(args));
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      var _this$props2;

      if (_this.state.isOpen === false) return;

      _this.setState({
        isOpen: false
      });

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (_this$props2 = _this.props).onOpenChange.apply(_this$props2, [{
        isOpen: false
      }].concat(args));
    });

    return _this;
  }

  _createClass(DropdownMenu, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.items !== this.state.items) {
        this.setState({
          items: _toConsumableArray(nextProps.items)
        });
      }

      if (nextProps.isOpen !== this.props.isOpen) {
        this.setState({
          isOpen: nextProps.isOpen
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isOpen = this.state.isOpen;
      var _this$props3 = this.props,
          appearance = _this$props3.appearance,
          boundariesElement = _this$props3.boundariesElement,
          children = _this$props3.children,
          isLoading = _this$props3.isLoading,
          items = _this$props3.items,
          position = _this$props3.position,
          isMenuFixed = _this$props3.isMenuFixed,
          shouldAllowMultilineItems = _this$props3.shouldAllowMultilineItems,
          shouldFitContainer = _this$props3.shouldFitContainer,
          shouldFlip = _this$props3.shouldFlip,
          trigger = _this$props3.trigger,
          triggerButtonProps = _this$props3.triggerButtonProps,
          triggerType = _this$props3.triggerType,
          onPositioned = _this$props3.onPositioned;
      return React.createElement(StatelessMenu, {
        appearance: appearance,
        boundariesElement: boundariesElement,
        isOpen: isOpen,
        isLoading: isLoading,
        items: items,
        onItemActivated: this.handleItemActivation,
        onOpenChange: this.handleOpenChange,
        position: position,
        isMenuFixed: isMenuFixed,
        shouldAllowMultilineItems: shouldAllowMultilineItems,
        shouldFitContainer: shouldFitContainer,
        shouldFlip: shouldFlip,
        trigger: trigger,
        triggerButtonProps: triggerButtonProps,
        triggerType: triggerType,
        onPositioned: onPositioned
      }, children);
    }
  }]);

  return DropdownMenu;
}(Component);

_defineProperty(DropdownMenu, "defaultProps", {
  appearance: 'default',
  boundariesElement: 'viewport',
  defaultOpen: false,
  isLoading: false,
  isOpen: false,
  items: [],
  onItemActivated: function onItemActivated() {},
  onOpenChange: function onOpenChange() {},
  position: 'bottom left',
  isMenuFixed: false,
  shouldAllowMultilineItems: false,
  shouldFitContainer: false,
  shouldFlip: true,
  triggerType: 'default',
  onPositioned: function onPositioned() {}
});

export { DropdownMenu as default };