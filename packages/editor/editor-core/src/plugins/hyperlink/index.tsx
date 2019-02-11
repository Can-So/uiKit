import * as React from 'react';
import { link } from '@atlaskit/adf-schema';
import { WithProviders } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { createInputRulePlugin } from './pm-plugins/input-rule';
import { createKeymapPlugin } from './pm-plugins/keymap';
import {
  plugin,
  stateKey,
  HyperlinkState,
  LinkAction,
} from './pm-plugins/main';
import fakeCursorToolbarPlugin from './pm-plugins/fake-cursor-for-toolbar';
import syncTextAndUrlPlugin from './pm-plugins/sync-text-and-url';
import HyperlinkToolbar from './ui';
import EditorSuccessIcon from '@atlaskit/icon/glyph/editor/success';
import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID,
} from '../analytics';

const hyperlinkPlugin: EditorPlugin = {
  marks() {
    return [{ name: 'link', mark: link }];
  },

  pmPlugins() {
    return [
      {
        name: 'syncUrlText',
        plugin: ({ props: { appearance } }) =>
          appearance === 'message' ? syncTextAndUrlPlugin : undefined,
      },
      { name: 'hyperlink', plugin: ({ dispatch }) => plugin(dispatch) },
      {
        name: 'fakeCursorToolbarPlugin',
        plugin: () => fakeCursorToolbarPlugin,
      },
      {
        name: 'hyperlinkInputRule',
        plugin: ({ schema }) => createInputRulePlugin(schema),
      },
      {
        name: 'hyperlinkKeymap',
        plugin: ({ schema, props }) => createKeymapPlugin(schema, props),
      },
    ];
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: 'Hyperlink',
        keywords: ['url', 'link', 'hyperlink'],
        priority: 1200,
        icon: () => <EditorSuccessIcon label={'Hyperlink'} />,
        action(insert, state) {
          const pos = state.selection.from;
          const { nodeBefore } = state.selection.$from;
          if (!nodeBefore) {
            return false;
          }
          const tr = state.tr
            .setMeta(stateKey, LinkAction.SHOW_INSERT_TOOLBAR)
            .delete(pos - nodeBefore.nodeSize, pos);

          return addAnalytics(tr, {
            action: ACTION.INVOKED,
            actionSubject: ACTION_SUBJECT.TYPEAHEAD,
            actionSubjectId: ACTION_SUBJECT_ID.TYPEAHEAD_LINK,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.UI,
          });
        },
      },
    ],
  },

  contentComponent({
    appearance,
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    providerFactory,
  }) {
    if (appearance === 'message') {
      return null;
    }
    const renderToolbar = providers => (
      <WithPluginState
        plugins={{ hyperlinkState: stateKey }}
        render={({ hyperlinkState }: { hyperlinkState?: HyperlinkState }) => (
          <HyperlinkToolbar
            hyperlinkState={hyperlinkState}
            view={editorView}
            popupsMountPoint={popupsMountPoint}
            popupsBoundariesElement={popupsBoundariesElement}
            activityProvider={
              providers ? providers.activityProvider : undefined
            }
          />
        )}
      />
    );

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['activityProvider']}
        renderNode={renderToolbar}
      />
    );
  },
};

export default hyperlinkPlugin;
