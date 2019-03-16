import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type ContextAdapter = Record<string, React.Context<any>>;
export declare const createContextAdapter: (createContextAdapter: Record<string, React.Context<any>>) => {
    new (props: Readonly<{}>): {
        contextState: Record<string, any>;
        getChildContext(): {
            contextAdapter: Record<string, React.Context<any> & {
                value: any;
            }>;
        };
        zipProvidersWithValues(): Record<string, React.Context<any> & {
            value: any;
        }>;
        render(): JSX.Element;
        setState<K extends "hasRendered">(state: {
            hasRendered: {};
        } | ((prevState: Readonly<{
            hasRendered: {};
        }>, props: Readonly<{}>) => {
            hasRendered: {};
        } | Pick<{
            hasRendered: {};
        }, K> | null) | Pick<{
            hasRendered: {};
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{
            hasRendered: {};
        }>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: {}, context?: any): {
        contextState: Record<string, any>;
        getChildContext(): {
            contextAdapter: Record<string, React.Context<any> & {
                value: any;
            }>;
        };
        zipProvidersWithValues(): Record<string, React.Context<any> & {
            value: any;
        }>;
        render(): JSX.Element;
        setState<K extends "hasRendered">(state: {
            hasRendered: {};
        } | ((prevState: Readonly<{
            hasRendered: {};
        }>, props: Readonly<{}>) => {
            hasRendered: {};
        } | Pick<{
            hasRendered: {};
        }, K> | null) | Pick<{
            hasRendered: {};
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{
            hasRendered: {};
        }>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    childContextTypes: {
        contextAdapter: PropTypes.Requireable<any>;
    };
};
