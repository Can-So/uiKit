import _extends from "@babel/runtime/helpers/extends";
import { css as _css3 } from "emotion";
import { css as _css2 } from "emotion";
import { merge as _merge } from "emotion";
import { css as _css } from "emotion";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import React, { Component } from 'react';
import RadioIcon from '@atlaskit/icon/glyph/radio';
import CheckboxIcon from '@atlaskit/icon/glyph/checkbox';
import { colors, themed, gridSize } from '@atlaskit/theme';

var getPrimitiveStyles = function getPrimitiveStyles(props) {
  var cx = props.cx,
      className = props.className,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      isSelected = props.isSelected;
  var styles = {
    alignItems: 'center',
    backgroundColor: isFocused ? colors.N30 : 'transparent',
    color: 'inherit',
    display: 'flex ',
    paddingBottom: 4,
    paddingLeft: "".concat(gridSize() * 2, "px"),
    paddingTop: 4,
    ':active': {
      backgroundColor: colors.B50
    }
  };

  var augmentedStyles = _objectSpread({}, getStyles('option', props), styles);

  var bemClasses = {
    option: true,
    'option--is-disabled': isDisabled,
    'option--is-focused': isFocused,
    'option--is-selected': isSelected
  }; // maintain react-select API

  return [augmentedStyles, cx(null, bemClasses, className)];
}; // maintains function shape


var backgroundColor = themed({
  light: colors.N40A,
  dark: colors.DN10
});
var transparent = themed({
  light: 'transparent',
  dark: 'transparent'
}); // state of the parent option

// the primary color represents the outer or background element
var getPrimaryColor = function getPrimaryColor(_ref) {
  var isActive = _ref.isActive,
      isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected,
      rest = _objectWithoutProperties(_ref, ["isActive", "isDisabled", "isFocused", "isSelected"]);

  var color = backgroundColor;

  if (isDisabled && isSelected) {
    color = themed({
      light: colors.B75,
      dark: colors.DN200
    });
  } else if (isDisabled) {
    color = themed({
      light: colors.N20A,
      dark: colors.DN10
    });
  } else if (isActive) {
    color = themed({
      light: colors.B75,
      dark: colors.B200
    });
  } else if (isFocused && isSelected) {
    color = themed({
      light: colors.B300,
      dark: colors.B75
    });
  } else if (isFocused) {
    color = themed({
      light: colors.N50A,
      dark: colors.DN30
    });
  } else if (isSelected) {
    color = colors.blue;
  } // $FlowFixMe - theme is not found in props


  return color(rest);
}; // the secondary color represents the radio dot or checkmark


var getSecondaryColor = function getSecondaryColor(_ref2) {
  var isActive = _ref2.isActive,
      isDisabled = _ref2.isDisabled,
      isSelected = _ref2.isSelected,
      rest = _objectWithoutProperties(_ref2, ["isActive", "isDisabled", "isSelected"]);

  var color = themed({
    light: colors.N0,
    dark: colors.DN10
  });

  if (isDisabled && isSelected) {
    color = themed({
      light: colors.N70,
      dark: colors.DN10
    });
  } else if (isActive && isSelected && !isDisabled) {
    color = themed({
      light: colors.B400,
      dark: colors.DN10
    });
  } else if (!isSelected) {
    color = transparent;
  } // $FlowFixMe - theme is not found in props


  return color(rest);
};

var ControlOption =
/*#__PURE__*/
function (_Component) {
  _inherits(ControlOption, _Component);

  function ControlOption() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ControlOption);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ControlOption)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isActive: false
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function () {
      return _this.setState({
        isActive: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function () {
      return _this.setState({
        isActive: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      return _this.setState({
        isActive: false
      });
    });

    return _this;
  }

  _createClass(ControlOption, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          getStyles = _this$props.getStyles,
          Icon = _this$props.Icon,
          children = _this$props.children,
          innerProps = _this$props.innerProps,
          rest = _objectWithoutProperties(_this$props, ["getStyles", "Icon", "children", "innerProps"]); // prop assignment


      var props = _objectSpread({}, innerProps, {
        onMouseDown: this.onMouseDown,
        onMouseUp: this.onMouseUp,
        onMouseLeave: this.onMouseLeave
      });

      var _getPrimitiveStyles = getPrimitiveStyles(_objectSpread({
        getStyles: getStyles
      }, rest)),
          _getPrimitiveStyles2 = _slicedToArray(_getPrimitiveStyles, 2),
          styles = _getPrimitiveStyles2[0],
          classes = _getPrimitiveStyles2[1];

      return React.createElement("div", _extends({
        className: _merge(_css(styles) + (" " + classes))
      }, props), React.createElement("div", {
        className: _css2(iconWrapperCSS())
      }, React.createElement(Icon, {
        primaryColor: getPrimaryColor(_objectSpread({}, this.props, this.state)),
        secondaryColor: getSecondaryColor(_objectSpread({}, this.props, this.state))
      })), React.createElement("div", {
        className: _css3(truncateCSS())
      }, children));
    }
  }]);

  return ControlOption;
}(Component);

var iconWrapperCSS = function iconWrapperCSS() {
  return {
    alignItems: 'center',
    display: 'flex ',
    flexShrink: 0,
    paddingRight: '4px'
  };
};
/* TODO:
  to be removed
  the label of an option in the menu
  should ideally be something we can customise
  as part of the react-select component API
  at the moment we are hardcoding it into
  the custom input-option components for Radio and Checkbox Select
  and so this behaviour is not customisable / disableable
  by users who buy into radio / checkbox select.
*/


var truncateCSS = function truncateCSS() {
  return {
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    flexGrow: 1,
    whiteSpace: 'nowrap'
  };
};

export var CheckboxOption = function CheckboxOption(props) {
  return React.createElement(ControlOption, _extends({
    Icon: CheckboxIcon
  }, props));
};
export var RadioOption = function RadioOption(props) {
  return React.createElement(ControlOption, _extends({
    Icon: RadioIcon
  }, props));
};