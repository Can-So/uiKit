import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import { css } from 'emotion';
export default (function (_ref) {
  var appearance = _ref.appearance,
      forwardedRef = _ref.forwardedRef,
      isCompact = _ref.isCompact,
      isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isHovered = _ref.isHovered,
      isInvalid = _ref.isInvalid,
      isMonospaced = _ref.isMonospaced,
      isReadOnly = _ref.isReadOnly,
      isRequired = _ref.isRequired,
      theme = _ref.theme,
      rest = _objectWithoutProperties(_ref, ["appearance", "forwardedRef", "isCompact", "isDisabled", "isFocused", "isHovered", "isInvalid", "isMonospaced", "isReadOnly", "isRequired", "theme"]);

  return React.createElement("div", {
    className: css(theme.container)
  }, React.createElement("input", _extends({
    ref: forwardedRef,
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    className: css(theme.input)
  }, rest)));
});