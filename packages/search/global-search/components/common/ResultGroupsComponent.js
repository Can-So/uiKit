import * as tslib_1 from "tslib";
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import ResultGroup from '../ResultGroup';
import { PreQueryAnalyticsComponent, PostQueryAnalyticsComponent, } from './ScreenAnalyticsHelper';
export var ResultGroupType;
(function (ResultGroupType) {
    ResultGroupType["PreQuery"] = "PreQuery";
    ResultGroupType["PostQuery"] = "PostQuery";
})(ResultGroupType || (ResultGroupType = {}));
var mapGroupsToSections = function (resultsToShow, analyticsData) {
    return resultsToShow
        .filter(function (_a) {
        var items = _a.items;
        return items && items.length;
    })
        .map(function (group, index) { return (React.createElement(ResultGroup, { key: group.key + "-" + index, title: React.createElement(FormattedMessage, tslib_1.__assign({}, group.title)), results: group.items, sectionIndex: index, analyticsData: analyticsData })); });
};
var ResultGroupsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ResultGroupsComponent, _super);
    function ResultGroupsComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getAnalyticsData = function () { return ({
            resultCount: _this.props.resultsGroups
                .map(function (_a) {
                var items = _a.items;
                return items.length;
            })
                .reduce(function (total, count) { return total + count; }, 0),
        }); };
        return _this;
    }
    ResultGroupsComponent.prototype.getAnalyticsComponent = function () {
        var _a = this.props, searchSessionId = _a.searchSessionId, screenCounter = _a.screenCounter, referralContextIdentifiers = _a.referralContextIdentifiers, type = _a.type;
        switch (type) {
            case ResultGroupType.PreQuery:
                return (React.createElement(PreQueryAnalyticsComponent, { key: "pre-query-analytics", screenCounter: screenCounter, searchSessionId: searchSessionId, referralContextIdentifiers: referralContextIdentifiers }));
            case ResultGroupType.PostQuery:
                return (React.createElement(PostQueryAnalyticsComponent, { key: "post-query-analytics", screenCounter: screenCounter, searchSessionId: searchSessionId, referralContextIdentifiers: referralContextIdentifiers }));
        }
    };
    ResultGroupsComponent.prototype.render = function () {
        var _a = this.props, renderAdvancedSearch = _a.renderAdvancedSearch, resultsGroups = _a.resultsGroups;
        var analyticsData = this.getAnalyticsData();
        return (React.createElement(React.Fragment, null,
            mapGroupsToSections(resultsGroups, analyticsData),
            renderAdvancedSearch(analyticsData),
            this.getAnalyticsComponent()));
    };
    return ResultGroupsComponent;
}(React.Component));
export default ResultGroupsComponent;
//# sourceMappingURL=ResultGroupsComponent.js.map