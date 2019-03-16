import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import { ResultItemGroup } from '@atlaskit/quick-search';
import { FormattedMessage } from 'react-intl';
import { messages } from '../../messages';
import NoResults from '../NoResults';
import SearchConfluenceItem from '../SearchConfluenceItem';
import SearchPeopleItem from '../SearchPeopleItem';
import { ConfluenceAdvancedSearchTypes } from '../SearchResultsUtil';
var Container = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n"])));
var NoResultsState = /** @class */ (function (_super) {
    tslib_1.__extends(NoResultsState, _super);
    function NoResultsState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoResultsState.prototype.render = function () {
        var _this = this;
        var query = this.props.query;
        var analyticsData = { resultsCount: 0, wasOnNoResultsScreen: true };
        return (React.createElement(React.Fragment, null,
            React.createElement(NoResults, { key: "no-results", title: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.no_results_title)), body: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.no_results_body)) }),
            React.createElement(ResultItemGroup, { title: "", key: "advanced-search" },
                React.createElement(Container, null,
                    React.createElement(SearchConfluenceItem, { analyticsData: analyticsData, isCompact: true, query: query, text: React.createElement(Button, { appearance: "primary", shouldFitContainer: true },
                            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.confluence_advanced_search_filters))), onClick: function (_a) {
                            var event = _a.event;
                            if (_this.props.onClick) {
                                _this.props.onClick(event, ConfluenceAdvancedSearchTypes.Content);
                            }
                        } }),
                    React.createElement(SearchPeopleItem, { analyticsData: analyticsData, isCompact: true, query: query, text: React.createElement(Button, { appearance: "default", shouldFitContainer: true },
                            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.people_advanced_search))), onClick: function (_a) {
                            var event = _a.event;
                            if (_this.props.onClick) {
                                _this.props.onClick(event, ConfluenceAdvancedSearchTypes.People);
                            }
                        } })))));
    };
    return NoResultsState;
}(React.Component));
export default NoResultsState;
var templateObject_1;
//# sourceMappingURL=NoResultsState.js.map