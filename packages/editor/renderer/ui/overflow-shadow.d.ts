import * as React from 'react';
export interface OverflowShadowProps {
    handleRef: (ref: HTMLElement | null) => void;
    shadowClassNames: string;
}
export interface OverflowShadowState {
    showLeftShadow: boolean;
    showRightShadow: boolean;
}
export interface OverflowShadowOptions {
    overflowSelector: string;
    scrollableSelector: string;
}
export default function overflowShadow<P extends OverflowShadowProps>(Component: React.ComponentType<P>, options: OverflowShadowOptions): {
    new (props: Readonly<Pick<P, Exclude<keyof P, "handleRef" | "shadowClassNames">>>): {
        overflowContainer: HTMLElement | null;
        container: HTMLElement;
        scrollable: NodeList;
        state: {
            showLeftShadow: boolean;
            showRightShadow: boolean;
        };
        componentWillUnmount(): void;
        componentDidUpdate(): void;
        handleScroll: (event: Event) => void;
        updateRightShadow: () => void;
        handleUpdateRightShadow: any;
        handleScrollDebounced: any;
        calcualteScrollableWidth: () => number;
        handleContainer: (container: HTMLElement | null) => void;
        render(): JSX.Element;
        setState<K extends "showLeftShadow" | "showRightShadow">(state: OverflowShadowState | ((prevState: Readonly<OverflowShadowState>, props: Readonly<Pick<P, Exclude<keyof P, "handleRef" | "shadowClassNames">>>) => OverflowShadowState | Pick<OverflowShadowState, K> | null) | Pick<OverflowShadowState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<Pick<P, Exclude<keyof P, "handleRef" | "shadowClassNames">>>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: Pick<P, Exclude<keyof P, "handleRef" | "shadowClassNames">>, context?: any): {
        overflowContainer: HTMLElement | null;
        container: HTMLElement;
        scrollable: NodeList;
        state: {
            showLeftShadow: boolean;
            showRightShadow: boolean;
        };
        componentWillUnmount(): void;
        componentDidUpdate(): void;
        handleScroll: (event: Event) => void;
        updateRightShadow: () => void;
        handleUpdateRightShadow: any;
        handleScrollDebounced: any;
        calcualteScrollableWidth: () => number;
        handleContainer: (container: HTMLElement | null) => void;
        render(): JSX.Element;
        setState<K extends "showLeftShadow" | "showRightShadow">(state: OverflowShadowState | ((prevState: Readonly<OverflowShadowState>, props: Readonly<Pick<P, Exclude<keyof P, "handleRef" | "shadowClassNames">>>) => OverflowShadowState | Pick<OverflowShadowState, K> | null) | Pick<OverflowShadowState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<Pick<P, Exclude<keyof P, "handleRef" | "shadowClassNames">>>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};
