import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import { name as packageName, version as packageVersion } from '../version.json';
import TabsNavigation from './TabsNavigation';
import DefaultTabContent from './TabContent';
import DefaultTabItem from './TabItem';
import { Tabs as StyledTabs } from '../styled';

var defaultIsSelectedTestNumber = function defaultIsSelectedTestNumber(selectedIndex, tab, tabIndex) {
  return selectedIndex === tabIndex;
};

var defaultIsSelectedTestObject = function defaultIsSelectedTestObject(selected, tab) {
  return selected === tab;
};

var defaultComponents = {
  Content: DefaultTabContent,
  Item: DefaultTabItem
};

var Tabs =
/*#__PURE__*/
function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "resolveSelected", function (selected, newProps) {
      var _ref = newProps || _this.props,
          tabs = _ref.tabs,
          isSelectedTest = _ref.isSelectedTest;

      var testFunction = function () {
        if (isSelectedTest) {
          return isSelectedTest;
        }

        if (typeof selected === 'number') {
          return defaultIsSelectedTestNumber;
        }

        return defaultIsSelectedTestObject;
      }();

      return tabs.find(function (tab, tabIndex) {
        return testFunction(selected, tab, tabIndex);
      }) || tabs[0];
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (newselected, newSelectedIndex) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          selected = _this$props.selected;

      if (typeof onSelect === 'function') {
        onSelect(newselected, newSelectedIndex);
      }

      if (typeof selected === 'undefined') {
        _this.setState({
          selected: newselected
        });
      }
    });

    var initiallyselected = _this.props.selected || _this.props.defaultSelected || _this.props.tabs[0];

    var _selected = _this.resolveSelected(initiallyselected);

    _this.state = {
      selected: _selected
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (typeof newProps.selected !== 'undefined' && newProps.selected !== this.state.selected) {
        var selected = this.resolveSelected(newProps.selected, newProps);
        this.setState({
          selected: selected
        });
      } else if (newProps.tabs !== this.props.tabs) {
        var updatedselected = this.resolveSelected(this.state.selected, newProps);
        this.setState({
          selected: updatedselected
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          components = _this$props2.components,
          tabs = _this$props2.tabs;
      var selected = this.state.selected;

      var _defaultComponents$co = _objectSpread({}, defaultComponents, components),
          Content = _defaultComponents$co.Content,
          Item = _defaultComponents$co.Item;

      var contentProps = {
        data: selected,
        elementProps: {
          role: 'tabpanel'
        }
      };
      return React.createElement(StyledTabs, null, React.createElement(TabsNavigation, {
        component: Item,
        onSelect: this.onSelect,
        selected: selected,
        tabs: tabs
      }), React.createElement(Content, contentProps));
    }
  }]);

  return Tabs;
}(Component);

_defineProperty(Tabs, "defaultProps", {
  components: {}
});

export { Tabs as TabsWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'tabs',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onSelect: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'tab',
    attributes: {
      componentName: 'tabs',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Tabs));