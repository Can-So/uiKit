import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import { Anchor, Span } from '../styled/Item';
export var supportsVoiceOver = function supportsVoiceOver() {
  return /Mac OS X/.test(navigator.userAgent);
};
export var getAriaRoles = function getAriaRoles() {
  return {
    checkbox: supportsVoiceOver() ? 'checkbox' : 'menuitemcheckbox',
    link: 'menuitem',
    option: 'option',
    radio: supportsVoiceOver() ? 'radio' : 'menuitemradio'
  };
};
export var baseTypes = {
  default: 'link',
  values: ['link', 'radio', 'checkbox', 'option']
};

var Element =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Element, _PureComponent);

  function Element() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Element);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Element)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (e) {
      e.preventDefault();

      _this.props.handleMouseDown();
    });

    return _this;
  }

  _createClass(Element, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var isActive = props.isActive,
          isChecked = props.isChecked,
          isDisabled = props.isDisabled,
          isFocused = props.isFocused,
          isHidden = props.isHidden,
          isSelected = props.isSelected,
          isPrimary = props.isPrimary;
      var type = this.props.type || '';
      var appearanceProps = {
        isActive: isActive,
        isChecked: isChecked,
        isDisabled: isDisabled,
        isFocused: isFocused,
        isHidden: isHidden,
        isSelected: isSelected,
        isPrimary: isPrimary
      };
      var ariaProps = {
        'aria-checked': !!isChecked,
        'aria-disabled': !!isDisabled,
        'aria-hidden': !!isHidden,
        'aria-selected': !!isSelected
      };
      var ariaRoles = getAriaRoles();
      var commonProps = {
        'data-role': 'droplistItem',
        onClick: props.handleClick,
        onKeyPress: props.handleKeyPress,
        onMouseDown: this.handleMouseDown,
        onMouseOut: props.handleMouseOut,
        onMouseOver: props.handleMouseOver,
        onMouseUp: props.handleMouseUp,
        role: ariaRoles[type],
        title: props.title,
        tabIndex: props.type === 'option' ? null : 0
      };
      var testingProps = process.env.NODE_ENV === 'test' ? {
        'data-test-active': isActive,
        'data-test-checked': isChecked,
        'data-test-disabled': isDisabled,
        'data-test-hidden': isHidden,
        'data-test-selected': isSelected
      } : {};

      var consolidatedProps = _objectSpread({}, appearanceProps, ariaProps, commonProps, testingProps);

      if (props.href && !isDisabled) {
        return React.createElement(Anchor, _extends({
          href: props.href,
          target: props.target
        }, consolidatedProps), props.children);
      }

      return React.createElement(Span, consolidatedProps, props.children);
    }
  }]);

  return Element;
}(PureComponent);

export { Element as default };