import { indentation } from '@atlaskit/editor-common';
import { EditorPlugin } from '../../types';
import { keymapPlugin } from './pm-plugins/keymap';

const indentationPlugin: EditorPlugin = {
  name: 'indentationPlugin',

  marks() {
    return [{ name: 'indentation', mark: indentation }];
  },

  pmPlugins() {
    return [
      {
        name: 'indentationKeymap',
        plugin: () => keymapPlugin(),
      },
    ];
  },
};

export default indentationPlugin;
