import * as tslib_1 from "tslib";
import * as React from 'react';
import { withAnalytics } from '@atlaskit/analytics';
import * as uuid from 'uuid/v4';
import GlobalQuickSearch from '../GlobalQuickSearch';
import { Scope } from '../../api/types';
import HomeSearchResults from './HomeSearchResults';
import settlePromises from '../../util/settle-promises';
/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
var HomeQuickSearchContainer = /** @class */ (function (_super) {
    tslib_1.__extends(HomeQuickSearchContainer, _super);
    function HomeQuickSearchContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleSearch = function (query) {
            _this.setState({
                latestSearchQuery: query,
            });
            if (query.length === 0) {
                // reset search results so that internal state between query and results stays consistent
                _this.setState({
                    isLoading: false,
                    isError: false,
                    keepPreQueryState: true,
                    recentResults: [],
                    jiraResults: [],
                    confluenceResults: [],
                });
            }
            else {
                _this.doSearch(query);
            }
        };
        _this.doSearch = function (query) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var searchRecentPromise, searchCrossProductPromise, searchPeoplePromise;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                searchRecentPromise = this.searchRecent(query);
                searchCrossProductPromise = this.searchCrossProduct(query);
                searchPeoplePromise = this.searchPeople(query);
                // trigger error analytics when a search fails
                searchRecentPromise.catch(this.handleSearchErrorAnalytics('recent'));
                searchCrossProductPromise.catch(this.handleSearchErrorAnalytics('xpsearch'));
                searchPeoplePromise.catch(this.handleSearchErrorAnalytics('people'));
                /*
                 * Handle error state: Only show the error state when searching recent and xpsearch together fails.
                 * For a better degraded experience we still want to display partial results when it makes sense.
                 * So, if only recent or if only people search fails we can still display xpsearch results. However, if recent AND xpsearch
                 * fails, then we show the error state.
                 */
                (function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var criticalPromises, promiseResults, allCriticalPromisesFailed;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                criticalPromises = [searchRecentPromise, searchCrossProductPromise];
                                return [4 /*yield*/, settlePromises(criticalPromises)];
                            case 1:
                                promiseResults = _a.sent();
                                allCriticalPromisesFailed = promiseResults.every(function (p) { return p instanceof Error; });
                                this.setState({
                                    isError: allCriticalPromisesFailed,
                                });
                                return [2 /*return*/];
                        }
                    });
                }); })();
                // handle loading state. true at the beginning, false only after all promises have settled.
                (function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, , 2, 3]);
                                this.setState({
                                    isLoading: true,
                                });
                                return [4 /*yield*/, settlePromises([
                                        searchRecentPromise,
                                        searchCrossProductPromise,
                                        searchPeoplePromise,
                                    ])];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                this.setState({
                                    isLoading: false,
                                    keepPreQueryState: false,
                                });
                                return [7 /*endfinally*/];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })();
                return [2 /*return*/];
            });
        }); };
        _this.handleGetRecentItems = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.setState;
                        _b = {};
                        return [4 /*yield*/, this.props.recentSearchClient.getRecentItems()];
                    case 1:
                        _a.apply(this, [(_b.recentlyViewedItems = _c.sent(),
                                _b)]);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.retrySearch = function () {
            _this.handleSearch(_this.state.latestSearchQuery);
        };
        _this.state = {
            isLoading: false,
            isError: false,
            keepPreQueryState: true,
            latestSearchQuery: '',
            searchSessionId: uuid(),
            recentlyViewedItems: [],
            recentResults: [],
            jiraResults: [],
            confluenceResults: [],
            peopleResults: [],
        };
        return _this;
    }
    HomeQuickSearchContainer.prototype.searchRecent = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var results;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.recentSearchClient.search(query)];
                    case 1:
                        results = _a.sent();
                        if (this.state.latestSearchQuery === query) {
                            this.setState({
                                recentResults: results,
                            });
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    HomeQuickSearchContainer.prototype.searchCrossProduct = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var results;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.crossProductSearchClient.search(query, { sessionId: this.state.searchSessionId }, [Scope.ConfluencePageBlog, Scope.JiraIssue])];
                    case 1:
                        results = _a.sent();
                        if (this.state.latestSearchQuery === query) {
                            this.setState({
                                jiraResults: results.results.get(Scope.JiraIssue) || [],
                                confluenceResults: results.results.get(Scope.ConfluencePageBlog) || [],
                            });
                        }
                        return [2 /*return*/, results.results];
                }
            });
        });
    };
    HomeQuickSearchContainer.prototype.searchPeople = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var results;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.peopleSearchClient.search(query)];
                    case 1:
                        results = _a.sent();
                        if (this.state.latestSearchQuery === query) {
                            this.setState({
                                peopleResults: results,
                            });
                        }
                        return [2 /*return*/, results];
                }
            });
        });
    };
    HomeQuickSearchContainer.prototype.handleSearchErrorAnalytics = function (source) {
        var _this = this;
        return function (error) {
            var firePrivateAnalyticsEvent = _this.props.firePrivateAnalyticsEvent;
            if (firePrivateAnalyticsEvent) {
                firePrivateAnalyticsEvent('atlassian.fabric.global-search.search-error', {
                    name: error.name,
                    message: error.message,
                    source: source,
                });
            }
        };
    };
    HomeQuickSearchContainer.prototype.render = function () {
        var linkComponent = this.props.linkComponent;
        var _a = this.state, latestSearchQuery = _a.latestSearchQuery, isLoading = _a.isLoading, isError = _a.isError, keepPreQueryState = _a.keepPreQueryState, recentlyViewedItems = _a.recentlyViewedItems, recentResults = _a.recentResults, jiraResults = _a.jiraResults, confluenceResults = _a.confluenceResults, peopleResults = _a.peopleResults, searchSessionId = _a.searchSessionId;
        return (React.createElement(GlobalQuickSearch, { onMount: this.handleGetRecentItems, onSearch: this.handleSearch, isLoading: isLoading, linkComponent: linkComponent, searchSessionId: searchSessionId },
            React.createElement(HomeSearchResults, { query: latestSearchQuery, isLoading: isLoading, isError: isError, keepPreQueryState: keepPreQueryState, retrySearch: this.retrySearch, recentlyViewedItems: recentlyViewedItems, recentResults: recentResults, jiraResults: jiraResults, confluenceResults: confluenceResults, peopleResults: peopleResults })));
    };
    return HomeQuickSearchContainer;
}(React.Component));
export { HomeQuickSearchContainer };
export default withAnalytics(HomeQuickSearchContainer, {}, {});
//# sourceMappingURL=HomeQuickSearchContainer.js.map