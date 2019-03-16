/// <reference types="react" />
import { CardDimensions, CardAppearance } from '../';
import { BreakpointSizeValue } from '../utils/breakpoint';
export interface WrapperProps {
    shouldUsePointerCursor?: boolean;
    dimensions?: CardDimensions;
    appearance?: CardAppearance;
    breakpointSize?: BreakpointSizeValue;
}
export declare const Wrapper: import("styled-components").StyledComponentClass<import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & WrapperProps, any, import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & WrapperProps>;
export declare const InlinePlayerWrapper: import("styled-components").StyledComponentClass<import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    selected?: boolean | undefined;
}, any, import("react").ClassAttributes<HTMLDivElement> & import("react").HTMLAttributes<HTMLDivElement> & {
    selected?: boolean | undefined;
}>;
