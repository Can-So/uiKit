import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

import { emojiPluginKey, EmojiState } from '../plugins/emoji/pm-plugins/main';

import {
  stateKey as mediaStateKey,
  MediaPluginState,
} from '../plugins/media/pm-plugins/main';

import { dismissCommand as typeAheadDismiss } from '../plugins/type-ahead/commands/dismiss';
import {
  pluginKey as typeAheadPluginKey,
  PluginState as TypeAheadPluginState,
} from '../plugins/type-ahead/pm-plugins/main';

export function dismissActiveTypeAheads(editorView?: EditorView): void {
  if (!editorView) {
    return;
  }

  const { dispatch, state } = editorView;

  // if typeAhead is currently active => dismiss it
  const typeAheadPluginState =
    state && (typeAheadPluginKey.getState(state) as TypeAheadPluginState);

  if (typeAheadPluginState && typeAheadPluginState.active) {
    typeAheadDismiss()(state, dispatch);
  }

  // if emoji is currently active => dismiss it
  const emojiPluginState =
    state && (emojiPluginKey.getState(state) as EmojiState);

  if (emojiPluginState && emojiPluginState.queryActive) {
    emojiPluginState.dismiss();
  }
}

export async function waitForMediaPendingTasks(
  editorView?: EditorView,
): Promise<void> {
  if (!editorView) {
    return;
  }

  const { state } = editorView;

  const mediaPluginState =
    state && (mediaStateKey.getState(state) as MediaPluginState);

  if (mediaPluginState && mediaPluginState.waitForMediaUpload) {
    await mediaPluginState.waitForPendingTasks();
  }
}

export function insertFileFromDataUrl(
  editorState: EditorState | undefined,
  url: string,
  fileName: string,
): void {
  if (!editorState) {
    return;
  }

  const mediaPluginState = mediaStateKey.getState(
    editorState,
  ) as MediaPluginState;
  mediaPluginState.insertFileFromDataUrl(url, fileName);
}
