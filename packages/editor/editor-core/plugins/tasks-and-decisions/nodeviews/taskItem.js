import * as tslib_1 from "tslib";
import * as React from 'react';
import { AnalyticsListener } from '@findable/analytics-next';
import { ReactNodeView } from '../../../nodeviews';
import TaskItem from '../ui/Task';
import WithPluginState from '../../../ui/WithPluginState';
import { stateKey as taskPluginKey, } from '../pm-plugins/main';
import { pluginKey as editorDisabledPluginKey, } from '../../editor-disabled';
var Task = /** @class */ (function (_super) {
    tslib_1.__extends(Task, _super);
    function Task() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleOnChange = function (taskId, isChecked) {
            var tr = _this.view.state.tr;
            var nodePos = _this.getPos();
            tr.setNodeMarkup(nodePos, undefined, {
                state: isChecked ? 'DONE' : 'TODO',
                localId: taskId,
            });
            _this.view.dispatch(tr);
        };
        /**
         * Dynamically generates analytics data relating to the parent list.
         *
         * Required to be dynamic, as list (in prosemirror model) may have
         * changed (e.g. item movements, or additional items in list).
         * This node view will have not rerendered for those changes, so
         * cannot render the position and listSize into the
         * AnalyticsContext at initial render time.
         */
        _this.addListAnalyticsData = function (event) {
            try {
                var resolvedPos = _this.view.state.doc.resolve(_this.getPos());
                var position_1 = resolvedPos.index();
                var listSize_1 = resolvedPos.parent.childCount;
                var listLocalId_1 = resolvedPos.parent.attrs.localId;
                event.update(function (payload) {
                    var _a = payload.attributes, attributes = _a === void 0 ? {} : _a, actionSubject = payload.actionSubject;
                    if (actionSubject !== 'action') {
                        // Not action related, ignore
                        return payload;
                    }
                    return tslib_1.__assign({}, payload, { attributes: tslib_1.__assign({}, attributes, { position: position_1,
                            listSize: listSize_1,
                            listLocalId: listLocalId_1 }) });
                });
            }
            catch (e) {
                // This can occur if pos is NaN (seen it in some test cases)
                // Act defensively here, and lose some analytics data rather than
                // cause any user facing error.
            }
        };
        return _this;
    }
    Task.prototype.isContentEmpty = function () {
        return this.node.content.childCount === 0;
    };
    Task.prototype.createDomRef = function () {
        var domRef = document.createElement('li');
        domRef.style['list-style-type'] = 'none';
        return domRef;
    };
    Task.prototype.getContentDOM = function () {
        return { dom: document.createElement('div') };
    };
    Task.prototype.render = function (props, forwardRef) {
        var _this = this;
        var _a = this.node.attrs, localId = _a.localId, state = _a.state;
        return (React.createElement(AnalyticsListener, { channel: "fabric-elements", onEvent: this.addListAnalyticsData },
            React.createElement(WithPluginState, { plugins: {
                    editorDisabledPlugin: editorDisabledPluginKey,
                    taskDecisionPlugin: taskPluginKey,
                }, render: function (_a) {
                    var editorDisabledPlugin = _a.editorDisabledPlugin, taskDecisionPlugin = _a.taskDecisionPlugin;
                    var insideCurrentNode = false;
                    if (taskDecisionPlugin &&
                        taskDecisionPlugin.currentTaskDecisionItem) {
                        insideCurrentNode = _this.node.eq(taskDecisionPlugin.currentTaskDecisionItem);
                    }
                    return (React.createElement(TaskItem, { taskId: localId, contentRef: forwardRef, isDone: state === 'DONE', onChange: _this.handleOnChange, showPlaceholder: !insideCurrentNode && _this.isContentEmpty(), providers: props.providerFactory, disabled: (editorDisabledPlugin || {}).editorDisabled }));
                } })));
    };
    Task.prototype.update = function (node, decorations) {
        /**
         * Returning false here when the previous content was empty fixes an error where the editor fails to set selection
         * inside the contentDOM after a transaction. See ED-2374.
         *
         * Returning false also when the task state has changed to force the checkbox to update. See ED-5107
         */
        var _this = this;
        return _super.prototype.update.call(this, node, decorations, function (currentNode, newNode) {
            return !_this.isContentEmpty() &&
                !!(currentNode.attrs.state === newNode.attrs.state);
        });
    };
    return Task;
}(ReactNodeView));
export function taskItemNodeViewFactory(portalProviderAPI, providerFactory) {
    return function (node, view, getPos) {
        return new Task(node, view, getPos, portalProviderAPI, {
            providerFactory: providerFactory,
        }).init();
    };
}
//# sourceMappingURL=taskItem.js.map