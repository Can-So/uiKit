import * as tslib_1 from "tslib";
import * as React from 'react';
import { isEmpty } from '../SearchResultsUtil';
import NoResultsState from './NoResultsState';
import PreQueryState from './PreQueryState';
import SearchResultsState from './SearchResultsState';
import SearchResults from '../SearchResults';
var HomeSearchResults = /** @class */ (function (_super) {
    tslib_1.__extends(HomeSearchResults, _super);
    function HomeSearchResults() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomeSearchResults.prototype.render = function () {
        var _a = this.props, query = _a.query, isLoading = _a.isLoading, isError = _a.isError, keepPreQueryState = _a.keepPreQueryState, retrySearch = _a.retrySearch, recentlyViewedItems = _a.recentlyViewedItems, recentResults = _a.recentResults, jiraResults = _a.jiraResults, confluenceResults = _a.confluenceResults, peopleResults = _a.peopleResults;
        return (React.createElement(SearchResults, { retrySearch: retrySearch, query: query, isLoading: isLoading, isError: isError, keepPreQueryState: keepPreQueryState, renderPreQueryStateComponent: function () { return (React.createElement(PreQueryState, { recentlyViewedItems: recentlyViewedItems, sectionIndex: 0 })); }, shouldRenderNoResultsState: function () {
                return [recentResults, jiraResults, confluenceResults, peopleResults].every(isEmpty);
            }, renderNoResultsStateComponent: function () { return React.createElement(NoResultsState, { query: query }); }, renderSearchResultsStateComponent: function () { return (React.createElement(SearchResultsState, { query: query, recentResults: recentResults, jiraResults: jiraResults, confluenceResults: confluenceResults, peopleResults: peopleResults })); } }));
    };
    return HomeSearchResults;
}(React.Component));
export default HomeSearchResults;
//# sourceMappingURL=HomeSearchResults.js.map