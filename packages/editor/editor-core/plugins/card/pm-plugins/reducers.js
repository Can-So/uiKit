import * as tslib_1 from "tslib";
var queue = function (state, action) {
    return tslib_1.__assign({}, state, { requests: state.requests.concat(action.requests) });
};
var resolve = function (state, action) {
    var requests = state.requests.reduce(function (requests, request) {
        if (request.url !== action.url) {
            requests.push(request);
        }
        return requests;
    }, []);
    return tslib_1.__assign({}, state, { requests: requests });
};
var setProvider = function (state, action) {
    return tslib_1.__assign({}, state, { provider: action.provider });
};
export default (function (state, action) {
    switch (action.type) {
        case 'QUEUE':
            return queue(state, action);
        case 'SET_PROVIDER':
            return setProvider(state, action);
        case 'RESOLVE':
            return resolve(state, action);
    }
});
//# sourceMappingURL=reducers.js.map