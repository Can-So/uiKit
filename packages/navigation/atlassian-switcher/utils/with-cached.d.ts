export interface WithCached<A, T> {
    (a: A): Promise<T>;
    cached: (a: A) => T | void;
    reset: () => void;
}
/**
 * withPrefetch wraps a function and keeps track of in-flight promises:
 *
 * 1. First call will result to normal invocation. After promise is resolved
 * it will be removed from the promise-cache and store value into result-cache.
 *
 * 2. Second and subsequent calls will:
 *    a) return unresolved promise if any
 *    b) do a normal invocation otherwise
 *
 * 3. Has methods to get `cached` value and `reset` caches
 * @param fn
 */
export declare const withCached: <A, T>(fn: (a: A) => Promise<T>) => WithCached<A, T>;
