import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import ListWrapper from '../styled/ListWrapper';
var DecisionList = /** @class */ (function (_super) {
    tslib_1.__extends(DecisionList, _super);
    function DecisionList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DecisionList.prototype.render = function () {
        var children = this.props.children;
        if (!children) {
            return null;
        }
        // Data attributes are required for copy and paste from rendered content
        // to preserve the decision
        return (React.createElement(ListWrapper, { "data-decision-list-local-id": "" }, React.Children.map(children, function (child, idx) { return (React.createElement("li", { key: idx, "data-decision-local-id": "", "data-decision-state": "DECIDED" }, child)); })));
    };
    return DecisionList;
}(PureComponent));
export default DecisionList;
//# sourceMappingURL=DecisionList.js.map