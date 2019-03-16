import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { gridSize } from '@findable/theme';
import styled from 'styled-components';
import SearchIcon from '@findable/icon/glyph/search';
import DropdownMenu, { DropdownItemGroup, DropdownItem, } from '@findable/dropdown-menu';
import { messages } from '../../messages';
import AdvancedSearchResult from '../AdvancedSearchResult';
import { AnalyticsType } from '../../model/Result';
import { getJiraAdvancedSearchUrl, JiraEntityTypes, ADVANCED_JIRA_SEARCH_RESULT_ID, } from '../SearchResultsUtil';
var TextContainer = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  padding: ", "px 0;\n  margin-right: ", "px;\n"], ["\n  padding: ", "px 0;\n  margin-right: ", "px;\n"])), gridSize(), gridSize());
var Container = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: left;\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: left;\n"])));
var itemI18nKeySuffix = [
    JiraEntityTypes.Issues,
    JiraEntityTypes.Boards,
    JiraEntityTypes.Projects,
    JiraEntityTypes.Filters,
    JiraEntityTypes.People,
];
var getI18nItemName = function (i18nKeySuffix) {
    var id = "jira_advanced_search_" + i18nKeySuffix;
    return React.createElement(FormattedMessage, tslib_1.__assign({}, messages[id]));
};
var JiraAdvancedSearch = /** @class */ (function (_super) {
    tslib_1.__extends(JiraAdvancedSearch, _super);
    function JiraAdvancedSearch(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            entity: JiraEntityTypes.Issues,
        };
        _this.renderDropdownItems = function () {
            return itemI18nKeySuffix.map(function (item) { return (React.createElement(DropdownItem, { onClick: function () { return (_this.selectedItem = item); }, key: item, href: getJiraAdvancedSearchUrl(item, _this.props.query) }, getI18nItemName(item))); });
        };
        _this.enrichedAnalyticsData = props.analyticsData;
        return _this;
    }
    JiraAdvancedSearch.prototype.render = function () {
        var _this = this;
        var _a = this.props, query = _a.query, showKeyboardLozenge = _a.showKeyboardLozenge, showSearchIcon = _a.showSearchIcon, onClick = _a.onClick;
        return (React.createElement(AdvancedSearchResult, { onClick: function (e) {
                if (onClick) {
                    var selectedEntity = _this.nextSelectedItem || _this.state.entity;
                    onClick(e.event, selectedEntity);
                    _this.nextSelectedItem = undefined;
                }
            }, href: getJiraAdvancedSearchUrl(this.state.entity, query), key: "search-jira-" + Date.now(), resultId: ADVANCED_JIRA_SEARCH_RESULT_ID, text: React.createElement(Container, null,
                React.createElement(TextContainer, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.jira_advanced_search))),
                React.createElement("span", { onClick: function (e) {
                        if (_this.selectedItem) {
                            var entity = _this.selectedItem;
                            _this.nextSelectedItem = entity;
                            _this.setState({
                                entity: entity,
                            });
                            _this.enrichedAnalyticsData = tslib_1.__assign({}, _this.props.analyticsData, { contentType: _this.selectedItem });
                            _this.selectedItem = undefined;
                        }
                        else {
                            // we need to cancel on click event on the dropdown to stop navigation
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    } },
                    React.createElement(DropdownMenu, { trigger: getI18nItemName(this.state.entity), triggerType: "button", shouldFlip: false, position: "right bottom" },
                        React.createElement(DropdownItemGroup, null, this.renderDropdownItems())))), icon: showSearchIcon ? (React.createElement(SearchIcon, { size: "medium", label: "Advanced search" })) : (undefined), type: AnalyticsType.AdvancedSearchJira, showKeyboardLozenge: showKeyboardLozenge, 
            // lazily pass analytics data because the analytic event fired as part of onclick handle
            // i.e. before the component update the new state, so can not add contentType from state
            analyticsData: function () { return _this.enrichedAnalyticsData; } }));
    };
    JiraAdvancedSearch.defaultProps = {
        showKeyboardLozenge: false,
        showSearchIcon: false,
    };
    return JiraAdvancedSearch;
}(React.Component));
export default JiraAdvancedSearch;
var templateObject_1, templateObject_2;
//# sourceMappingURL=JiraAdvancedSearch.js.map