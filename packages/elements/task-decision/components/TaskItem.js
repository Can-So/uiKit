import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { CheckBoxWrapper } from '../styled/TaskItem';
import Item from './Item';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { createAndFireEventInElementsChannel } from '../analytics';
var taskCount = 0;
var getCheckBoxId = function (localId) { return localId + "-" + taskCount++; };
var TaskItem = /** @class */ (function (_super) {
    tslib_1.__extends(TaskItem, _super);
    function TaskItem(props) {
        var _this = _super.call(this, props) || this;
        _this.handleOnChange = function (_evt) {
            var _a = _this.props, onChange = _a.onChange, taskId = _a.taskId, isDone = _a.isDone, createAnalyticsEvent = _a.createAnalyticsEvent;
            var newIsDone = !isDone;
            if (onChange) {
                onChange(taskId, newIsDone);
            }
            var action = newIsDone ? 'checked' : 'unchecked';
            if (createAnalyticsEvent) {
                createAndFireEventInElementsChannel({
                    action: action,
                    actionSubject: 'action',
                    eventType: 'ui',
                    attributes: {
                        localId: taskId,
                    },
                })(createAnalyticsEvent);
            }
        };
        _this.checkBoxId = getCheckBoxId(props.taskId);
        return _this;
    }
    TaskItem.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.taskId !== this.props.taskId) {
            this.checkBoxId = getCheckBoxId(nextProps.taskId);
        }
    };
    TaskItem.prototype.getAttributionText = function () {
        var _a = this.props, creator = _a.creator, lastUpdater = _a.lastUpdater, isDone = _a.isDone;
        if (isDone && lastUpdater) {
            return "Completed by " + lastUpdater.displayName;
        }
        if (!creator || !creator.displayName) {
            return undefined;
        }
        return "Added by " + creator.displayName;
    };
    TaskItem.prototype.render = function () {
        var _a = this.props, appearance = _a.appearance, isDone = _a.isDone, contentRef = _a.contentRef, children = _a.children, participants = _a.participants, placeholder = _a.placeholder, showPlaceholder = _a.showPlaceholder, disabled = _a.disabled;
        var icon = (React.createElement(CheckBoxWrapper, { contentEditable: false },
            React.createElement("input", { id: this.checkBoxId, name: this.checkBoxId, type: "checkbox", onChange: this.handleOnChange, checked: !!isDone, disabled: !!disabled, suppressHydrationWarning: true }),
            React.createElement("label", { htmlFor: this.checkBoxId, suppressHydrationWarning: true })));
        return (React.createElement(Item, { appearance: appearance, contentRef: contentRef, icon: icon, participants: participants, placeholder: placeholder, showPlaceholder: showPlaceholder, attribution: this.getAttributionText() }, children));
    };
    TaskItem.defaultProps = {
        appearance: 'inline',
    };
    return TaskItem;
}(PureComponent));
export { TaskItem };
// This is to ensure that the "type" is exported, as it gets lost and not exported along with TaskItem after
// going through the high order component.
// tslint:disable-next-line:variable-name
export default withAnalyticsEvents()(TaskItem);
//# sourceMappingURL=TaskItem.js.map