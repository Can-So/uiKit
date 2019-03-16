import * as tslib_1 from "tslib";
import { ResultType, AnalyticsType, ContentType, } from '../model/Result';
import { utils, } from '@atlaskit/util-service-support';
var RecentSearchClientImpl = /** @class */ (function () {
    function RecentSearchClientImpl(url, cloudId) {
        this.serviceConfig = { url: url };
        this.cloudId = cloudId;
    }
    RecentSearchClientImpl.prototype.getRecentItems = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var recentItems;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchRecentItems()];
                    case 1:
                        recentItems = _a.sent();
                        return [2 /*return*/, recentItems.map(recentItemToResult)];
                }
            });
        });
    };
    RecentSearchClientImpl.prototype.search = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var recentItems, filteredRecentItems;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchRecentItems()];
                    case 1:
                        recentItems = _a.sent();
                        filteredRecentItems = this.filterItems(recentItems, query);
                        return [2 /*return*/, filteredRecentItems.map(recentItemToResult)];
                }
            });
        });
    };
    RecentSearchClientImpl.prototype.filterItems = function (items, query) {
        if (query.length === 0) {
            return [];
        }
        query = query.toLowerCase();
        return items.filter(function (item) {
            return item.name.toLowerCase().indexOf(query) > -1;
        });
    };
    RecentSearchClientImpl.prototype.fetchRecentItems = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var options, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.getRecentRequestPromise) {
                            options = {
                                path: 'api/client/recent',
                                queryParams: {
                                    cloudId: this.cloudId,
                                },
                            };
                            this.getRecentRequestPromise = utils.requestService(this.serviceConfig, options);
                        }
                        return [4 /*yield*/, this.getRecentRequestPromise];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    return RecentSearchClientImpl;
}());
export default RecentSearchClientImpl;
/**
 * Splits the title of a recent jira item into issue key and title.
 *
 * E.g. "HOME-123 Fix HOT issue" becomes "HOME-123" and "Fix HOT issue".
 *
 * We can use a simplified issue key regex here because we know that the issue will be
 * located at the very beginning of the string (due to the way the /recent API works).
 *
 */
export function splitIssueKeyAndName(name) {
    var issueKeyMatcher = /^[A-Z]{1,10}-\d+/;
    var matches = name.match(issueKeyMatcher);
    var objectKey;
    var nameWithoutIssueKey = name;
    if (matches !== null && matches.length > 0) {
        objectKey = matches[0];
        nameWithoutIssueKey = name.substring(objectKey.length).trim();
    }
    return {
        name: nameWithoutIssueKey,
        objectKey: objectKey,
    };
}
function maybeSplitIssueKeyAndName(recentItem) {
    if (recentItem.provider === 'jira') {
        return splitIssueKeyAndName(recentItem.name);
    }
    else {
        return {
            name: recentItem.name,
            objectKey: undefined,
        };
    }
}
function recentItemToResult(recentItem) {
    var _a = maybeSplitIssueKeyAndName(recentItem), name = _a.name, objectKey = _a.objectKey;
    var baseResult = {
        resultId: "recent-" + recentItem.objectId,
        avatarUrl: recentItem.iconUrl,
        name: name,
        href: recentItem.url,
        containerName: recentItem.container,
    };
    if (recentItem.provider === 'jira') {
        var jiraResult = tslib_1.__assign({ objectKey: objectKey, resultType: ResultType.JiraObjectResult, analyticsType: AnalyticsType.RecentJira, contentType: ContentType.JiraIssue }, baseResult);
        return jiraResult;
    }
    else {
        var confluenceResult = tslib_1.__assign({ resultType: ResultType.ConfluenceObjectResult, analyticsType: AnalyticsType.RecentConfluence, containerId: 'UNAVAILABLE', contentType: recentItem.objectId && recentItem.objectId.includes(':blogpost/')
                ? ContentType.ConfluenceBlogpost
                : ContentType.ConfluencePage }, baseResult);
        return confluenceResult;
    }
}
//# sourceMappingURL=RecentSearchClient.js.map