/**
 * Creates a function that "collects" and returns values !== undefined,
 * falls back to default value for subsequent calls after first value === undefined
 */
export declare function createCollector(): <T, D extends T>(nextResult: T | undefined, defaultValue: D) => T;
