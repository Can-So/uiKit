import * as tslib_1 from "tslib";
import * as React from 'react';
import Icon from '@atlaskit/icon';
import SearchIcon from '@atlaskit/icon/glyph/search';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
import { messages } from '../../messages';
import StickyFooter from '../common/StickyFooter';
import SearchPeopleItem from '../SearchPeopleItem';
import SearchConfluenceItem from '../SearchConfluenceItem';
import PeopleIconGlyph from '../../assets/PeopleIconGlyph';
import { ConfluenceAdvancedSearchTypes } from '../SearchResultsUtil';
var PeopleSearchWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  margin-top: ", "px;\n"], ["\n  margin-top: ", "px;\n"])), math.multiply(gridSize, 3));
var AdvancedSearchGroup = /** @class */ (function (_super) {
    tslib_1.__extends(AdvancedSearchGroup, _super);
    function AdvancedSearchGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdvancedSearchGroup.prototype.render = function () {
        var _this = this;
        var _a = this.props, query = _a.query, analyticsData = _a.analyticsData;
        var text = query.length === 0 ? (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.confluence_advanced_search))) : (React.createElement(FormattedMessage, tslib_1.__assign({}, messages.confluence_advanced_search_for, { values: { query: query } })));
        return [
            React.createElement(PeopleSearchWrapper, { key: "people-search" },
                React.createElement(SearchPeopleItem, { analyticsData: analyticsData, query: query, text: React.createElement(FormattedMessage, tslib_1.__assign({}, messages.people_advanced_search)), icon: React.createElement(Icon, { glyph: PeopleIconGlyph, size: "medium", label: "Search people" }), onClick: function (_a) {
                        var event = _a.event;
                        if (_this.props.onClick) {
                            _this.props.onClick(event, ConfluenceAdvancedSearchTypes.People);
                        }
                    } })),
            React.createElement(StickyFooter, { key: "advanced-search" },
                React.createElement(SearchConfluenceItem, { analyticsData: analyticsData, query: query, text: text, icon: React.createElement(SearchIcon, { size: "medium", label: "Advanced search" }), showKeyboardLozenge: true, onClick: function (_a) {
                        var event = _a.event;
                        if (_this.props.onClick) {
                            _this.props.onClick(event, ConfluenceAdvancedSearchTypes.Content);
                        }
                    } })),
        ];
    };
    return AdvancedSearchGroup;
}(React.Component));
export default AdvancedSearchGroup;
var templateObject_1;
//# sourceMappingURL=AdvancedSearchGroup.js.map