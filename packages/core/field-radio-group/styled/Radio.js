import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import styled, { css } from 'styled-components';
import { colors, themed } from '@findable/theme';
export var HiddenInput = styled.input.withConfig({
  displayName: "Radio__HiddenInput",
  componentId: "sc-8cbspg-0"
})(["\n  border: 0;\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  white-space: nowrap;\n  width: 1;\n  opacity: 0;\n"]);
var disabledColor = themed({
  light: colors.N80,
  dark: colors.N80
});
export var Label = styled.label.withConfig({
  displayName: "Radio__Label",
  componentId: "sc-8cbspg-1"
})(["\n  display: 'block';\n  color: ", ";\n  ", ";\n"], function (props // $FlowFixMe - theme is not found in props
) {
  return props.isDisabled ? disabledColor(props) : colors.text(props);
}, function (_ref) {
  var isDisabled = _ref.isDisabled;
  return isDisabled ? css(["\n          cursor: not-allowed;\n        "]) : '';
});
var borderColor = themed({
  light: colors.N40,
  dark: colors.DN80
});
var focusBorder = css(["\n  stroke: ", ";\n  stroke-width: 2px;\n"], themed({
  light: colors.B100,
  dark: colors.B75
}));
var invalidBorder = css(["\n  stroke: ", ";\n  stroke-width: 2px;\n"], themed({
  light: colors.R300,
  dark: colors.R300
}));
var activeBorder = css(["\n  stroke: currentColor;\n  stroke-width: 2px;\n"]);
var selectedBorder = css(["\n  stroke: currentColor;\n  stroke-width: 2px;\n"]);
var border = css(["\n  stroke: ", ";\n  stroke-width: 2px;\n"], function (_ref2) {
  var isHovered = _ref2.isHovered,
      rest = _objectWithoutProperties(_ref2, ["isHovered"]);

  return isHovered ? themed({
    light: colors.N40,
    dark: colors.DN200
  })(rest) : borderColor(rest);
});

var getBorderColor = function getBorderColor(props) {
  if (props.isDisabled) return '';
  if (props.isFocused) return focusBorder;
  if (props.isActive) return activeBorder;
  if (props.isInvalid) return invalidBorder;
  if (props.isSelected) return selectedBorder;
  return border;
};

var getDotColor = function getDotColor(props) {
  var isSelected = props.isSelected,
      isDisabled = props.isDisabled,
      isActive = props.isActive,
      rest = _objectWithoutProperties(props, ["isSelected", "isDisabled", "isActive"]);

  var color = themed({
    light: colors.N10,
    dark: colors.DN10
  });

  if (isDisabled && isSelected) {
    color = themed({
      light: colors.N70,
      dark: colors.DN90
    });
  } else if (isActive && isSelected && !isDisabled) {
    color = themed({
      light: colors.B400,
      dark: colors.DN10
    });
  } else if (!isSelected) {
    color = themed({
      light: 'transparent',
      dark: 'transparent'
    });
  }

  return color(rest);
};

var getCircleColor = function getCircleColor(props) {
  var isSelected = props.isSelected,
      isDisabled = props.isDisabled,
      isActive = props.isActive,
      isHovered = props.isHovered,
      rest = _objectWithoutProperties(props, ["isSelected", "isDisabled", "isActive", "isHovered"]); // set the default


  var color = themed({
    light: colors.N10,
    dark: colors.DN10
  });

  if (isDisabled) {
    color = themed({
      light: colors.N20,
      dark: colors.DN10
    });
  } else if (isActive) {
    color = themed({
      light: colors.B50,
      dark: colors.B200
    });
  } else if (isHovered && isSelected) {
    color = themed({
      light: colors.B300,
      dark: colors.B75
    });
  } else if (isHovered) {
    color = themed({
      light: colors.N30,
      dark: colors.DN30
    });
  } else if (isSelected) {
    color = themed({
      light: colors.B400,
      dark: colors.B400
    });
  }

  return color(rest);
};

export var IconWrapper = styled.span.withConfig({
  displayName: "Radio__IconWrapper",
  componentId: "sc-8cbspg-2"
})(["\n  line-height: 0;\n  flex-shrink: 0;\n  color: ", ";\n  fill: ", ";\n  transition: all 0.2s ease-in-out;\n\n  /* This is adding a property to the inner svg, to add a border to the radio */\n  & circle:first-of-type {\n    transition: stroke 0.2s ease-in-out;\n    ", ";\n  }\n"], getCircleColor, getDotColor, getBorderColor);
export var Wrapper = styled.div.withConfig({
  displayName: "Radio__Wrapper",
  componentId: "sc-8cbspg-3"
})(["\n  display: flex;\n  align-items: center;\n"]);