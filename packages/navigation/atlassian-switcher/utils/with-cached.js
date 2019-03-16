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
export var withCached = function (fn) {
    var resultCache = new Map();
    var promiseCache = new Map();
    function getCacheKey(a) {
        return JSON.stringify(a);
    }
    var getCachedValue = function (a) {
        var cacheKey = getCacheKey(a);
        if (resultCache.has(cacheKey)) {
            return resultCache.get(cacheKey);
        }
        return;
    };
    var execute = function (a) {
        var cacheKey = getCacheKey(a);
        if (promiseCache.has(cacheKey)) {
            return promiseCache.get(cacheKey);
        }
        var promise = fn(a);
        promiseCache.set(cacheKey, promise);
        promise
            .then(function (result) {
            resultCache.set(cacheKey, result);
            promiseCache.delete(cacheKey);
        })
            .catch(function () {
            promiseCache.delete(cacheKey);
        });
        return promise;
    };
    var reset = function () {
        resultCache.clear();
        promiseCache.clear();
    };
    execute.cached = getCachedValue;
    execute.reset = reset;
    return execute;
};
//# sourceMappingURL=with-cached.js.map