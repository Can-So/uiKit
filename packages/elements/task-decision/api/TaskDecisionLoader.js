/**
 * Grabs the latest Items from the service.
 */
export var loadLatestItems = function (query, provider, recentUpdateContext) {
    if (recentUpdateContext.localId) {
        // Retry until localId is found
        return retryIteration(function () { return provider.getItems(query).then(function (r) { return r.items; }); }, recentUpdateContext);
    }
    // Just load
    return provider.getItems(query).then(function (response) { return response.items; });
};
var retryDelaysInMilliseconds = [
    500,
    1000,
    1500,
    2500,
    4000,
    6000,
    8000,
    10000,
];
export var retryIteration = function (loader, recentUpdateContext, retry) {
    if (retry === void 0) { retry = 0; }
    return loadWithDelay(loader, retryDelaysInMilliseconds[retry]).then(function (items) {
        if (items.filter(function (item) { return item.localId === recentUpdateContext.localId; })
            .length > 0) {
            return items;
        }
        var delay = retryDelaysInMilliseconds[retry || 0];
        if (!delay) {
            // Give up - just retry what we've got.
            return items;
        }
        return retryIteration(loader, recentUpdateContext, retry + 1);
    });
};
export var loadWithDelay = function (loader, delay) {
    return new Promise(function (resolve) {
        window.setTimeout(function () {
            loader().then(function (items) {
                resolve(items);
            });
        }, delay);
    });
};
//# sourceMappingURL=TaskDecisionLoader.js.map