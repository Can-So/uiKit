export interface ProseMirrorDOMChange {
    inDOMChange: {
        composing: boolean;
        finish: (force: boolean) => void;
    };
}
export interface ElementsConfig {
    baseUrl: string;
    cloudId?: string;
}
export interface NativeFetchResponse {
    response: string;
    status: number;
    statusText: string;
}
export declare type AccountId = string;
