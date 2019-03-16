import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import ListWrapper from '../styled/ListWrapper';
import { FabricElementsAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
var TaskList = /** @class */ (function (_super) {
    tslib_1.__extends(TaskList, _super);
    function TaskList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskList.prototype.render = function () {
        var _a = this.props, listId = _a.listId, children = _a.children;
        var listSize = React.Children.count(children);
        if (!children) {
            return null;
        }
        // Data attributes are required for copy and paste from rendered content
        // to preserve the task
        return (React.createElement(ListWrapper, { "data-task-list-local-id": "" }, React.Children.map(children, function (child, idx) { return (React.createElement(FabricElementsAnalyticsContext, { data: {
                listLocalId: listId,
                listSize: listSize,
                position: idx,
            } },
            React.createElement("li", { key: idx, "data-task-local-id": "" }, child))); })));
    };
    return TaskList;
}(PureComponent));
export default TaskList;
//# sourceMappingURL=TaskList.js.map