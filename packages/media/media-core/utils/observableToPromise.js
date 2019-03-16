// We can't use observable.toPromise() because it only resolves when the observable completes, which never happens with ReplaySubject
export var observableToPromise = function (observable) {
    return new Promise(function (resolve) {
        var subscription = observable.subscribe({
            next: function (state) {
                resolve(state);
                setTimeout(function () { return subscription.unsubscribe(); }, 0);
            },
        });
    });
};
//# sourceMappingURL=observableToPromise.js.map