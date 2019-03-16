import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import styled from 'styled-components';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@findable/analytics-next';
import Base, { Label } from '@findable/field-base';
import { name as packageName, version as packageVersion } from './version.json';
import TextArea from './styled/TextArea';
var Wrapper = styled.div.withConfig({
  displayName: "FieldTextAreaStateless__Wrapper",
  componentId: "sc-159dr31-0"
})(["\n  flex: 1 1 100%;\n"]);

var FieldTextAreaStateless =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldTextAreaStateless, _Component);

  function FieldTextAreaStateless() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FieldTextAreaStateless);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FieldTextAreaStateless)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "input", void 0);

    return _this;
  }

  _createClass(FieldTextAreaStateless, [{
    key: "focus",
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          autoFocus = _this$props.autoFocus,
          compact = _this$props.compact,
          disabled = _this$props.disabled,
          id = _this$props.id,
          invalidMessage = _this$props.invalidMessage,
          isInvalid = _this$props.isInvalid,
          isLabelHidden = _this$props.isLabelHidden,
          isMonospaced = _this$props.isMonospaced,
          isReadOnly = _this$props.isReadOnly,
          isSpellCheckEnabled = _this$props.isSpellCheckEnabled,
          label = _this$props.label,
          maxLength = _this$props.maxLength,
          minimumRows = _this$props.minimumRows,
          name = _this$props.name,
          onBlur = _this$props.onBlur,
          onChange = _this$props.onChange,
          onFocus = _this$props.onFocus,
          placeholder = _this$props.placeholder,
          enableResize = _this$props.enableResize,
          required = _this$props.required,
          shouldFitContainer = _this$props.shouldFitContainer,
          value = _this$props.value,
          isValidationHidden = _this$props.isValidationHidden;
      return React.createElement(Wrapper, null, !isLabelHidden && React.createElement(Label, {
        htmlFor: id,
        isDisabled: disabled,
        isLabelHidden: isLabelHidden,
        isRequired: required,
        label: label
      }), React.createElement(Base, {
        isCompact: compact,
        isDisabled: disabled,
        isInvalid: isInvalid,
        isReadOnly: isReadOnly,
        isRequired: required,
        invalidMessage: invalidMessage,
        isFitContainerWidthEnabled: shouldFitContainer,
        isValidationHidden: isValidationHidden
      }, React.createElement(TextArea, {
        disabled: disabled,
        readOnly: isReadOnly,
        name: name,
        placeholder: placeholder,
        value: value,
        required: required,
        isMonospaced: isMonospaced,
        minimumRows: minimumRows,
        enableResize: enableResize,
        onBlur: onBlur,
        onChange: onChange,
        onFocus: onFocus,
        id: id,
        autoFocus: autoFocus,
        spellCheck: isSpellCheckEnabled,
        maxLength: maxLength,
        innerRef: function innerRef(input) {
          _this2.input = input;
        }
      })));
    }
  }]);

  return FieldTextAreaStateless;
}(Component);

_defineProperty(FieldTextAreaStateless, "defaultProps", {
  compact: false,
  disabled: false,
  isReadOnly: false,
  required: false,
  isInvalid: false,
  label: '',
  type: 'text',
  isSpellCheckEnabled: true,
  minimumRows: 1,
  isValidationHidden: false
});

export { FieldTextAreaStateless as FieldTextAreaStatelessWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'fieldTextArea',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onBlur: createAndFireEventOnAtlaskit({
    action: 'blurred',
    actionSubject: 'textArea',
    attributes: {
      componentName: 'fieldTextArea',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onFocus: createAndFireEventOnAtlaskit({
    action: 'focused',
    actionSubject: 'textArea',
    attributes: {
      componentName: 'fieldTextArea',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(FieldTextAreaStateless));