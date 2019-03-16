import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import DecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { insertTaskDecision } from '../../commands';
import { messages } from '../../../insert-block/ui/ToolbarInsertBlock';
var ToolbarDecision = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarDecision, _super);
    function ToolbarDecision() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { disabled: false };
        _this.handleInsertDecision = withAnalytics('atlassian.fabric.decision.trigger.button', function () {
            var editorView = _this.props.editorView;
            if (!editorView) {
                return false;
            }
            insertTaskDecision(editorView, 'decisionList');
            return true;
        });
        return _this;
    }
    ToolbarDecision.prototype.render = function () {
        var disabled = this.state.disabled;
        var _a = this.props, isDisabled = _a.isDisabled, isReducedSpacing = _a.isReducedSpacing, formatMessage = _a.intl.formatMessage;
        var label = formatMessage(messages.decision);
        return (React.createElement(ToolbarButton, { onClick: this.handleInsertDecision, disabled: disabled || isDisabled, spacing: isReducedSpacing ? 'none' : 'default', title: label + " <>", iconBefore: React.createElement(DecisionIcon, { label: label }) }));
    };
    return ToolbarDecision;
}(PureComponent));
export { ToolbarDecision };
export default injectIntl(ToolbarDecision);
//# sourceMappingURL=index.js.map