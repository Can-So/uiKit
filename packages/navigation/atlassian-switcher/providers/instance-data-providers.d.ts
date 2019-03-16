/// <reference types="react" />
import { LicenseInformationResponse, Permissions, RecentContainersResponse, WithCloudId } from '../types';
export declare const RecentContainersProvider: {
    new (props: Readonly<{
        cloudId: string;
    } & import("./as-data-provider").DataProviderProps<RecentContainersResponse>>): {
        acceptResults: boolean;
        state: import("./as-data-provider").ProviderResult<RecentContainersResponse>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: RecentContainersResponse): void;
        onError(error: any): void;
        render(): import("react").ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<RecentContainersResponse>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: import("react").ReactNode;
        }> & Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<RecentContainersResponse>>;
        context: any;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
    new (props: {
        cloudId: string;
    } & import("./as-data-provider").DataProviderProps<RecentContainersResponse>, context?: any): {
        acceptResults: boolean;
        state: import("./as-data-provider").ProviderResult<RecentContainersResponse>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: RecentContainersResponse): void;
        onError(error: any): void;
        render(): import("react").ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<RecentContainersResponse>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: import("react").ReactNode;
        }> & Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<RecentContainersResponse>>;
        context: any;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
};
export declare const LicenseInformationProvider: {
    new (props: Readonly<{
        cloudId: string;
    } & import("./as-data-provider").DataProviderProps<LicenseInformationResponse>>): {
        acceptResults: boolean;
        state: import("./as-data-provider").ProviderResult<LicenseInformationResponse>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: LicenseInformationResponse): void;
        onError(error: any): void;
        render(): import("react").ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<LicenseInformationResponse>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: import("react").ReactNode;
        }> & Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<LicenseInformationResponse>>;
        context: any;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
    new (props: {
        cloudId: string;
    } & import("./as-data-provider").DataProviderProps<LicenseInformationResponse>, context?: any): {
        acceptResults: boolean;
        state: import("./as-data-provider").ProviderResult<LicenseInformationResponse>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: LicenseInformationResponse): void;
        onError(error: any): void;
        render(): import("react").ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<LicenseInformationResponse>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: import("react").ReactNode;
        }> & Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<LicenseInformationResponse>>;
        context: any;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
};
export declare const UserPermissionProvider: {
    new (props: Readonly<{
        cloudId: string;
        permissionId: Permissions;
    } & import("./as-data-provider").DataProviderProps<boolean>>): {
        acceptResults: boolean;
        state: import("./as-data-provider").ProviderResult<boolean>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: boolean): void;
        onError(error: any): void;
        render(): import("react").ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{
            cloudId: string;
            permissionId: Permissions;
        } & import("./as-data-provider").DataProviderProps<boolean>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: import("react").ReactNode;
        }> & Readonly<{
            cloudId: string;
            permissionId: Permissions;
        } & import("./as-data-provider").DataProviderProps<boolean>>;
        context: any;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
    new (props: {
        cloudId: string;
        permissionId: Permissions;
    } & import("./as-data-provider").DataProviderProps<boolean>, context?: any): {
        acceptResults: boolean;
        state: import("./as-data-provider").ProviderResult<boolean>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: boolean): void;
        onError(error: any): void;
        render(): import("react").ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{
            cloudId: string;
            permissionId: Permissions;
        } & import("./as-data-provider").DataProviderProps<boolean>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: import("react").ReactNode;
        }> & Readonly<{
            cloudId: string;
            permissionId: Permissions;
        } & import("./as-data-provider").DataProviderProps<boolean>>;
        context: any;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
};
export declare const XFlowSettingsProvider: {
    new (props: Readonly<{
        cloudId: string;
    } & import("./as-data-provider").DataProviderProps<boolean>>): {
        acceptResults: boolean;
        state: import("./as-data-provider").ProviderResult<boolean>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: boolean): void;
        onError(error: any): void;
        render(): import("react").ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<boolean>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: import("react").ReactNode;
        }> & Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<boolean>>;
        context: any;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
    new (props: {
        cloudId: string;
    } & import("./as-data-provider").DataProviderProps<boolean>, context?: any): {
        acceptResults: boolean;
        state: import("./as-data-provider").ProviderResult<boolean>;
        componentWillUnmount(): void;
        componentDidMount(): void;
        onResult(value: boolean): void;
        onError(error: any): void;
        render(): import("react").ReactNode;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<boolean>>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: import("react").ReactNode;
        }> & Readonly<{
            cloudId: string;
        } & import("./as-data-provider").DataProviderProps<boolean>>;
        context: any;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
    };
};
export declare const prefetchAll: ({ cloudId }: WithCloudId) => void;
export declare const resetAll: () => void;
