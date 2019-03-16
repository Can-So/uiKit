import * as tslib_1 from "tslib";
import * as React from 'react';
import { injectIntl, FormattedHTMLMessage, } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';
import { EMPTY_CROSS_PRODUCT_SEARCH_RESPONSE, } from '../../api/CrossProductSearchClient';
import { Scope } from '../../api/types';
import { SearchScreenCounter } from '../../util/ScreenCounter';
import { ConfluenceAdvancedSearchTypes, redirectToConfluenceAdvancedSearch, handlePromiseError, } from '../SearchResultsUtil';
import performanceNow from '../../util/performance-now';
import QuickSearchContainer from '../common/QuickSearchContainer';
import { messages } from '../../messages';
import { sliceResults } from './ConfluenceSearchResultsMapper';
import NoResultsState from './NoResultsState';
import SearchResultsComponent from '../common/SearchResults';
import { getConfluenceAdvancedSearchLink } from '../SearchResultsUtil';
import AdvancedSearchGroup from './AdvancedSearchGroup';
import { mapRecentResultsToUIGroups, mapSearchResultsToUIGroups, } from './ConfluenceSearchResultsMapper';
var LOGGER_NAME = 'AK.GlobalSearch.ConfluenceQuickSearchContainer';
/**
 * Container Component that handles the data fetching when the user interacts with Search.
 */
var ConfluenceQuickSearchContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ConfluenceQuickSearchContainer, _super);
    function ConfluenceQuickSearchContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.screenCounters = {
            preQueryScreenCounter: new SearchScreenCounter(),
            postQueryScreenCounter: new SearchScreenCounter(),
        };
        _this.handleSearchSubmit = function (event, searchSessionId) {
            var _a = _this.props.onAdvancedSearch, onAdvancedSearch = _a === void 0 ? function () { } : _a;
            var target = event.target;
            var query = target.value;
            var defaultPrevented = false;
            onAdvancedSearch(Object.assign({}, event, {
                preventDefault: function () {
                    defaultPrevented = true;
                    event.preventDefault();
                    event.stopPropagation();
                },
                stopPropagation: function () { },
            }), ConfluenceAdvancedSearchTypes.Content, query, searchSessionId);
            if (!defaultPrevented) {
                redirectToConfluenceAdvancedSearch(query);
            }
        };
        _this.handleSearchErrorAnalyticsThunk = function (source) { return function (error) {
            _this.handleSearchErrorAnalytics(error, source);
            _this.props.logger.safeError(LOGGER_NAME, "error in promise " + source, error);
        }; };
        _this.getSearchResults = function (query, sessionId, startTime) {
            var useCPUSForPeopleResults = _this.props.useCPUSForPeopleResults;
            var confXpSearchPromise = handlePromiseError(_this.searchCrossProductConfluence(query, sessionId), EMPTY_CROSS_PRODUCT_SEARCH_RESPONSE, _this.handleSearchErrorAnalyticsThunk('xpsearch-confluence'));
            var searchPeoplePromise = _this.searchPeople(query, sessionId);
            var mapPromiseToPerformanceTime = function (p) {
                return p.then(function () { return performanceNow() - startTime; });
            };
            return Promise.all([
                confXpSearchPromise,
                searchPeoplePromise,
                mapPromiseToPerformanceTime(confXpSearchPromise),
                mapPromiseToPerformanceTime(searchPeoplePromise),
            ]).then(function (_a) {
                var _b = tslib_1.__read(_a, 4), xpsearchResults = _b[0], peopleResults = _b[1], confSearchElapsedMs = _b[2], peopleElapsedMs = _b[3];
                return ({
                    results: {
                        objects: xpsearchResults.results.get(Scope.ConfluencePageBlogAttachment) ||
                            [],
                        spaces: xpsearchResults.results.get(Scope.ConfluenceSpace) || [],
                        people: useCPUSForPeopleResults
                            ? xpsearchResults.results.get(Scope.People) || []
                            : peopleResults,
                    },
                    timings: {
                        confSearchElapsedMs: confSearchElapsedMs,
                        peopleElapsedMs: peopleElapsedMs,
                    },
                });
            });
        };
        _this.getAbTestData = function (sessionId) {
            return _this.props.crossProductSearchClient.getAbTestData(Scope.ConfluencePageBlog, {
                sessionId: sessionId,
            });
        };
        _this.getRecentItems = function (sessionId) {
            var _a = _this.props, confluenceClient = _a.confluenceClient, peopleSearchClient = _a.peopleSearchClient;
            var recentActivityPromisesMap = {
                'recent-confluence-items': confluenceClient.getRecentItems(sessionId),
                'recent-confluence-spaces': confluenceClient.getRecentSpaces(sessionId),
                'recent-people': peopleSearchClient.getRecentPeople(),
            };
            var recentActivityPromises = Object.keys(recentActivityPromisesMap).map(function (key) {
                return handlePromiseError(recentActivityPromisesMap[key], [], _this.handleSearchErrorAnalyticsThunk(key));
            });
            return Promise.all(recentActivityPromises).then(function (_a) {
                var _b = tslib_1.__read(_a, 3), recentlyViewedPages = _b[0], recentlyViewedSpaces = _b[1], recentlyInteractedPeople = _b[2];
                return ({
                    results: {
                        objects: recentlyViewedPages,
                        spaces: recentlyViewedSpaces,
                        people: recentlyInteractedPeople,
                    },
                });
            });
        };
        _this.getSearchResultsComponent = function (_a) {
            var retrySearch = _a.retrySearch, latestSearchQuery = _a.latestSearchQuery, isError = _a.isError, searchResults = _a.searchResults, isLoading = _a.isLoading, recentItems = _a.recentItems, keepPreQueryState = _a.keepPreQueryState, searchSessionId = _a.searchSessionId;
            var _b = _this.props.onAdvancedSearch, onAdvancedSearch = _b === void 0 ? function () { } : _b;
            return (React.createElement(SearchResultsComponent, tslib_1.__assign({ query: latestSearchQuery, isError: isError, isLoading: isLoading, retrySearch: retrySearch, keepPreQueryState: keepPreQueryState, searchSessionId: searchSessionId }, _this.screenCounters, { referralContextIdentifiers: _this.props.referralContextIdentifiers, renderNoRecentActivity: function () { return (React.createElement(FormattedHTMLMessage, tslib_1.__assign({}, messages.no_recent_activity_body, { values: { url: getConfluenceAdvancedSearchLink() } }))); }, renderAdvancedSearchGroup: function (analyticsData) { return (React.createElement(AdvancedSearchGroup, { key: "advanced", query: latestSearchQuery, analyticsData: analyticsData, onClick: function (event, entity) {
                        return onAdvancedSearch(event, entity, latestSearchQuery, searchSessionId);
                    } })); }, getPreQueryGroups: function () { return mapRecentResultsToUIGroups(recentItems); }, getPostQueryGroups: function () { return mapSearchResultsToUIGroups(searchResults); }, renderNoResult: function () { return (React.createElement(NoResultsState, { query: latestSearchQuery, onClick: function (event, entity) {
                        return onAdvancedSearch(event, entity, latestSearchQuery, searchSessionId);
                    } })); } })));
        };
        return _this;
    }
    ConfluenceQuickSearchContainer.prototype.searchCrossProductConfluence = function (query, sessionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, crossProductSearchClient, useCPUSForPeopleResults, referralContextIdentifiers, scopes, referrerId, results;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, crossProductSearchClient = _a.crossProductSearchClient, useCPUSForPeopleResults = _a.useCPUSForPeopleResults, referralContextIdentifiers = _a.referralContextIdentifiers;
                        scopes = [Scope.ConfluencePageBlogAttachment, Scope.ConfluenceSpace];
                        if (useCPUSForPeopleResults) {
                            scopes.push(Scope.People);
                        }
                        referrerId = referralContextIdentifiers && referralContextIdentifiers.searchReferrerId;
                        return [4 /*yield*/, crossProductSearchClient.search(query, { sessionId: sessionId, referrerId: referrerId }, scopes)];
                    case 1:
                        results = _b.sent();
                        return [2 /*return*/, results];
                }
            });
        });
    };
    ConfluenceQuickSearchContainer.prototype.searchPeople = function (query, sessionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, useCPUSForPeopleResults, useQuickNavForPeopleResults, confluenceClient, peopleSearchClient;
            return tslib_1.__generator(this, function (_b) {
                _a = this.props, useCPUSForPeopleResults = _a.useCPUSForPeopleResults, useQuickNavForPeopleResults = _a.useQuickNavForPeopleResults, confluenceClient = _a.confluenceClient, peopleSearchClient = _a.peopleSearchClient;
                if (useQuickNavForPeopleResults) {
                    return [2 /*return*/, handlePromiseError(confluenceClient.searchPeopleInQuickNav(query, sessionId), [], this.handleSearchErrorAnalyticsThunk('search-people-quicknav'))];
                }
                // people results will be returned by xpsearch
                if (useCPUSForPeopleResults) {
                    return [2 /*return*/, Promise.resolve([])];
                }
                // fall back to directory search
                return [2 /*return*/, handlePromiseError(peopleSearchClient.search(query), [], this.handleSearchErrorAnalyticsThunk('search-people'))];
            });
        });
    };
    // TODO extract
    ConfluenceQuickSearchContainer.prototype.handleSearchErrorAnalytics = function (error, source) {
        var firePrivateAnalyticsEvent = this.props.firePrivateAnalyticsEvent;
        if (firePrivateAnalyticsEvent) {
            try {
                firePrivateAnalyticsEvent('atlassian.fabric.global-search.search-error', {
                    name: error.name,
                    message: error.message,
                    source: source,
                });
            }
            catch (e) {
                this.props.logger.safeError(LOGGER_NAME, 'Can not fire event atlassian.fabric.global-search.search-error', e);
            }
        }
    };
    ConfluenceQuickSearchContainer.prototype.render = function () {
        var _a = this.props, linkComponent = _a.linkComponent, isSendSearchTermsEnabled = _a.isSendSearchTermsEnabled, logger = _a.logger;
        return (React.createElement(QuickSearchContainer, { placeholder: this.props.intl.formatMessage(messages.confluence_search_placeholder), linkComponent: linkComponent, getSearchResultsComponent: this.getSearchResultsComponent, getRecentItems: this.getRecentItems, getSearchResults: this.getSearchResults, getAbTestData: this.getAbTestData, handleSearchSubmit: this.handleSearchSubmit, isSendSearchTermsEnabled: isSendSearchTermsEnabled, getDisplayedResults: sliceResults, logger: logger }));
    };
    return ConfluenceQuickSearchContainer;
}(React.Component));
export { ConfluenceQuickSearchContainer };
export default injectIntl(withAnalytics(ConfluenceQuickSearchContainer, {}, {}));
//# sourceMappingURL=ConfluenceQuickSearchContainer.js.map