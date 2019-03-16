import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import GlobalItemInner, { globalItemStyles } from '../styled/GlobalItemInner';
import DefaultLinkComponent from './DefaultLinkComponent';
import { withGlobalItemAnalytics } from '../../utils/analytics';

var GlobalItem =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GlobalItem, _PureComponent);

  function GlobalItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GlobalItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GlobalItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      if (event.key === 'Enter' && _this.props.onClick) {
        _this.props.onClick(event);
      }
    });

    return _this;
  }

  _createClass(GlobalItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          href = _this$props.href,
          CustomComponent = _this$props.linkComponent,
          isSelected = _this$props.isSelected,
          size = _this$props.size,
          ariaHasPopup = _this$props['aria-haspopup'],
          onClick = _this$props.onClick,
          providedMouseDown = _this$props.onMouseDown,
          role = _this$props.role,
          appearance = _this$props.appearance;
      var allyAndEventProps = {
        'aria-haspopup': ariaHasPopup,
        onClick: onClick,
        role: role,
        onKeyDown: this.handleKeyDown
      };
      var hoverOverrideStyles = href ? '&:hover { color: inherit; }' : '';

      if (CustomComponent) {
        var StyledComponent = styled(CustomComponent).withConfig({
          displayName: "GlobalItem__StyledComponent",
          componentId: "c8gzf3-0"
        })(["\n        ", ";\n        ", ";\n      "], globalItemStyles, hoverOverrideStyles);
        return React.createElement(StyledComponent, _extends({
          appearance: appearance,
          href: href,
          isSelected: isSelected,
          onMouseDown: providedMouseDown,
          size: size
        }, allyAndEventProps), children);
      }

      if (href) {
        var StyledLink = styled(DefaultLinkComponent).withConfig({
          displayName: "GlobalItem__StyledLink",
          componentId: "c8gzf3-1"
        })(["\n        ", ";\n        ", ";\n      "], globalItemStyles, hoverOverrideStyles);
        return React.createElement(StyledLink, _extends({
          href: href,
          size: size,
          onMouseDown: providedMouseDown,
          appearance: appearance
        }, allyAndEventProps), children);
      }

      var onMouseDown = function onMouseDown(e) {
        providedMouseDown(e);
        e.preventDefault();
      };

      return React.createElement(GlobalItemInner, _extends({
        type: "button",
        isSelected: isSelected,
        onMouseDown: onMouseDown,
        size: size,
        appearance: appearance
      }, allyAndEventProps), children);
    }
  }]);

  return GlobalItem;
}(PureComponent);

_defineProperty(GlobalItem, "defaultProps", {
  onMouseDown: function onMouseDown() {},
  size: 'small',
  appearance: 'round'
});

export { GlobalItem as GlobalItemBase };
export default withGlobalItemAnalytics(GlobalItem);