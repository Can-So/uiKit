import * as tslib_1 from "tslib";
import * as React from 'react';
import AdvancedSearchResult from './AdvancedSearchResult';
import { getConfluenceAdvancedSearchLink, ADVANCED_CONFLUENCE_SEARCH_RESULT_ID, } from './SearchResultsUtil';
import { AnalyticsType } from '../model/Result';
var SearchConfluenceItem = /** @class */ (function (_super) {
    tslib_1.__extends(SearchConfluenceItem, _super);
    function SearchConfluenceItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchConfluenceItem.prototype.render = function () {
        var _a = this.props, query = _a.query, icon = _a.icon, text = _a.text, showKeyboardLozenge = _a.showKeyboardLozenge, analyticsData = _a.analyticsData, isCompact = _a.isCompact;
        return (React.createElement(AdvancedSearchResult, { href: getConfluenceAdvancedSearchLink(query), key: "search_confluence", resultId: ADVANCED_CONFLUENCE_SEARCH_RESULT_ID, text: text, icon: icon, type: AnalyticsType.AdvancedSearchConfluence, showKeyboardLozenge: showKeyboardLozenge, analyticsData: analyticsData, isCompact: isCompact, onClick: this.props.onClick }));
    };
    SearchConfluenceItem.defaultProps = {
        showKeyboardLozenge: false,
    };
    return SearchConfluenceItem;
}(React.Component));
export default SearchConfluenceItem;
//# sourceMappingURL=SearchConfluenceItem.js.map