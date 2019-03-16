import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { css as _css2 } from "emotion";
import { css as _css } from "emotion";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Fragment, Component } from 'react';
import { css } from 'emotion';
import Tooltip from '@atlaskit/tooltip';
import { styleReducerNoOp, withGlobalTheme } from '../../../theme';
var _ref = {
  pointerEvents: 'none'
};
var _ref2 = {
  display: 'inline-block'
};

var GlobalNavigationItemPrimitive =
/*#__PURE__*/
function (_Component) {
  _inherits(GlobalNavigationItemPrimitive, _Component);

  function GlobalNavigationItemPrimitive() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GlobalNavigationItemPrimitive);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GlobalNavigationItemPrimitive)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "renderIconAndBadge", function (badgeWrapper) {
      var _this$props = _this.props,
          Icon = _this$props.icon,
          Badge = _this$props.badge,
          label = _this$props.label,
          tooltip = _this$props.tooltip;

      var presentationProps = _this.getPresentationProps();

      if (!Icon && !Badge) return null;
      var iconLabel = label || (typeof tooltip === 'string' ? tooltip : '');
      return React.createElement(Fragment, null, !!Icon && React.createElement("div", {
        className: _css(_ref)
      }, React.createElement(Icon, {
        label: iconLabel,
        secondaryColor: "inherit"
      })), !!Badge && React.createElement("div", {
        className: _css2(badgeWrapper)
      }, React.createElement(Badge, presentationProps)));
    });

    _defineProperty(_assertThisInitialized(_this), "getGlobalItemExternalProps", function () {
      var _this$props2 = _this.props,
          isActive = _this$props2.isActive,
          isFocused = _this$props2.isFocused,
          isHover = _this$props2.isHover,
          theme = _this$props2.theme,
          externalProps = _objectWithoutProperties(_this$props2, ["isActive", "isFocused", "isHover", "theme"]);

      return externalProps;
    });

    _defineProperty(_assertThisInitialized(_this), "getPresentationProps", function () {
      var _this$props3 = _this.props,
          isActive = _this$props3.isActive,
          isFocused = _this$props3.isFocused,
          isHover = _this$props3.isHover,
          isSelected = _this$props3.isSelected,
          size = _this$props3.size;
      return {
        isActive: isActive,
        isFocused: isFocused,
        isHover: isHover,
        isSelected: isSelected,
        size: size
      };
    });

    _defineProperty(_assertThisInitialized(_this), "generateStyles", function () {
      var _this$props4 = _this.props,
          isActive = _this$props4.isActive,
          isHover = _this$props4.isHover,
          isSelected = _this$props4.isSelected,
          size = _this$props4.size,
          styleReducer = _this$props4.styles,
          theme = _this$props4.theme;
      var mode = theme.mode;
      var presentationProps = {
        isActive: isActive,
        isHover: isHover,
        isSelected: isSelected,
        size: size
      };
      var defaultStyles = mode.globalItem(presentationProps);
      return styleReducer(defaultStyles, presentationProps);
    });

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function (styles) {
      var _this$props5 = _this.props,
          CustomComponent = _this$props5.component,
          dataset = _this$props5.dataset,
          href = _this$props5.href,
          id = _this$props5.id,
          onClick = _this$props5.onClick,
          target = _this$props5.target;
      var globalID = id && "".concat(id, "GlobalItem");
      var itemBase;

      if (CustomComponent) {
        itemBase = React.createElement(CustomComponent, _extends({}, _this.getGlobalItemExternalProps(), {
          className:
          /*#__PURE__*/

          /*#__PURE__*/
          css({
            '&&': styles.itemBase
          })
        }), _this.renderIconAndBadge(styles.badgeWrapper));
      } else if (href) {
        itemBase = React.createElement("a", _extends({
          href: href,
          id: globalID,
          onClick: onClick,
          target: target,
          className:
          /*#__PURE__*/

          /*#__PURE__*/
          css({
            '&&': styles.itemBase
          })
        }, dataset), _this.renderIconAndBadge(styles.badgeWrapper));
      } else if (onClick) {
        itemBase = React.createElement("button", _extends({
          id: globalID,
          onClick: onClick,
          className:
          /*#__PURE__*/

          /*#__PURE__*/
          css({
            '&&': styles.itemBase
          })
        }, dataset), _this.renderIconAndBadge(styles.badgeWrapper));
      } else {
        itemBase = React.createElement("span", _extends({
          id: globalID,
          className:
          /*#__PURE__*/

          /*#__PURE__*/
          css({
            '&&': styles.itemBase
          })
        }, dataset), _this.renderIconAndBadge(styles.badgeWrapper));
      }

      return itemBase;
    });

    return _this;
  }

  _createClass(GlobalNavigationItemPrimitive, [{
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          isSelected = _this$props6.isSelected,
          tooltip = _this$props6.tooltip;
      var styles = this.generateStyles();
      return React.createElement(Tooltip, {
        delay: 0,
        content: isSelected ? undefined : tooltip,
        position: "right",
        hideTooltipOnClick: true,
        hideTooltipOnMouseDown: true
      }, React.createElement("div", {
        className:
        /*#__PURE__*/

        /*#__PURE__*/
        css(_ref2)
      }, this.renderChildren(styles)));
    }
  }]);

  return GlobalNavigationItemPrimitive;
}(Component);

_defineProperty(GlobalNavigationItemPrimitive, "defaultProps", {
  dataset: {
    'data-test-id': 'GlobalNavigationItem'
  },
  isActive: false,
  isHover: false,
  isSelected: false,
  isFocused: false,
  size: 'large',
  styles: styleReducerNoOp
});

export { GlobalNavigationItemPrimitive as BaseGlobalNavigationItemPrimitive };
export default withGlobalTheme(GlobalNavigationItemPrimitive);