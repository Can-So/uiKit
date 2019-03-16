import * as React from 'react';
import { CardAppearance } from './types';
import { CardProps } from './types';
export { CardAppearance, CardProps };
export declare const Card: React.ComponentClass<({
    appearance: CardAppearance;
    isSelected?: boolean | undefined;
    onClick?: (() => void) | undefined;
    importer?: ((target: any) => void) | undefined;
} & {
    url: string;
    client?: import("../Client").Client | undefined;
} & import("../../../../elements/analytics-gas-types/node_modules/@findable/analytics-next-types").WithAnalyticsEventProps) | ({
    appearance: CardAppearance;
    isSelected?: boolean | undefined;
    onClick?: (() => void) | undefined;
    importer?: ((target: any) => void) | undefined;
} & {
    data: any;
} & import("../../../../elements/analytics-gas-types/node_modules/@findable/analytics-next-types").WithAnalyticsEventProps), any>;
