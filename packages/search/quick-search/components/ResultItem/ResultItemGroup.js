import * as tslib_1 from "tslib";
import * as React from 'react';
import { ItemGroup } from '@findable/item';
import { ResultItemGroupTitle, ResultItemGroupHeader } from './styled';
var ResultItemGroup = /** @class */ (function (_super) {
    tslib_1.__extends(ResultItemGroup, _super);
    function ResultItemGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResultItemGroup.prototype.render = function () {
        var _a = this.props, title = _a.title, children = _a.children;
        var wrappedTitle = (React.createElement(ResultItemGroupHeader, null,
            React.createElement(ResultItemGroupTitle, null, title)));
        return React.createElement(ItemGroup, { title: wrappedTitle }, children);
    };
    return ResultItemGroup;
}(React.Component));
export default ResultItemGroup;
//# sourceMappingURL=ResultItemGroup.js.map