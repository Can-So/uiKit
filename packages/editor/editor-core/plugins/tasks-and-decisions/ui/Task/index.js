import * as tslib_1 from "tslib";
import * as React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { PureComponent } from 'react';
import { ProviderFactory, WithProviders, } from '@findable/editor-common';
import TaskItemWithProviders from './task-item-with-providers';
var messages = defineMessages({
    placeholder: {
        id: 'fabric.editor.taskPlaceholder',
        defaultMessage: "Type your action, use '@' to assign to someone.",
        description: 'Placeholder description for an empty action/task in the editor',
    },
});
var TaskItem = /** @class */ (function (_super) {
    tslib_1.__extends(TaskItem, _super);
    function TaskItem(props) {
        var _this = _super.call(this, props) || this;
        _this.renderWithProvider = function (providers) {
            var _a = _this.props, _providerFactory = _a.providers, formatMessage = _a.intl.formatMessage, otherProps = tslib_1.__rest(_a, ["providers", "intl"]);
            var taskDecisionProvider = providers.taskDecisionProvider, contextIdentifierProvider = providers.contextIdentifierProvider;
            var placeholder = formatMessage(messages.placeholder);
            return (React.createElement(TaskItemWithProviders, tslib_1.__assign({}, otherProps, { placeholder: placeholder, taskDecisionProvider: taskDecisionProvider, contextIdentifierProvider: contextIdentifierProvider })));
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
export { TaskItem };
export default injectIntl(TaskItem);
//# sourceMappingURL=index.js.map