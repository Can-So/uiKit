// @flow
import { colors } from '@atlaskit/theme';

export const thumb = {
  default: {
    background: colors.N0,
    // This border color is not being used - awaiting focus state lift to props
    border: colors.N800,
  },
  focus: {
    // This border color is not being used - awaiting focus state lift to props
    background: colors.N0,
    border: colors.B200,
  },
  disabled: {
    boxShadow: colors.N60A,
  },
};

export const track = {
  background: colors.N30A,
  default: {
    lower: colors.B400,
    upper: colors.N30,
  },
  disabled: {
    lower: colors.N50,
    upper: colors.N30,
  },
  hover: {
    lower: colors.B300,
    upper: colors.N40,
  },
};

export function theme() {
  return { range: () => ({ track, thumb }) };
}
