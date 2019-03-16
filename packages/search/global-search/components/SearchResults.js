import * as tslib_1 from "tslib";
import * as React from 'react';
import SearchError from './SearchError';
var SearchResults = /** @class */ (function (_super) {
    tslib_1.__extends(SearchResults, _super);
    function SearchResults() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchResults.prototype.render = function () {
        var _a = this.props, query = _a.query, isError = _a.isError, isLoading = _a.isLoading, retrySearch = _a.retrySearch, keepPreQueryState = _a.keepPreQueryState, shouldRenderNoResultsState = _a.shouldRenderNoResultsState, renderPreQueryStateComponent = _a.renderPreQueryStateComponent, renderNoResultsStateComponent = _a.renderNoResultsStateComponent, renderSearchResultsStateComponent = _a.renderSearchResultsStateComponent;
        if (isError) {
            return React.createElement(SearchError, { onRetryClick: retrySearch });
        }
        if (query.length === 0) {
            if (isLoading) {
                return null;
            }
            return renderPreQueryStateComponent();
        }
        // the state when the user starts typing from the pre query screen while we are waiting for search results
        if (isLoading && keepPreQueryState) {
            return renderPreQueryStateComponent();
        }
        if (shouldRenderNoResultsState()) {
            return renderNoResultsStateComponent();
        }
        return renderSearchResultsStateComponent();
    };
    return SearchResults;
}(React.Component));
export default SearchResults;
//# sourceMappingURL=SearchResults.js.map