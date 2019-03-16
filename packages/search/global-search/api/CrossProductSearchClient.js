import * as tslib_1 from "tslib";
import { ResultType, AnalyticsType, ContentType, } from '../model/Result';
import { mapJiraItemToResult } from './JiraItemMapper';
import { mapConfluenceItemToResult } from './ConfluenceItemMapper';
import { utils, } from '@atlaskit/util-service-support';
import { Scope } from './types';
export var EMPTY_CROSS_PRODUCT_SEARCH_RESPONSE = {
    results: new Map(),
};
var CrossProductSearchClientImpl = /** @class */ (function () {
    function CrossProductSearchClientImpl(url, cloudId, addSessionIdToJiraResult) {
        // result limit per scope
        this.RESULT_LIMIT = 10;
        this.serviceConfig = { url: url };
        this.cloudId = cloudId;
        this.addSessionIdToJiraResult = addSessionIdToJiraResult;
    }
    CrossProductSearchClientImpl.prototype.search = function (query, searchSession, scopes, resultLimit) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var path, body, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = 'quicksearch/v1';
                        body = {
                            query: query,
                            cloudId: this.cloudId,
                            limit: resultLimit || this.RESULT_LIMIT,
                            scopes: scopes,
                            searchSession: searchSession,
                        };
                        return [4 /*yield*/, this.makeRequest(path, body)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.parseResponse(response, searchSession.sessionId)];
                }
            });
        });
    };
    CrossProductSearchClientImpl.prototype.getAbTestData = function (scope, searchSession) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var path, body, response, scopeWithAbTest;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = 'experiment/v1';
                        body = {
                            cloudId: this.cloudId,
                            scopes: [scope],
                        };
                        return [4 /*yield*/, this.makeRequest(path, body)];
                    case 1:
                        response = _a.sent();
                        scopeWithAbTest = response.scopes.find(function (s) { return s.id === scope; });
                        if (scopeWithAbTest) {
                            return [2 /*return*/, Promise.resolve(scopeWithAbTest.abTest)];
                        }
                        return [2 /*return*/, Promise.resolve(undefined)];
                }
            });
        });
    };
    CrossProductSearchClientImpl.prototype.makeRequest = function (path, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options;
            return tslib_1.__generator(this, function (_a) {
                options = {
                    path: path,
                    requestInit: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    },
                };
                return [2 /*return*/, utils.requestService(this.serviceConfig, options)];
            });
        });
    };
    /**
     * Converts the raw xpsearch-aggregator response into a CrossProductSearchResults object containing
     * the results set and the experimentId that generated them.
     *
     * @param response
     * @param searchSessionId
     * @returns a CrossProductSearchResults object
     */
    CrossProductSearchClientImpl.prototype.parseResponse = function (response, searchSessionId) {
        var _this = this;
        var abTest;
        var results = response.scopes
            .filter(function (scope) { return scope.results; })
            .reduce(function (resultsMap, scopeResult) {
            resultsMap.set(scopeResult.id, scopeResult.results.map(function (result) {
                return mapItemToResult(scopeResult.id, result, searchSessionId, scopeResult.abTest && scopeResult.abTest.experimentId, _this.addSessionIdToJiraResult);
            }));
            if (!abTest) {
                abTest = scopeResult.abTest;
            }
            return resultsMap;
        }, new Map());
        return { results: results, abTest: abTest };
    };
    return CrossProductSearchClientImpl;
}());
export default CrossProductSearchClientImpl;
function mapPersonItemToResult(item) {
    var mention = item.nickname || item.name;
    return {
        resultType: ResultType.PersonResult,
        resultId: 'people-' + item.account_id,
        name: item.name,
        href: '/people/' + item.account_id,
        avatarUrl: item.picture,
        contentType: ContentType.Person,
        analyticsType: AnalyticsType.ResultPerson,
        mentionName: mention,
        presenceMessage: item.job_title || '',
    };
}
function mapItemToResult(scope, item, searchSessionId, experimentId, addSessionIdToJiraResult) {
    if (scope.startsWith('confluence')) {
        return mapConfluenceItemToResult(scope, item, searchSessionId, experimentId);
    }
    if (scope.startsWith('jira')) {
        return mapJiraItemToResult(item, searchSessionId, addSessionIdToJiraResult);
    }
    if (scope === Scope.People) {
        return mapPersonItemToResult(item);
    }
    throw new Error("Non-exhaustive match for scope: " + scope);
}
//# sourceMappingURL=CrossProductSearchClient.js.map