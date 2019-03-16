import * as React from 'react';
import { OverflowShadowProps } from '../../ui/overflow-shadow';
export interface Props {
    language: string;
}
declare const _default: {
    new (props: Readonly<Pick<Props & OverflowShadowProps, "language">>): {
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
        setState<K extends "showLeftShadow" | "showRightShadow">(state: import("../../ui/overflow-shadow").OverflowShadowState | ((prevState: Readonly<import("../../ui/overflow-shadow").OverflowShadowState>, props: Readonly<Pick<Props & OverflowShadowProps, "language">>) => import("../../ui/overflow-shadow").OverflowShadowState | Pick<import("../../ui/overflow-shadow").OverflowShadowState, K> | null) | Pick<import("../../ui/overflow-shadow").OverflowShadowState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<Pick<Props & OverflowShadowProps, "language">>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: Pick<Props & OverflowShadowProps, "language">, context?: any): {
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
        setState<K extends "showLeftShadow" | "showRightShadow">(state: import("../../ui/overflow-shadow").OverflowShadowState | ((prevState: Readonly<import("../../ui/overflow-shadow").OverflowShadowState>, props: Readonly<Pick<Props & OverflowShadowProps, "language">>) => import("../../ui/overflow-shadow").OverflowShadowState | Pick<import("../../ui/overflow-shadow").OverflowShadowState, K> | null) | Pick<import("../../ui/overflow-shadow").OverflowShadowState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<Pick<Props & OverflowShadowProps, "language">>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};
export default _default;
