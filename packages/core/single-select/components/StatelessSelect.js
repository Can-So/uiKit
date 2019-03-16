import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import Droplist, { Item, Group } from '@findable/droplist';
import FieldBase, { Label } from '@findable/field-base';
import ExpandIcon from '@findable/icon/glyph/chevron-down';
import Spinner from '@findable/spinner';
import { mapAppearanceToFieldBase } from './appearances';
import { AutocompleteWrapper, AutocompleteInput } from '../styled/Autocomplete';
import Content from '../styled/Content';
import ElemBefore from '../styled/ElemBefore';
import Expand from '../styled/Expand';
import InitialLoading from './InitialLoading';
import NothingWasFound from './NothingWasFound';
import Placeholder from '../styled/Placeholder';
import StatelessSelectWrapper from '../styled/StatelessSelectWrapper';
import Trigger from '../styled/Trigger';
// =============================================================
// NOTE: Duplicated in ./internal/appearances until docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================
var appearances = {
  values: ['default', 'subtle'],
  default: 'default'
};
export var getTextContent = function getTextContent(item) {
  if (!item || Object.keys(item).length === 0) {
    return '';
  }

  if (typeof item.content === 'string') {
    return item.content;
  }

  if (!item.label && process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('SingleSelect: item.label must be set when item.content is JSX');
  }

  return item.label || '';
};

var isMatched = function isMatched(item, matchingValue) {
  var filterValues = item.filterValues;

  if (filterValues && filterValues.length > 0) {
    return filterValues.some(function (value) {
      return value.toLowerCase().indexOf(matchingValue) > -1;
    });
  }

  return getTextContent(item).toLowerCase().indexOf(matchingValue) > -1;
};

var StatelessSelect =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(StatelessSelect, _PureComponent);

  function StatelessSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StatelessSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StatelessSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "containerNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "triggerNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "inputNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "droplistNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "nativeSearchKey", void 0);

    _defineProperty(_assertThisInitialized(_this), "previousKey", void 0);

    _defineProperty(_assertThisInitialized(_this), "nativeSearchCounter", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      focusedItemIndex: undefined,
      droplistWidth: undefined
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      if (_this.props.isOpen || _this.props.shouldFocus) {
        _this.focus();
      }

      if (!_this.props.droplistShouldFitContainer && _this.droplistNode) {
        _this.setDroplistMinWidth();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      if (!prevProps.shouldFocus && _this.props.shouldFocus || !prevProps.isOpen && _this.props.isOpen) {
        _this.focus();
      }

      if (!_this.props.droplistShouldFitContainer && _this.droplistNode) {
        _this.setDroplistMinWidth();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onOpenChange", function (attrs) {
      _this.props.onOpenChange(attrs);

      _this.setState({
        focusedItemIndex: undefined
      });

      if (attrs.isOpen) {
        _this.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getNextFocusable", function (indexItem, length) {
      var currentItem = indexItem;

      if (currentItem === undefined) {
        currentItem = 0;
      } else if (currentItem < length) {
        currentItem++;
      } else {
        currentItem = 0;
      }

      return currentItem;
    });

    _defineProperty(_assertThisInitialized(_this), "getPrevFocusable", function (indexItem, length) {
      var currentItem = indexItem;

      if (currentItem && currentItem > 0) {
        currentItem--;
      } else {
        currentItem = length;
      }

      return currentItem;
    });

    _defineProperty(_assertThisInitialized(_this), "getAllItems", function (groups) {
      var allItems = [];
      groups.forEach(function (val) {
        allItems = allItems.concat(val.items);
      });
      return allItems;
    });

    _defineProperty(_assertThisInitialized(_this), "getAllVisibleItems", function (groups) {
      return groups ? _this.filterItems(_this.getAllItems(groups)) : [];
    });

    _defineProperty(_assertThisInitialized(_this), "getNextNativeSearchItem", function (items, key, currentIndex, isSecondStep) {
      var result;
      var res = items.find(function (item, index) {
        var content = getTextContent(item).toLowerCase();

        if (index <= currentIndex) {
          return false;
        }

        return content && content.indexOf(key.toLowerCase()) === 0;
      });

      if (res) {
        result = res;
      } else if (!res && !isSecondStep) {
        result = _this.getNextNativeSearchItem(items, key, -1, true);
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "setDroplistMinWidth", function () {
      var width = _this.triggerNode ? _this.triggerNode.getBoundingClientRect().width : undefined;

      _this.setState({
        droplistWidth: width
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getItemTrueIndex", function (itemIndex) {
      var groupIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return itemIndex + _this.props.items.filter(function (group, thisGroupIndex) {
        return thisGroupIndex < groupIndex;
      }).reduce(function (totalItems, group) {
        return totalItems + group.items.length;
      }, 0);
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      if (_this.inputNode) {
        _this.inputNode.focus();
      } else if (_this.triggerNode) {
        _this.triggerNode.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "clearNativeSearch", function () {
      _this.nativeSearchKey = '';
      _this.nativeSearchCounter = undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "filterItems", function (items) {
      var value = _this.props.filterValue;
      var trimmedValue = value && value.toLowerCase().trim();
      var selectedItem = _this.props.selectedItem;
      var unselectedItems = items.filter(function (item) {
        return selectedItem && selectedItem.value !== item.value;
      });
      var selectedItemContent = getTextContent(selectedItem).toLowerCase();
      return trimmedValue && trimmedValue !== selectedItemContent ? unselectedItems.filter(function (item) {
        return isMatched(item, trimmedValue);
      }) : unselectedItems;
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToFocused", function (index) {
      var scrollable = _this.containerNode ? _this.containerNode.querySelector('[data-role="droplistContent"]') : undefined;
      var item;

      if (scrollable && index !== undefined) {
        item = scrollable.querySelectorAll('[data-role="droplistItem"]')[index];
      }

      if (item && scrollable) {
        scrollable.scrollTop = item.offsetTop - scrollable.clientHeight + item.clientHeight;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "focusNextItem", function () {
      var filteredItems = _this.getAllVisibleItems(_this.props.items);

      var length = filteredItems.length - 1;

      var index = _this.getNextFocusable(_this.state.focusedItemIndex, length);

      _this.setState({
        focusedItemIndex: index
      });

      _this.scrollToFocused(index);
    });

    _defineProperty(_assertThisInitialized(_this), "focusPreviousItem", function () {
      var filteredItems = _this.getAllVisibleItems(_this.props.items);

      var length = filteredItems.length - 1;

      var index = _this.getPrevFocusable(_this.state.focusedItemIndex, length);

      _this.setState({
        focusedItemIndex: index
      });

      _this.scrollToFocused(index);
    });

    _defineProperty(_assertThisInitialized(_this), "focusItem", function (item) {
      var filteredItems = _this.getAllVisibleItems(_this.props.items);

      var index = filteredItems.indexOf(item);

      _this.setState({
        focusedItemIndex: index
      });

      _this.scrollToFocused(index);
    });

    _defineProperty(_assertThisInitialized(_this), "handleNativeSearch", function (event) {
      var _this$props = _this.props,
          selectedItem = _this$props.selectedItem,
          items = _this$props.items;
      var eventKey = event.key;

      var _assertThisInitialize = _assertThisInitialized(_this),
          nativeSearchKey = _assertThisInitialize.nativeSearchKey;

      var allItems = _this.getAllItems(items);

      if (!_this.nativeSearchCounter) {
        nativeSearchKey = eventKey;
      } else {
        nativeSearchKey += eventKey;
      }

      var current = _this.state.focusedItemIndex !== undefined ? _this.state.focusedItemIndex : allItems.indexOf(selectedItem);
      var allItemsWithoutSelected = selectedItem && selectedItem.value ? allItems.filter(function (item) {
        return item.value !== selectedItem.value;
      }) : allItems;

      if (!_this.props.isOpen) {
        var matchingItem = _this.getNextNativeSearchItem(allItems, nativeSearchKey, current);

        _this.handleItemSelect(matchingItem, {
          event: event
        });
      } else {
        var _matchingItem = _this.getNextNativeSearchItem(allItemsWithoutSelected, nativeSearchKey, current);

        _this.focusItem(_matchingItem);
      }

      if (_this.nativeSearchCounter) {
        clearTimeout(_this.nativeSearchCounter);
      }

      _this.nativeSearchCounter = setTimeout(_this.clearNativeSearch, 200);
      _this.previousKey = eventKey;
      _this.nativeSearchKey = nativeSearchKey;
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardInteractions", function (event) {
      var isSelectOpen = _this.props.isOpen;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();

          if (!isSelectOpen) {
            _this.onOpenChange({
              event: event,
              isOpen: true
            });
          }

          _this.focusNextItem();

          break;

        case 'ArrowUp':
          event.preventDefault();

          if (isSelectOpen) {
            _this.focusPreviousItem();
          }

          break;

        case 'Enter':
          if (isSelectOpen) {
            event.preventDefault();

            var visibleItems = _this.getAllVisibleItems(_this.props.items);

            if (_this.state.focusedItemIndex !== undefined) {
              _this.handleItemSelect(visibleItems.length ? visibleItems[_this.state.focusedItemIndex] : undefined, {
                event: event
              });
            }
          }

          break;

        default:
          if (!_this.props.hasAutocomplete) {
            _this.handleNativeSearch(event);
          }

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputOnChange", function (event) {
      var value = event.currentTarget.value;

      if (value !== _this.props.filterValue) {
        _this.props.onFilterChange(value);

        _this.onOpenChange({
          event: event,
          isOpen: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleTriggerClick", function (event) {
      if (!_this.props.isDisabled) {
        _this.onOpenChange({
          event: event,
          isOpen: !_this.props.isOpen
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnBlur", function (event) {
      _this.onOpenChange({
        event: event,
        isOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemSelect", function (item, attrs) {
      if (item && !item.isDisabled) {
        _this.props.onOpenChange({
          isOpen: false,
          event: attrs.event
        });

        _this.props.onSelected(item);

        _this.props.onFilterChange(getTextContent(item));

        _this.setState({
          focusedItemIndex: undefined
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderItems", function (items) {
      var groupIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var filteredItems = _this.filterItems(items);

      if (filteredItems.length) {
        return filteredItems.map(function (item, itemIndex) {
          return React.createElement(Item, _extends({}, item, {
            isFocused: _this.getItemTrueIndex(itemIndex, groupIndex) === _this.state.focusedItemIndex,
            key: itemIndex // eslint-disable-line react/no-array-index-key
            ,
            onActivate: function onActivate(attrs) {
              _this.handleItemSelect(item, attrs);
            },
            type: "option"
          }), item.content);
        });
      }

      return React.createElement(NothingWasFound, {
        noMatchesFound: _this.props.noMatchesFound
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderGroups", function (groups) {
      if (_this.props.isLoading) {
        return React.createElement(InitialLoading, null, _this.props.loadingMessage);
      }

      var filteredGroups = groups.filter(function (group) {
        return _this.filterItems(group.items).length;
      }).map(function (group, groupIndex) {
        return React.createElement(Group, {
          heading: group.heading,
          key: groupIndex // eslint-disable-line react/no-array-index-key

        }, _this.renderItems(group.items, groupIndex));
      });

      if (filteredGroups.length === 0) {
        return React.createElement(NothingWasFound, {
          noMatchesFound: _this.props.noMatchesFound
        });
      }

      return filteredGroups;
    });

    _defineProperty(_assertThisInitialized(_this), "renderOptions", function (items) {
      return items.map(function (item, itemIndex) {
        return React.createElement("option", {
          disabled: item.isDisabled,
          key: itemIndex // eslint-disable-line react/no-array-index-key
          ,
          value: item.value
        }, getTextContent(item));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderOptGroups", function (groups) {
      return groups.map(function (group, groupIndex) {
        return React.createElement("optgroup", {
          label: group.heading,
          key: groupIndex // eslint-disable-line react/no-array-index-key

        }, _this.renderOptions(group.items));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelect", function () {
      return React.createElement("select", {
        disabled: _this.props.isDisabled,
        id: _this.props.id,
        name: _this.props.name,
        readOnly: true,
        required: _this.props.isRequired,
        style: {
          display: 'none'
        },
        value: _this.props.selectedItem ? _this.props.selectedItem.value : undefined
      }, React.createElement("option", {
        value: ""
      }), _this.renderOptGroups(_this.props.items));
    });

    return _this;
  }

  _createClass(StatelessSelect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          appearance = _this$props2.appearance,
          droplistShouldFitContainer = _this$props2.droplistShouldFitContainer,
          filterValue = _this$props2.filterValue,
          hasAutocomplete = _this$props2.hasAutocomplete,
          id = _this$props2.id,
          invalidMessage = _this$props2.invalidMessage,
          isDisabled = _this$props2.isDisabled,
          isFirstChild = _this$props2.isFirstChild,
          isInvalid = _this$props2.isInvalid,
          isLoading = _this$props2.isLoading,
          isOpen = _this$props2.isOpen,
          isRequired = _this$props2.isRequired,
          items = _this$props2.items,
          label = _this$props2.label,
          placeholder = _this$props2.placeholder,
          position = _this$props2.position,
          selectedItem = _this$props2.selectedItem,
          shouldFitContainer = _this$props2.shouldFitContainer,
          shouldFlip = _this$props2.shouldFlip,
          maxHeight = _this$props2.maxHeight; // disabled because all of the accessibility is handled manually

      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return React.createElement(StatelessSelectWrapper, {
        onKeyDown: this.handleKeyboardInteractions,
        innerRef: function innerRef(ref) {
          _this2.containerNode = ref;
        },
        shouldFitContainer: shouldFitContainer
      }, this.renderSelect(), label ? React.createElement(Label, {
        htmlFor: id,
        isFirstChild: isFirstChild,
        isRequired: isRequired,
        label: label
      }) : null, React.createElement(Droplist, {
        isKeyboardInteractionDisabled: true,
        isOpen: isOpen,
        isTriggerDisabled: true,
        isTriggerNotTabbable: true,
        onOpenChange: this.onOpenChange,
        position: position,
        shouldFitContainer: droplistShouldFitContainer,
        shouldFlip: shouldFlip,
        maxHeight: maxHeight,
        trigger: React.createElement(FieldBase, {
          appearance: mapAppearanceToFieldBase(appearance),
          isDisabled: isDisabled,
          isFitContainerWidthEnabled: true,
          isInvalid: isInvalid,
          invalidMessage: invalidMessage,
          isPaddingDisabled: true,
          onBlur: this.handleOnBlur
        }, React.createElement(Trigger, {
          onClick: this.handleTriggerClick,
          tabIndex: !isDisabled && !hasAutocomplete ? '0' : null,
          innerRef: function innerRef(ref) {
            _this2.triggerNode = ref;
          }
        }, !hasAutocomplete || isDisabled ? React.createElement(Content, null, selectedItem && selectedItem.elemBefore ? React.createElement(ElemBefore, null, selectedItem.elemBefore) : null, selectedItem && selectedItem.content ? React.createElement("span", null, getTextContent(selectedItem)) : React.createElement(Placeholder, null, placeholder)) : React.createElement(AutocompleteWrapper, null, React.createElement(AutocompleteInput, {
          autoComplete: "off",
          onChange: this.handleInputOnChange,
          placeholder: placeholder,
          innerRef: function innerRef(ref) {
            _this2.inputNode = ref;
          },
          type: "text",
          value: filterValue,
          disabled: isDisabled
        })), React.createElement(Expand, null, isOpen && isLoading ? React.createElement(Spinner, null) : React.createElement(ExpandIcon, {
          label: ""
        }))))
      }, React.createElement("div", {
        ref: function ref(_ref) {
          _this2.droplistNode = _ref;
        },
        style: {
          minWidth: this.state.droplistWidth
        }
      }, this.renderGroups(items))));
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
  }]);

  return StatelessSelect;
}(PureComponent);

_defineProperty(StatelessSelect, "defaultProps", {
  appearance: appearances.default,
  droplistShouldFitContainer: true,
  filterValue: '',
  hasAutocomplete: false,
  isLoading: false,
  isOpen: false,
  isRequired: false,
  items: [],
  label: '',
  loadingMessage: 'Receiving information',
  noMatchesFound: 'No matches found',
  onFilterChange: function onFilterChange() {},
  onSelected: function onSelected() {},
  onOpenChange: function onOpenChange() {},
  placeholder: '',
  position: 'bottom left',
  shouldFocus: false,
  selectedItem: {},
  shouldFlip: true
});

export { StatelessSelect as default };