import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import styled from 'styled-components';
import React, { Component } from 'react';
import { colors } from '@atlaskit/theme';
import Spinner from '@atlaskit/spinner';
import Icon from '@atlaskit/icon/glyph/warning'; // exported for testing

export var WarningIcon = styled.div.withConfig({
  displayName: "ValidationElement__WarningIcon",
  componentId: "sc-1fk9yms-0"
})(["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  flex-shrink: 0;\n"], colors.yellow); // Spinner needs set height to avoid height jumping
// Also needs a margin so there is space between it and preceding text

var SpinnerParent = styled.div.withConfig({
  displayName: "ValidationElement__SpinnerParent",
  componentId: "sc-1fk9yms-1"
})(["\n  height: 20px;\n  margin-left: 10px;\n"]);

var ValidationElement =
/*#__PURE__*/
function (_Component) {
  _inherits(ValidationElement, _Component);

  function ValidationElement() {
    _classCallCheck(this, ValidationElement);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValidationElement).apply(this, arguments));
  }

  _createClass(ValidationElement, [{
    key: "render",
    value: function render() {
      if (!this.props.isDisabled && this.props.isInvalid) {
        return React.createElement(WarningIcon, null, React.createElement(Icon, {
          label: "warning"
        }));
      }

      return this.props.isLoading ? React.createElement(SpinnerParent, null, React.createElement(Spinner, {
        size: "small"
      })) : null;
    }
  }]);

  return ValidationElement;
}(Component);

_defineProperty(ValidationElement, "defaultProps", {
  isDisabled: false,
  isInvalid: false,
  isLoading: false
});

export { ValidationElement as default };