import * as React from 'react';
import { typeAheadQuery } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import WithPluginState from '../../ui/WithPluginState';
import { TypeAheadHandler } from './types';
import {
  createPlugin,
  pluginKey as typeAheadPluginKey,
  PluginState as TypeAheadPluginState,
} from './pm-plugins/main';
import { inputRulePlugin } from './pm-plugins/input-rules';
import { keymapPlugin } from './pm-plugins/keymap';
import { TypeAhead } from './ui/TypeAhead';

const typeAheadPlugin: EditorPlugin = {
  name: 'typeAhead',

  marks() {
    return [{ name: 'typeAheadQuery', mark: typeAheadQuery, rank: 1300 }];
  },

  pmPlugins(typeAhead: Array<TypeAheadHandler> = []) {
    return [
      {
        rank: 600,
        plugin: ({ dispatch }) => createPlugin(dispatch, typeAhead),
      },
      {
        rank: 620,
        plugin: ({ schema }) => inputRulePlugin(schema, typeAhead),
      },
      {
        rank: 640,
        plugin: () => keymapPlugin(),
      },
    ];
  },

  contentComponent({
    editorView,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
  }) {
    return (
      <WithPluginState
        plugins={{
          typeAhead: typeAheadPluginKey,
        }}
        render={({
          typeAhead = {
            active: false,
            items: [],
            currentIndex: 0,
            itemsLoader: null,
          },
        }: {
          typeAhead: TypeAheadPluginState;
        }) => {
          const anchorElement = editorView.dom.querySelector(
            '[data-type-ahead-query]',
          ) as HTMLElement;
          return (
            <TypeAhead
              editorView={editorView}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
              anchorElement={anchorElement}
              active={typeAhead.active}
              isLoading={!!typeAhead.itemsLoader}
              items={typeAhead.items}
              currentIndex={typeAhead.currentIndex}
            />
          );
        }}
      />
    );
  },
};

export default typeAheadPlugin;
