import * as tslib_1 from "tslib";
export var fetchJsonSameOrigin = function (url, init) {
    return fetch(url, tslib_1.__assign({ credentials: 'same-origin' }, init)).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Unable to fetch " + url + " " + response.status + " " + response.statusText);
    });
};
export var fetchJson = function (url) { return fetchJsonSameOrigin(url); };
export var postJson = function (url, data) {
    return fetchJsonSameOrigin(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
//# sourceMappingURL=fetch.js.map