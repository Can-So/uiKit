import { CardDimensions } from '..';
export declare const defaultSmallCardDimensions: {
    width: string;
    height: number;
};
export declare const defaultImageCardDimensions: {
    width: number;
    height: number;
};
export declare const defaultHorizontalCardDimensions: CardDimensions;
export declare const defaultSquareCardDimensions: {
    width: number;
    height: number;
};
export declare const minSmallCardDimensions: {
    width: number;
    height: number;
};
export declare const minImageCardDimensions: {
    width: number;
    height: number;
};
export declare const minSquareCardDimensions: {
    width: number;
    height: number;
};
export declare const minHorizontalCardDimensions: {
    width: number;
    height: number;
};
export declare const maxImageCardDimensions: {
    width: number;
    height: number;
};
export declare const maxHorizontalCardDimensions: {
    width: number;
    height: number;
};
export declare const maxSquareCardDimensions: {
    width: number;
    height: number;
};
export declare const getCardMaxHeight: (appearance?: "image" | "horizontal" | "auto" | "square" | undefined) => number;
export declare const getCardMinWidth: (appearance?: "image" | "horizontal" | "auto" | "square" | undefined) => number;
export declare const getCardMaxWidth: (appearance?: "image" | "horizontal" | "auto" | "square" | undefined) => number;
export declare const getDefaultCardDimensions: (appearance?: "image" | "horizontal" | "auto" | "square" | undefined) => CardDimensions;
