var _a;
export var ADVANCED_CONFLUENCE_SEARCH_RESULT_ID = 'search_confluence';
export var ADVANCED_JIRA_SEARCH_RESULT_ID = 'search_jira';
export var ADVANCED_PEOPLE_SEARCH_RESULT_ID = 'search_people';
export var JiraEntityTypes;
(function (JiraEntityTypes) {
    JiraEntityTypes["Projects"] = "projects";
    JiraEntityTypes["Issues"] = "issues";
    JiraEntityTypes["Boards"] = "boards";
    JiraEntityTypes["Filters"] = "filters";
    JiraEntityTypes["People"] = "people";
})(JiraEntityTypes || (JiraEntityTypes = {}));
export var ConfluenceAdvancedSearchTypes;
(function (ConfluenceAdvancedSearchTypes) {
    ConfluenceAdvancedSearchTypes["Content"] = "content";
    ConfluenceAdvancedSearchTypes["People"] = "people";
})(ConfluenceAdvancedSearchTypes || (ConfluenceAdvancedSearchTypes = {}));
var JIRA_ADVANCED_SEARCH_URLS = (_a = {},
    _a[JiraEntityTypes.Issues] = function (query) {
        return "/secure/QuickSearch.jspa?searchString=" + query;
    },
    _a[JiraEntityTypes.Boards] = function (query) {
        return "/secure/ManageRapidViews.jspa?contains=" + query;
    },
    _a[JiraEntityTypes.Filters] = function (query) {
        return "/secure/ManageFilters.jspa?Search=Search&filterView=search&name=" + query;
    },
    _a[JiraEntityTypes.Projects] = function (query) { return "/projects?contains=" + query; },
    _a[JiraEntityTypes.People] = function (query) { return "/people/search?q=" + query; },
    _a);
export var isAdvancedSearchResult = function (resultId) {
    return [
        ADVANCED_CONFLUENCE_SEARCH_RESULT_ID,
        ADVANCED_JIRA_SEARCH_RESULT_ID,
        ADVANCED_PEOPLE_SEARCH_RESULT_ID,
    ].some(function (advancedResultId) { return advancedResultId === resultId; });
};
export function getConfluenceAdvancedSearchLink(query) {
    var queryString = query ? "?queryString=" + encodeURIComponent(query) : '';
    return "/wiki/dosearchsite.action" + queryString;
}
export function getJiraAdvancedSearchUrl(entityType, query) {
    var getUrl = JIRA_ADVANCED_SEARCH_URLS[entityType];
    return getUrl(query || '');
}
export function redirectToConfluenceAdvancedSearch(query) {
    if (query === void 0) { query = ''; }
    // XPSRCH-891: this breaks SPA navigation. Consumer needs to pass in a redirect/navigate function.
    window.location.assign(getConfluenceAdvancedSearchLink(query));
}
export function redirectToJiraAdvancedSearch(entityType, query) {
    if (query === void 0) { query = ''; }
    window.location.assign(getJiraAdvancedSearchUrl(entityType, query));
}
export function take(array, n) {
    return (array || []).slice(0, n);
}
export function isEmpty(array) {
    return array.length === 0;
}
export function objectValues(object) {
    return Object.keys(object || {}).map(function (key) { return object[key]; });
}
/**
 *
 * Gracefully handle promise catch and returning default value
 * @param promise promise to handle its catch block
 * @param defaultValue value returned by the promise in case of error
 * @param errorHandler function to be called in case of promise rejection
 */
export function handlePromiseError(promise, defaultValue, errorHandler) {
    return promise.catch(function (error) {
        try {
            if (errorHandler) {
                errorHandler(error);
            }
        }
        catch (e) { }
        return defaultValue;
    });
}
//# sourceMappingURL=SearchResultsUtil.js.map