import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import TaskItem from './TaskItem';
import { FabricElementsAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
var ResourcedTaskItem = /** @class */ (function (_super) {
    tslib_1.__extends(ResourcedTaskItem, _super);
    function ResourcedTaskItem(props) {
        var _this = _super.call(this, props) || this;
        _this.mounted = false;
        _this.onUpdate = function (state) {
            _this.setState({ isDone: state === 'DONE' });
        };
        _this.handleOnChange = function (taskId, isDone) {
            var _a = _this.props, taskDecisionProvider = _a.taskDecisionProvider, objectAri = _a.objectAri, containerAri = _a.containerAri, onChange = _a.onChange;
            // Optimistically update the task
            _this.setState({ isDone: isDone });
            if (taskDecisionProvider && containerAri && objectAri) {
                // Call provider to update task
                taskDecisionProvider.then(function (provider) {
                    if (!_this.mounted) {
                        return;
                    }
                    provider.toggleTask({ localId: taskId, objectAri: objectAri, containerAri: containerAri }, isDone ? 'DONE' : 'TODO');
                    // onChange could trigger a rerender, in order to get the correct state
                    // we should only call onChange once the internal state have been modified
                    if (onChange) {
                        onChange(taskId, isDone);
                    }
                    if (isDone) {
                        // Undefined provider.getCurrentUser or currentUser shows 'Created By'
                        // ie. does not update to prevent incorrect 'Completed By' message
                        _this.setState({
                            lastUpdater: provider.getCurrentUser
                                ? provider.getCurrentUser()
                                : undefined,
                        });
                    }
                });
            }
            else {
                // No provider - state managed by consumer
                if (onChange) {
                    onChange(taskId, isDone);
                }
            }
        };
        _this.state = {
            isDone: props.isDone,
            lastUpdater: props.lastUpdater,
        };
        return _this;
    }
    ResourcedTaskItem.prototype.componentDidMount = function () {
        this.mounted = true;
        this.subscribe(this.props.taskDecisionProvider, this.props.containerAri, this.props.objectAri);
    };
    ResourcedTaskItem.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.taskDecisionProvider !== this.props.taskDecisionProvider ||
            nextProps.containerAri !== this.props.containerAri ||
            nextProps.objectAri !== this.props.objectAri) {
            this.unsubscribe();
            this.subscribe(nextProps.taskDecisionProvider, nextProps.containerAri, nextProps.objectAri);
        }
    };
    ResourcedTaskItem.prototype.componentWillUnmount = function () {
        this.unsubscribe();
        this.mounted = false;
    };
    ResourcedTaskItem.prototype.subscribe = function (taskDecisionProvider, containerAri, objectAri) {
        var _this = this;
        if (taskDecisionProvider && containerAri && objectAri) {
            taskDecisionProvider.then(function (provider) {
                if (!_this.mounted) {
                    return;
                }
                var taskId = _this.props.taskId;
                provider.subscribe({ localId: taskId, objectAri: objectAri, containerAri: containerAri }, _this.onUpdate);
            });
        }
    };
    ResourcedTaskItem.prototype.unsubscribe = function () {
        var _this = this;
        var _a = this.props, taskDecisionProvider = _a.taskDecisionProvider, taskId = _a.taskId, objectAri = _a.objectAri, containerAri = _a.containerAri;
        if (taskDecisionProvider && containerAri && objectAri) {
            taskDecisionProvider.then(function (provider) {
                provider.unsubscribe({ localId: taskId, objectAri: objectAri, containerAri: containerAri }, _this.onUpdate);
            });
        }
    };
    ResourcedTaskItem.prototype.render = function () {
        var _a = this.state, isDone = _a.isDone, lastUpdater = _a.lastUpdater;
        var _b = this.props, appearance = _b.appearance, children = _b.children, containerAri = _b.containerAri, contentRef = _b.contentRef, creator = _b.creator, objectAri = _b.objectAri, participants = _b.participants, showParticipants = _b.showParticipants, showPlaceholder = _b.showPlaceholder, placeholder = _b.placeholder, taskId = _b.taskId, disabled = _b.disabled;
        return (React.createElement(FabricElementsAnalyticsContext, { data: {
                containerAri: containerAri,
                objectAri: objectAri,
            } },
            React.createElement(TaskItem, { isDone: isDone, taskId: taskId, onChange: this.handleOnChange, appearance: appearance, contentRef: contentRef, participants: participants, showParticipants: showParticipants, showPlaceholder: showPlaceholder, placeholder: placeholder, creator: creator, lastUpdater: lastUpdater, disabled: disabled }, children)));
    };
    ResourcedTaskItem.defaultProps = {
        appearance: 'inline',
    };
    return ResourcedTaskItem;
}(PureComponent));
export default ResourcedTaskItem;
//# sourceMappingURL=ResourcedTaskItem.js.map