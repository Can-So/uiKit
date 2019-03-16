import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import BoldIcon from '@findable/icon/glyph/editor/bold';
import ItalicIcon from '@findable/icon/glyph/editor/italic';
import { withAnalytics } from '../../../../analytics';
import { toggleBold, toggleItalic, tooltip } from '../../../../keymaps';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { ButtonGroup } from '../../../../ui/styles';
import { toggleStrongWithAnalytics, toggleEmWithAnalytics, } from '../../commands/text-formatting';
export var messages = defineMessages({
    bold: {
        id: 'fabric.editor.bold',
        defaultMessage: 'Bold',
        description: 'This refers to bold or “strong” formatting, indicates that its contents have strong importance, seriousness, or urgency.',
    },
    italic: {
        id: 'fabric.editor.italic',
        defaultMessage: 'Italic',
        description: 'This refers to italics or emphasized formatting.',
    },
});
var ToolbarTextFormatting = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarTextFormatting, _super);
    function ToolbarTextFormatting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleBoldClick = withAnalytics('atlassian.editor.format.strong.button', function () {
            var strongDisabled = _this.props.textFormattingState.strongDisabled;
            if (!strongDisabled) {
                var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
                return toggleStrongWithAnalytics({ inputMethod: "toolbar" /* TOOLBAR */ })(state, dispatch);
            }
            return false;
        });
        _this.handleItalicClick = withAnalytics('atlassian.editor.format.em.button', function () {
            var emDisabled = _this.props.textFormattingState.emDisabled;
            if (!emDisabled) {
                var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
                return toggleEmWithAnalytics({ inputMethod: "toolbar" /* TOOLBAR */ })(state, dispatch);
            }
            return false;
        });
        return _this;
    }
    ToolbarTextFormatting.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, isReducedSpacing = _a.isReducedSpacing, textFormattingState = _a.textFormattingState, formatMessage = _a.intl.formatMessage;
        var strongHidden = textFormattingState.strongHidden, strongActive = textFormattingState.strongActive, strongDisabled = textFormattingState.strongDisabled, emHidden = textFormattingState.emHidden, emActive = textFormattingState.emActive, emDisabled = textFormattingState.emDisabled;
        var labelBold = formatMessage(messages.bold);
        var labelItalic = formatMessage(messages.italic);
        return (React.createElement(ButtonGroup, { width: isReducedSpacing ? 'small' : 'large' },
            strongHidden ? null : (React.createElement(ToolbarButton, { spacing: isReducedSpacing ? 'none' : 'default', onClick: this.handleBoldClick, selected: strongActive, disabled: disabled || strongDisabled, title: tooltip(toggleBold, labelBold), iconBefore: React.createElement(BoldIcon, { label: labelBold }) })),
            emHidden ? null : (React.createElement(ToolbarButton, { spacing: isReducedSpacing ? 'none' : 'default', onClick: this.handleItalicClick, selected: emActive, disabled: disabled || emDisabled, title: tooltip(toggleItalic, labelItalic), iconBefore: React.createElement(ItalicIcon, { label: labelItalic }) }))));
    };
    return ToolbarTextFormatting;
}(PureComponent));
export default injectIntl(ToolbarTextFormatting);
//# sourceMappingURL=index.js.map