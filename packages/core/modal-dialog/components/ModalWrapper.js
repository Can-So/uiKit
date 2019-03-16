import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { layers } from '@atlaskit/theme';
import Portal from '@atlaskit/portal';
import { ModalTransitionConsumer } from './ModalTransition';
import StackConsumer from './StackConsumer';
import Modal from './Modal';

var ModalWrapper =
/*#__PURE__*/
function (_Component) {
  _inherits(ModalWrapper, _Component);

  function ModalWrapper() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ModalWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ModalWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onModalClosed", function (onExited) {
      return function (e) {
        if (onExited) {
          onExited();
        }

        if (_this.props.onCloseComplete) {
          _this.props.onCloseComplete(e);
        }
      };
    });

    return _this;
  }

  _createClass(ModalWrapper, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(ModalTransitionConsumer, null, function (_ref) {
        var isOpen = _ref.isOpen,
            onExited = _ref.onExited;
        return React.createElement(Portal, {
          zIndex: layers.modal()
        }, React.createElement(StackConsumer, {
          isOpen: isOpen
        }, function (naturalStackIndex) {
          return React.createElement(Modal, _extends({}, _this2.props, {
            isOpen: isOpen,
            stackIndex: _this2.props.stackIndex || naturalStackIndex,
            onCloseComplete: _this2.onModalClosed(onExited)
          }));
        }));
      });
    }
  }]);

  return ModalWrapper;
}(Component);

_defineProperty(ModalWrapper, "defaultProps", {
  autoFocus: true,
  scrollBehavior: 'inside',
  shouldCloseOnEscapePress: true,
  shouldCloseOnOverlayClick: true,
  isChromeless: false,
  width: 'medium',
  isHeadingMultiline: true,
  onClose: function onClose() {}
});

export default ModalWrapper;