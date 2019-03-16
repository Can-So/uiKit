import { colors } from '@atlaskit/theme';
export function getInputBackground(_ref) {
  var isChecked = _ref.isChecked,
      isDisabled = _ref.isDisabled,
      isHovered = _ref.isHovered,
      isPressed = _ref.isPressed;
  var background = colors.N40;
  if (isHovered) background = colors.N50;
  if (isPressed) background = colors.B200;
  if (isChecked) background = colors.B400;
  if (isDisabled) background = colors.N20;
  if (isChecked && isDisabled) background = colors.N600;
  return background;
}
export function getInputFill(appearanceProps) {
  return appearanceProps.isChecked ? colors.N0 : 'transparent';
}