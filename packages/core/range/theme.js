import { colors, createTheme } from '@atlaskit/theme';
export var thumb = {
  default: {
    background: colors.N0,
    // This border color is not being used - awaiting focus state lift to props
    border: colors.N800
  },
  disabled: {
    boxShadow: colors.N60A
  },
  focus: {
    // This border color is not being used - awaiting focus state lift to props
    background: colors.N0,
    border: colors.B200
  }
};
export var track = {
  background: colors.N30A,
  default: {
    lower: colors.B400,
    upper: colors.N30
  },
  disabled: {
    lower: colors.N50,
    upper: colors.N30
  },
  hover: {
    lower: colors.B300,
    upper: colors.N40
  }
};
export var Theme = createTheme(function () {
  return {
    thumb: thumb,
    track: track
  };
});