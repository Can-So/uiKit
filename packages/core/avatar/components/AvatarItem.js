import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import GlobalTheme from '@findable/theme';
import React, { cloneElement, Component } from 'react';
import { propsOmittedFromClickData } from './constants';
import { omit } from '../utils';
import { getBackgroundColor, Content, PrimaryText, SecondaryText } from '../styled/AvatarItem';
import { getProps, getStyledAvatarItem } from '../helpers';
import { withPseudoState } from '../hoc';
import { ThemeItem } from '../theme/item';

var AvatarItem =
/*#__PURE__*/
function (_Component) {
  _inherits(AvatarItem, _Component);

  function AvatarItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AvatarItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AvatarItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "node", void 0);

    _defineProperty(_assertThisInitialized(_this), "blur", function () {
      if (_this.node) _this.node.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      if (_this.node) _this.node.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "guardedClick", function (event) {
      var _this$props = _this.props,
          isDisabled = _this$props.isDisabled,
          onClick = _this$props.onClick;
      if (isDisabled || typeof onClick !== 'function') return;
      var item = omit.apply(void 0, [_this.props].concat(_toConsumableArray(propsOmittedFromClickData)));
      onClick({
        item: item,
        event: event
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setNode", function (ref) {
      _this.node = ref;
    });

    return _this;
  }

  _createClass(AvatarItem, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          avatar = _this$props2.avatar,
          enableTextTruncate = _this$props2.enableTextTruncate,
          primaryText = _this$props2.primaryText,
          secondaryText = _this$props2.secondaryText; // distill props from context, props, and state

      var enhancedProps = getProps(this); // provide element type based on props

      var StyledComponent = getStyledAvatarItem(this.props);
      return React.createElement(GlobalTheme.Consumer, null, function (_ref) {
        var mode = _ref.mode;
        return React.createElement(ThemeItem.Provider, {
          value: _this2.props.theme
        }, React.createElement(ThemeItem.Consumer, null, function (tokens) {
          // maintain the illusion of a mask around presence/status
          var borderColor = getBackgroundColor(_objectSpread({}, _this2.props, tokens, {
            mode: mode
          }));
          return React.createElement(StyledComponent, _extends({
            innerRef: _this2.setNode
          }, enhancedProps, {
            onClick: _this2.guardedClick
          }), cloneElement(avatar, {
            borderColor: borderColor
          }), React.createElement(Content, {
            truncate: enableTextTruncate
          }, React.createElement(PrimaryText, {
            truncate: enableTextTruncate
          }, primaryText), React.createElement(SecondaryText, {
            truncate: enableTextTruncate
          }, secondaryText)));
        }));
      });
    }
  }]);

  return AvatarItem;
}(Component);

_defineProperty(AvatarItem, "defaultProps", {
  enableTextTruncate: true
});

export default withPseudoState(AvatarItem);