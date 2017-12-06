import * as React from 'react';
import { mention, mentionQuery } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import { WithProviders } from '../../../providerFactory/withProviders';
import { createPlugin } from '../../../plugins/mentions';
import inputRulePlugin from '../../../plugins/mentions/input-rules';
import keymap from '../../../plugins/mentions/keymap';
import pluginKey from '../../../plugins/mentions/plugin-key';
import ToolbarMention from '../../../ui/ToolbarMention';
import MentionPicker from '../../../ui/MentionPicker';

const mentionsPlugin: EditorPlugin = {
  nodes() {
    return [{ name: 'mention', node: mention, rank: 1200 }];
  },

  marks() {
    return [{ name: 'mentionQuery', mark: mentionQuery, rank: 1200 }];
  },

  pmPlugins() {
    return [
      {
        rank: 300,
        plugin: ({ providerFactory }) => createPlugin(providerFactory),
      },
      { rank: 310, plugin: ({ schema }) => inputRulePlugin(schema) },
      { rank: 320, plugin: ({ schema }) => keymap(schema) },
    ];
  },

  contentComponent(
    editorView,
    eventDispatcher,
    providerFactory,
    appearance,
    popupsMountPoint,
    popupsBoundariesElement,
  ) {
    const renderNode = providers => {
      return (
        <MentionPicker
          editorView={editorView}
          pluginKey={pluginKey}
          mentionProvider={providers.mentionProvider}
          presenceProvider={providers.presenceProvider}
          popupsMountPoint={popupsMountPoint}
          popupsBoundariesElement={popupsBoundariesElement}
        />
      );
    };

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['mentionProvider', 'presenceProvider']}
        renderNode={renderNode}
      />
    );
  },

  primaryToolbarComponent(
    editorView,
    eventDispatcher,
    providerFactory,
    appearance,
    popupsMountPoint,
    popupsBoundariesElement,
    disabled,
    editorWidth,
  ) {
    return (
      <ToolbarMention
        editorView={editorView}
        pluginKey={pluginKey}
        editorWidth={editorWidth}
        isDisabled={disabled}
      />
    );
  },

  secondaryToolbarComponent(editorView) {
    return <ToolbarMention editorView={editorView} pluginKey={pluginKey} />;
  },
};

export default mentionsPlugin;
