export declare let counter: number;
export interface SubmitPromiseToNative<T> {
    submit(): Promise<T>;
}
export declare function createPromise<T>(name: string, args?: string): SubmitPromiseToNative<T>;
export declare function resolvePromise<T>(uuid: string, resolution: T): void;
export declare function rejectPromise<T>(uuid: string): void;
export declare function setCounter(value: number): void;
