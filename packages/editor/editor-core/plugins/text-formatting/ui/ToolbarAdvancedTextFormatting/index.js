import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import MoreIcon from '@atlaskit/icon/glyph/editor/more';
import { akEditorMenuZIndex } from '@atlaskit/editor-common';
import { analyticsService } from '../../../../analytics';
import { toggleUnderline, toggleStrikethrough, toggleCode, clearFormatting as clearFormattingKeymap, tooltip, } from '../../../../keymaps';
import ToolbarButton from '../../../../ui/ToolbarButton';
import DropdownMenu from '../../../../ui/DropdownMenu';
import { TriggerWrapper, Wrapper, Separator, Shortcut, } from '../../../../ui/styles';
import * as commands from '../../commands/text-formatting';
import { clearFormattingWithAnalytics } from '../../commands/clear-formatting';
export var messages = defineMessages({
    underline: {
        id: 'fabric.editor.underline',
        defaultMessage: 'Underline',
        description: 'Whether the text selection has underlined text',
    },
    strike: {
        id: 'fabric.editor.strike',
        defaultMessage: 'Strikethrough',
        description: 'Whether the text selection has crossed out text',
    },
    code: {
        id: 'fabric.editor.code',
        defaultMessage: 'Code',
        description: 'Whether the text selection has monospaced/code font',
    },
    subscript: {
        id: 'fabric.editor.subscript',
        defaultMessage: 'Subscript',
        description: 'Whether the text selection is written below the line in a slightly smaller size',
    },
    superscript: {
        id: 'fabric.editor.superscript',
        defaultMessage: 'Superscript',
        description: 'Whether the text selection is written above the line in a slightly smaller size',
    },
    clearFormatting: {
        id: 'fabric.editor.clearFormatting',
        defaultMessage: 'Clear formatting',
        description: 'Remove all rich text formatting from the selected text',
    },
    moreFormatting: {
        id: 'fabric.editor.moreFormatting',
        defaultMessage: 'More formatting',
        description: 'Clicking this will show a menu with additional formatting options',
    },
});
var ToolbarAdvancedTextFormatting = /** @class */ (function (_super) {
    tslib_1.__extends(ToolbarAdvancedTextFormatting, _super);
    function ToolbarAdvancedTextFormatting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false,
        };
        _this.onOpenChange = function (attrs) {
            _this.setState({
                isOpen: attrs.isOpen,
            });
        };
        _this.handleTriggerClick = function () {
            _this.onOpenChange({ isOpen: !_this.state.isOpen });
        };
        _this.createItems = function () {
            var _a = _this.props, textFormattingState = _a.textFormattingState, clearFormattingState = _a.clearFormattingState, editorView = _a.editorView, formatMessage = _a.intl.formatMessage;
            var _b = editorView.state.schema.marks, code = _b.code, underline = _b.underline, subsup = _b.subsup, strike = _b.strike;
            var items = [];
            if (textFormattingState) {
                var underlineHidden = textFormattingState.underlineHidden, codeHidden = textFormattingState.codeHidden, strikeHidden = textFormattingState.strikeHidden, subscriptHidden = textFormattingState.subscriptHidden, superscriptHidden = textFormattingState.superscriptHidden;
                if (!underlineHidden && underline) {
                    _this.addRecordToItems(items, formatMessage(messages.underline), 'underline', tooltip(toggleUnderline));
                }
                if (!strikeHidden && strike) {
                    _this.addRecordToItems(items, formatMessage(messages.strike), 'strike', tooltip(toggleStrikethrough));
                }
                if (!codeHidden && code) {
                    _this.addRecordToItems(items, formatMessage(messages.code), 'code', tooltip(toggleCode));
                }
                if (!subscriptHidden && subsup) {
                    _this.addRecordToItems(items, formatMessage(messages.subscript), 'subscript');
                }
                if (!superscriptHidden && subsup) {
                    _this.addRecordToItems(items, formatMessage(messages.superscript), 'superscript');
                }
            }
            if (clearFormattingState) {
                _this.addRecordToItems(items, formatMessage(messages.clearFormatting), 'clearFormatting', tooltip(clearFormattingKeymap), !clearFormattingState.formattingIsPresent);
            }
            return [{ items: items }];
        };
        _this.addRecordToItems = function (items, content, value, tooltip, isDisabled) {
            var active = false;
            var disabled = false;
            if (_this.props.textFormattingState) {
                active =
                    _this.props.textFormattingState[value + "Active"] || false;
                disabled =
                    isDisabled ||
                        _this.props.textFormattingState[value + "Disabled"] ||
                        false;
            }
            items.push({
                key: value,
                content: content,
                elemAfter: React.createElement(Shortcut, null, tooltip),
                value: value,
                isActive: active,
                isDisabled: disabled,
            });
        };
        _this.onItemActivated = function (_a) {
            var item = _a.item;
            analyticsService.trackEvent("atlassian.editor.format." + item.value + ".button");
            var _b = _this.props.editorView, state = _b.state, dispatch = _b.dispatch;
            switch (item.value) {
                case 'underline':
                    commands.toggleUnderlineWithAnalytics({
                        inputMethod: "toolbar" /* TOOLBAR */,
                    })(state, dispatch);
                    break;
                case 'code':
                    commands.toggleCodeWithAnalytics({ inputMethod: "toolbar" /* TOOLBAR */ })(state, dispatch);
                    break;
                case 'strike':
                    commands.toggleStrikeWithAnalytics({
                        inputMethod: "toolbar" /* TOOLBAR */,
                    })(state, dispatch);
                    break;
                case 'subscript':
                    commands.toggleSubscriptWithAnalytics()(state, dispatch);
                    break;
                case 'superscript':
                    commands.toggleSuperscriptWithAnalytics()(state, dispatch);
                    break;
                case 'clearFormatting':
                    clearFormattingWithAnalytics("toolbar" /* TOOLBAR */)(state, dispatch);
                    break;
            }
            _this.setState({ isOpen: false });
        };
        return _this;
    }
    ToolbarAdvancedTextFormatting.prototype.render = function () {
        var _this = this;
        var isOpen = this.state.isOpen;
        var _a = this.props, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, isReducedSpacing = _a.isReducedSpacing, _b = _a.textFormattingState, textFormattingState = _b === void 0 ? {} : _b, _c = _a.clearFormattingState, clearFormattingState = _c === void 0 ? {} : _c, formatMessage = _a.intl.formatMessage;
        var codeActive = textFormattingState.codeActive, underlineActive = textFormattingState.underlineActive, strikeActive = textFormattingState.strikeActive, subscriptActive = textFormattingState.subscriptActive, superscriptActive = textFormattingState.superscriptActive, codeDisabled = textFormattingState.codeDisabled, underlineDisabled = textFormattingState.underlineDisabled, strikeDisabled = textFormattingState.strikeDisabled, subscriptDisabled = textFormattingState.subscriptDisabled, superscriptDisabled = textFormattingState.superscriptDisabled;
        var formattingIsPresent = clearFormattingState.formattingIsPresent;
        var items = this.createItems();
        var labelMoreFormatting = formatMessage(messages.moreFormatting);
        var toolbarButtonFactory = function (disabled) { return (React.createElement(ToolbarButton, { spacing: isReducedSpacing ? 'none' : 'default', selected: isOpen ||
                underlineActive ||
                codeActive ||
                strikeActive ||
                subscriptActive ||
                superscriptActive, disabled: disabled, onClick: _this.handleTriggerClick, title: labelMoreFormatting, iconBefore: React.createElement(TriggerWrapper, null,
                React.createElement(MoreIcon, { label: labelMoreFormatting })) })); };
        if (!this.props.isDisabled &&
            !(strikeDisabled &&
                !formattingIsPresent &&
                codeDisabled &&
                subscriptDisabled &&
                superscriptDisabled &&
                underlineDisabled) &&
            items[0].items.length > 0) {
            return (React.createElement(Wrapper, null,
                React.createElement(DropdownMenu, { items: items, onItemActivated: this.onItemActivated, onOpenChange: this.onOpenChange, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, isOpen: isOpen, zIndex: akEditorMenuZIndex, fitHeight: 188, fitWidth: 136 }, toolbarButtonFactory(false)),
                React.createElement(Separator, null)));
        }
        else {
            return (React.createElement(Wrapper, null,
                React.createElement("div", null, toolbarButtonFactory(true)),
                React.createElement(Separator, null)));
        }
    };
    return ToolbarAdvancedTextFormatting;
}(PureComponent));
export default injectIntl(ToolbarAdvancedTextFormatting);
//# sourceMappingURL=index.js.map