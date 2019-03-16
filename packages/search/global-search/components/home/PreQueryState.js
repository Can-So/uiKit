import * as tslib_1 from "tslib";
import * as React from 'react';
import { isEmpty, take } from '../SearchResultsUtil';
import ResultGroup from '../ResultGroup';
var PreQueryState = /** @class */ (function (_super) {
    tslib_1.__extends(PreQueryState, _super);
    function PreQueryState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreQueryState.prototype.render = function () {
        var _a = this.props, recentlyViewedItems = _a.recentlyViewedItems, sectionIndex = _a.sectionIndex;
        if (isEmpty(recentlyViewedItems)) {
            return null;
        }
        return (React.createElement(ResultGroup, { title: "Recently viewed", key: "recent", sectionIndex: sectionIndex, results: take(recentlyViewedItems, 10) }));
    };
    return PreQueryState;
}(React.Component));
export default PreQueryState;
//# sourceMappingURL=PreQueryState.js.map