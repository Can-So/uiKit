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
export const withCached = <A, T>(
  fn: (a: A) => Promise<T>,
): WithCached<A, T> => {
  const resultCache = new Map<string, T>();
  const promiseCache = new Map<string, Promise<T>>();

  function getCacheKey(a: A) {
    return JSON.stringify(a);
  }

  const getCachedValue = (a: A) => {
    const cacheKey = getCacheKey(a);

    if (resultCache.has(cacheKey)) {
      return resultCache.get(cacheKey);
    }
    return;
  };

  const execute = (a: A) => {
    const cacheKey = getCacheKey(a);

    if (promiseCache.has(cacheKey)) {
      return promiseCache.get(cacheKey) as Promise<T>;
    }

    const promise = fn(a);
    promiseCache.set(cacheKey, promise);

    promise
      .then(result => {
        resultCache.set(cacheKey, result);
        promiseCache.delete(cacheKey);
      })
      .catch(() => {
        promiseCache.delete(cacheKey);
      });

    return promise;
  };

  const reset = () => {
    resultCache.clear();
    promiseCache.clear();
  };

  execute.cached = getCachedValue;
  execute.reset = reset;
  return execute;
};
