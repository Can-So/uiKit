import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component, Fragment } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import PageComponent from './Page';
import { LeftNavigator, RightNavigator } from './Navigators';
import renderDefaultEllipsis from './renderEllipsis';
import collapseRangeHelper from '../util/collapseRange';
import { name as packageName, version as packageVersion } from '../version.json';

var Pagination =
/*#__PURE__*/
function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Pagination)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      selectedIndex: _this.props.defaultSelectedIndex
    });

    _defineProperty(_assertThisInitialized(_this), "createAndFireEventOnAtlaskit", createAndFireEvent('atlaskit'));

    _defineProperty(_assertThisInitialized(_this), "onChangeAnalyticsCaller", function () {
      var createAnalyticsEvent = _this.props.createAnalyticsEvent;

      if (createAnalyticsEvent) {
        return _this.createAndFireEventOnAtlaskit({
          action: 'changed',
          actionSubject: 'pageNumber',
          attributes: {
            componentName: 'pagination',
            packageName: packageName,
            packageVersion: packageVersion
          }
        })(createAnalyticsEvent);
      }

      return undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event, newSelectedPage) {
      if (_this.props.selectedIndex === undefined) {
        _this.setState({
          selectedIndex: newSelectedPage
        });
      }

      var analyticsEvent = _this.onChangeAnalyticsCaller();

      if (_this.props.onChange) {
        _this.props.onChange(event, _this.props.pages[newSelectedPage], analyticsEvent);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "pagesToComponents", function (pages) {
      var selectedIndex = _this.state.selectedIndex;
      var _this$props = _this.props,
          components = _this$props.components,
          getPageLabel = _this$props.getPageLabel;
      return pages.map(function (page, index) {
        return React.createElement(PageComponent, {
          key: "page-".concat(getPageLabel ? getPageLabel(page, index) : index),
          component: components.Page,
          onClick: function onClick(event) {
            return _this.onChange(event, index);
          },
          isSelected: selectedIndex === index,
          page: page
        }, getPageLabel ? getPageLabel(page, index) : page);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderPages", function () {
      var selectedIndex = _this.state.selectedIndex;
      var _this$props2 = _this.props,
          pages = _this$props2.pages,
          max = _this$props2.max,
          collapseRange = _this$props2.collapseRange,
          renderEllipsis = _this$props2.renderEllipsis;

      var pagesComponents = _this.pagesToComponents(pages);

      return collapseRange(pagesComponents, selectedIndex, {
        max: max,
        ellipsis: renderEllipsis
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderLeftNavigator", function () {
      var _this$props3 = _this.props,
          components = _this$props3.components,
          pages = _this$props3.pages,
          i18n = _this$props3.i18n;
      var selectedIndex = _this.state.selectedIndex;
      var props = {
        ariaLabel: i18n.prev,
        pages: pages,
        selectedIndex: selectedIndex
      };
      return React.createElement(LeftNavigator, _extends({
        key: "left-navigator",
        component: components.Previous,
        onClick: function onClick(event) {
          return _this.onChange(event, selectedIndex - 1);
        },
        isDisabled: selectedIndex === 0
      }, props));
    });

    _defineProperty(_assertThisInitialized(_this), "renderRightNavigator", function () {
      var _this$props4 = _this.props,
          components = _this$props4.components,
          pages = _this$props4.pages,
          i18n = _this$props4.i18n;
      var selectedIndex = _this.state.selectedIndex;
      var props = {
        ariaLabel: i18n.next,
        selectedIndex: selectedIndex,
        pages: pages
      };
      return React.createElement(RightNavigator, _extends({
        key: "right-navigator",
        component: components.Next,
        onClick: function onClick(event) {
          return _this.onChange(event, selectedIndex + 1);
        },
        isDisabled: selectedIndex === pages.length - 1
      }, props));
    });

    return _this;
  }

  _createClass(Pagination, [{
    key: "render",
    value: function render() {
      var innerStyles = this.props.innerStyles;
      return React.createElement("div", {
        style: _objectSpread({
          display: 'flex'
        }, innerStyles)
      }, React.createElement(Fragment, null, this.renderLeftNavigator(), this.renderPages(), this.renderRightNavigator()));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      // selectedIndex is controlled
      if (props.selectedIndex != null) {
        return {
          selectedIndex: props.selectedIndex
        };
      }

      return null;
    }
  }]);

  return Pagination;
}(Component);

_defineProperty(Pagination, "defaultProps", {
  components: {},
  renderEllipsis: renderDefaultEllipsis,
  i18n: {
    prev: 'previous',
    next: 'next'
  },
  onChange: function onChange() {},
  defaultSelectedIndex: 0,
  max: 7,
  collapseRange: collapseRangeHelper,
  innerStyles: {}
});

export default withAnalyticsContext({
  componentName: 'pagination',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents()(Pagination));