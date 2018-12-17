// @flow

import { colors, createTheme } from '@atlaskit/theme';

type ThemeTokensThumb = {
  background: string,
  border: string,
};

type ThemeTokensTrack = {
  lower: string,
  upper: string,
};

export type ThemeTokens = {
  thumb: {
    default: ThemeTokensThumb,
    disabled: { boxShadow: string },
    focus: ThemeTokensThumb,
  },
  track: {
    background: string,
    default: ThemeTokensTrack,
    disabled: ThemeTokensTrack,
    hover: ThemeTokensTrack,
  },
};

export const thumb = {
  default: {
    background: colors.N0,
    // This border color is not being used - awaiting focus state lift to props
    border: colors.N800,
  },
  disabled: {
    boxShadow: colors.N60A,
  },
  focus: {
    // This border color is not being used - awaiting focus state lift to props
    background: colors.N0,
    border: colors.B200,
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

export const Theme = createTheme<ThemeTokens, *>(() => ({
  thumb,
  track,
}));
