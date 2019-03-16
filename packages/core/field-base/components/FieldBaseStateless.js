import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import { Content, ContentWrapper, ChildWrapper } from '../styled/Content';
import ValidationElement from './ValidationElement';

var FieldBaseStateless =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldBaseStateless, _Component);

  function FieldBaseStateless() {
    _classCallCheck(this, FieldBaseStateless);

    return _possibleConstructorReturn(this, _getPrototypeOf(FieldBaseStateless).apply(this, arguments));
  }

  _createClass(FieldBaseStateless, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.shouldReset) {
        this.props.onBlur();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          appearance = _this$props.appearance,
          children = _this$props.children,
          invalidMessage = _this$props.invalidMessage,
          isCompact = _this$props.isCompact,
          isDialogOpen = _this$props.isDialogOpen,
          isDisabled = _this$props.isDisabled,
          isFitContainerWidthEnabled = _this$props.isFitContainerWidthEnabled,
          isFocused = _this$props.isFocused,
          isInvalid = _this$props.isInvalid,
          isLoading = _this$props.isLoading,
          isPaddingDisabled = _this$props.isPaddingDisabled,
          isReadOnly = _this$props.isReadOnly,
          maxWidth = _this$props.maxWidth,
          onBlur = _this$props.onBlur,
          onDialogBlur = _this$props.onDialogBlur,
          onDialogClick = _this$props.onDialogClick,
          onDialogFocus = _this$props.onDialogFocus,
          onFocus = _this$props.onFocus,
          isValidationHidden = _this$props.isValidationHidden;

      function getAppearance(a) {
        if (isDisabled) return 'disabled';
        if (isInvalid) return 'invalid';
        return a;
      }

      return React.createElement(ContentWrapper, {
        disabled: isDisabled,
        maxWidth: maxWidth,
        grow: isFitContainerWidthEnabled
      }, React.createElement(InlineDialog, {
        content: invalidMessage,
        isOpen: isDialogOpen && !!invalidMessage && !isValidationHidden,
        onContentBlur: onDialogBlur,
        onContentClick: onDialogClick,
        onContentFocus: onDialogFocus,
        placement: "right"
      }, React.createElement(ChildWrapper, {
        compact: isCompact
      }, React.createElement(Content, {
        appearance: getAppearance(appearance),
        compact: isCompact,
        disabled: isDisabled,
        isFocused: isFocused,
        invalid: isInvalid && !isFocused,
        none: appearance === 'none',
        onBlurCapture: onBlur,
        onFocusCapture: onFocus,
        paddingDisabled: isPaddingDisabled,
        readOnly: isReadOnly,
        subtle: appearance === 'subtle'
      }, children, !isValidationHidden ? React.createElement(ValidationElement, {
        isDisabled: isDisabled,
        isInvalid: isInvalid,
        isLoading: isLoading
      }) : null))));
    }
  }]);

  return FieldBaseStateless;
}(Component);

_defineProperty(FieldBaseStateless, "defaultProps", {
  appearance: 'standard',
  invalidMessage: '',
  isCompact: false,
  isDialogOpen: false,
  isDisabled: false,
  isFitContainerWidthEnabled: false,
  isFocused: false,
  isInvalid: false,
  isLoading: false,
  isPaddingDisabled: false,
  isReadOnly: false,
  onDialogBlur: function onDialogBlur() {},
  onDialogClick: function onDialogClick() {},
  onDialogFocus: function onDialogFocus() {},
  shouldReset: false,
  isValidationHidden: false
});

export { FieldBaseStateless as default };