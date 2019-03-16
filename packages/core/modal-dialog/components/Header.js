import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { createElement, Component } from 'react';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import { Header, Title, TitleText, TitleIconWrapper as IconWrapper } from '../styled/Content';
var icon = {
  danger: ErrorIcon,
  warning: WarningIcon
};

var TitleIcon = function TitleIcon(_ref) {
  var appearance = _ref.appearance;
  if (!appearance) return null;
  var Icon = icon[appearance];
  return React.createElement(IconWrapper, {
    appearance: appearance
  }, React.createElement(Icon, {
    label: "".concat(appearance, " icon")
  }));
};

var ModalHeader =
/*#__PURE__*/
function (_Component) {
  _inherits(ModalHeader, _Component);

  function ModalHeader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ModalHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ModalHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    return _this;
  }

  _createClass(ModalHeader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          component = _this$props.component,
          heading = _this$props.heading,
          onClose = _this$props.onClose,
          showKeyline = _this$props.showKeyline,
          isHeadingMultiline = _this$props.isHeadingMultiline;
      var warning = 'You can provide `component` OR `heading`, not both.';
      if (!component && !heading) return null;
      if (component && heading) return console.warn(warning); // eslint-disable-line no-console

      if (component) {
        return createElement(component, {
          appearance: appearance,
          onClose: onClose,
          showKeyline: showKeyline,
          isHeadingMultiline: isHeadingMultiline
        });
      }

      return React.createElement(Header, {
        showKeyline: showKeyline
      }, React.createElement(Title, {
        isHeadingMultiline: isHeadingMultiline
      }, React.createElement(TitleIcon, {
        appearance: appearance
      }), React.createElement(TitleText, {
        isHeadingMultiline: isHeadingMultiline
      }, heading)));
    }
  }]);

  return ModalHeader;
}(Component);

_defineProperty(ModalHeader, "defaultProps", {
  isHeadingMultiline: true
});

export { ModalHeader as default };