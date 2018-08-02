import { Plugin, PluginKey, EditorState, Transaction } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { isEmptyDocument } from '../../utils';

export const pluginKey = new PluginKey(
  'clearMarksOnChangeToEmptyDocumentPlugin',
);

export function createPlugin(): Plugin | undefined {
  return new Plugin({
    key: pluginKey,
    appendTransaction: (
      transactions: Transaction[],
      oldState: EditorState,
      newState: EditorState,
    ) => {
      // ED-2973: When a user clears the editor's content, remove the current active marks
      if (!isEmptyDocument(oldState.doc) && isEmptyDocument(newState.doc)) {
        return newState.tr.setStoredMarks([]);
      }
    },
  });
}

const clearMarksOnChangeToEmptyDocumentPlugin: EditorPlugin = {
  pmPlugins() {
    return [{ name: 'clearMarksOnChange', plugin: schema => createPlugin() }];
  },
};

export default clearMarksOnChangeToEmptyDocumentPlugin;
