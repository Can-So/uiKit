export var promiseAllWithNonFailFast = function (promises, errorCollector) {
    var wrappedPromises = promises.map(function (p) {
        return p.catch(function (error) {
            if (errorCollector) {
                errorCollector(error);
            }
        });
    });
    return Promise.all(wrappedPromises);
};
//# sourceMappingURL=promise-util.js.map