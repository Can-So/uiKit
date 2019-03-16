import { colors, themed } from '@atlaskit/theme';
export var arrow = {
  defaultColor: themed({
    light: colors.N40,
    dark: colors.DN40
  }),
  selectedColor: themed({
    light: colors.N300,
    dark: colors.DN300
  }),
  hoverColor: themed({
    light: colors.N60,
    dark: colors.DN60
  })
};
export var row = {
  hoverBackground: themed({
    light: colors.N10,
    dark: colors.DN40
  })
};
export var head = {
  borderColor: themed({
    light: colors.N40,
    dark: colors.DN50
  }),
  textColor: themed({
    light: colors.N300,
    dark: colors.DN300
  })
};