import * as React from 'react';
declare enum Status {
    LOADING = "loading",
    COMPLETE = "complete",
    ERROR = "error"
}
export interface ResultComplete<T> {
    status: Status.COMPLETE;
    data: T;
}
export interface ResultLoading {
    status: Status.LOADING;
    data: null;
}
export interface ResultError {
    status: Status.ERROR;
    error: any;
    data: null;
}
export declare const isComplete: <T>(result: ProviderResult<T>) => result is ResultComplete<T>;
export declare const isError: <T>(result: ProviderResult<T>) => result is ResultError;
export declare const isLoading: <T>(result: ProviderResult<T>) => result is ResultLoading;
export declare type ProviderResult<T> = ResultComplete<T> | ResultLoading | ResultError;
interface PropsToPromiseMapper<P, D> extends Function {
    (props: P): Promise<D>;
}
interface PropsToValueMapper<P, D> {
    (props: P): D;
}
export interface DataProviderProps<D> {
    children: (props: ProviderResult<D>) => React.ReactNode;
}
export default function <P, D>(mapPropsToPromise: PropsToPromiseMapper<Readonly<P>, D>, mapPropsToInitialValue?: PropsToValueMapper<Readonly<P>, D | void>): {
    new (props: Readonly<P & DataProviderProps<D>>): {
        acceptResults: boolean;
        state: ProviderResult<D>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: D): void;
        onError(error: any): void;
        render(): React.ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<P & DataProviderProps<D>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<P & DataProviderProps<D>>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: P & DataProviderProps<D>, context?: any): {
        acceptResults: boolean;
        state: ProviderResult<D>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: D): void;
        onError(error: any): void;
        render(): React.ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<P & DataProviderProps<D>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<P & DataProviderProps<D>>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};
export {};
