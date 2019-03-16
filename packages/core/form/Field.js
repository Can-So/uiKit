import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _typeof from "@babel/runtime/helpers/typeof";
import React from 'react';
import arrayShallowEqual from 'shallow-equal/arrays';
import objectShallowEqual from 'shallow-equal/objects';
import { uid } from 'react-uid';
import memoizeOne from 'memoize-one';
import invariant from 'tiny-invariant';
import { FormContext, IsDisabledContext } from './Form';
import FieldWrapper, { Label, RequiredIndicator } from './styled/Field';
import translateEvent from './utils/translateEvent';

var shallowEqual = function shallowEqual(a, b) {
  return a === b || typeof b === 'function' || Array.isArray(a) && Array.isArray(b) && arrayShallowEqual(a, b) || _typeof(a) === 'object' && _typeof(b) === 'object' && objectShallowEqual(a, b);
}; // Provides the id of the field to message components.
// This links the message with the field for screen-readers.


export var FieldId = React.createContext();

var FieldInner =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FieldInner, _React$Component);

  function FieldInner() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FieldInner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FieldInner)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "unregisterField", function () {});

    _defineProperty(_assertThisInitialized(_this), "getFieldId", memoizeOne(function (name) {
      return "".concat(name, "-").concat(uid({
        id: name
      }));
    }));

    _defineProperty(_assertThisInitialized(_this), "state", {
      // eslint-disable-next-line no-unused-vars
      onChange: function onChange(e, value) {},
      onBlur: function onBlur() {},
      onFocus: function onFocus() {},
      dirty: false,
      touched: false,
      valid: false,
      value: typeof _this.props.defaultValue === 'function' ? _this.props.defaultValue() : _this.props.defaultValue,
      error: undefined,
      submitError: undefined
    });

    _defineProperty(_assertThisInitialized(_this), "register", function () {
      var _this$props = _this.props,
          defaultValue = _this$props.defaultValue,
          name = _this$props.name,
          registerField = _this$props.registerField,
          validate = _this$props.validate;

      if (process.env.NODE_ENV !== 'production') {
        invariant(name, '@atlaskit/form: Field components have a required name prop');
      }

      return registerField(name, defaultValue, function (_ref) {
        var change = _ref.change,
            blur = _ref.blur,
            focus = _ref.focus,
            dirty = _ref.dirty,
            touched = _ref.touched,
            valid = _ref.valid,
            value = _ref.value,
            error = _ref.error,
            submitError = _ref.submitError;

        _this.setState({
          onChange: change,
          onBlur: blur,
          onFocus: focus,
          dirty: dirty,
          touched: touched,
          valid: valid,
          value: value,
          error: error,
          submitError: submitError
        });
      }, {
        dirty: true,
        touched: true,
        valid: true,
        value: true,
        error: true,
        submitError: true
      }, {
        getValidator: function getValidator() {
          return validate;
        }
      });
    });

    return _this;
  }

  _createClass(FieldInner, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          defaultValue = _this$props2.defaultValue,
          name = _this$props2.name;

      if (prevProps.name !== name || !shallowEqual(prevProps.defaultValue, defaultValue)) {
        this.unregisterField();
        this.unregisterField = this.register();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.unregisterField = this.register();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unregisterField();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          isRequired = _this$props3.isRequired,
          isDisabled = _this$props3.isDisabled,
          label = _this$props3.label,
          name = _this$props3.name,
          id = _this$props3.id,
          transform = _this$props3.transform;

      var _this$state = this.state,
          _onChange = _this$state.onChange,
          onBlur = _this$state.onBlur,
          onFocus = _this$state.onFocus,
          value = _this$state.value,
          rest = _objectWithoutProperties(_this$state, ["onChange", "onBlur", "onFocus", "value"]);

      var error = rest.submitError || (rest.touched || rest.dirty) && rest.error;
      var fieldId = id || this.getFieldId(name);
      var fieldProps = {
        onChange: function onChange(e) {
          _onChange(transform(e, value));
        },
        onBlur: onBlur,
        onFocus: onFocus,
        value: value,
        name: name,
        isDisabled: isDisabled,
        isInvalid: Boolean(error),
        isRequired: Boolean(isRequired),
        'aria-invalid': error ? 'true' : 'false',
        'aria-labelledby': "".concat(fieldId, "-label ").concat(fieldId, "-helper ").concat(fieldId, "-valid ").concat(fieldId, "-error"),
        id: fieldId
      };
      return React.createElement(FieldWrapper, null, label && React.createElement(Label, {
        id: "".concat(fieldId, "-label"),
        htmlFor: fieldId
      }, label, isRequired && React.createElement(RequiredIndicator, {
        "aria-hidden": "true"
      }, "*")), React.createElement(FieldId.Provider, {
        value: fieldId
      }, children({
        fieldProps: fieldProps,
        error: error,
        meta: rest
      })));
    }
  }]);

  return FieldInner;
}(React.Component); // Make it easier to reference context values in lifecycle methods


_defineProperty(FieldInner, "defaultProps", {
  registerField: function registerField() {
    return function () {};
  },
  transform: translateEvent
});

var Field = function Field(props) {
  return React.createElement(FormContext.Consumer, null, function (registerField) {
    return React.createElement(IsDisabledContext.Consumer, null, function (formIsDisabled) {
      return React.createElement(FieldInner, _extends({}, props, {
        registerField: registerField,
        isDisabled: formIsDisabled || props.isDisabled
      }));
    });
  });
};

Field.defaultProps = {
  defaultValue: undefined,
  isDisabled: false,
  transform: translateEvent
};
export default Field;