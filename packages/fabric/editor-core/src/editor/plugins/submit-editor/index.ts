import { analyticsService } from '../../../analytics';
import { keymap } from 'prosemirror-keymap';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EditorPlugin } from '../../types';
import * as keymaps from '../../../keymaps';
import { stateKey as mediaPluginKey } from '../../../plugins/media';

export function createPlugin(
  onSave?: (editorView: EditorView) => void,
): Plugin | undefined {
  if (!onSave) {
    return;
  }

  return keymap({
    [`${keymaps.submit.common}`]: (
      state: EditorState,
      dispatch: (tr) => void,
      editorView: EditorView,
    ) => {
      const mediaState = mediaPluginKey.getState(state);

      if (
        mediaState &&
        mediaState.waitForMediaUpload &&
        !mediaState.allUploadsFinished
      ) {
        return true;
      }

      analyticsService.trackEvent('atlassian.editor.stop.submit');
      onSave(editorView);
      return true;
    },
  });
}

const submitEditorPlugin: EditorPlugin = {
  pmPlugins() {
    return [{ rank: 0, plugin: ({ props }) => createPlugin(props.onSave) }];
  },
};

export default submitEditorPlugin;
