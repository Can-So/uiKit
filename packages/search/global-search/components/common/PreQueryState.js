import * as tslib_1 from "tslib";
import * as React from 'react';
import { isEmpty } from '../SearchResultsUtil';
import NoRecentActivity from '../NoRecentActivity';
import ResultGroupsComponent, { ResultGroupType, } from './ResultGroupsComponent';
import { PreQueryAnalyticsComponent } from './ScreenAnalyticsHelper';
var PreQueryState = /** @class */ (function (_super) {
    tslib_1.__extends(PreQueryState, _super);
    function PreQueryState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreQueryState.prototype.render = function () {
        var _a = this.props, resultsGroups = _a.resultsGroups, searchSessionId = _a.searchSessionId, screenCounter = _a.screenCounter, renderNoRecentActivity = _a.renderNoRecentActivity, referralContextIdentifiers = _a.referralContextIdentifiers, renderAdvancedSearchGroup = _a.renderAdvancedSearchGroup;
        if (resultsGroups.every(function (_a) {
            var items = _a.items;
            return isEmpty(items);
        })) {
            return (React.createElement(React.Fragment, null,
                React.createElement(PreQueryAnalyticsComponent, { key: "pre-query-analytics", screenCounter: screenCounter, searchSessionId: searchSessionId, referralContextIdentifiers: referralContextIdentifiers }),
                React.createElement(NoRecentActivity, { key: "no-recent-activity" }, renderNoRecentActivity())));
        }
        return (React.createElement(ResultGroupsComponent, { key: "prequery-results-groups", type: ResultGroupType.PreQuery, renderAdvancedSearch: renderAdvancedSearchGroup, resultsGroups: resultsGroups, searchSessionId: searchSessionId, screenCounter: screenCounter, referralContextIdentifiers: referralContextIdentifiers }));
    };
    return PreQueryState;
}(React.Component));
export default PreQueryState;
//# sourceMappingURL=PreQueryState.js.map