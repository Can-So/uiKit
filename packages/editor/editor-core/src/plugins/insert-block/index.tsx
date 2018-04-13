import * as React from 'react';
import { EditorPlugin } from '../../types';
import { WithProviders } from '@atlaskit/editor-common';
import {
  stateKey as blockTypeStateKey,
  BlockTypeState,
} from '../block-type/pm-plugins/main';
import { stateKey as mediaStateKey } from '../media/pm-plugins/main';
import { hyperlinkPluginKey } from '../hyperlink';
import { mentionPluginKey as mentionStateKey } from '../mentions/pm-plugins/main';
import { stateKey as tablesStateKey } from '../table/pm-plugins/main';
import { stateKey as imageUploadStateKey } from '../image-upload/pm-plugins/main';
import { pluginKey as placeholderTextStateKey } from '../placeholder-text';
import { pluginKey as layoutStateKey } from '../layout';
import {
  pluginKey as macroStateKey,
  MacroState,
  insertMacroFromMacroBrowser,
} from '../macro';
import { pluginKey as dateStateKey } from '../date/plugin';
import { emojiPluginKey } from '../emoji/pm-plugins/main';
import WithPluginState from '../../ui/WithPluginState';
import { ToolbarSize } from '../../ui/Toolbar';
import ToolbarInsertBlock from './ui/ToolbarInsertBlock';

const toolbarSizeToButtons = toolbarSize => {
  switch (toolbarSize) {
    case ToolbarSize.XXL:
    case ToolbarSize.XL:
    case ToolbarSize.L:
    case ToolbarSize.M:
      return 5;

    case ToolbarSize.S:
      return 2;

    default:
      return 0;
  }
};

export interface InsertBlockOptions {
  insertMenuItems?: any;
  horizontalRuleEnabled?: boolean;
}

const insertBlockPlugin = (options: InsertBlockOptions): EditorPlugin => ({
  primaryToolbarComponent({
    editorView,
    editorActions,
    eventDispatcher,
    providerFactory,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing,
  }) {
    const buttons = toolbarSizeToButtons(toolbarSize);
    const renderNode = providers => {
      return (
        <WithPluginState
          plugins={{
            blockTypeState: blockTypeStateKey,
            mediaState: mediaStateKey,
            tablesState: tablesStateKey,
            mentionsState: mentionStateKey,
            macroState: macroStateKey,
            hyperlinkState: hyperlinkPluginKey,
            emojiState: emojiPluginKey,
            dateState: dateStateKey,
            imageUpload: imageUploadStateKey,
            placeholderTextState: placeholderTextStateKey,
            layoutState: layoutStateKey,
          }}
          render={({
            blockTypeState = {} as BlockTypeState,
            mediaState,
            mentionsState,
            tablesState,
            macroState = {} as MacroState,
            hyperlinkState,
            emojiState,
            dateState,
            imageUpload,
            placeholderTextState,
            layoutState,
          }) => (
            <ToolbarInsertBlock
              buttons={buttons}
              isReducedSpacing={isToolbarReducedSpacing}
              isDisabled={disabled}
              editorView={editorView}
              tableHidden={tablesState && tablesState.tableHidden}
              tableSupported={!!tablesState}
              mentionsEnabled={mentionsState && mentionsState.enabled}
              dateEnabled={!!dateState}
              placeholderTextEnabled={
                placeholderTextState && placeholderTextState.allowInserting
              }
              layoutSectionEnabled={!!layoutState}
              insertMentionQuery={
                mentionsState && mentionsState.insertMentionQuery
              }
              mentionsSupported={!!mentionsState}
              mediaUploadsEnabled={mediaState && mediaState.allowsUploads}
              onShowMediaPicker={mediaState && mediaState.showMediaPicker}
              mediaSupported={!!mediaState}
              imageUploadSupported={!!imageUpload}
              imageUploadEnabled={imageUpload && imageUpload.enabled}
              handleImageUpload={
                imageUpload && imageUpload.handleImageUpload.bind(imageUpload)
              }
              availableWrapperBlockTypes={
                blockTypeState.availableWrapperBlockTypes
              }
              linkSupported={!!hyperlinkState}
              linkDisabled={
                !hyperlinkState ||
                !hyperlinkState.linkable ||
                hyperlinkState.active
              }
              showLinkPanel={hyperlinkState && hyperlinkState.showLinkPanel}
              emojiDisabled={!emojiState || !emojiState.enabled}
              insertEmoji={emojiState && emojiState.insertEmoji}
              emojiProvider={providers.emojiProvider}
              horizontalRuleEnabled={options.horizontalRuleEnabled}
              onInsertBlockType={blockTypeState.insertBlockType}
              onInsertMacroFromMacroBrowser={insertMacroFromMacroBrowser}
              macroProvider={macroState.macroProvider}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
              insertMenuItems={options.insertMenuItems}
              editorActions={editorActions}
            />
          )}
        />
      );
    };

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['emojiProvider']}
        renderNode={renderNode}
      />
    );
  },
});

export default insertBlockPlugin;
