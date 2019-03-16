import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Children, Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import { name as packageName, version as packageVersion } from '../version.json';
import EllipsisItem from './EllipsisItem';
import Container from '../styled/BreadcrumbsContainer';
var defaultMaxItems = 8;
var toArray = Children.toArray;

var BreadcrumbsStateless =
/*#__PURE__*/
function (_Component) {
  _inherits(BreadcrumbsStateless, _Component);

  function BreadcrumbsStateless() {
    _classCallCheck(this, BreadcrumbsStateless);

    return _possibleConstructorReturn(this, _getPrototypeOf(BreadcrumbsStateless).apply(this, arguments));
  }

  _createClass(BreadcrumbsStateless, [{
    key: "renderAllItems",
    value: function renderAllItems() {
      var allNonEmptyItems = toArray(this.props.children);
      return allNonEmptyItems.map(function (child, index) {
        return React.cloneElement(child, {
          hasSeparator: index < allNonEmptyItems.length - 1
        });
      });
    }
  }, {
    key: "renderItemsBeforeAndAfter",
    value: function renderItemsBeforeAndAfter() {
      var _this$props = this.props,
          itemsBeforeCollapse = _this$props.itemsBeforeCollapse,
          itemsAfterCollapse = _this$props.itemsAfterCollapse;
      var allItems = this.renderAllItems(); // This defends against someone passing weird data, to ensure that if all
      // items would be shown anyway, we just show all items without the EllipsisItem

      if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
        return allItems;
      }

      var beforeItems = allItems.slice(0, itemsBeforeCollapse);
      var afterItems = allItems.slice(allItems.length - itemsAfterCollapse, allItems.length);
      return [].concat(_toConsumableArray(beforeItems), [React.createElement(EllipsisItem, {
        hasSeparator: itemsAfterCollapse > 0,
        key: "ellipsis",
        onClick: this.props.onExpand
      })], _toConsumableArray(afterItems));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          isExpanded = _this$props2.isExpanded,
          maxItems = _this$props2.maxItems;
      if (!children) return React.createElement(Container, null);
      return React.createElement(Container, null, isExpanded || maxItems && toArray(children).length <= maxItems ? this.renderAllItems() : this.renderItemsBeforeAndAfter());
    }
  }]);

  return BreadcrumbsStateless;
}(Component);

_defineProperty(BreadcrumbsStateless, "defaultProps", {
  isExpanded: false,
  children: null,
  maxItems: defaultMaxItems,
  itemsBeforeCollapse: 1,
  itemsAfterCollapse: 1
});

export { BreadcrumbsStateless as BreadcrumbsStatelessWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'breadcrumbs',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onExpand: createAndFireEventOnAtlaskit({
    action: 'expanded',
    actionSubject: 'breadcrumbs',
    attributes: {
      componentName: 'breadcrumbs',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(BreadcrumbsStateless));