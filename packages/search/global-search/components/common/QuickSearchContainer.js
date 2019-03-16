import * as tslib_1 from "tslib";
import * as React from 'react';
import * as uuid from 'uuid/v4';
import GlobalQuickSearch from '../GlobalQuickSearch';
import performanceNow from '../../util/performance-now';
import { buildShownEventDetails, } from '../../util/analytics-util';
import { firePreQueryShownEvent, firePostQueryShownEvent, fireExperimentExposureEvent, } from '../../util/analytics-event-helper';
import { withAnalyticsEvents } from '@findable/analytics-next';
import { objectValues } from '../SearchResultsUtil';
var resultMapToArray = function (results) {
    return objectValues(results).reduce(function (acc, value) { return tslib_1.__spread(acc, [value]); }, []);
};
var LOGGER_NAME = 'AK.GlobalSearch.QuickSearchContainer';
/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
var QuickSearchContainer = /** @class */ (function (_super) {
    tslib_1.__extends(QuickSearchContainer, _super);
    function QuickSearchContainer(props) {
        var _this = _super.call(this, props) || this;
        // used to terminate if component is unmounted while waiting for a promise
        _this.unmounted = false;
        _this.doSearch = function (query) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var startTime, _a, results, timings_1, elapsedMs_1, e_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        startTime = performanceNow();
                        this.setState({
                            isLoading: true,
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.props.getSearchResults(query, this.state.searchSessionId, startTime)];
                    case 2:
                        _a = _b.sent(), results = _a.results, timings_1 = _a.timings;
                        if (this.unmounted) {
                            return [2 /*return*/];
                        }
                        elapsedMs_1 = performanceNow() - startTime;
                        if (this.state.latestSearchQuery === query) {
                            this.setState({
                                searchResults: results,
                                isError: false,
                                isLoading: false,
                                keepPreQueryState: false,
                            }, function () {
                                _this.fireShownPostQueryEvent(startTime, elapsedMs_1, _this.state.searchResults || {}, timings_1 || {}, _this.state.searchSessionId, _this.state.latestSearchQuery);
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        this.props.logger.safeError(LOGGER_NAME, 'error while getting search results', e_1);
                        this.setState({
                            isError: true,
                            isLoading: false,
                            keepPreQueryState: false,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.fetchAbTestData = function (searchSessionId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var getAbTestData, startTime, abTest, elapsedMs;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getAbTestData = this.props.getAbTestData;
                        startTime = performanceNow();
                        return [4 /*yield*/, getAbTestData(searchSessionId)];
                    case 1:
                        abTest = _a.sent();
                        elapsedMs = performanceNow() - startTime;
                        return [2 /*return*/, {
                                elapsedMs: elapsedMs,
                                abTest: abTest,
                            }];
                }
            });
        }); };
        _this.fireExperimentExposureEvent = function (searchSessionId, abTestPromise) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, createAnalyticsEvent, logger, abTest;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, createAnalyticsEvent = _a.createAnalyticsEvent, logger = _a.logger;
                        return [4 /*yield*/, abTestPromise];
                    case 1:
                        abTest = _b.sent();
                        if (createAnalyticsEvent) {
                            try {
                                if (abTest) {
                                    fireExperimentExposureEvent(abTest, searchSessionId, createAnalyticsEvent);
                                }
                            }
                            catch (e) {
                                logger.safeWarn(LOGGER_NAME, 'error while getting abtest data', e);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.fireShownPreQueryEvent = function (searchSessionId, recentItems, requestStartTime, experimentRequestDurationMs, renderStartTime) {
            var _a = _this.props, createAnalyticsEvent = _a.createAnalyticsEvent, getDisplayedResults = _a.getDisplayedResults;
            if (createAnalyticsEvent && getDisplayedResults) {
                var elapsedMs = requestStartTime
                    ? performanceNow() - requestStartTime
                    : 0;
                var renderTime = renderStartTime
                    ? performanceNow() - renderStartTime
                    : 0;
                var resultsArray = resultMapToArray(getDisplayedResults(recentItems));
                var eventAttributes = buildShownEventDetails.apply(void 0, tslib_1.__spread(resultsArray));
                firePreQueryShownEvent(eventAttributes, elapsedMs, renderTime, searchSessionId, createAnalyticsEvent, experimentRequestDurationMs);
            }
        };
        _this.fireShownPostQueryEvent = function (startTime, elapsedMs, searchResults, timings, searchSessionId, latestSearchQuery) {
            var performanceTiming = tslib_1.__assign({ startTime: startTime,
                elapsedMs: elapsedMs }, timings);
            var _a = _this.props, createAnalyticsEvent = _a.createAnalyticsEvent, getDisplayedResults = _a.getDisplayedResults;
            if (createAnalyticsEvent && getDisplayedResults) {
                var resultsArray = resultMapToArray(getDisplayedResults(searchResults));
                var resultsDetails = buildShownEventDetails.apply(void 0, tslib_1.__spread(resultsArray));
                firePostQueryShownEvent(resultsDetails, performanceTiming, searchSessionId, latestSearchQuery, createAnalyticsEvent);
            }
        };
        _this.handleSearch = function (newLatestSearchQuery) {
            if (_this.state.latestSearchQuery !== newLatestSearchQuery) {
                _this.setState({
                    latestSearchQuery: newLatestSearchQuery,
                    isLoading: true,
                });
            }
            if (newLatestSearchQuery.length === 0) {
                // reset search results so that internal state between query and results stays consistent
                _this.setState({
                    isError: false,
                    isLoading: false,
                    keepPreQueryState: true,
                }, function () {
                    return _this.fireShownPreQueryEvent(_this.state.searchSessionId, _this.state.recentItems || {});
                });
            }
            else {
                _this.doSearch(newLatestSearchQuery);
            }
        };
        _this.retrySearch = function () {
            _this.handleSearch(_this.state.latestSearchQuery);
        };
        _this.handleMount = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var startTime, abTestPromise, results, renderStartTime_1, e_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = performanceNow();
                        if (!this.state.isLoading) {
                            this.setState({
                                isLoading: true,
                            });
                        }
                        abTestPromise = this.fetchAbTestData(this.state.searchSessionId);
                        this.fireExperimentExposureEvent(this.state.searchSessionId, abTestPromise.then(function (_a) {
                            var abTest = _a.abTest;
                            return abTest;
                        }));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.props.getRecentItems(this.state.searchSessionId)];
                    case 2:
                        results = (_a.sent()).results;
                        renderStartTime_1 = performanceNow();
                        if (this.unmounted) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            recentItems: results,
                            isLoading: false,
                        }, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var experimentRequestDurationMs;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, abTestPromise];
                                    case 1:
                                        experimentRequestDurationMs = (_a.sent()).elapsedMs;
                                        this.fireShownPreQueryEvent(this.state.searchSessionId, this.state.recentItems || {}, startTime, experimentRequestDurationMs, renderStartTime_1);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        this.props.logger.safeError(LOGGER_NAME, 'error while getting recent items', e_2);
                        if (this.state.isLoading) {
                            this.setState({
                                isLoading: false,
                            });
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.handleSearchSubmit = function (event) {
            var handleSearchSubmit = _this.props.handleSearchSubmit;
            if (handleSearchSubmit) {
                handleSearchSubmit(event, _this.state.searchSessionId);
            }
        };
        _this.state = {
            isLoading: true,
            isError: false,
            latestSearchQuery: '',
            searchSessionId: uuid(),
            recentItems: null,
            searchResults: null,
            keepPreQueryState: true,
        };
        return _this;
    }
    QuickSearchContainer.prototype.componentDidCatch = function (error, info) {
        this.props.logger.safeError(LOGGER_NAME, 'component did catch an error', {
            error: error,
            info: info,
            safeState: {
                searchSessionId: this.state.searchSessionId,
                latestSearchQuery: !!this.state.latestSearchQuery,
                isLoading: this.state.isLoading,
                isError: this.state.isError,
                keepPreQueryState: this.state.keepPreQueryState,
                recentItems: !!this.state.recentItems,
                searchResults: !!this.state.searchResults,
            },
        });
        this.setState({
            isError: true,
        });
    };
    QuickSearchContainer.prototype.componentWillUnmount = function () {
        this.unmounted = true;
    };
    QuickSearchContainer.prototype.render = function () {
        var _a = this.props, linkComponent = _a.linkComponent, isSendSearchTermsEnabled = _a.isSendSearchTermsEnabled, getSearchResultsComponent = _a.getSearchResultsComponent, placeholder = _a.placeholder, selectedResultId = _a.selectedResultId, onSelectedResultIdChanged = _a.onSelectedResultIdChanged;
        var _b = this.state, isLoading = _b.isLoading, searchSessionId = _b.searchSessionId, latestSearchQuery = _b.latestSearchQuery, isError = _b.isError, searchResults = _b.searchResults, recentItems = _b.recentItems, keepPreQueryState = _b.keepPreQueryState;
        return (React.createElement(GlobalQuickSearch, { onMount: this.handleMount, onSearch: this.handleSearch, onSearchSubmit: this.handleSearchSubmit, isLoading: isLoading, placeholder: placeholder, linkComponent: linkComponent, searchSessionId: searchSessionId, isSendSearchTermsEnabled: isSendSearchTermsEnabled, selectedResultId: selectedResultId, onSelectedResultIdChanged: onSelectedResultIdChanged }, getSearchResultsComponent({
            retrySearch: this.retrySearch,
            latestSearchQuery: latestSearchQuery,
            isError: isError,
            searchResults: searchResults,
            isLoading: isLoading,
            recentItems: recentItems,
            keepPreQueryState: keepPreQueryState,
            searchSessionId: searchSessionId,
        })));
    };
    QuickSearchContainer.defaultProps = {
        getDisplayedResults: function (results) { return results || {}; },
    };
    return QuickSearchContainer;
}(React.Component));
export { QuickSearchContainer };
export default withAnalyticsEvents()(QuickSearchContainer);
//# sourceMappingURL=QuickSearchContainer.js.map