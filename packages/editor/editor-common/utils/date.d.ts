export interface Date {
    day: number;
    month: number;
    year: number;
}
export declare const timestampToUTCDate: (timestamp: string | number) => Date;
export declare const todayTimestampInUTC: () => string;
export declare const timestampToString: (timestamp: string | number, pattern?: string | undefined) => string;
export declare const timestampToIsoFormat: (timestamp: string | number) => string;
export declare const isPastDate: (timestamp: string | number) => boolean;
export declare const timestampToTaskContext: (timestamp: string | number) => string;
