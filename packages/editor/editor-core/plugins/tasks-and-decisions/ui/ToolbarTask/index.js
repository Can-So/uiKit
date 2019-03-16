import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import TaskIcon from '@atlaskit/icon/glyph/editor/task';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { insertTaskDecision } from '../../commands';
import { messages } from '../../../insert-block/ui/ToolbarInsertBlock';
var ToolbarTask = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarTask, _super);
    function ToolbarTask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { disabled: false };
        _this.handleInsertTask = withAnalytics('atlassian.fabric.action.trigger.button', function () {
            var editorView = _this.props.editorView;
            if (!editorView) {
                return false;
            }
            insertTaskDecision(editorView, 'taskList');
            return true;
        });
        return _this;
    }
    ToolbarTask.prototype.render = function () {
        var disabled = this.state.disabled;
        var _a = this.props, isDisabled = _a.isDisabled, isReducedSpacing = _a.isReducedSpacing, formatMessage = _a.intl.formatMessage;
        var label = formatMessage(messages.action);
        return (React.createElement(ToolbarButton, { onClick: this.handleInsertTask, disabled: disabled || isDisabled, spacing: isReducedSpacing ? 'none' : 'default', title: label + " []", iconBefore: React.createElement(TaskIcon, { label: label }) }));
    };
    return ToolbarTask;
}(PureComponent));
export { ToolbarTask };
export default injectIntl(ToolbarTask);
//# sourceMappingURL=index.js.map