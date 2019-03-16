import * as tslib_1 from "tslib";
import { ResultType, AnalyticsType, ContentType, } from '../model/Result';
import { utils, } from '@findable/util-service-support';
var PeopleSearchClientImpl = /** @class */ (function () {
    function PeopleSearchClientImpl(url, cloudId) {
        this.RESULT_LIMIT = 5;
        this.serviceConfig = { url: url };
        this.cloudId = cloudId;
    }
    PeopleSearchClientImpl.prototype.buildRecentQuery = function () {
        return {
            query: "query Collaborators(\n          $cloudId: String!,\n          $limit: Int) {\n          Collaborators(cloudId: $cloudId, limit: $limit) {\n            id,\n            fullName,\n            avatarUrl,\n            title,\n            nickname,\n            department\n          }\n        }",
            variables: {
                cloudId: this.cloudId,
                limit: 3,
                excludeBots: true,
                excludeInactive: true,
            },
        };
    };
    PeopleSearchClientImpl.prototype.buildSearchQuery = function (query) {
        return {
            query: "query Search(\n        $cloudId: String!,\n        $displayName: String!,\n        $first: Int!,\n        $offset: Int,\n        $excludeInactive: Boolean,\n        $excludeBots: Boolean,\n        $product: String,\n      ) {\n        UserSearch (product: $product, displayName: $displayName, cloudId: $cloudId, first: $first, offset: $offset,\n        filter: { excludeInactive: $excludeInactive, excludeBots: $excludeBots }) {\n          id,\n          fullName,\n          avatarUrl,\n          title,\n          nickname,\n          department\n        }\n      }",
            variables: {
                cloudId: this.cloudId,
                product: 'confluence',
                displayName: query,
                first: this.RESULT_LIMIT,
                offset: 1,
                excludeInactive: true,
                excludeBots: true,
            },
        };
    };
    PeopleSearchClientImpl.prototype.buildRequestOptions = function (body) {
        return {
            path: 'graphql',
            requestInit: {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(body),
            },
        };
    };
    PeopleSearchClientImpl.prototype.getRecentPeople = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildRequestOptions(this.buildRecentQuery());
                        return [4 /*yield*/, utils.requestService(this.serviceConfig, options)];
                    case 1:
                        response = _a.sent();
                        if (response.errors) {
                            // TODO should probably catch and log this
                            return [2 /*return*/, []];
                        }
                        if (!response.data || !response.data.Collaborators) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, response.data.Collaborators.map(function (record) {
                                return userSearchResultToResult(record, AnalyticsType.RecentPerson);
                            })];
                }
            });
        });
    };
    PeopleSearchClientImpl.prototype.search = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildRequestOptions(this.buildSearchQuery(query.trim()));
                        return [4 /*yield*/, utils.requestService(this.serviceConfig, options)];
                    case 1:
                        response = _a.sent();
                        if (response.errors) {
                            throw new Error(makeGraphqlErrorMessage(response.errors));
                        }
                        if (!response.data || !response.data.UserSearch) {
                            throw new Error('PeopleSearchClient: Response data missing');
                        }
                        return [2 /*return*/, response.data.UserSearch.map(function (record) {
                                return userSearchResultToResult(record, AnalyticsType.ResultPerson);
                            })];
                }
            });
        });
    };
    return PeopleSearchClientImpl;
}());
export default PeopleSearchClientImpl;
function makeGraphqlErrorMessage(errors) {
    var firstError = errors[0];
    return firstError.category + ": " + firstError.message;
}
function userSearchResultToResult(searchResult, analyticsType) {
    var mention = searchResult.nickname || searchResult.fullName;
    return {
        resultType: ResultType.PersonResult,
        resultId: 'people-' + searchResult.id,
        name: searchResult.fullName,
        href: '/people/' + searchResult.id,
        avatarUrl: searchResult.avatarUrl,
        contentType: ContentType.Person,
        analyticsType: analyticsType,
        mentionName: mention,
        presenceMessage: searchResult.title,
    };
}
//# sourceMappingURL=PeopleSearchClient.js.map