import * as tslib_1 from "tslib";
import * as React from 'react';
import { JiraIcon } from '@findable/logo';
import AdvancedSearchResult from './AdvancedSearchResult';
import { ADVANCED_JIRA_SEARCH_RESULT_ID } from './SearchResultsUtil';
import { AnalyticsType } from '../model/Result';
var SearchJiraItem = /** @class */ (function (_super) {
    tslib_1.__extends(SearchJiraItem, _super);
    function SearchJiraItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchJiraItem.prototype.render = function () {
        var query = this.props.query;
        return (React.createElement(AdvancedSearchResult, { href: "/issues/?jql=" + encodeURIComponent("text ~ \"" + query + "\""), icon: React.createElement(JiraIcon, { size: "medium", label: "Search Jira" }), key: "search_jira", resultId: ADVANCED_JIRA_SEARCH_RESULT_ID, text: "Search for more Jira issues", type: AnalyticsType.AdvancedSearchJira }));
    };
    return SearchJiraItem;
}(React.Component));
export default SearchJiraItem;
//# sourceMappingURL=SearchJiraItem.js.map