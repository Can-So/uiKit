export declare function batch<T>(callback: (args: T[][]) => void): (...args: T[]) => void;
export declare function batchByKey<T>(callback: (key: string, args: T[][]) => void): (key: string, ...args: T[]) => void;
