import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Nav, NavLine, NavWrapper } from '../styled';

var TabsNavigation =
/*#__PURE__*/
function (_Component) {
  _inherits(TabsNavigation, _Component);

  function TabsNavigation() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TabsNavigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TabsNavigation)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "elementRefs", []);

    _defineProperty(_assertThisInitialized(_this), "tabKeyDownHandler", function (e) {
      if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) {
        return;
      }

      var _this$props = _this.props,
          selected = _this$props.selected,
          tabs = _this$props.tabs;
      var modifier = e.key === 'ArrowRight' ? 1 : -1;
      var newselectedIndex = tabs.indexOf(selected) + modifier;

      if (newselectedIndex < 0 || newselectedIndex >= tabs.length) {
        return;
      }

      _this.onSelect(tabs[newselectedIndex], newselectedIndex);

      _this.elementRefs[newselectedIndex].focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (selected, selectedIndex) {
      _this.props.onSelect(selected, selectedIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "tabMouseDownHandler", function (e) {
      return e.preventDefault();
    });

    return _this;
  }

  _createClass(TabsNavigation, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (newProps.tabs !== this.props.tabs) {
        this.elementRefs = [];
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          selected = _this$props2.selected,
          Item = _this$props2.component,
          tabs = _this$props2.tabs;
      return React.createElement(NavWrapper, null, React.createElement(NavLine, {
        status: "normal"
      }), React.createElement(Nav, {
        role: "tablist"
      }, tabs.map(function (tab, index) {
        var isSelected = tab === selected;
        var elementProps = {
          'aria-posinset': index + 1,
          'aria-selected': isSelected,
          'aria-setsize': tabs.length,
          onClick: function onClick() {
            return _this2.onSelect(tab, index);
          },
          onKeyDown: _this2.tabKeyDownHandler,
          onMouseDown: _this2.tabMouseDownHandler,
          role: 'tab',
          tabIndex: isSelected ? 0 : -1
        };

        var innerRef = function innerRef(ref) {
          _this2.elementRefs[index] = ref;
        };

        var itemProps = {
          elementProps: elementProps,
          innerRef: innerRef,
          data: tab,
          isSelected: isSelected
        }; // eslint-disable-next-line react/no-array-index-key

        return React.createElement(Item, _extends({
          key: index
        }, itemProps));
      })));
    }
  }]);

  return TabsNavigation;
}(Component);

export { TabsNavigation as default };