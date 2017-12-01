import { EditorPlugin } from '../../types';
import { createPlugin, createKeymapPlugin } from '../../../plugins/paste';

const paste: EditorPlugin = {
  pmPlugins() {
    return [
      {
        rank: 100,
        plugin: (schema, props) => createPlugin(schema, props.appearance),
      },
      { rank: 200, plugin: createKeymapPlugin },
    ];
  },
};

export default paste;
