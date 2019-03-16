import { ButtonAppearances } from '@findable/button';
import * as React from 'react';
export declare type Props = {
    appearance?: ButtonAppearances;
    isLoading?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    text?: React.ReactNode;
};
export declare const ShareButton: React.StatelessComponent<Props>;
