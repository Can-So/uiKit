import { css as _css5 } from "emotion";
import { css as _css4 } from "emotion";
import { css as _css3 } from "emotion";
import { css as _css2 } from "emotion";
import { css as _css } from "emotion";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React, { PureComponent } from 'react';
import { css } from 'emotion';
import { styleReducerNoOp, withContentTheme } from '../../../theme';

var isString = function isString(x) {
  return typeof x === 'string';
};

var ComponentSwitch = function ComponentSwitch(_ref) {
  var as = _ref.as,
      dataset = _ref.dataset,
      draggableProps = _ref.draggableProps,
      innerRef = _ref.innerRef,
      rest = _objectWithoutProperties(_ref, ["as", "dataset", "draggableProps", "innerRef"]);

  var isElement = isString(as);
  var props = isElement ? _objectSpread({}, dataset, rest) : _objectSpread({
    innerRef: innerRef,
    dataset: dataset,
    draggableProps: draggableProps
  }, rest); // only pass the actual `ref` to an element, it's the responsibility of the
  // component author to use `innerRef` where applicable

  var ref = isElement ? innerRef : null;
  var ElementOrComponent = as;
  return React.createElement(ElementOrComponent, _extends({
    ref: ref
  }, draggableProps, props));
};

var getItemComponentProps = function getItemComponentProps(props) {
  var isActive = props.isActive,
      isHover = props.isHover,
      isSelected = props.isSelected,
      isFocused = props.isFocused,
      isDragging = props.isDragging,
      theme = props.theme,
      componentProps = _objectWithoutProperties(props, ["isActive", "isHover", "isSelected", "isFocused", "isDragging", "theme"]);

  return componentProps;
};

var ItemPrimitive =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ItemPrimitive, _PureComponent);

  function ItemPrimitive() {
    _classCallCheck(this, ItemPrimitive);

    return _possibleConstructorReturn(this, _getPrototypeOf(ItemPrimitive).apply(this, arguments));
  }

  _createClass(ItemPrimitive, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          After = _this$props.after,
          Before = _this$props.before,
          CustomComponent = _this$props.component,
          dataset = _this$props.dataset,
          draggableProps = _this$props.draggableProps,
          href = _this$props.href,
          innerRef = _this$props.innerRef,
          isActive = _this$props.isActive,
          isDragging = _this$props.isDragging,
          isHover = _this$props.isHover,
          isSelected = _this$props.isSelected,
          onClick = _this$props.onClick,
          isFocused = _this$props.isFocused,
          spacing = _this$props.spacing,
          styleReducer = _this$props.styles,
          subText = _this$props.subText,
          target = _this$props.target,
          text = _this$props.text,
          theme = _this$props.theme;
      var mode = theme.mode,
          context = theme.context;
      var presentationProps = {
        isActive: isActive,
        isDragging: isDragging,
        isHover: isHover,
        isSelected: isSelected,
        isFocused: isFocused,
        spacing: spacing
      };
      var defaultStyles = mode.item(presentationProps)[context];
      var styles = styleReducer(defaultStyles, presentationProps, theme); // base element switch

      var itemComponent = 'div';
      var itemProps = {
        draggableProps: draggableProps,
        innerRef: innerRef,
        dataset: dataset
      };

      if (CustomComponent) {
        itemComponent = CustomComponent;
        itemProps = getItemComponentProps(this.props);
      } else if (href) {
        itemComponent = 'a';
        itemProps = {
          dataset: dataset,
          href: href,
          onClick: onClick,
          target: target,
          draggableProps: draggableProps,
          innerRef: innerRef
        };
      } else if (onClick) {
        itemComponent = 'button';
        itemProps = {
          dataset: dataset,
          onClick: onClick,
          draggableProps: draggableProps,
          innerRef: innerRef
        };
      }

      return React.createElement(ComponentSwitch, _extends({
        as: itemComponent,
        className:
        /*#__PURE__*/

        /*#__PURE__*/
        css({
          '&&': styles.itemBase
        })
      }, itemProps), !!Before && React.createElement("div", {
        className: _css(styles.beforeWrapper)
      }, React.createElement(Before, presentationProps)), React.createElement("div", {
        className: _css2(styles.contentWrapper)
      }, React.createElement("div", {
        className: _css3(styles.textWrapper)
      }, text), !!subText && React.createElement("div", {
        className: _css4(styles.subTextWrapper)
      }, subText)), !!After && React.createElement("div", {
        className: _css5(styles.afterWrapper)
      }, React.createElement(After, presentationProps)));
    }
  }]);

  return ItemPrimitive;
}(PureComponent);

_defineProperty(ItemPrimitive, "defaultProps", {
  dataset: {
    'data-test-id': 'NavigationItem'
  },
  isActive: false,
  isDragging: false,
  isHover: false,
  isSelected: false,
  isFocused: false,
  spacing: 'default',
  styles: styleReducerNoOp,
  text: ''
});

export { ItemPrimitive as ItemPrimitiveBase };
export default withContentTheme(ItemPrimitive);