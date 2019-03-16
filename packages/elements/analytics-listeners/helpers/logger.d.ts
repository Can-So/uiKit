export declare const LOG_LEVEL: {
    DEBUG: number;
    INFO: number;
    WARN: number;
    ERROR: number;
    OFF: number;
};
export default class Logger {
    logLevel: number;
    constructor({ logLevel }?: {
        logLevel?: number;
    });
    setLogLevel(logLevel: number): void;
    logMessage(level: number, type: keyof Console, ...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
