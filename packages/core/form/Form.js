import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import { createForm } from 'final-form';
import createDecorator from 'final-form-focus';
import React, { createContext } from 'react';
export var FormContext = createContext();
export var IsDisabledContext = createContext(false);

var createFinalForm = function createFinalForm(onSubmit, formRef) {
  var form = createForm({
    onSubmit: onSubmit,
    destroyOnUnregister: true,
    initialValues: {},
    mutators: {
      // https://medium.com/@erikras/final-form-arrays-and-mutators-13159cb7d285
      setDefaultValue: function setDefaultValue(_ref, state) {
        var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            defaultValue = _ref2[1];

        if (state.formState.initialValues) {
          var value = typeof defaultValue === 'function' ? defaultValue(state.formState.initialValues[name]) : defaultValue; // eslint-disable-next-line no-param-reassign

          state.formState.initialValues[name] = value; // eslint-disable-next-line no-param-reassign

          state.formState.values[name] = value;
        }
      }
    }
  });
  var withFocusDecorator = createDecorator(function () {
    return formRef.current ? Array.from(formRef.current.querySelectorAll('input')) : [];
  });
  withFocusDecorator(form);
  return form;
};

var Form =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "unsubscribe", function () {});

    _defineProperty(_assertThisInitialized(_this), "formRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "form", createFinalForm(_this.props.onSubmit, _this.formRef));

    _defineProperty(_assertThisInitialized(_this), "state", {
      dirty: false,
      submitting: false
    });

    _defineProperty(_assertThisInitialized(_this), "getValues", function () {
      return _this.form.getState().values;
    });

    _defineProperty(_assertThisInitialized(_this), "registerField", function (name, defaultValue, subscriber, subscription, config) {
      _this.form.pauseValidation();

      var unsubscribe = _this.form.registerField(name, subscriber, subscription, config);

      _this.form.mutators.setDefaultValue(name, defaultValue);

      _this.form.resumeValidation();

      return unsubscribe;
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (e) {
      if (typeof e.preventDefault === 'function') {
        e.preventDefault();
      }

      if (_this.form) {
        _this.form.submit();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && _this.formRef.current) {
        var submitButton = _this.formRef.current.querySelector('button:not([type]), button[type="submit"], input[type="submit"]');

        if (submitButton) submitButton.click();
        e.preventDefault();
      }
    });

    return _this;
  }

  _createClass(Form, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.unsubscribe = this.form.subscribe(function (_ref3) {
        var submitting = _ref3.submitting,
            dirty = _ref3.dirty;

        _this2.setState({
          submitting: submitting,
          dirty: dirty
        });
      }, {
        dirty: true,
        submitting: true
      });
    }
  }, {
    key: "componenWillUnmount",
    value: function componenWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isDisabled = _this$props.isDisabled,
          children = _this$props.children;
      var _this$state = this.state,
          dirty = _this$state.dirty,
          submitting = _this$state.submitting;
      return React.createElement(FormContext.Provider, {
        value: this.registerField
      }, React.createElement(IsDisabledContext.Provider, {
        value: isDisabled
      }, children({
        formProps: {
          onSubmit: this.handleSubmit,
          ref: this.formRef,
          onKeyDown: this.handleKeyDown
        },
        dirty: dirty,
        submitting: submitting,
        disabled: isDisabled,
        getValues: this.getValues
      })));
    }
  }]);

  return Form;
}(React.Component);

_defineProperty(Form, "defaultProps", {
  isDisabled: false
});

export default Form;