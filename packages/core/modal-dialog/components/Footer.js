import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { createElement, Component } from 'react';
import Button from '@atlaskit/button';
import { Actions, ActionItem, Footer } from '../styled/Content';

var JustifyShim = function JustifyShim(props) {
  return React.createElement("span", props);
};

var ModalFooter =
/*#__PURE__*/
function (_Component) {
  _inherits(ModalFooter, _Component);

  function ModalFooter() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ModalFooter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ModalFooter)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    return _this;
  }

  _createClass(ModalFooter, [{
    key: "render",
    // eslint-disable-line react/sort-comp
    value: function render() {
      var _this$props = this.props,
          actions = _this$props.actions,
          appearance = _this$props.appearance,
          component = _this$props.component,
          onClose = _this$props.onClose,
          showKeyline = _this$props.showKeyline;
      var warning = 'You can provide `component` OR `actions`, not both.';
      if (!component && !actions) return null;
      if (component && actions) return console.warn(warning); // eslint-disable-line no-console

      if (component) {
        return createElement(component, {
          appearance: appearance,
          onClose: onClose,
          showKeyline: showKeyline
        });
      }

      return React.createElement(Footer, {
        showKeyline: showKeyline
      }, React.createElement(JustifyShim, null), React.createElement(Actions, null, actions ? actions.map(function (_ref, idx) {
        var text = _ref.text,
            rest = _objectWithoutProperties(_ref, ["text"]);

        var variant = idx ? 'subtle' : appearance || 'primary';
        return React.createElement(ActionItem, {
          key: text || idx
        }, React.createElement(Button, _extends({
          appearance: variant
        }, rest), text));
      }) : null));
    }
  }]);

  return ModalFooter;
}(Component);

export { ModalFooter as default };