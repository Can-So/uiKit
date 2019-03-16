import * as tslib_1 from "tslib";
import * as React from 'react';
import { ResultItemGroup } from '@atlaskit/quick-search';
import ResultList from './ResultList';
var ResultGroup = /** @class */ (function (_super) {
    tslib_1.__extends(ResultGroup, _super);
    function ResultGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResultGroup.prototype.render = function () {
        var _a = this.props, title = _a.title, results = _a.results, sectionIndex = _a.sectionIndex;
        if (results.length === 0) {
            return null;
        }
        return (React.createElement(ResultItemGroup, { title: title },
            React.createElement(ResultList, { analyticsData: this.props.analyticsData, results: results, sectionIndex: sectionIndex })));
    };
    return ResultGroup;
}(React.Component));
export default ResultGroup;
//# sourceMappingURL=ResultGroup.js.map