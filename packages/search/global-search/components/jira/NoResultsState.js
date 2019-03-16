import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from '../../messages';
import NoResults from '../NoResults';
import { ResultItemGroup } from '@atlaskit/quick-search';
import JiraAdvancedSearch from './JiraAdvancedSearch';
var Container = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n"])));
var NoResultsState = /** @class */ (function (_super) {
    tslib_1.__extends(NoResultsState, _super);
    function NoResultsState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoResultsState.prototype.render = function () {
        var _a = this.props, query = _a.query, onAdvancedSearch = _a.onAdvancedSearch;
        return (React.createElement(React.Fragment, null,
            React.createElement(NoResults, { key: "no-results", title: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.jira_no_results_title)), body: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.jira_no_results_body)) }),
            React.createElement(ResultItemGroup, { title: "", key: "advanced-search" },
                React.createElement(Container, null,
                    React.createElement(JiraAdvancedSearch, { query: query, analyticsData: { resultsCount: 0, wasOnNoResultsScreen: true }, onClick: onAdvancedSearch })))));
    };
    return NoResultsState;
}(React.Component));
export default NoResultsState;
var templateObject_1;
//# sourceMappingURL=NoResultsState.js.map