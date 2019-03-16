import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import InlineEditStateless from './InlineEditStateless';

var InlineEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(InlineEditor, _Component);

  function InlineEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InlineEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InlineEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isEditing: false
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirm", function () {
      _this.exitEditingMode();

      var cancelConfirmation = _this.enterEditingMode;

      _this.props.onConfirm(cancelConfirmation);
    });

    _defineProperty(_assertThisInitialized(_this), "onCancel", function () {
      _this.exitEditingMode();

      _this.props.onCancel();
    });

    _defineProperty(_assertThisInitialized(_this), "enterEditingMode", function () {
      _this.setState({
        isEditing: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "exitEditingMode", function () {
      _this.setState({
        isEditing: false
      });
    });

    return _this;
  }

  _createClass(InlineEditor, [{
    key: "render",
    value: function render() {
      return React.createElement(InlineEditStateless, _extends({
        isEditing: this.state.isEditing
      }, this.props, {
        onEditRequested: this.enterEditingMode,
        onConfirm: this.onConfirm,
        onCancel: this.onCancel,
        editButtonLabel: this.props.editButtonLabel,
        confirmButtonLabel: this.props.confirmButtonLabel,
        cancelButtonLabel: this.props.cancelButtonLabel
      }));
    }
  }]);

  return InlineEditor;
}(Component);

_defineProperty(InlineEditor, "defaultProps", {
  label: '',
  readView: '',
  editButtonLabel: 'Edit',
  confirmButtonLabel: 'Confirm',
  cancelButtonLabel: 'Cancel'
});

export { InlineEditor as default };