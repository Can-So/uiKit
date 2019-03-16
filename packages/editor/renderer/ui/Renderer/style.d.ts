import { HTMLAttributes } from 'react';
import { RendererAppearance } from './';
export declare const FullPagePadding = 32;
export declare const shadowClassNames: {
    RIGHT_SHADOW: string;
    LEFT_SHADOW: string;
};
export declare type Props = {
    appearance?: RendererAppearance;
    theme?: any;
};
export declare const Wrapper: import("styled-components").StyledComponentClass<import("react").ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & Props & HTMLAttributes<{}>, any, import("react").ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & Props & HTMLAttributes<{}>>;
