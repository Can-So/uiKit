import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { fontSize } from '@findable/theme';
import styled from 'styled-components';
var common = "\n  appearance: none;\n  color: inherit;\n  font-size: ".concat(fontSize(), "px;\n  font-family: inherit;\n  letter-spacing: inherit;\n");
var ReadView = styled.div.withConfig({
  displayName: "Input__ReadView",
  componentId: "sc-1b6ayio-0"
})(["\n  ", " overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"], common); // Safari puts on some difficult to remove styles, mainly for disabled inputs
// but we want full control so need to override them in all cases

var overrideSafariDisabledStyles = "\n  -webkit-text-fill-color: unset;\n  -webkit-opacity: 1;\n";
var EditView = styled.input.withConfig({
  displayName: "Input__EditView",
  componentId: "sc-1b6ayio-1"
})(["\n  ", " background: transparent;\n  border: 0;\n  box-sizing: border-box;\n  cursor: inherit;\n  height: ", "em; /* for IE11 because it ignores the line-height */\n  line-height: inherit;\n  margin: 0;\n  outline: none;\n  padding: 0;\n  width: 100%;\n\n  :invalid {\n    box-shadow: none;\n  }\n\n  [disabled] {\n    ", ";\n  }\n"], common, 20 / 14, overrideSafariDisabledStyles);

var SingleLineTextInput =
/*#__PURE__*/
function (_Component) {
  _inherits(SingleLineTextInput, _Component);

  function SingleLineTextInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SingleLineTextInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SingleLineTextInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "inputRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(event);
      }

      if (event.key === 'Enter') {
        if (_this.props.onConfirm) _this.props.onConfirm(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getInputProps", function () {
      var inputProps = _objectSpread({}, _this.props, {
        type: 'text',
        onKeyDown: _this.onKeyDown
      });

      delete inputProps.style;
      delete inputProps.isEditing;
      delete inputProps.isInitiallySelected;
      delete inputProps.onConfirm;
      return inputProps;
    });

    return _this;
  }

  _createClass(SingleLineTextInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.selectInputIfNecessary();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.isEditing) {
        this.selectInputIfNecessary();
      }
    }
  }, {
    key: "select",
    value: function select() {
      if (this.inputRef) {
        this.inputRef.select();
      }
    }
  }, {
    key: "selectInputIfNecessary",
    value: function selectInputIfNecessary() {
      if (this.props.isEditing && this.props.isInitiallySelected) {
        this.select();
      }
    }
  }, {
    key: "renderEditView",
    value: function renderEditView() {
      var _this2 = this;

      return React.createElement(EditView, _extends({
        style: this.props.style
      }, this.getInputProps(), {
        innerRef: function innerRef(ref) {
          _this2.inputRef = ref;
        }
      }));
    }
  }, {
    key: "renderReadView",
    value: function renderReadView() {
      return React.createElement(ReadView, {
        style: this.props.style
      }, this.props.value);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.isEditing ? this.renderEditView() : this.renderReadView();
    }
  }]);

  return SingleLineTextInput;
}(Component);

_defineProperty(SingleLineTextInput, "defaultProps", {
  style: {},
  isInitiallySelected: false,
  onConfirm: function onConfirm() {},
  onKeyDown: function onKeyDown() {}
});

export { SingleLineTextInput as default };