import * as tslib_1 from "tslib";
import { ResultType, AnalyticsType, ContentType, } from '../model/Result';
import { utils, } from '@atlaskit/util-service-support';
import * as URI from 'urijs';
import * as unescapeHtml from 'unescape';
var RECENT_PAGES_PATH = 'rest/recentlyviewed/1.0/recent';
var RECENT_SPACE_PATH = 'rest/recentlyviewed/1.0/recent/spaces';
var QUICK_NAV_PATH = 'rest/quicknav/1/search';
var QUICKNAV_CLASSNAME_PERSON = 'content-type-userinfo';
var ConfluenceClientImpl = /** @class */ (function () {
    function ConfluenceClientImpl(url, cloudId) {
        this.RESULT_LIMIT = 10;
        this.serviceConfig = { url: url };
        this.cloudId = cloudId;
    }
    ConfluenceClientImpl.prototype.searchPeopleInQuickNav = function (query, searchSessionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var quickNavResponse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createQuickNavRequestPromise(query)];
                    case 1:
                        quickNavResponse = _a.sent();
                        return [2 /*return*/, quickNavResultsToResults(quickNavResponse.contentNameMatches, searchSessionId)];
                }
            });
        });
    };
    ConfluenceClientImpl.prototype.getRecentItems = function (searchSessionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var recentPages, baseUrl;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createRecentRequestPromise(RECENT_PAGES_PATH)];
                    case 1:
                        recentPages = _a.sent();
                        baseUrl = this.serviceConfig.url;
                        return [2 /*return*/, recentPages.map(function (recentPage) {
                                return recentPageToResult(recentPage, baseUrl, searchSessionId);
                            })];
                }
            });
        });
    };
    ConfluenceClientImpl.prototype.getRecentSpaces = function (searchSessionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var recentSpaces, baseUrl;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createRecentRequestPromise(RECENT_SPACE_PATH)];
                    case 1:
                        recentSpaces = _a.sent();
                        baseUrl = this.serviceConfig.url;
                        return [2 /*return*/, recentSpaces.map(function (recentSpace) {
                                return recentSpaceToResult(recentSpace, baseUrl, searchSessionId);
                            })];
                }
            });
        });
    };
    ConfluenceClientImpl.prototype.createQuickNavRequestPromise = function (query) {
        var options = {
            path: QUICK_NAV_PATH,
            queryParams: {
                query: query.trim(),
            },
        };
        return utils.requestService(this.serviceConfig, options);
    };
    ConfluenceClientImpl.prototype.createRecentRequestPromise = function (path) {
        var options = {
            path: path,
            queryParams: {
                cloudId: this.cloudId,
                limit: this.RESULT_LIMIT,
            },
        };
        return utils.requestService(this.serviceConfig, options);
    };
    return ConfluenceClientImpl;
}());
export default ConfluenceClientImpl;
function recentPageToResult(recentPage, baseUrl, searchSessionId) {
    // add searchSessionId safely
    var href = new URI("" + baseUrl + recentPage.url);
    href.addQuery('search_id', searchSessionId);
    return {
        resultId: recentPage.id,
        name: recentPage.title,
        href: href.toString(),
        containerName: recentPage.space,
        analyticsType: AnalyticsType.RecentConfluence,
        resultType: ResultType.ConfluenceObjectResult,
        contentType: "confluence-" + recentPage.contentType,
        iconClass: recentPage.iconClass,
        containerId: recentPage.spaceKey,
    };
}
function recentSpaceToResult(recentSpace, baseUrl, searchSessionId) {
    return {
        resultId: recentSpace.id,
        name: recentSpace.name,
        href: baseUrl + "/spaces/" + recentSpace.key + "/overview?search_id=" + searchSessionId,
        avatarUrl: recentSpace.icon,
        analyticsType: AnalyticsType.RecentConfluence,
        resultType: ResultType.GenericContainerResult,
        contentType: ContentType.ConfluenceSpace,
    };
}
function quickNavResultToObjectResult(quickNavResult, searchSessionId) {
    // add searchSessionId
    var href = new URI(quickNavResult.href);
    href.addQuery('search_id', searchSessionId);
    return {
        resultId: quickNavResult.id,
        name: unescapeHtml(quickNavResult.name),
        href: href.toString(),
        avatarUrl: quickNavResult.icon,
        resultType: ResultType.PersonResult,
        contentType: ContentType.Person,
        analyticsType: AnalyticsType.ResultPerson,
        mentionName: quickNavResult.name,
        presenceMessage: '',
    };
}
function quickNavResultsToResults(quickNavResultGroups, searchSessionId) {
    var _a;
    // flatten the array as the response comes back as 2d array, then
    var flattenedResults = (_a = []).concat.apply(_a, tslib_1.__spread(quickNavResultGroups));
    // filter out people results
    var isPeopleResult = function (result) {
        return result.className.startsWith(QUICKNAV_CLASSNAME_PERSON);
    };
    var peopleResults = flattenedResults.filter(isPeopleResult);
    // map the results to our representation of a result
    var results = peopleResults.map(function (result) {
        return quickNavResultToObjectResult(result, searchSessionId);
    });
    return results;
}
//# sourceMappingURL=ConfluenceClient.js.map