import * as tslib_1 from "tslib";
import * as React from 'react';
import AdvancedSearchResult from './AdvancedSearchResult';
import { ADVANCED_PEOPLE_SEARCH_RESULT_ID } from './SearchResultsUtil';
import { AnalyticsType } from '../model/Result';
var SearchPeopleItem = /** @class */ (function (_super) {
    tslib_1.__extends(SearchPeopleItem, _super);
    function SearchPeopleItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchPeopleItem.prototype.render = function () {
        var _a = this.props, query = _a.query, icon = _a.icon, text = _a.text, analyticsData = _a.analyticsData, isCompact = _a.isCompact;
        return (React.createElement(AdvancedSearchResult, { href: "/people/search?q=" + encodeURIComponent(query), icon: icon, key: "search_people", analyticsData: analyticsData, resultId: ADVANCED_PEOPLE_SEARCH_RESULT_ID, text: text, type: AnalyticsType.AdvancedSearchPeople, target: "_blank", isCompact: isCompact, onClick: this.props.onClick }));
    };
    return SearchPeopleItem;
}(React.Component));
export default SearchPeopleItem;
//# sourceMappingURL=SearchPeopleItem.js.map