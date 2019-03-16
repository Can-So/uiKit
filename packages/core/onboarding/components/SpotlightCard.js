import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { colors } from '@atlaskit/theme';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Card from './Card';
import { getSpotlightTheme } from './theme';

var SpotlightCard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SpotlightCard, _React$Component);

  function SpotlightCard() {
    _classCallCheck(this, SpotlightCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(SpotlightCard).apply(this, arguments));
  }

  _createClass(SpotlightCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          actions = _this$props.actions,
          actionsBeforeElement = _this$props.actionsBeforeElement,
          children = _this$props.children,
          components = _this$props.components,
          isFlat = _this$props.isFlat,
          heading = _this$props.heading,
          headingAfterElement = _this$props.headingAfterElement,
          image = _this$props.image,
          innerRef = _this$props.innerRef,
          _theme = _this$props.theme,
          width = _this$props.width;
      return React.createElement(ThemeProvider, {
        theme: getSpotlightTheme
      }, React.createElement(Card, {
        ref: innerRef,
        heading: heading,
        headingAfterElement: headingAfterElement,
        actions: actions,
        actionsBeforeElement: actionsBeforeElement,
        components: components,
        image: image,
        theme: function theme(parent) {
          var _parent = parent(),
              container = _parent.container,
              others = _objectWithoutProperties(_parent, ["container"]);

          return _theme(function () {
            return _objectSpread({}, others, {
              container: _objectSpread({
                background: colors.P300,
                color: colors.N0,
                width: "".concat(Math.min(Math.max(width, 160), 600), "px"),
                boxShadow: isFlat ? undefined : "0 4px 8px -2px ".concat(colors.N50A, ", 0 0 1px ").concat(colors.N60A)
              }, container)
            });
          });
        }
      }, children));
    }
  }]);

  return SpotlightCard;
}(React.Component); // $FlowFixMe - flow doesn't know about forwardRef


_defineProperty(SpotlightCard, "defaultProps", {
  width: 400,
  isFlat: false,
  components: {},
  theme: function theme(x) {
    return x();
  }
});

export default React.forwardRef(function (props, ref) {
  return React.createElement(SpotlightCard, _extends({}, props, {
    innerRef: ref
  }));
});