import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { ProviderFactory, WithProviders } from '@atlaskit/editor-common';
import TaskItemWithProviders from './task-item-with-providers';
import { FabricElementsAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
var TaskItem = /** @class */ (function (_super) {
    tslib_1.__extends(TaskItem, _super);
    function TaskItem(props) {
        var _this = _super.call(this, props) || this;
        _this.renderWithProvider = function (providers) {
            var taskDecisionProvider = providers.taskDecisionProvider, contextIdentifierProvider = providers.contextIdentifierProvider;
            var _a = _this.props, children = _a.children, localId = _a.localId, state = _a.state, rendererContext = _a.rendererContext;
            var objectAri = '';
            var containerAri = '';
            if (rendererContext) {
                objectAri = rendererContext.objectAri || '';
                containerAri = rendererContext.containerAri || '';
            }
            return (React.createElement(FabricElementsAnalyticsContext, { data: {
                    userContext: 'document',
                } },
                React.createElement(TaskItemWithProviders, { objectAri: objectAri, containerAri: containerAri, taskId: localId, isDone: state === 'DONE', taskDecisionProvider: taskDecisionProvider, contextIdentifierProvider: contextIdentifierProvider }, children)));
        };
        _this.providerFactory = props.providers || new ProviderFactory();
        return _this;
    }
    TaskItem.prototype.componentWillUnmount = function () {
        if (!this.props.providers) {
            // new ProviderFactory is created if no `providers` has been set
            // in this case when component is unmounted it's safe to destroy this providerFactory
            this.providerFactory.destroy();
        }
    };
    TaskItem.prototype.render = function () {
        return (React.createElement(WithProviders, { providers: ['taskDecisionProvider', 'contextIdentifierProvider'], providerFactory: this.providerFactory, renderNode: this.renderWithProvider }));
    };
    return TaskItem;
}(PureComponent));
export default TaskItem;
//# sourceMappingURL=taskItem.js.map