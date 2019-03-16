import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import { PageWrapper } from './primitives';
import ResizeTransition, { isTransitioning } from '../ResizeTransition';
import { CONTENT_NAV_WIDTH_COLLAPSED, CONTENT_NAV_WIDTH_FLYOUT, GLOBAL_NAV_WIDTH } from '../../../common/constants';

var PageContent =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PageContent, _PureComponent);

  function PageContent() {
    _classCallCheck(this, PageContent);

    return _possibleConstructorReturn(this, _getPrototypeOf(PageContent).apply(this, arguments));
  }

  _createClass(PageContent, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          flyoutIsOpen = _this$props.flyoutIsOpen,
          innerRef = _this$props.innerRef,
          isResizing = _this$props.isResizing,
          isCollapsed = _this$props.isCollapsed,
          productNavWidth = _this$props.productNavWidth,
          onExpandStart = _this$props.onExpandStart,
          onExpandEnd = _this$props.onExpandEnd,
          onCollapseStart = _this$props.onCollapseStart,
          onCollapseEnd = _this$props.onCollapseEnd;
      return React.createElement(ResizeTransition, {
        from: [CONTENT_NAV_WIDTH_COLLAPSED],
        in: !isCollapsed,
        productNavWidth: productNavWidth,
        properties: ['paddingLeft'],
        to: [flyoutIsOpen ? CONTENT_NAV_WIDTH_FLYOUT : productNavWidth],
        userIsDragging: isResizing
        /* Attach expand/collapse callbacks to the page resize transition to ensure they are only
         * called when the nav is permanently expanded/collapsed, i.e. when page content position changes. */
        ,
        onExpandStart: onExpandStart,
        onExpandEnd: onExpandEnd,
        onCollapseStart: onCollapseStart,
        onCollapseEnd: onCollapseEnd
      }, function (_ref) {
        var transitionStyle = _ref.transitionStyle,
            transitionState = _ref.transitionState;
        return React.createElement(PageWrapper, {
          disableInteraction: isResizing || isTransitioning(transitionState),
          innerRef: innerRef,
          offset: GLOBAL_NAV_WIDTH,
          style: transitionStyle
        }, _this.props.children);
      });
    }
  }]);

  return PageContent;
}(PureComponent);

export { PageContent as default };