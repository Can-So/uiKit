export declare function batchByKey<T>(callback: (key: string, args: T[][]) => void): (key: string, ...args: T[]) => void;
