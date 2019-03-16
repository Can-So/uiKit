import * as React from 'react';
export declare type Color = 'grey' | 'red' | 'blue' | 'green' | 'purple' | 'yellow';
export declare type Props = React.HTMLProps<HTMLSpanElement> & {
    clickable?: boolean;
    color?: Color;
};
export declare const resolveColors: (color?: "grey" | "red" | "blue" | "green" | "purple" | "yellow" | undefined) => {
    light: [string, string, string];
    dark: [string, string, string];
};
/**
 * TODO when update typescript to 2.9+
 * add custom props as Generic Parameter to span instead of casting
 */
export declare const DateLozenge: React.ComponentType<Props>;
