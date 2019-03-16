import * as tslib_1 from "tslib";
import * as React from 'react';
import { injectIntl, defineMessages, FormattedMessage, } from 'react-intl';
import { browser } from '@findable/editor-common';
import CrossIcon from '@findable/icon/glyph/cross';
import Modal, { ModalTransition } from '@findable/modal-dialog';
import { Header, Footer, ContentWrapper, Line, Content, ColumnRight, ColumnLeft, Row, CodeSm, CodeMd, CodeLg, Title, } from './styles';
import * as keymaps from '../../../keymaps';
import ToolbarButton from '../../../ui/ToolbarButton';
import { messages as textFormattingMessages } from '../../text-formatting/ui/ToolbarTextFormatting';
import { messages as advancedTextFormattingMessages } from '../../text-formatting/ui/ToolbarAdvancedTextFormatting';
import { messages as blockTypeMessages } from '../../block-type/types';
import { messages as listMessages } from '../../lists/messages';
import { messages as insertBlockMessages } from '../../insert-block/ui/ToolbarInsertBlock';
import { closeHelpCommand } from '../';
var messages = defineMessages({
    editorHelp: {
        id: 'fabric.editor.editorHelp',
        defaultMessage: 'Editor help',
        description: 'Title of editor help dialog.',
    },
    helpDialogTips: {
        id: 'fabric.editor.helpDialogTips',
        defaultMessage: 'Press {keyMap} to quickly open this dialog at any time',
        description: 'Hint about how to open a dialog quickly using a shortcut.',
    },
    keyboardShortcuts: {
        id: 'fabric.editor.keyboardShortcuts',
        defaultMessage: 'Keyboard shortcuts',
        description: '',
    },
    markdown: {
        id: 'fabric.editor.markdown',
        defaultMessage: 'Markdown',
        description: 'It is a name of popular markup language.',
    },
    undo: {
        id: 'fabric.editor.undo',
        defaultMessage: 'Undo',
        description: '',
    },
    redo: {
        id: 'fabric.editor.redo',
        defaultMessage: 'Redo',
        description: '',
    },
    pastePlainText: {
        id: 'fabric.editor.pastePlainText',
        defaultMessage: 'Paste plain text',
        description: '',
    },
    altText: {
        id: 'fabric.editor.altText',
        defaultMessage: 'Alt text',
        description: 'Alternative text for image.',
    },
    closeHelpDialog: {
        id: 'fabric.editor.closeHelpDialog',
        defaultMessage: 'Close help dialog',
        description: '',
    },
    // TODO: Move it inside quick insert plugin
    quickInsert: {
        id: 'fabric.editor.quickInsert',
        defaultMessage: 'Quick insert',
        description: 'Name of a feature, which let you insert items quickly.',
    },
});
var AkModalDialog = Modal;
export var formatting = function (_a) {
    var formatMessage = _a.formatMessage;
    return [
        {
            name: formatMessage(textFormattingMessages.bold),
            type: 'strong',
            keymap: function () { return keymaps.toggleBold; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null,
                    "**",
                    React.createElement(FormattedMessage, tslib_1.__assign({}, textFormattingMessages.bold)),
                    "**"))); },
        },
        {
            name: formatMessage(textFormattingMessages.italic),
            type: 'em',
            keymap: function () { return keymaps.toggleItalic; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null,
                    "*",
                    React.createElement(FormattedMessage, tslib_1.__assign({}, textFormattingMessages.italic)),
                    "*"))); },
        },
        {
            name: formatMessage(advancedTextFormattingMessages.underline),
            type: 'underline',
            keymap: function () { return keymaps.toggleUnderline; },
        },
        {
            name: formatMessage(advancedTextFormattingMessages.strike),
            type: 'strike',
            keymap: function () { return keymaps.toggleStrikethrough; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null,
                    "~~",
                    React.createElement(FormattedMessage, tslib_1.__assign({}, advancedTextFormattingMessages.strike)),
                    "~~"))); },
        },
        {
            name: formatMessage(blockTypeMessages.heading1),
            type: 'heading',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeSm, null, "#"),
                " ",
                React.createElement(CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(blockTypeMessages.heading2),
            type: 'heading',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null, "##"),
                " ",
                React.createElement(CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(listMessages.orderedList),
            type: 'orderedList',
            keymap: function () { return keymaps.toggleOrderedList; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeSm, null, "1."),
                " ",
                React.createElement(CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(listMessages.unorderedList),
            type: 'bulletList',
            keymap: function () { return keymaps.toggleBulletList; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeSm, null, "*"),
                " ",
                React.createElement(CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(blockTypeMessages.blockquote),
            type: 'blockquote',
            keymap: function () { return keymaps.toggleBlockQuote; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null, ">"),
                " ",
                React.createElement(CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(blockTypeMessages.codeblock),
            type: 'codeBlock',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null, "```"))); },
        },
        {
            name: formatMessage(insertBlockMessages.horizontalRule),
            type: 'rule',
            keymap: function () { return keymaps.insertRule; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null, "---"))); },
        },
        {
            name: formatMessage(insertBlockMessages.link),
            type: 'link',
            keymap: function () { return keymaps.addLink; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null,
                    "[",
                    React.createElement(FormattedMessage, tslib_1.__assign({}, insertBlockMessages.link)),
                    "](http://a.com)"))); },
        },
        {
            name: formatMessage(advancedTextFormattingMessages.code),
            type: 'code',
            keymap: function () { return keymaps.toggleCode; },
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null,
                    "`",
                    React.createElement(FormattedMessage, tslib_1.__assign({}, advancedTextFormattingMessages.code)),
                    "`"))); },
        },
        {
            name: formatMessage(insertBlockMessages.action),
            type: 'taskItem',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeSm, null, "[]"),
                " ",
                React.createElement(CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(insertBlockMessages.decision),
            type: 'decisionItem',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeSm, null, "<>"),
                " ",
                React.createElement(CodeLg, null, "Space"))); },
        },
        {
            name: formatMessage(insertBlockMessages.emoji),
            type: 'emoji',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null, ":"))); },
        },
        {
            name: formatMessage(insertBlockMessages.mention),
            type: 'mention',
            autoFormatting: function () { return (React.createElement("span", null,
                React.createElement(CodeLg, null, "@"))); },
        },
    ];
};
var shortcutNamesWithoutKeymap = [
    'emoji',
    'mention',
    'quickInsert',
];
var otherFormatting = function (_a) {
    var formatMessage = _a.formatMessage;
    return [
        {
            name: formatMessage(advancedTextFormattingMessages.clearFormatting),
            type: 'clearFormatting',
            keymap: function () { return keymaps.clearFormatting; },
        },
        {
            name: formatMessage(messages.undo),
            type: 'undo',
            keymap: function () { return keymaps.undo; },
        },
        {
            name: formatMessage(messages.redo),
            type: 'redo',
            keymap: function () { return keymaps.redo; },
        },
        {
            name: formatMessage(messages.pastePlainText),
            type: 'paste',
            keymap: function () { return keymaps.pastePlainText; },
        },
    ];
};
var imageAutoFormat = {
    name: 'Image',
    type: 'image',
    autoFormatting: function () { return (React.createElement("span", null,
        React.createElement(CodeLg, null,
            "![",
            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.altText)),
            "](http://www.image.com)"))); },
};
var quickInsertAutoFormat = function (_a) {
    var formatMessage = _a.formatMessage;
    return ({
        name: formatMessage(messages.quickInsert),
        type: 'quickInsert',
        autoFormatting: function () { return (React.createElement("span", null,
            React.createElement(CodeLg, null, "/"))); },
    });
};
export var getSupportedFormatting = function (schema, intl, imageEnabled, quickInsertEnabled) {
    var supportedBySchema = formatting(intl).filter(function (format) { return schema.nodes[format.type] || schema.marks[format.type]; });
    return tslib_1.__spread(supportedBySchema, (imageEnabled ? [imageAutoFormat] : []), (quickInsertEnabled ? [quickInsertAutoFormat(intl)] : []), otherFormatting(intl));
};
export var getComponentFromKeymap = function (keymap) {
    var shortcut = keymap[browser.mac ? 'mac' : 'windows'];
    var keyParts = shortcut.replace(/\-(?=.)/g, ' + ').split(' ');
    return (React.createElement("span", null, keyParts.map(function (part, index) {
        if (part === '+') {
            return React.createElement("span", { key: shortcut + "-" + index }, ' + ');
        }
        else if (part === 'Cmd') {
            return React.createElement(CodeSm, { key: shortcut + "-" + index }, "\u2318");
        }
        else if (['ctrl', 'alt', 'opt', 'shift'].indexOf(part.toLowerCase()) >= 0) {
            return React.createElement(CodeMd, { key: shortcut + "-" + index }, part);
        }
        return (React.createElement(CodeSm, { key: shortcut + "-" + index }, part.toUpperCase()));
    })));
};
var ModalHeader = injectIntl(function (_a) {
    var onClose = _a.onClose, showKeyline = _a.showKeyline, formatMessage = _a.intl.formatMessage;
    return (React.createElement(Header, { showKeyline: showKeyline },
        React.createElement(FormattedMessage, tslib_1.__assign({}, messages.editorHelp)),
        React.createElement("div", null,
            React.createElement(ToolbarButton, { onClick: onClose, title: formatMessage(messages.closeHelpDialog), spacing: "compact", iconBefore: React.createElement(CrossIcon, { label: formatMessage(messages.closeHelpDialog), size: "medium" }) }))));
});
var ModalFooter = function (_a) {
    var showKeyline = _a.showKeyline;
    return (React.createElement(Footer, { showKeyline: showKeyline },
        React.createElement(FormattedMessage, tslib_1.__assign({}, messages.helpDialogTips, { values: { keyMap: getComponentFromKeymap(keymaps.openHelp) } }))));
};
var HelpDialog = /** @class */ (function (_super) {
    tslib_1.__extends(HelpDialog, _super);
    function HelpDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formatting = [];
        _this.closeDialog = function () {
            var _a = _this.props.editorView, tr = _a.state.tr, dispatch = _a.dispatch;
            closeHelpCommand(tr, dispatch);
        };
        _this.handleEsc = function (e) {
            if (e.key === 'Escape' && _this.props.isVisible) {
                _this.closeDialog();
            }
        };
        return _this;
    }
    HelpDialog.prototype.componentDidMount = function () {
        document.addEventListener('keydown', this.handleEsc);
    };
    HelpDialog.prototype.componentWillUnmount = function () {
        document.removeEventListener('keydown', this.handleEsc);
    };
    HelpDialog.prototype.render = function () {
        var _this = this;
        var _a = this.props, editorView = _a.editorView, intl = _a.intl, imageEnabled = _a.imageEnabled, quickInsertEnabled = _a.quickInsertEnabled;
        this.formatting = getSupportedFormatting(editorView.state.schema, intl, imageEnabled, quickInsertEnabled);
        return (React.createElement(ModalTransition, null, this.props.isVisible ? (React.createElement(AkModalDialog, { width: "large", onClose: this.closeDialog, components: { Header: ModalHeader, Footer: ModalFooter } },
            React.createElement(ContentWrapper, null,
                React.createElement(Line, null),
                React.createElement(Content, null,
                    React.createElement(ColumnLeft, null,
                        React.createElement(Title, null,
                            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.keyboardShortcuts))),
                        React.createElement("div", null,
                            this.formatting
                                .filter(function (form) {
                                var keymap = form.keymap && form.keymap(_this.props);
                                return (keymap && keymap[browser.mac ? 'mac' : 'windows']);
                            })
                                .map(function (form) { return (React.createElement(Row, { key: "textFormatting-" + form.name },
                                React.createElement("span", null, form.name),
                                getComponentFromKeymap(form.keymap({ appearance: _this.props.appearance })))); }),
                            this.formatting
                                .filter(function (form) {
                                return shortcutNamesWithoutKeymap.indexOf(form.type) !== -1;
                            })
                                .filter(function (form) { return form.autoFormatting; })
                                .map(function (form) { return (React.createElement(Row, { key: "autoFormatting-" + form.name },
                                React.createElement("span", null, form.name),
                                form.autoFormatting())); }))),
                    React.createElement(Line, null),
                    React.createElement(ColumnRight, null,
                        React.createElement(Title, null,
                            React.createElement(FormattedMessage, tslib_1.__assign({}, messages.markdown))),
                        React.createElement("div", null, this.formatting
                            .filter(function (form) {
                            return shortcutNamesWithoutKeymap.indexOf(form.type) === -1;
                        })
                            .map(function (form) {
                            return form.autoFormatting && (React.createElement(Row, { key: "autoFormatting-" + form.name },
                                React.createElement("span", null, form.name),
                                form.autoFormatting()));
                        }))))))) : null));
    };
    return HelpDialog;
}(React.Component));
export default injectIntl(HelpDialog);
//# sourceMappingURL=index.js.map