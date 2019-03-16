import * as React from 'react';
import { WithProviders } from '@findable/editor-common';
import { pluginKey as blockTypeStateKey, } from '../block-type/pm-plugins/main';
import { stateKey as mediaStateKey, } from '../media/pm-plugins/main';
import { stateKey as hyperlinkPluginKey, } from '../hyperlink/pm-plugins/main';
import { mentionPluginKey } from '../mentions';
import { pluginKey as tablesStateKey } from '../table/pm-plugins/main';
import { stateKey as imageUploadStateKey } from '../image-upload/pm-plugins/main';
import { pluginKey as placeholderTextStateKey, } from '../placeholder-text';
import { pluginKey as layoutStateKey } from '../layout';
import { pluginKey as macroStateKey, insertMacroFromMacroBrowser, } from '../macro';
import { pluginKey as dateStateKey } from '../date/plugin';
import { emojiPluginKey } from '../emoji/pm-plugins/main';
import WithPluginState from '../../ui/WithPluginState';
import { ToolbarSize } from '../../ui/Toolbar';
import ToolbarInsertBlock from './ui/ToolbarInsertBlock';
import { insertBlockTypesWithAnalytics } from '../block-type/commands';
import { startImageUpload } from '../image-upload/pm-plugins/commands';
import { pluginKey as typeAheadPluginKey } from '../type-ahead/pm-plugins/main';
var toolbarSizeToButtons = function (toolbarSize) {
    switch (toolbarSize) {
        case ToolbarSize.XXL:
        case ToolbarSize.XL:
        case ToolbarSize.L:
        case ToolbarSize.M:
            return 6;
        case ToolbarSize.S:
            return 2;
        default:
            return 0;
    }
};
/**
 * Wrapper over insertBlockTypeWithAnalytics to autobind toolbar input method
 * @param name Block name
 */
function handleInsertBlockType(name) {
    return insertBlockTypesWithAnalytics(name, "toolbar" /* TOOLBAR */);
}
var insertBlockPlugin = function (options) { return ({
    primaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, editorActions = _a.editorActions, dispatchAnalyticsEvent = _a.dispatchAnalyticsEvent, providerFactory = _a.providerFactory, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement, toolbarSize = _a.toolbarSize, disabled = _a.disabled, isToolbarReducedSpacing = _a.isToolbarReducedSpacing;
        var buttons = toolbarSizeToButtons(toolbarSize);
        var renderNode = function (providers) {
            return (React.createElement(WithPluginState, { plugins: {
                    typeAheadState: typeAheadPluginKey,
                    blockTypeState: blockTypeStateKey,
                    mediaState: mediaStateKey,
                    mentionState: mentionPluginKey,
                    tablesState: tablesStateKey,
                    macroState: macroStateKey,
                    hyperlinkState: hyperlinkPluginKey,
                    emojiState: emojiPluginKey,
                    dateState: dateStateKey,
                    imageUpload: imageUploadStateKey,
                    placeholderTextState: placeholderTextStateKey,
                    layoutState: layoutStateKey,
                }, render: function (_a) {
                    var typeAheadState = _a.typeAheadState, mentionState = _a.mentionState, blockTypeState = _a.blockTypeState, mediaState = _a.mediaState, tablesState = _a.tablesState, _b = _a.macroState, macroState = _b === void 0 ? {} : _b, hyperlinkState = _a.hyperlinkState, emojiState = _a.emojiState, dateState = _a.dateState, imageUpload = _a.imageUpload, placeholderTextState = _a.placeholderTextState, layoutState = _a.layoutState;
                    return (React.createElement(ToolbarInsertBlock, { buttons: buttons, isReducedSpacing: isToolbarReducedSpacing, isDisabled: disabled, isTypeAheadAllowed: typeAheadState && typeAheadState.isAllowed, editorView: editorView, tableSupported: !!tablesState, actionSupported: !!editorView.state.schema.nodes.taskItem, mentionsSupported: !!(mentionState && mentionState.mentionProvider), mentionsEnabled: !!mentionState, decisionSupported: !!editorView.state.schema.nodes.decisionItem, dateEnabled: !!dateState, placeholderTextEnabled: placeholderTextState && placeholderTextState.allowInserting, layoutSectionEnabled: !!layoutState, mediaUploadsEnabled: mediaState && mediaState.allowsUploads, onShowMediaPicker: mediaState && mediaState.showMediaPicker, mediaSupported: !!mediaState, imageUploadSupported: !!imageUpload, imageUploadEnabled: imageUpload && imageUpload.enabled, handleImageUpload: startImageUpload, availableWrapperBlockTypes: blockTypeState && blockTypeState.availableWrapperBlockTypes, linkSupported: !!hyperlinkState, linkDisabled: !hyperlinkState ||
                            !hyperlinkState.canInsertLink ||
                            !!hyperlinkState.activeLinkMark, emojiDisabled: !emojiState || !emojiState.enabled, insertEmoji: emojiState && emojiState.insertEmoji, emojiProvider: providers.emojiProvider, nativeStatusSupported: options.nativeStatusSupported, horizontalRuleEnabled: options.horizontalRuleEnabled, onInsertBlockType: handleInsertBlockType, onInsertMacroFromMacroBrowser: insertMacroFromMacroBrowser, macroProvider: macroState.macroProvider, popupsMountPoint: popupsMountPoint, popupsBoundariesElement: popupsBoundariesElement, popupsScrollableElement: popupsScrollableElement, insertMenuItems: options.insertMenuItems, editorActions: editorActions, dispatchAnalyticsEvent: dispatchAnalyticsEvent }));
                } }));
        };
        return (React.createElement(WithProviders, { providerFactory: providerFactory, providers: ['emojiProvider'], renderNode: renderNode }));
    },
}); };
export default insertBlockPlugin;
//# sourceMappingURL=index.js.map