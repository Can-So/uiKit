import * as tslib_1 from "tslib";
import * as React from 'react';
import PreQueryState from './PreQueryState';
import { isEmpty } from '../SearchResultsUtil';
import { PostQueryAnalyticsComponent } from './ScreenAnalyticsHelper';
import ResultGroupsComponent, { ResultGroupType, } from './ResultGroupsComponent';
import SearchError from '../SearchError';
var SearchResults = /** @class */ (function (_super) {
    tslib_1.__extends(SearchResults, _super);
    function SearchResults() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchResults.prototype.hasNoResult = function () {
        return this.props
            .getPostQueryGroups()
            .map(function (_a) {
            var items = _a.items;
            return items;
        })
            .every(isEmpty);
    };
    SearchResults.prototype.renderNoResult = function () {
        var _a = this.props, renderNoResult = _a.renderNoResult, postQueryScreenCounter = _a.postQueryScreenCounter, searchSessionId = _a.searchSessionId, referralContextIdentifiers = _a.referralContextIdentifiers;
        return (React.createElement(React.Fragment, null,
            renderNoResult(),
            React.createElement(PostQueryAnalyticsComponent, { screenCounter: postQueryScreenCounter, searchSessionId: searchSessionId, referralContextIdentifiers: referralContextIdentifiers, key: "post-query-analytics" })));
    };
    SearchResults.prototype.renderPreQueryState = function () {
        var _a = this.props, query = _a.query, searchSessionId = _a.searchSessionId, preQueryScreenCounter = _a.preQueryScreenCounter, renderNoRecentActivity = _a.renderNoRecentActivity, referralContextIdentifiers = _a.referralContextIdentifiers, renderBeforePreQueryState = _a.renderBeforePreQueryState, renderAdvancedSearchGroup = _a.renderAdvancedSearchGroup, getPreQueryGroups = _a.getPreQueryGroups;
        return (React.createElement(React.Fragment, null,
            renderBeforePreQueryState && renderBeforePreQueryState(),
            React.createElement(PreQueryState, { resultsGroups: getPreQueryGroups(), renderNoRecentActivity: renderNoRecentActivity, query: query, searchSessionId: searchSessionId, screenCounter: preQueryScreenCounter, referralContextIdentifiers: referralContextIdentifiers, renderAdvancedSearchGroup: renderAdvancedSearchGroup })));
    };
    SearchResults.prototype.renderSearchResultsState = function () {
        var _a = this.props, searchSessionId = _a.searchSessionId, referralContextIdentifiers = _a.referralContextIdentifiers, renderAdvancedSearchGroup = _a.renderAdvancedSearchGroup, getPostQueryGroups = _a.getPostQueryGroups, postQueryScreenCounter = _a.postQueryScreenCounter;
        return (React.createElement(ResultGroupsComponent, { type: ResultGroupType.PostQuery, renderAdvancedSearch: renderAdvancedSearchGroup, resultsGroups: getPostQueryGroups(), searchSessionId: searchSessionId, screenCounter: postQueryScreenCounter, referralContextIdentifiers: referralContextIdentifiers }));
    };
    SearchResults.prototype.render = function () {
        var _a = this.props, query = _a.query, isError = _a.isError, isLoading = _a.isLoading, retrySearch = _a.retrySearch, keepPreQueryState = _a.keepPreQueryState;
        if (isError) {
            return React.createElement(SearchError, { onRetryClick: retrySearch });
        }
        if (query.length === 0) {
            if (isLoading) {
                return null;
            }
            return this.renderPreQueryState();
        }
        // the state when the user starts typing from the pre query screen while we are waiting for search results
        if (isLoading && keepPreQueryState) {
            return this.renderPreQueryState();
        }
        if (this.hasNoResult()) {
            return this.renderNoResult();
        }
        return this.renderSearchResultsState();
    };
    return SearchResults;
}(React.Component));
export default SearchResults;
//# sourceMappingURL=SearchResults.js.map