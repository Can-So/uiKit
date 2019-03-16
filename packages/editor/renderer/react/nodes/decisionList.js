import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent, Children } from 'react';
import { DecisionList as AkDecisionList } from '@atlaskit/task-decision';
var DecisionList = /** @class */ (function (_super) {
    tslib_1.__extends(DecisionList, _super);
    function DecisionList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DecisionList.prototype.render = function () {
        var children = this.props.children;
        if (Children.count(children) === 0) {
            return null;
        }
        return (React.createElement("div", { className: "akDecisionList" },
            React.createElement(AkDecisionList, null, children)));
    };
    return DecisionList;
}(PureComponent));
export default DecisionList;
//# sourceMappingURL=decisionList.js.map