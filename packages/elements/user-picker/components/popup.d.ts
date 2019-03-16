import { Target } from '../types';
export declare const getPopupProps: (width: string | number, target: Target, onFlip: (data: any) => any, popupTitle?: string | undefined) => {
    searchThreshold: number;
    controlShouldRenderValue: boolean;
    minMenuWidth: string | number;
    maxMenuWidth: string | number;
    autoFocus: boolean;
    target: Target;
    popupTitle: string | undefined;
    popperProps: {
        modifiers: {
            handleFlipStyle: {
                enabled: boolean;
                order: number;
                fn: (data: any) => any;
            };
            preventOverflow: {
                boundariesElement: string;
            };
        };
    };
};
