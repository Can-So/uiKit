import * as tslib_1 from "tslib";
import * as React from 'react';
import DecisionItem from '../ui/Decision';
import { ReactNodeView } from '../../../nodeviews';
import WithPluginState from '../../../ui/WithPluginState';
import { stateKey as taskPluginKey, } from '../pm-plugins/main';
var Decision = /** @class */ (function (_super) {
    tslib_1.__extends(Decision, _super);
    function Decision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Decision.prototype.isContentEmpty = function () {
        return this.node.content.childCount === 0;
    };
    Decision.prototype.createDomRef = function () {
        var domRef = document.createElement('li');
        domRef.style['list-style-type'] = 'none';
        return domRef;
    };
    Decision.prototype.getContentDOM = function () {
        return { dom: document.createElement('div') };
    };
    Decision.prototype.render = function (_props, forwardRef) {
        var _this = this;
        return (React.createElement(WithPluginState, { plugins: {
                taskDecisionPlugin: taskPluginKey,
            }, render: function (_a) {
                var taskDecisionPlugin = _a.taskDecisionPlugin;
                var insideCurrentNode = false;
                if (taskDecisionPlugin &&
                    taskDecisionPlugin.currentTaskDecisionItem) {
                    insideCurrentNode = _this.node.eq(taskDecisionPlugin.currentTaskDecisionItem);
                }
                return (React.createElement(DecisionItem, { contentRef: forwardRef, showPlaceholder: !insideCurrentNode && _this.isContentEmpty() }));
            } }));
    };
    Decision.prototype.update = function (node, decorations) {
        var _this = this;
        /**
         * Returning false here when the previous content was empty – fixes an error where the editor fails to set selection
         * inside the contentDOM after a transaction. See ED-2374.
         */
        return _super.prototype.update.call(this, node, decorations, function (_currentNode, _newNode) { return !_this.isContentEmpty(); });
    };
    return Decision;
}(ReactNodeView));
export var decisionItemNodeView = function (portalProviderAPI) { return function (node, view, getPos) {
    return new Decision(node, view, getPos, portalProviderAPI).init();
}; };
//# sourceMappingURL=decisionItem.js.map