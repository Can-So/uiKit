import * as tslib_1 from "tslib";
import * as React from 'react';
import { ResultItemGroup } from '@atlaskit/quick-search';
import { ConfluenceIcon } from '@atlaskit/logo';
import PeopleIcon from '@atlaskit/icon/glyph/people';
import { take, isEmpty } from '../SearchResultsUtil';
import ResultList from '../ResultList';
import SearchJiraItem from '../SearchJiraItem';
import SearchConfluenceItem from '../SearchConfluenceItem';
import SearchPeopleItem from '../SearchPeopleItem';
export var MAX_PAGES_BLOGS_ATTACHMENTS = 8;
export var MAX_SPACES = 3;
export var MAX_PEOPLE = 3;
var SearchResultsState = /** @class */ (function (_super) {
    tslib_1.__extends(SearchResultsState, _super);
    function SearchResultsState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchResultsState.prototype.render = function () {
        var _a = this.props, query = _a.query, recentResults = _a.recentResults, jiraResults = _a.jiraResults, confluenceResults = _a.confluenceResults, peopleResults = _a.peopleResults;
        var sectionIndex = 0;
        var recentGroup = !isEmpty(recentResults) ? (React.createElement(ResultItemGroup, { title: "Recently viewed", key: "recent" },
            React.createElement(ResultList, { results: take(recentResults, 5), sectionIndex: sectionIndex++ }))) : null;
        var jiraGroup = (React.createElement(ResultItemGroup, { title: "Jira issues", key: "jira" },
            React.createElement(ResultList, { results: take(jiraResults, 5), sectionIndex: sectionIndex++ }),
            React.createElement(SearchJiraItem, { query: query })));
        var confluenceGroup = (React.createElement(ResultItemGroup, { title: "Confluence pages and blogs", key: "confluence" },
            React.createElement(ResultList, { results: take(confluenceResults, 5), sectionIndex: sectionIndex++ }),
            React.createElement(SearchConfluenceItem, { query: query, text: "Search for more Confluence pages and blogs", icon: React.createElement(ConfluenceIcon, { size: "medium", label: "Search confluence" }) })));
        var peopleGroup = (React.createElement(ResultItemGroup, { title: "People", key: "people" },
            React.createElement(ResultList, { results: take(peopleResults, 3), sectionIndex: sectionIndex++ }),
            React.createElement(SearchPeopleItem, { query: query, text: "Search for more people", icon: React.createElement(PeopleIcon, { size: "medium", label: "Search people" }) })));
        return [recentGroup, jiraGroup, confluenceGroup, peopleGroup];
    };
    return SearchResultsState;
}(React.Component));
export default SearchResultsState;
//# sourceMappingURL=SearchResultsState.js.map