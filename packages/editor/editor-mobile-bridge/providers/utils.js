import { createPromise } from '../cross-platform-promise';
var globalFetch = window.fetch;
export var mockFetchFor = function (urls) {
    if (urls === void 0) { urls = []; }
    window.fetch = function (url, options) {
        // Determine whether its a URL we want native to handle, otherwise continue as normal.
        var shouldMock = urls.find(function (u) { return url.startsWith(u); });
        if (!shouldMock) {
            return globalFetch(url, options);
        }
        return createPromise('nativeFetch', JSON.stringify({ url: url, options: options }))
            .submit()
            .then(function (_a) {
            var response = _a.response, status = _a.status, statusText = _a.statusText;
            return Promise.resolve(new Response(response, { status: status, statusText: statusText }));
        });
    };
};
//# sourceMappingURL=utils.js.map