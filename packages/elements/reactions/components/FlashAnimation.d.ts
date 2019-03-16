import * as React from 'react';
export declare type Props = {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
    flash?: boolean;
};
export declare const flashStyle: string;
/**
 * Flash animation background component. See Reaction component for usage.
 */
export declare const FlashAnimation: (props: Props) => JSX.Element;
