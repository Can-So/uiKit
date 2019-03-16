import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import { findDOMNode } from 'react-dom';
import { uid } from 'react-uid';
import { withAnalyticsEvents, createAndFireEvent } from '@findable/analytics-next';
import Button from '@findable/button';
import Droplist, { Item, Group } from '@findable/droplist';
import ExpandIcon from '@findable/icon/glyph/chevron-down';
import { name as packageName, version as packageVersion } from '../version.json';
import DropdownItemFocusManager from './context/DropdownItemFocusManager';
import DropdownItemClickManager from './context/DropdownItemClickManager';
import DropdownItemSelectionCache from './context/DropdownItemSelectionCache';
import WidthConstrainer from '../styled/WidthConstrainer';
import { KEY_DOWN, KEY_SPACE, KEY_ENTER } from '../util/keys';

var DropdownMenuStateless =
/*#__PURE__*/
function (_Component) {
  _inherits(DropdownMenuStateless, _Component);

  function DropdownMenuStateless() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownMenuStateless);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownMenuStateless)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "domItemsList", void 0);

    _defineProperty(_assertThisInitialized(_this), "focusedItem", void 0);

    _defineProperty(_assertThisInitialized(_this), "triggerContainer", void 0);

    _defineProperty(_assertThisInitialized(_this), "sourceOfIsOpen", void 0);

    _defineProperty(_assertThisInitialized(_this), "dropdownListPositioned", false);

    _defineProperty(_assertThisInitialized(_this), "state", {
      id: uid({
        id: _this.constructor.name
      }),
      autoFocusDropdownItems: false
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      if (_this.isUsingDeprecatedAPI()) {
        if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.log('DropdownMenu.items is deprecated. Please switch to the declarative API.');
        }

        if (_this.domItemsList) {
          _this.focusFirstItem();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProp) {
      if (_this.isUsingDeprecatedAPI() && _this.props.isOpen && !prevProp.isOpen) {
        _this.focusFirstItem();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getNextFocusable", function (indexItem, available) {
      if (!_this.domItemsList) {
        return null;
      }

      var currentItem = typeof indexItem !== 'number' ? -1 : indexItem;
      var latestAvailable = typeof available !== 'number' ? currentItem : available;

      if (currentItem < _this.domItemsList.length - 1) {
        currentItem++;

        if (_this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
          return currentItem;
        }

        return _this.getNextFocusable(currentItem, latestAvailable);
      }

      return latestAvailable;
    });

    _defineProperty(_assertThisInitialized(_this), "getPrevFocusable", function (indexItem, available) {
      if (!_this.domItemsList) {
        return null;
      }

      var currentItem = typeof indexItem !== 'number' ? -1 : indexItem;
      var latestAvailable = typeof available !== 'number' ? currentItem : available;

      if (currentItem && currentItem > 0) {
        currentItem--;

        if (_this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
          return currentItem;
        }

        return _this.getPrevFocusable(currentItem, latestAvailable);
      }

      return latestAvailable || currentItem;
    });

    _defineProperty(_assertThisInitialized(_this), "focusFirstItem", function () {
      if (_this.sourceOfIsOpen === 'keydown') {
        _this.focusItem(_this.getNextFocusable());
      }
    });

    _defineProperty(_assertThisInitialized(_this), "focusNextItem", function () {
      _this.focusItem(_this.getNextFocusable(_this.focusedItem));
    });

    _defineProperty(_assertThisInitialized(_this), "focusPreviousItem", function () {
      _this.focusItem(_this.getPrevFocusable(_this.focusedItem));
    });

    _defineProperty(_assertThisInitialized(_this), "focusItem", function (index) {
      if (!_this.domItemsList || !index) {
        return;
      }

      _this.focusedItem = index;

      _this.domItemsList[_this.focusedItem].focus();
    });

    _defineProperty(_assertThisInitialized(_this), "isTargetChildItem", function (target) {
      if (!target) return false;
      var isDroplistItem = target.getAttribute('data-role') === 'droplistItem'; // eslint-disable-next-line react/no-find-dom-node

      var thisDom = findDOMNode(_assertThisInitialized(_this));
      return isDroplistItem && thisDom ? thisDom.contains(target) : false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardInteractionForClosed", function (event) {
      if (_this.props.isOpen) {
        return;
      }

      switch (event.key) {
        case KEY_DOWN:
        case KEY_SPACE:
        case KEY_ENTER:
          event.preventDefault();

          _this.open({
            event: event,
            source: 'keydown'
          });

          break;

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardInteractionsDeprecated", function (event) {
      // KeyboardEvent.target is typed as an EventTarget but we need to access methods on it which
      // are specific to Element. Due limitations of the HTML spec flow doesn't know that an
      // EventTarget can have these methods, so we cast it to Element through Object. This is the
      // safest thing we can do in this situation.
      var target = event.target;

      if (_this.props.isOpen) {
        if (_this.isTargetChildItem(target)) {
          switch (event.key) {
            case 'ArrowUp':
              event.preventDefault();

              _this.focusPreviousItem();

              break;

            case 'ArrowDown':
              event.preventDefault();

              _this.focusNextItem();

              break;

            case 'Tab':
              event.preventDefault();

              _this.close({
                event: event
              });

              break;

            default:
              break;
          }
        } else if (event.key === 'ArrowDown') {
          _this.sourceOfIsOpen = 'keydown';

          _this.focusFirstItem();
        } else if (event.key === 'Tab') {
          _this.close({
            event: event
          });
        }
      } else {
        switch (event.key) {
          case KEY_DOWN:
          case KEY_SPACE:
          case KEY_ENTER:
            event.preventDefault();

            _this.open({
              event: event,
              source: 'keydown'
            });

            break;

          default:
            break;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "domMenuContainer", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleClickDeprecated", function (event) {
      var menuContainer = _this.domMenuContainer; // Casting target to Element. See comment in `handleKeyboardInteractionsDeprecated`.

      var target = event.target;

      if (!menuContainer || menuContainer && !menuContainer.contains(target)) {
        _this.toggle({
          source: 'click',
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isUsingDeprecatedAPI", function () {
      return Boolean(_this.props.items.length);
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      // For any clicks we don't want autofocus
      _this.setState({
        autoFocusDropdownItems: false
      });

      if (_this.isUsingDeprecatedAPI()) {
        _this.handleClickDeprecated(event);

        return;
      }

      var _assertThisInitialize = _assertThisInitialized(_this),
          triggerContainer = _assertThisInitialize.triggerContainer; // Casting target to Element. See comment in `handleKeyboardInteractionsDeprecated`.


      var target = event.target;

      if (triggerContainer && triggerContainer.contains(target) && // $FlowFixMe - disabled is not in Element
      target.disabled !== true) {
        var isOpen = _this.props.isOpen;
        _this.sourceOfIsOpen = 'mouse';

        _this.props.onOpenChange({
          isOpen: !isOpen,
          event: event
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "triggerContent", function () {
      var _this$props = _this.props,
          children = _this$props.children,
          trigger = _this$props.trigger,
          isOpen = _this$props.isOpen,
          triggerButtonProps = _this$props.triggerButtonProps,
          triggerType = _this$props.triggerType;
      var insideTriggerContent = _this.isUsingDeprecatedAPI() ? children : trigger;

      if (triggerType !== 'button') {
        return insideTriggerContent;
      }

      var triggerProps = _objectSpread({}, triggerButtonProps);

      var defaultButtonProps = {
        ariaControls: _this.state.id,
        ariaExpanded: isOpen,
        ariaHaspopup: true,
        isSelected: isOpen
      };

      if (!triggerProps.iconAfter && !triggerProps.iconBefore) {
        triggerProps.iconAfter = React.createElement(ExpandIcon, {
          size: "medium",
          label: ""
        });
      }

      return React.createElement(Button, _extends({}, defaultButtonProps, triggerProps), insideTriggerContent);
    });

    _defineProperty(_assertThisInitialized(_this), "open", function (attrs) {
      _this.sourceOfIsOpen = attrs.source;

      _this.props.onOpenChange({
        isOpen: true,
        event: attrs.event
      }); // Dropdown opened via keyboard gets auto focussed


      _this.setState({
        autoFocusDropdownItems: _this.sourceOfIsOpen === 'keydown'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "close", function (attrs) {
      _this.sourceOfIsOpen = null;

      _this.props.onOpenChange({
        isOpen: false,
        event: attrs.event
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggle", function (attrs) {
      if (attrs.source === 'keydown') return;

      if (_this.props.isOpen) {
        _this.close(attrs);
      } else {
        _this.open(attrs);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleItemClicked", function (event) {
      _this.props.onOpenChange({
        isOpen: false,
        event: event
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderTrigger", function () {
      var triggerContent = _this.triggerContent();

      return _this.isUsingDeprecatedAPI() ? triggerContent : React.createElement("div", {
        ref: function ref(_ref) {
          _this.triggerContainer = _ref;
        }
      }, triggerContent);
    });

    _defineProperty(_assertThisInitialized(_this), "renderItems", function (items) {
      return items.map(function (item, itemIndex) {
        return React.createElement(Item, _extends({}, item, {
          key: itemIndex,
          onActivate: function onActivate(_ref2) {
            var event = _ref2.event;

            _this.props.onItemActivated({
              item: item,
              event: event
            });
          }
        }), item.content);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderGroups", function (groups) {
      return groups.map(function (group, groupIndex) {
        return React.createElement(Group, {
          heading: group.heading,
          elemAfter: group.elemAfter,
          key: groupIndex
        }, _this.renderItems(group.items));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderDeprecated", function () {
      var _this$props2 = _this.props,
          items = _this$props2.items,
          shouldFitContainer = _this$props2.shouldFitContainer;
      var id = _this.state.id;
      return React.createElement("div", {
        id: id,
        ref: function ref(_ref3) {
          _this.domMenuContainer = _ref3;
          _this.domItemsList = _ref3 ? _ref3.querySelectorAll('[data-role="droplistItem"]') : null;
        },
        role: "menu",
        style: shouldFitContainer ? null : {
          maxWidth: 300
        }
      }, _this.renderGroups(items));
    });

    _defineProperty(_assertThisInitialized(_this), "onDroplistPositioned", function () {
      _this.dropdownListPositioned = true; // Trigger render so item focus manager can auto focus for keyboard trigger

      _this.setState({
        autoFocusDropdownItems: _this.sourceOfIsOpen === 'keydown'
      });

      if (_this.props.onPositioned) _this.props.onPositioned();
    });

    _defineProperty(_assertThisInitialized(_this), "renderDropdownItems", function () {
      if (_this.sourceOfIsOpen === 'keydown' && _this.dropdownListPositioned) {
        return React.createElement(DropdownItemFocusManager, {
          autoFocus: _this.state.autoFocusDropdownItems,
          close: _this.close
        }, _this.props.children);
      }

      return React.createElement(Fragment, null, _this.props.children);
    });

    return _this;
  }

  _createClass(DropdownMenuStateless, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          appearance = _this$props3.appearance,
          boundariesElement = _this$props3.boundariesElement,
          isLoading = _this$props3.isLoading,
          isOpen = _this$props3.isOpen,
          onOpenChange = _this$props3.onOpenChange,
          position = _this$props3.position,
          isMenuFixed = _this$props3.isMenuFixed,
          shouldAllowMultilineItems = _this$props3.shouldAllowMultilineItems,
          shouldFitContainer = _this$props3.shouldFitContainer,
          shouldFlip = _this$props3.shouldFlip;
      var id = this.state.id;
      var isDeprecated = this.isUsingDeprecatedAPI();
      var deprecatedProps = isDeprecated ? {
        onKeyDown: this.handleKeyboardInteractionsDeprecated,
        shouldAllowMultilineItems: shouldAllowMultilineItems
      } : {
        onKeyDown: this.handleKeyboardInteractionForClosed
      };
      return React.createElement(DropdownItemSelectionCache, null, React.createElement(Droplist, _extends({
        appearance: appearance,
        boundariesElement: boundariesElement,
        isLoading: isLoading,
        isOpen: isOpen,
        onClick: this.handleClick,
        onOpenChange: onOpenChange,
        position: position,
        isMenuFixed: isMenuFixed,
        shouldFitContainer: shouldFitContainer,
        shouldFlip: shouldFlip,
        trigger: this.renderTrigger(),
        onPositioned: this.onDroplistPositioned
      }, deprecatedProps, {
        analyticsContext: {
          componentName: 'dropdownMenu',
          packageName: packageName,
          packageVersion: packageVersion
        }
      }), isDeprecated ? this.renderDeprecated() : React.createElement(WidthConstrainer, {
        id: id,
        role: "menu",
        shouldFitContainer: shouldFitContainer
      }, React.createElement(DropdownItemClickManager, {
        onItemClicked: this.handleItemClicked
      }, this.renderDropdownItems()))));
    }
  }]);

  return DropdownMenuStateless;
}(Component);

_defineProperty(DropdownMenuStateless, "defaultProps", {
  appearance: 'default',
  boundariesElement: 'viewport',
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

export { DropdownMenuStateless as DropdownMenuStatelessWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsEvents({
  onOpenChange: createAndFireEventOnAtlaskit({
    action: 'toggled',
    actionSubject: 'dropdownMenu',
    attributes: {
      componentName: 'dropdownMenu',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(DropdownMenuStateless);