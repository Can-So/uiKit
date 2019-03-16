import * as React from 'react';
import { ComponentType } from 'react';
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
declare type IconThemeMap = {
    [index: string]: IconTheme & IconBackgroundTheme;
};
export declare const themes: IconThemeMap;
interface IconProps {
    theme: string;
}
export declare type IconType = ComponentType<IconProps>;
export declare const createIcon: (InnerIcon: React.ComponentType<any>, defaultProps?: AkIconProps | AkLogoProps | undefined) => React.ComponentType<IconProps>;
export declare const createImageIcon: (url: string) => React.ComponentType<IconProps>;
export {};
