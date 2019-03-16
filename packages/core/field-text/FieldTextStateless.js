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
import Input from './styled/Input';
var Wrapper = styled.div.withConfig({
  displayName: "FieldTextStateless__Wrapper",
  componentId: "ynbdsh-0"
})(["\n  flex: 1 1 100%;\n"]);

var FieldTextStateless =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldTextStateless, _Component);

  function FieldTextStateless() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FieldTextStateless);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FieldTextStateless)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "input", void 0);

    _defineProperty(_assertThisInitialized(_this), "setInputRef", function (input) {
      _this.input = input; // $FlowFixMe - Cannot call `this.props.innerRef` because undefined [1] is not a function

      _this.props.innerRef(input);
    });

    return _this;
  }

  _createClass(FieldTextStateless, [{
    key: "focus",
    value: function focus() {
      if (this.input) {
        this.input.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(Wrapper, null, !this.props.isLabelHidden && React.createElement(Label, {
        htmlFor: this.props.id,
        isDisabled: this.props.disabled,
        isLabelHidden: this.props.isLabelHidden,
        isRequired: this.props.required,
        label: this.props.label || ''
      }), React.createElement(Base, {
        invalidMessage: this.props.invalidMessage,
        isCompact: this.props.compact,
        isDisabled: this.props.disabled,
        isFitContainerWidthEnabled: this.props.shouldFitContainer,
        isInvalid: this.props.isInvalid,
        isReadOnly: this.props.isReadOnly,
        isRequired: this.props.required,
        isValidationHidden: this.props.isValidationHidden
      }, React.createElement(Input, {
        autoComplete: this.props.autoComplete,
        autoFocus: this.props.autoFocus,
        disabled: this.props.disabled,
        form: this.props.form,
        id: this.props.id,
        innerRef: this.setInputRef,
        isMonospaced: this.props.isMonospaced,
        maxLength: this.props.maxLength,
        min: this.props.min,
        max: this.props.max,
        name: this.props.name,
        onBlur: this.props.onBlur,
        onChange: this.props.onChange,
        onFocus: this.props.onFocus,
        onKeyDown: this.props.onKeyDown,
        onKeyPress: this.props.onKeyPress,
        onKeyUp: this.props.onKeyUp,
        pattern: this.props.pattern,
        placeholder: this.props.placeholder,
        readOnly: this.props.isReadOnly,
        required: this.props.required,
        spellCheck: this.props.isSpellCheckEnabled,
        type: this.props.type,
        value: this.props.value
      })));
    }
  }]);

  return FieldTextStateless;
}(Component);

_defineProperty(FieldTextStateless, "defaultProps", {
  compact: false,
  disabled: false,
  isInvalid: false,
  isReadOnly: false,
  isSpellCheckEnabled: true,
  onChange: function onChange() {},
  required: false,
  type: 'text',
  isValidationHidden: false,
  innerRef: function innerRef() {}
});

export { FieldTextStateless as FieldTextStatelessWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'fieldText',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onBlur: createAndFireEventOnAtlaskit({
    action: 'blurred',
    actionSubject: 'textField',
    attributes: {
      componentName: 'fieldText',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onFocus: createAndFireEventOnAtlaskit({
    action: 'focused',
    actionSubject: 'textField',
    attributes: {
      componentName: 'fieldText',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(FieldTextStateless));