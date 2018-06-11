import * as React from 'react';
import { emoji, emojiQuery, WithProviders } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import { createPlugin, emojiPluginKey } from './pm-plugins/main';
import inputRulePlugin from './pm-plugins/input-rules';
import keymap from './pm-plugins/keymap';
import { inputRulePlugin as asciiInputRulePlugin } from './pm-plugins/ascii-input-rules';
import ToolbarEmojiPicker from './ui/ToolbarEmojiPicker';
import EmojiTypeAhead from './ui/EmojiTypeAhead';

const emojiPlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'emoji', node: emoji, rank: 1600 }];
  },

  marks() {
    return [{ name: 'emojiQuery', mark: emojiQuery, rank: 1600 }];
  },

  pmPlugins() {
    return [
      {
        rank: 400,
        plugin: ({ providerFactory, portalProviderAPI }) =>
          createPlugin(portalProviderAPI, providerFactory),
      },
      { rank: 410, plugin: ({ schema }) => inputRulePlugin(schema) },
      { rank: 420, plugin: ({ schema }) => keymap(schema) },
      {
        rank: 430,
        plugin: ({ schema, providerFactory }) =>
          asciiInputRulePlugin(schema, providerFactory),
      },
    ];
  },

  contentComponent({
    editorView,
    providerFactory,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
  }) {
    const renderNode = providers => {
      return (
        <EmojiTypeAhead
          editorView={editorView}
          pluginKey={emojiPluginKey}
          emojiProvider={providers.emojiProvider}
          popupsMountPoint={popupsMountPoint}
          popupsBoundariesElement={popupsBoundariesElement}
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

  secondaryToolbarComponent({
    editorView,
    eventDispatcher,
    providerFactory,
    appearance,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    disabled,
  }) {
    const renderNode = providers => {
      // numFollowingButtons must be changed if buttons are added after ToolbarEmojiPicker to the message editor
      return (
        <ToolbarEmojiPicker
          editorView={editorView}
          pluginKey={emojiPluginKey}
          emojiProvider={providers.emojiProvider}
          numFollowingButtons={4}
          isReducedSpacing={true}
          isDisabled={disabled}
          popupsMountPoint={popupsMountPoint}
          popupsBoundariesElement={popupsBoundariesElement}
          popupsScrollableElement={popupsScrollableElement}
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
};

export default emojiPlugin;
