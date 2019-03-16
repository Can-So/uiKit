export interface ErrorBridge {
    sendError(message: string, source: string, line: number, col: number, stackTrace: string[]): void;
}
export interface RuntimeBridges {
    errorBridge?: ErrorBridge;
}
export declare class RuntimeBridgeImpl implements RuntimeBridges {
    errorBridge?: ErrorBridge;
    call<T extends keyof RuntimeBridges>(bridge: T, event: keyof Exclude<RuntimeBridges[T], undefined>, ...args: any): void;
}
export declare const toRuntimeBridge: RuntimeBridgeImpl;
export declare function errorReporter(event: ErrorEvent): void;
