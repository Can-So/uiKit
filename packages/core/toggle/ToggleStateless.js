import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import { uid } from 'react-uid';
import React, { Component } from 'react';
import { withAnalyticsEvents, withAnalyticsContext, createAndFireEvent } from '@atlaskit/analytics-next';
import CloseIcon from '@atlaskit/icon/glyph/cross';
import ConfirmIcon from '@atlaskit/icon/glyph/check';
import { name as packageName, version as packageVersion } from './version.json';
import { Handle, IconWrapper, Inner, Input, Label, Slide } from './styled';
import defaultBaseProps from './defaultBaseProps';

var ToggleStateless =
/*#__PURE__*/
function (_Component) {
  _inherits(ToggleStateless, _Component);

  function ToggleStateless() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ToggleStateless);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ToggleStateless)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFocused: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (event) {
      _this.setState({
        isFocused: false
      });

      _this.props.onBlur(event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function (event) {
      _this.setState({
        isFocused: true
      });

      _this.props.onFocus(event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      if (_this.props.isDisabled) {
        return;
      }

      _this.props.onChange(event);
    });

    return _this;
  }

  _createClass(ToggleStateless, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isChecked = _this$props.isChecked,
          isDisabled = _this$props.isDisabled,
          label = _this$props.label,
          name = _this$props.name,
          size = _this$props.size,
          value = _this$props.value;
      var isFocused = this.state.isFocused;
      var styledProps = {
        isChecked: isChecked,
        isDisabled: isDisabled,
        isFocused: isFocused,
        size: size
      };
      var Icon = isChecked ? ConfirmIcon : CloseIcon;
      var id = uid({
        id: this.constructor.name
      });
      return React.createElement(Label, {
        size: size,
        isDisabled: isDisabled,
        htmlFor: id
      }, React.createElement(Input, {
        checked: isChecked,
        disabled: isDisabled,
        id: id,
        name: name,
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        type: "checkbox",
        value: value
      }), React.createElement(Slide, styledProps, React.createElement(Inner, styledProps, React.createElement(Handle, {
        isChecked: isChecked,
        isDisabled: isDisabled,
        size: size
      }), React.createElement(IconWrapper, {
        isChecked: isChecked,
        size: size
      }, React.createElement(Icon, {
        label: label || (isChecked ? 'Uncheck' : 'Check'),
        size: size === 'large' ? null : 'small',
        primaryColor: "inherit"
      })))));
    }
  }]);

  return ToggleStateless;
}(Component);

_defineProperty(ToggleStateless, "defaultProps", _objectSpread({}, defaultBaseProps, {
  isChecked: false
}));

export { ToggleStateless as ToggleStatelessWithoutAnalytics };
var createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');
export default withAnalyticsContext({
  componentName: 'toggle',
  packageName: packageName,
  packageVersion: packageVersion
})(withAnalyticsEvents({
  onBlur: createAndFireEventOnAtlaskit({
    action: 'blurred',
    actionSubject: 'toggle',
    attributes: {
      componentName: 'toggle',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onChange: createAndFireEventOnAtlaskit({
    action: 'changed',
    actionSubject: 'toggle',
    attributes: {
      componentName: 'toggle',
      packageName: packageName,
      packageVersion: packageVersion
    }
  }),
  onFocus: createAndFireEventOnAtlaskit({
    action: 'focused',
    actionSubject: 'toggle',
    attributes: {
      componentName: 'toggle',
      packageName: packageName,
      packageVersion: packageVersion
    }
  })
})(ToggleStateless));