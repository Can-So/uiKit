import * as tslib_1 from "tslib";
import * as URL from 'url';
import * as USP from 'url-search-params'; // IE, Safari, Mobile Chrome, Mobile Safari
import { buildCredentials, } from './types';
var URLSearchParams = USP.default || USP;
var defaultRequestServiceOptions = {};
var buildUrl = function (baseUrl, path, queryParams, secOptions) {
    if (path === void 0) { path = ''; }
    var searchParam = new URLSearchParams(URL.parse(baseUrl).search || undefined);
    baseUrl = baseUrl.split('?')[0];
    if (queryParams) {
        for (var key in queryParams) {
            if ({}.hasOwnProperty.call(queryParams, key)) {
                searchParam.append(key, queryParams[key]);
            }
        }
    }
    if (secOptions && secOptions.params) {
        for (var key in secOptions.params) {
            if ({}.hasOwnProperty.call(secOptions.params, key)) {
                var values = secOptions.params[key];
                if (Array.isArray(values)) {
                    for (var i = 0; i < values.length; i++) {
                        searchParam.append(key, values[i]);
                    }
                }
                else {
                    searchParam.append(key, values);
                }
            }
        }
    }
    var seperator = '';
    if (path && baseUrl.substr(-1) !== '/') {
        seperator = '/';
    }
    var params = searchParam.toString();
    if (params) {
        params = '?' + params;
    }
    return "" + baseUrl + seperator + path + params;
};
var addToHeaders = function (headers, keyValues) {
    if (keyValues) {
        for (var key in keyValues) {
            if ({}.hasOwnProperty.call(keyValues, key)) {
                var values = keyValues[key];
                if (Array.isArray(values)) {
                    for (var i = 0; i < values.length; i++) {
                        headers.append(key, values[i]);
                    }
                }
                else {
                    headers.append(key, values);
                }
            }
        }
    }
};
var buildHeaders = function (secOptions, extraHeaders) {
    var headers = new Headers();
    addToHeaders(headers, extraHeaders);
    if (secOptions) {
        addToHeaders(headers, secOptions.headers);
    }
    return headers;
};
/**
 * @returns Promise containing the json response
 */
export var requestService = function (serviceConfig, options) {
    var url = serviceConfig.url, securityProvider = serviceConfig.securityProvider, refreshedSecurityProvider = serviceConfig.refreshedSecurityProvider;
    var _a = options || defaultRequestServiceOptions, path = _a.path, queryParams = _a.queryParams, requestInit = _a.requestInit;
    var secOptions = securityProvider && securityProvider();
    var requestUrl = buildUrl(url, path, queryParams, secOptions);
    var headers = buildHeaders(secOptions, requestInit && requestInit.headers);
    var credentials = buildCredentials(secOptions);
    var requestOptions = tslib_1.__assign({}, requestInit, { headers: headers,
        credentials: credentials });
    return fetch(requestUrl, requestOptions).then(function (response) {
        if (response.status === 204) {
            return Promise.resolve();
        }
        else if (response.ok) {
            return response.json();
        }
        else if (response.status === 401 && refreshedSecurityProvider) {
            // auth issue - try once
            return refreshedSecurityProvider().then(function (newSecOptions) {
                var retryServiceConfig = {
                    url: url,
                    securityProvider: function () { return newSecOptions; },
                };
                return requestService(retryServiceConfig, options);
            });
        }
        return Promise.reject({
            code: response.status,
            reason: response.statusText,
        });
    });
};
//# sourceMappingURL=serviceUtils.js.map