import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import Radio from '@atlaskit/icon/glyph/radio';
import Checkbox from '@atlaskit/icon/glyph/checkbox';
import Tooltip from '@atlaskit/tooltip';
import { name as packageName, version as packageVersion } from '../version.json';
import { After, Before, Content, ContentWrapper, Description, InputWrapper } from '../styled/Item';
import { getInputBackground, getInputFill } from '../utils';
import Element from './Element';
var inputTypes = {
  checkbox: Checkbox,
  radio: Radio
};

var Item =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Item, _PureComponent);

  function Item() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Item)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isHovered: false,
      isPressed: false
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      return document.addEventListener('mouseup', _this.handleMouseUp);
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      return document.removeEventListener('mouseup', _this.handleMouseUp);
    });

    _defineProperty(_assertThisInitialized(_this), "guardedActivate", function (event) {
      var _this$props = _this.props,
          isDisabled = _this$props.isDisabled,
          onActivate = _this$props.onActivate;
      if (!isDisabled && onActivate) onActivate({
        item: _assertThisInitialized(_this),
        event: event
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      return _this.guardedActivate(event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyPress", function (event) {
      var keyIsValid = ['Enter', ' '].indexOf(event.key) > -1;
      if (keyIsValid) _this.guardedActivate(event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function () {
      return _this.setState({
        isPressed: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function () {
      return _this.setState({
        isPressed: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseOut", function () {
      return _this.setState({
        isHovered: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseOver", function () {
      return _this.setState({
        isHovered: true
      });
    });

    return _this;
  }

  _createClass(Item, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var _this$state = this.state,
          isHovered = _this$state.isHovered,
          isPressed = _this$state.isPressed;
      var type = props.type || '';
      var hasInput = ['checkbox', 'radio'].indexOf(type) > -1;
      var Input = inputTypes[type];
      var appearanceProps = {
        isActive: props.type === 'link' && props.isActive || props.type === 'option' && props.isSelected,
        isChecked: ['checkbox', 'radio'].indexOf(type) > -1 && props.isChecked,
        isDisabled: props.isDisabled,
        isFocused: props.isFocused,
        isHidden: props.isHidden,
        isHovered: isHovered,
        isPressed: isPressed,
        isSelected: type === 'option' && props.isSelected,
        isPrimary: props.appearance === 'primary'
      };
      var element = React.createElement(Element, _extends({}, appearanceProps, {
        handleClick: this.handleClick,
        handleKeyPress: this.handleKeyPress,
        handleMouseOut: this.handleMouseOut,
        handleMouseOver: this.handleMouseOver,
        handleMouseUp: this.handleMouseUp,
        handleMouseDown: this.handleMouseDown,
        href: props.href,
        target: props.target,
        title: props.title,
        type: props.type
      }), hasInput && React.createElement(InputWrapper, appearanceProps, React.createElement(Input, {
        label: "",
        primaryColor: getInputBackground(appearanceProps),
        secondaryColor: getInputFill(appearanceProps),
        size: "medium"
      })), !!props.elemBefore && React.createElement(Before, null, props.elemBefore), React.createElement(ContentWrapper, null, React.createElement(Content, {
        allowMultiline: this.context.shouldAllowMultilineItems
      }, props.children), !!props.description && React.createElement(Description, null, props.description)), !!props.elemAfter && React.createElement(After, null, props.elemAfter));
      return React.createElement("span", {
        role: "presentation"
      }, props.tooltipDescription ? React.createElement(Tooltip, {
        content: props.tooltipDescription,
        position: props.tooltipPosition
      }, element) : element);
    }
  }]);

  return Item;
}(PureComponent);

_defineProperty(Item, "defaultProps", {
  appearance: 'default',
  children: null,
  description: '',
  elemAfter: null,
  elemBefore: null,
  href: null,
  isActive: false,
  isChecked: false,
  isDisabled: false,
  isFocused: false,
  isHidden: false,
  isSelected: false,
  itemContext: 'menu',
  onActivate: function onActivate() {},
  target: null,
  title: null,
  tooltipDescription: null,
  tooltipPosition: 'right',
  type: 'link'
});

_defineProperty(Item, "contextTypes", {
  shouldAllowMultilineItems: PropTypes.bool
});

export { Item as DroplistItemWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'droplistItem',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onActivate: createAndFireEventOnAtlaskit({
    action: 'selected',
    actionSubject: 'droplistItem',
    attributes: {
      componentName: 'droplistItem',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(Item));