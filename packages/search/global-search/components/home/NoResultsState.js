import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ResultItemGroup } from '@atlaskit/quick-search';
import { ConfluenceIcon } from '@atlaskit/logo';
import PeopleIcon from '@atlaskit/icon/glyph/people';
import { messages } from '../../messages';
import NoResults from '../NoResults';
import SearchConfluenceItem from '../SearchConfluenceItem';
import SearchPeopleItem from '../SearchPeopleItem';
import SearchJiraItem from '../SearchJiraItem';
var NoResultsState = /** @class */ (function (_super) {
    tslib_1.__extends(NoResultsState, _super);
    function NoResultsState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoResultsState.prototype.render = function () {
        var query = this.props.query;
        return [
            React.createElement(NoResults, { key: "no-results", title: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.no_results_title)), body: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.no_results_body)) }),
            React.createElement(ResultItemGroup, { title: "", key: "advanced-search" },
                React.createElement(SearchJiraItem, { query: query }),
                React.createElement(SearchConfluenceItem, { query: query, text: "Search for more Confluence pages and blogs", icon: React.createElement(ConfluenceIcon, { size: "medium", label: "Search confluence" }) }),
                React.createElement(SearchPeopleItem, { query: query, text: "Search for more people", icon: React.createElement(PeopleIcon, { size: "medium", label: "Search people" }) })),
        ];
    };
    return NoResultsState;
}(React.Component));
export default NoResultsState;
//# sourceMappingURL=NoResultsState.js.map