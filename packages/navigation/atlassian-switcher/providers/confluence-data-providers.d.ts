/// <reference types="react" />
export declare const MANAGE_HREF = "/wiki/plugins/servlet/customize-application-navigator";
export declare const CustomLinksProvider: {
    new (props: Readonly<import("./as-data-provider").DataProviderProps<import("../types").CustomLink[]>>): {
        acceptResults: boolean;
        state: import("./as-data-provider").ProviderResult<import("../types").CustomLink[]>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: import("../types").CustomLink[]): void;
        onError(error: any): void;
        render(): import("react").ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<import("./as-data-provider").DataProviderProps<import("../types").CustomLink[]>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: import("react").ReactNode;
        }> & Readonly<import("./as-data-provider").DataProviderProps<import("../types").CustomLink[]>>;
        context: any;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
    new (props: import("./as-data-provider").DataProviderProps<import("../types").CustomLink[]>, context?: any): {
        acceptResults: boolean;
        state: import("./as-data-provider").ProviderResult<import("../types").CustomLink[]>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: import("../types").CustomLink[]): void;
        onError(error: any): void;
        render(): import("react").ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<import("./as-data-provider").DataProviderProps<import("../types").CustomLink[]>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: import("react").ReactNode;
        }> & Readonly<import("./as-data-provider").DataProviderProps<import("../types").CustomLink[]>>;
        context: any;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
};
