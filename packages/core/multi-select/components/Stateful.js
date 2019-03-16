import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import uuid from 'uuid';
import ExpandIcon from '@findable/icon/glyph/chevron-down';
import MultiSelectStateless from './Stateless';
// =============================================================
// NOTE: Duplicated in ./internal/appearances until docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================
var appearances = {
  values: ['default', 'subtle'],
  default: 'default'
};

var MultiSelect =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MultiSelect, _PureComponent);

  function MultiSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MultiSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MultiSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpen: _this.props.isDefaultOpen,
      selectedItems: _this.props.defaultSelected,
      filterValue: '',
      items: _this.props.items
    });

    _defineProperty(_assertThisInitialized(_this), "selectItem", function (item) {
      var selectedItems = [].concat(_toConsumableArray(_this.state.selectedItems), [item]);

      _this.setState({
        selectedItems: selectedItems
      });

      _this.props.onSelectedChange({
        items: selectedItems,
        action: 'select',
        changed: item
      });
    });

    _defineProperty(_assertThisInitialized(_this), "removeItem", function (item) {
      var selectedItems = _this.state.selectedItems.filter(function (i) {
        return i.value !== item.value;
      });

      _this.setState({
        selectedItems: selectedItems
      });

      _this.props.onSelectedChange({
        items: selectedItems,
        action: 'remove',
        changed: item
      });
    });

    _defineProperty(_assertThisInitialized(_this), "selectedChange", function (item) {
      if (_this.state.selectedItems.some(function (i) {
        return i.value === item.value;
      })) {
        _this.removeItem(item);
      } else {
        _this.selectItem(item);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleFilterChange", function (value) {
      _this.props.onFilterChange(value);

      _this.setState({
        filterValue: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpenChange", function (attrs) {
      if (_this.state.isOpen !== attrs.isOpen) {
        _this.props.onOpenChange(attrs);
      }

      _this.setState({
        isOpen: attrs.isOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleNewItemCreate", function (_ref) {
      var textValue = _ref.value;
      // eslint-disable-line react/no-unused-prop-types
      var _this$state = _this.state,
          items = _this$state.items,
          selectedItems = _this$state.selectedItems;
      var id = uuid();
      var newItem = {
        value: id,
        content: textValue
      };

      var newItemsArray = _toConsumableArray(items);

      newItemsArray[newItemsArray.length - 1].items.push(newItem);

      _this.setState({
        items: newItemsArray,
        selectedItems: [].concat(_toConsumableArray(selectedItems), [newItem]),
        filterValue: ''
      });

      _this.props.onNewItemCreated({
        value: textValue,
        item: newItem
      });
    });

    return _this;
  }

  _createClass(MultiSelect, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.items !== this.state.items) {
        this.setState({
          items: _toConsumableArray(nextProps.items)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          createNewItemLabel = _this$props.createNewItemLabel,
          footer = _this$props.footer,
          id = _this$props.id,
          isDisabled = _this$props.isDisabled,
          isFirstChild = _this$props.isFirstChild,
          isInvalid = _this$props.isInvalid,
          invalidMessage = _this$props.invalidMessage,
          isRequired = _this$props.isRequired,
          label = _this$props.label,
          name = _this$props.name,
          noMatchesFound = _this$props.noMatchesFound,
          placeholder = _this$props.placeholder,
          position = _this$props.position,
          shouldAllowCreateItem = _this$props.shouldAllowCreateItem,
          shouldFitContainer = _this$props.shouldFitContainer,
          shouldFocus = _this$props.shouldFocus,
          shouldFlip = _this$props.shouldFlip,
          icon = _this$props.icon;
      var _this$state2 = this.state,
          filterValue = _this$state2.filterValue,
          isOpen = _this$state2.isOpen,
          items = _this$state2.items,
          selectedItems = _this$state2.selectedItems;
      return React.createElement(MultiSelectStateless, {
        appearance: appearance,
        createNewItemLabel: createNewItemLabel,
        filterValue: filterValue,
        footer: footer,
        id: id,
        isDisabled: isDisabled,
        isFirstChild: isFirstChild,
        isInvalid: isInvalid,
        invalidMessage: invalidMessage,
        isOpen: isOpen,
        isRequired: isRequired,
        items: items,
        label: label,
        name: name,
        noMatchesFound: noMatchesFound,
        onFilterChange: this.handleFilterChange,
        onNewItemCreated: this.handleNewItemCreate,
        onOpenChange: this.handleOpenChange,
        onRemoved: this.selectedChange,
        onSelected: this.selectedChange,
        placeholder: placeholder,
        position: position,
        selectedItems: selectedItems,
        shouldAllowCreateItem: shouldAllowCreateItem,
        shouldFitContainer: shouldFitContainer,
        shouldFocus: shouldFocus,
        shouldFlip: shouldFlip,
        icon: icon
      });
    }
  }]);

  return MultiSelect;
}(PureComponent);

_defineProperty(MultiSelect, "defaultProps", {
  appearance: appearances.default,
  createNewItemLabel: 'New item',
  defaultSelected: [],
  shouldFocus: false,
  shouldFlip: true,
  isRequired: false,
  items: [],
  label: '',
  onFilterChange: function onFilterChange() {},
  onNewItemCreated: function onNewItemCreated() {},
  onOpenChange: function onOpenChange() {},
  onSelectedChange: function onSelectedChange() {},
  position: 'bottom left',
  shouldAllowCreateItem: false,
  icon: React.createElement(ExpandIcon, {
    label: ""
  })
});

export { MultiSelect as default };