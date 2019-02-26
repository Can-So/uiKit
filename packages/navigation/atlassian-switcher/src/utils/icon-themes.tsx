import * as React from 'react';
import styled from 'styled-components';
import { colors, elevation, gridSize } from '@atlaskit/theme';
import { ComponentType } from 'react';

interface IconBaseProps {
  bgColor: string;
}

const IconBase = styled.div<IconBaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${4 * gridSize()}px;
  height: ${4 * gridSize()}px;
  border-radius: ${gridSize()}px;
  ${elevation.e100};
  background-color: ${({ bgColor }) => bgColor}
  overflow: hidden;
`;

const ImageIconBase = styled.img`
  width: ${gridSize() * 4}px;
  height: ${gridSize() * 4}px;
`;

interface AkIconProps {
  primaryColor?: string;
  secondaryColor?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

interface AkLogoProps {
  iconGradientStart?: string;
  iconGradientStop?: string;
  iconColor?: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

interface IconBackgroundTheme {
  backgroundColor: string;
}

interface IconTheme {
  primaryColor: string;
  iconColor?: string;
}

type IconThemeMap = {
  [index: string]: IconTheme & IconBackgroundTheme;
};

export const themes: IconThemeMap = {
  default: {
    backgroundColor: '#fff',
    primaryColor: '#000',
  },
  product: {
    iconColor: colors.N0,
    backgroundColor: colors.B400,
    primaryColor: colors.N0,
  },
  admin: {
    backgroundColor: colors.DN70,
    primaryColor: colors.N0,
  },
  custom: {
    backgroundColor: colors.N0,
    primaryColor: colors.DN70,
  },
};

interface IconProps {
  theme: string;
}

export type IconType = ComponentType<IconProps>;

export const createIcon = (
  InnerIcon: React.ComponentType<any>,
  defaultProps?: AkIconProps | AkLogoProps,
): IconType => props => {
  const { backgroundColor, ...iconProps } =
    themes[props.theme] || themes.default;

  return (
    <IconBase bgColor={backgroundColor}>
      <InnerIcon {...defaultProps} {...iconProps} />
    </IconBase>
  );
};

export const createImageIcon = (url: string): IconType => props => {
  const { backgroundColor } = themes[props.theme] || themes.default;

  return (
    <IconBase bgColor={backgroundColor}>
      <ImageIconBase src={url} />
    </IconBase>
  );
};
