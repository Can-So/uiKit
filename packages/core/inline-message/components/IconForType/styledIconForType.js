import styled from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { itemSpacing } from '../../constants';
// $FlowFixMe - theme is not found in props
var getBaseColor = themed('appearance', {
  connectivity: {
    light: colors.B400,
    dark: colors.B100
  },
  confirmation: {
    light: colors.G300,
    dark: colors.G300
  },
  info: {
    light: colors.P300,
    dark: colors.P300
  },
  warning: {
    light: colors.Y300,
    dark: colors.Y300
  },
  error: {
    light: colors.R400,
    dark: colors.R400
  }
});
var getHoverColor = themed('appearance', {
  connectivity: {
    light: colors.B300,
    dark: colors.B75
  },
  confirmation: {
    light: colors.G200,
    dark: colors.G200
  },
  info: {
    light: colors.P200,
    dark: colors.P200
  },
  warning: {
    light: colors.Y200,
    dark: colors.Y200
  },
  error: {
    light: colors.R300,
    dark: colors.R300
  }
});

var getColor = function getColor(props) {
  if (props.isHovered || props.isOpen) return getHoverColor(props);
  return getBaseColor(props);
};

var IconWrapper = styled.span.withConfig({
  displayName: "styledIconForType__IconWrapper",
  componentId: "sc-1aldrej-0"
})(["\n  align-items: center;\n  display: flex;\n  flex: 0 0 auto;\n  padding: 0 ", ";\n  color: ", ";\n"], itemSpacing, getColor);
export default IconWrapper;