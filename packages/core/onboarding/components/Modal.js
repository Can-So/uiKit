import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import Modal from '@findable/modal-dialog';
import Button from '@findable/button';
import { Actions, ActionItem, Body, Heading, Image } from '../styled/Modal';
import { getModalTheme } from './theme';

function noop() {}

var OnboardingModal =
/*#__PURE__*/
function (_Component) {
  _inherits(OnboardingModal, _Component);

  function OnboardingModal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, OnboardingModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(OnboardingModal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "headerComponent", function (props) {
      var HeaderElement = props.header,
          src = props.image;

      var ImageElement = function ImageElement() {
        return React.createElement(Image, {
          alt: "",
          src: src
        });
      };

      return HeaderElement || ImageElement;
    });

    _defineProperty(_assertThisInitialized(_this), "footerComponent", function (props) {
      var FooterElement = props.footer,
          actionList = props.actions;

      var ActionsElement = function ActionsElement() {
        return actionList ? React.createElement(ThemeProvider, {
          theme: getModalTheme
        }, React.createElement(Actions, null, actionList.map(function (_ref, idx) {
          var text = _ref.text,
              key = _ref.key,
              rest = _objectWithoutProperties(_ref, ["text", "key"]);

          var variant = idx ? 'subtle-link' : 'primary';
          return React.createElement(ActionItem, {
            key: key || (typeof text === 'string' ? text : "".concat(idx))
          }, React.createElement(Button, _extends({
            appearance: variant,
            autoFocus: !idx
          }, rest), text));
        }))) : undefined;
      };

      return FooterElement || ActionsElement;
    });

    return _this;
  }

  _createClass(OnboardingModal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          actions = _this$props.actions,
          children = _this$props.children,
          heading = _this$props.heading,
          props = _objectWithoutProperties(_this$props, ["actions", "children", "heading"]);

      return React.createElement(Modal, _extends({
        autoFocus: true,
        components: {
          Header: this.headerComponent(this.props),
          Footer: this.footerComponent(this.props)
        },
        onClose: noop,
        scrollBehavior: "outside",
        shouldCloseOnOverlayClick: false,
        shouldCloseOnEscapePress: false
      }, props), React.createElement(Body, null, heading && React.createElement(Heading, null, heading), children));
    }
  }]);

  return OnboardingModal;
}(Component);

export { OnboardingModal as default };