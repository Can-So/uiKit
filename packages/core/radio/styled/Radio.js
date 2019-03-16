import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
var disabledColor = themed({
  light: colors.N80,
  dark: colors.N80
});
export var Label = styled.label.withConfig({
  displayName: "Radio__Label",
  componentId: "sc-2hlmhw-0"
})(["\n  align-items: flex-start;\n  color: ", ";\n  ", ";\n  display: flex;\n"], function (props // $FlowFixMe - theme is not found in props
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
var checkedBorder = css(["\n  stroke: currentColor;\n  stroke-width: 2px;\n"]);
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
  if (props.isChecked) return checkedBorder;
  return border;
};

var getDotColor = function getDotColor(props) {
  var isChecked = props.isChecked,
      isDisabled = props.isDisabled,
      isActive = props.isActive,
      rest = _objectWithoutProperties(props, ["isChecked", "isDisabled", "isActive"]);

  var color = themed({
    light: colors.N10,
    dark: colors.DN10
  });

  if (isDisabled && isChecked) {
    color = themed({
      light: colors.N70,
      dark: colors.DN90
    });
  } else if (isActive && isChecked && !isDisabled) {
    color = themed({
      light: colors.B400,
      dark: colors.DN10
    });
  } else if (!isChecked) {
    color = themed({
      light: 'transparent',
      dark: 'transparent'
    });
  }

  return color(rest);
};

var getCircleColor = function getCircleColor(props) {
  var isChecked = props.isChecked,
      isDisabled = props.isDisabled,
      isActive = props.isActive,
      isHovered = props.isHovered,
      isInvalid = props.isInvalid,
      rest = _objectWithoutProperties(props, ["isChecked", "isDisabled", "isActive", "isHovered", "isInvalid"]); // set the default


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
  } else if (isHovered && isChecked) {
    color = themed({
      light: colors.B300,
      dark: colors.B75
    });
  } else if (isHovered) {
    color = themed({
      light: colors.N30,
      dark: colors.DN30
    });
  } else if (isChecked) {
    color = themed({
      light: colors.B400,
      dark: isInvalid ? colors.DN10 : colors.B400
    });
  }

  return color(rest);
};

export var LabelText = styled.div.withConfig({
  displayName: "Radio__LabelText",
  componentId: "sc-2hlmhw-1"
})(["\n  padding: 2px 4px;\n"]);
export var IconWrapper = styled.span.withConfig({
  displayName: "Radio__IconWrapper",
  componentId: "sc-2hlmhw-2"
})(["\n  line-height: 0;\n  flex-shrink: 0;\n  color: ", ";\n  fill: ", ";\n  transition: all 0.2s ease-in-out;\n\n  /* This is adding a property to the inner svg, to add a border to the radio */\n  & circle:first-of-type {\n    transition: stroke 0.2s ease-in-out;\n    ", ";\n  }\n"], getCircleColor, getDotColor, getBorderColor);