import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withAnalyticsEvents, createAndFireEvent } from '@atlaskit/analytics-next';
import AKTooltip from '@atlaskit/tooltip';
import { name as packageName, version as packageVersion } from '../version.json';
import ItemWrapper from '../styled/BreadcrumbsItem';
import Button from '../styled/Button';
import Separator from '../styled/Separator';

var BreadcrumbsItem =
/*#__PURE__*/
function (_Component) {
  _inherits(BreadcrumbsItem, _Component);

  function BreadcrumbsItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, BreadcrumbsItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BreadcrumbsItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "button", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasOverflow: false
    });

    _defineProperty(_assertThisInitialized(_this), "renderButton", function () {
      var _this$props = _this.props,
          href = _this$props.href,
          iconAfter = _this$props.iconAfter,
          iconBefore = _this$props.iconBefore,
          onClick = _this$props.onClick,
          target = _this$props.target,
          text = _this$props.text,
          truncationWidth = _this$props.truncationWidth,
          component = _this$props.component;
      var hasOverflow = _this.state.hasOverflow;
      return React.createElement(Button, {
        truncationWidth: truncationWidth,
        appearance: "subtle-link",
        iconAfter: truncationWidth && hasOverflow ? null : iconAfter,
        iconBefore: truncationWidth && hasOverflow ? null : iconBefore,
        onClick: onClick,
        spacing: "none",
        href: href,
        target: target,
        ref: function ref(el) {
          _this.button = el;
        },
        component: component,
        analyticsContext: {
          componentName: 'breadcrumbsItem',
          packageName: packageName,
          packageVersion: packageVersion
        }
      }, text);
    });

    _defineProperty(_assertThisInitialized(_this), "renderButtonWithTooltip", function () {
      return React.createElement(AKTooltip, {
        content: _this.props.text,
        position: "bottom"
      }, _this.renderButton());
    });

    return _this;
  }

  _createClass(BreadcrumbsItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateOverflow();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      // Reset the state
      this.setState({
        hasOverflow: false
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateOverflow();
    }
  }, {
    key: "updateOverflow",
    value: function updateOverflow() {
      var truncationWidth = this.props.truncationWidth;
      var button = this.button;

      if (truncationWidth && button) {
        // We need to find the DOM node for the button component in order to measure its size.
        var el = ReactDOM.findDOMNode(button); // eslint-disable-line react/no-find-dom-node

        if (!el || !(el instanceof HTMLElement)) {
          // eslint-disable-next-line no-console
          console.warn('Could not find button included in breadcrumb when calculating overflow');
          return false;
        }

        var overflow = el.clientWidth >= truncationWidth;

        if (overflow !== this.state.hasOverflow) {
          this.setState({
            hasOverflow: overflow
          });
        }

        return overflow;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          hasSeparator = _this$props2.hasSeparator,
          truncationWidth = _this$props2.truncationWidth;
      var hasOverflow = this.state.hasOverflow;
      return React.createElement(ItemWrapper, null, hasOverflow && truncationWidth ? this.renderButtonWithTooltip() : this.renderButton(), hasSeparator ? React.createElement(Separator, null, "/") : null);
    }
  }]);

  return BreadcrumbsItem;
}(Component);

_defineProperty(BreadcrumbsItem, "defaultProps", {
  component: '',
  hasSeparator: false,
  href: '#',
  truncationWidth: 0,
  onClick: function onClick() {},
  target: ''
});

export { BreadcrumbsItem as BreadcrumbsItemWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsEvents({
  onClick: createAndFireEventOnAtlaskit({
    action: 'clicked',
    actionSubject: 'breadcrumbsItem',
    attributes: {
      componentName: 'breadcrumbsItem',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(BreadcrumbsItem);