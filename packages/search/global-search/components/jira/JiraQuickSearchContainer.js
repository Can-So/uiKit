import * as tslib_1 from "tslib";
var _a;
import * as React from 'react';
import { injectIntl, FormattedHTMLMessage, } from 'react-intl';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import { withAnalytics } from '@atlaskit/analytics';
import StickyFooter from '../common/StickyFooter';
import { SearchScreenCounter } from '../../util/ScreenCounter';
import { Scope } from '../../api/types';
import QuickSearchContainer from '../common/QuickSearchContainer';
import { messages } from '../../messages';
import { sliceResults } from './JiraSearchResultsMapper';
import SearchResultsComponent from '../common/SearchResults';
import NoResultsState from './NoResultsState';
import JiraAdvancedSearch from './JiraAdvancedSearch';
import { mapRecentResultsToUIGroups, mapSearchResultsToUIGroups, } from './JiraSearchResultsMapper';
import { handlePromiseError, JiraEntityTypes, redirectToJiraAdvancedSearch, } from '../SearchResultsUtil';
import { ContentType, } from '../../model/Result';
import { getUniqueResultId } from '../ResultList';
import performanceNow from '../../util/performance-now';
import AdvancedIssueSearchLink from './AdvancedIssueSearchLink';
var JIRA_RESULT_LIMIT = 6;
var NoResultsAdvancedSearchContainer = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin-top: ", "px;\n"], ["\n  margin-top: ", "px;\n"])), 4 * gridSize());
var BeforePreQueryStateContainer = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  margin-top: ", "px;\n"], ["\n  margin-top: ", "px;\n"])), gridSize());
var contentTypeToSection = (_a = {},
    _a[ContentType.JiraIssue] = 'issues',
    _a[ContentType.JiraBoard] = 'boards',
    _a[ContentType.JiraFilter] = 'filters',
    _a[ContentType.JiraProject] = 'projects',
    _a);
var scopes = [Scope.JiraIssue, Scope.JiraBoardProjectFilter];
var LOGGER_NAME = 'AK.GlobalSearch.JiraQuickSearchContainer';
/**
 * Container/Stateful Component that handles the data fetching and state handling when the user interacts with Search.
 */
var JiraQuickSearchContainer = /** @class */ (function (_super) {
    tslib_1.__extends(JiraQuickSearchContainer, _super);
    function JiraQuickSearchContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedAdvancedSearchType: JiraEntityTypes.Issues,
        };
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
            }), _this.state.selectedAdvancedSearchType, query, searchSessionId);
            if (!defaultPrevented) {
                redirectToJiraAdvancedSearch(_this.state.selectedAdvancedSearchType, query);
            }
        };
        _this.getSearchResultsComponent = function (_a) {
            var retrySearch = _a.retrySearch, latestSearchQuery = _a.latestSearchQuery, isError = _a.isError, searchResults = _a.searchResults, isLoading = _a.isLoading, recentItems = _a.recentItems, keepPreQueryState = _a.keepPreQueryState, searchSessionId = _a.searchSessionId;
            var query = latestSearchQuery;
            var isPreQuery = !query; // it's true if the query is empty
            var _b = _this.props, referralContextIdentifiers = _b.referralContextIdentifiers, _c = _b.onAdvancedSearch, onAdvancedSearch = _c === void 0 ? function () { } : _c;
            return (React.createElement(SearchResultsComponent, tslib_1.__assign({ query: query, isError: isError, isLoading: isLoading, retrySearch: retrySearch, keepPreQueryState: keepPreQueryState, searchSessionId: searchSessionId }, _this.screenCounters, { referralContextIdentifiers: referralContextIdentifiers, renderNoRecentActivity: function () { return (React.createElement(React.Fragment, null,
                    React.createElement(FormattedHTMLMessage, tslib_1.__assign({}, messages.jira_no_recent_activity_body)),
                    React.createElement(NoResultsAdvancedSearchContainer, null,
                        React.createElement(JiraAdvancedSearch, { query: query, analyticsData: { resultsCount: 0, wasOnNoResultsScreen: true }, onClick: function (mouseEvent, entity) {
                                return onAdvancedSearch(mouseEvent, entity, query, searchSessionId);
                            } })))); }, renderAdvancedSearchGroup: function (analyticsData) { return (React.createElement(StickyFooter, { style: { marginTop: 2 * gridSize() + "px" } },
                    React.createElement(JiraAdvancedSearch, { analyticsData: analyticsData, query: query, showKeyboardLozenge: !isPreQuery && !keepPreQueryState, showSearchIcon: true, onClick: function (mouseEvent, entity) {
                            return onAdvancedSearch(mouseEvent, entity, query, searchSessionId);
                        } }))); }, renderBeforePreQueryState: function () { return (React.createElement(BeforePreQueryStateContainer, null,
                    React.createElement(AdvancedIssueSearchLink, { onClick: function (_a) {
                            var event = _a.event;
                            return onAdvancedSearch(event, JiraEntityTypes.Issues, query, searchSessionId);
                        } }))); }, getPreQueryGroups: function () { return mapRecentResultsToUIGroups(recentItems); }, getPostQueryGroups: function () {
                    return mapSearchResultsToUIGroups(searchResults);
                }, renderNoResult: function () { return (React.createElement(NoResultsState, { query: query, onAdvancedSearch: function (mouseEvent, entity) {
                        return onAdvancedSearch(mouseEvent, entity, query, searchSessionId);
                    } })); } })));
        };
        _this.getRecentlyInteractedPeople = function () {
            /*
              the following code is temporarily feature flagged for performance reasons and will be shortly reinstated.
              https://product-fabric.atlassian.net/browse/QS-459
            */
            if (_this.props.disableJiraPreQueryPeopleSearch) {
                return Promise.resolve([]);
            }
            else {
                var peoplePromise = _this.props.peopleSearchClient.getRecentPeople();
                return handlePromiseError(peoplePromise, [], function (error) {
                    return _this.props.logger.safeError(LOGGER_NAME, 'error in recently interacted people promise', error);
                });
            }
        };
        _this.getJiraRecentItems = function (sessionId) {
            var jiraRecentItemsPromise = _this.props.jiraClient
                .getRecentItems(sessionId)
                .then(function (items) {
                return items.reduce(function (acc, item) {
                    if (item.contentType) {
                        var section = contentTypeToSection[item.contentType];
                        acc[section] = [].concat(acc[section] || [], item);
                    }
                    return acc;
                }, {});
            })
                .then(function (_a) {
                var _b = _a.issues, issues = _b === void 0 ? [] : _b, _c = _a.boards, boards = _c === void 0 ? [] : _c, _d = _a.projects, projects = _d === void 0 ? [] : _d, _e = _a.filters, filters = _e === void 0 ? [] : _e;
                return ({
                    objects: issues,
                    containers: tslib_1.__spread(boards, projects, filters),
                });
            });
            return handlePromiseError(jiraRecentItemsPromise, {
                objects: [],
                containers: [],
            }, function (error) {
                return _this.props.logger.safeError(LOGGER_NAME, 'error in recent Jira items promise', error);
            });
        };
        _this.getAbTestData = function (sessionId) {
            return _this.props.crossProductSearchClient.getAbTestData(Scope.JiraIssue, {
                sessionId: sessionId,
            });
        };
        _this.canSearchUsers = function () {
            /*
              the following code is temporarily feature flagged for performance reasons and will be shortly reinstated.
              https://product-fabric.atlassian.net/browse/QS-459
            */
            if (_this.props.disableJiraPreQueryPeopleSearch) {
                return Promise.resolve(false);
            }
            else {
                return handlePromiseError(_this.props.jiraClient.canSearchUsers(), false, function (error) {
                    return _this.props.logger.safeError(LOGGER_NAME, 'error fetching browse user permission', error);
                });
            }
        };
        _this.getRecentItems = function (sessionId) {
            return Promise.all([
                _this.getJiraRecentItems(sessionId),
                _this.getRecentlyInteractedPeople(),
                _this.canSearchUsers(),
            ])
                .then(function (_a) {
                var _b = tslib_1.__read(_a, 3), jiraItems = _b[0], people = _b[1], canSearchUsers = _b[2];
                return tslib_1.__assign({}, jiraItems, { people: canSearchUsers ? people : [] });
            })
                .then(function (results) { return ({ results: results }); });
        };
        _this.getSearchResults = function (query, sessionId, startTime) {
            var referrerId = _this.props.referralContextIdentifiers &&
                _this.props.referralContextIdentifiers.searchReferrerId;
            var crossProductSearchPromise = _this.props.crossProductSearchClient.search(query, { sessionId: sessionId, referrerId: referrerId }, scopes, JIRA_RESULT_LIMIT);
            var searchPeoplePromise = Promise.resolve([]);
            var mapPromiseToPerformanceTime = function (p) {
                return p.then(function () { return performanceNow() - startTime; });
            };
            return Promise.all([
                crossProductSearchPromise,
                searchPeoplePromise,
                mapPromiseToPerformanceTime(crossProductSearchPromise),
                mapPromiseToPerformanceTime(searchPeoplePromise),
                _this.canSearchUsers(),
            ]).then(function (_a) {
                var _b = tslib_1.__read(_a, 5), xpsearchResults = _b[0], peopleResults = _b[1], crossProductSearchElapsedMs = _b[2], peopleElapsedMs = _b[3], canSearchPeople = _b[4];
                _this.highlightMatchingFirstResult(query, xpsearchResults.results.get(Scope.JiraIssue));
                return {
                    results: {
                        objects: xpsearchResults.results.get(Scope.JiraIssue) || [],
                        containers: xpsearchResults.results.get(Scope.JiraBoardProjectFilter) || [],
                        people: canSearchPeople ? peopleResults : [],
                    },
                    timings: {
                        crossProductSearchElapsedMs: crossProductSearchElapsedMs,
                        peopleElapsedMs: peopleElapsedMs,
                    },
                    abTest: xpsearchResults.abTest,
                };
            });
        };
        return _this;
    }
    JiraQuickSearchContainer.prototype.highlightMatchingFirstResult = function (query, issueResults) {
        if (issueResults &&
            issueResults.length > 0 &&
            typeof issueResults[0].objectKey === 'string' &&
            (issueResults[0].objectKey.toLowerCase() === query.toLowerCase() ||
                (!!+query &&
                    issueResults[0].objectKey.toLowerCase().endsWith("" + -query)))) {
            this.setState({
                selectedResultId: getUniqueResultId(issueResults[0]),
            });
        }
    };
    JiraQuickSearchContainer.prototype.handleSelectedResultIdChanged = function (newSelectedId) {
        this.setState({
            selectedResultId: newSelectedId,
        });
    };
    JiraQuickSearchContainer.prototype.render = function () {
        var _this = this;
        var _a = this.props, linkComponent = _a.linkComponent, createAnalyticsEvent = _a.createAnalyticsEvent, isSendSearchTermsEnabled = _a.isSendSearchTermsEnabled, logger = _a.logger;
        var selectedResultId = this.state.selectedResultId;
        return (React.createElement(QuickSearchContainer, { placeholder: this.props.intl.formatMessage(messages.jira_search_placeholder), linkComponent: linkComponent, getDisplayedResults: sliceResults, getSearchResultsComponent: this.getSearchResultsComponent, getRecentItems: this.getRecentItems, getSearchResults: this.getSearchResults, getAbTestData: this.getAbTestData, handleSearchSubmit: this.handleSearchSubmit, createAnalyticsEvent: createAnalyticsEvent, logger: logger, selectedResultId: selectedResultId, onSelectedResultIdChanged: function (newId) {
                return _this.handleSelectedResultIdChanged(newId);
            }, isSendSearchTermsEnabled: isSendSearchTermsEnabled }));
    };
    return JiraQuickSearchContainer;
}(React.Component));
export { JiraQuickSearchContainer };
export default injectIntl(withAnalytics(JiraQuickSearchContainer, {}, {}));
var templateObject_1, templateObject_2;
//# sourceMappingURL=JiraQuickSearchContainer.js.map