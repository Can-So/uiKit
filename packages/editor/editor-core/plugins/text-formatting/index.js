import * as React from 'react';
import { em, strong, strike, subsup, underline, code, } from '@atlaskit/adf-schema';
import { ButtonGroup } from '../../ui/styles';
import { plugin as textFormattingPlugin, pluginKey as textFormattingPluginKey, } from './pm-plugins/main';
import { plugin as clearFormattingPlugin, pluginKey as clearFormattingPluginKey, } from './pm-plugins/clear-formatting';
import textFormattingCursorPlugin from './pm-plugins/cursor';
import textFormattingInputRulePlugin from './pm-plugins/input-rule';
import clearFormattingKeymapPlugin from './pm-plugins/clear-formatting-keymap';
import textFormattingSmartInputRulePlugin from './pm-plugins/smart-input-rule';
import keymapPlugin from './pm-plugins/keymap';
import ToolbarAdvancedTextFormatting from './ui/ToolbarAdvancedTextFormatting';
import ToolbarTextFormatting from './ui/ToolbarTextFormatting';
import WithPluginState from '../../ui/WithPluginState';
var textFormatting = function (options) { return ({
    marks: function () {
        return [
            { name: 'em', mark: em },
            { name: 'strong', mark: strong },
            { name: 'strike', mark: strike },
        ]
            .concat(options.disableCode ? [] : { name: 'code', mark: code })
            .concat(options.disableSuperscriptAndSubscript
            ? []
            : { name: 'subsup', mark: subsup })
            .concat(options.disableUnderline ? [] : { name: 'underline', mark: underline });
    },
    pmPlugins: function () {
        return [
            {
                name: 'textFormatting',
                plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return textFormattingPlugin(dispatch);
                },
            },
            {
                name: 'textFormattingCursor',
                plugin: function () { return textFormattingCursorPlugin; },
            },
            {
                name: 'textFormattingInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return textFormattingInputRulePlugin(schema);
                },
            },
            {
                name: 'textFormattingSmartRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return !options.disableSmartTextCompletion
                        ? textFormattingSmartInputRulePlugin
                        : undefined;
                },
            },
            {
                name: 'textFormattingClear',
                plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return clearFormattingPlugin(dispatch);
                },
            },
            {
                name: 'textFormattingClearKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return clearFormattingKeymapPlugin(schema);
                },
            },
            {
                name: 'textFormattingKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymapPlugin(schema);
                },
            },
        ];
    },
    primaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsScrollableElement = _a.popupsScrollableElement, isToolbarReducedSpacing = _a.isToolbarReducedSpacing, disabled = _a.disabled;
        return (React.createElement(WithPluginState, { plugins: {
                textFormattingState: textFormattingPluginKey,
                clearFormattingState: clearFormattingPluginKey,
            }, render: function (_a) {
                var textFormattingState = _a.textFormattingState, clearFormattingState = _a.clearFormattingState;
                return (React.createElement(ButtonGroup, { width: isToolbarReducedSpacing ? 'small' : 'large' },
                    React.createElement(ToolbarTextFormatting, { disabled: disabled, editorView: editorView, textFormattingState: textFormattingState, isReducedSpacing: isToolbarReducedSpacing }),
                    React.createElement(ToolbarAdvancedTextFormatting, { editorView: editorView, isDisabled: disabled, isReducedSpacing: isToolbarReducedSpacing, textFormattingState: textFormattingState, clearFormattingState: clearFormattingState, popupsMountPoint: popupsMountPoint, popupsScrollableElement: popupsScrollableElement })));
            } }));
    },
}); };
export default textFormatting;
//# sourceMappingURL=index.js.map