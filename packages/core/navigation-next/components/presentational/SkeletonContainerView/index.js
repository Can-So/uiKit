import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import Section from '../Section';
import SkeletonContainerHeader from '../SkeletonContainerHeader';
import SkeletonItem from '../SkeletonItem';
import { ProductNavigationTheme, ContainerNavigationTheme } from '../ContentNavigation/primitives';
import { Container, HeaderContainer } from './primitives';

var SkeletonContainerView =
/*#__PURE__*/
function (_Component) {
  _inherits(SkeletonContainerView, _Component);

  function SkeletonContainerView() {
    _classCallCheck(this, SkeletonContainerView);

    return _possibleConstructorReturn(this, _getPrototypeOf(SkeletonContainerView).apply(this, arguments));
  }

  _createClass(SkeletonContainerView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dataset = _this$props.dataset,
          type = _this$props.type,
          props = _objectWithoutProperties(_this$props, ["dataset", "type"]);

      if (!type) {
        return null;
      }

      var Theme = type === 'product' ? ProductNavigationTheme : ContainerNavigationTheme;
      return React.createElement(Theme, null, React.createElement(Container, _extends({}, dataset, props), React.createElement(Section, null, function (_ref) {
        var css = _ref.css;
        return React.createElement(HeaderContainer, {
          styles: css
        }, React.createElement(SkeletonContainerHeader, {
          hasBefore: true
        }));
      }), React.createElement(Section, null, function (_ref2) {
        var className = _ref2.className;
        return React.createElement("div", {
          className: className
        }, React.createElement(SkeletonItem, {
          hasBefore: true
        }), React.createElement(SkeletonItem, {
          hasBefore: true
        }), React.createElement(SkeletonItem, {
          hasBefore: true
        }), React.createElement(SkeletonItem, {
          hasBefore: true
        }), React.createElement(SkeletonItem, {
          hasBefore: true
        }));
      })));
    }
  }]);

  return SkeletonContainerView;
}(Component);

_defineProperty(SkeletonContainerView, "defaultProps", {
  dataset: {
    'data-test-id': 'ContextualNavigationSkeleton'
  }
});

export { SkeletonContainerView as default };