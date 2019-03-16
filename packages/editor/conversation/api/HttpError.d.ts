export declare class HttpError extends Error {
    status: number;
    canRetry: boolean;
    constructor(status: number, message: string);
}
