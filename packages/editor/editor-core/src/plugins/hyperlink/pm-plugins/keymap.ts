import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { Plugin, EditorState, Transaction } from 'prosemirror-state';
import * as keymaps from '../../../keymaps';
import * as commands from '../../../commands';
import { analyticsService, trackAndInvoke } from '../../../analytics';
import { EditorProps } from '../../../types/editor-props';
import { Match, getLinkMatch } from '../utils';
import { HyperlinkState, hyperlinkPluginKey } from '../pm-plugins/main';

export function createKeymapPlugin(
  schema: Schema,
  props: EditorProps,
): Plugin | undefined {
  const list = {};

  if (props.appearance !== 'message') {
    keymaps.bindKeymapWithCommand(
      keymaps.addLink.common!,
      trackAndInvoke(
        'atlassian.editor.format.hyperlink.keyboard',
        commands.showLinkPanel(),
      ),
      list,
    );
  }

  keymaps.bindKeymapWithCommand(
    keymaps.enter.common!,
    mayConvertLastWordToHyperlink,
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.insertNewLine.common!,
    mayConvertLastWordToHyperlink,
    list,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.escape.common!,
    (state: EditorState, dispatch) => {
      const hyperlinkPlugin = hyperlinkPluginKey.getState(
        state,
      ) as HyperlinkState;
      if (!hyperlinkPlugin.active) {
        return false;
      }

      hyperlinkPlugin.setInactive(state, dispatch);
      return false;
    },
    list,
  );

  return keymap(list);
}

function mayConvertLastWordToHyperlink(
  state: EditorState,
  dispatch: (tr: Transaction) => void,
): boolean {
  const nodeBefore = state.selection.$from.nodeBefore;
  if (!nodeBefore || !nodeBefore.isText) {
    return false;
  }

  const words = nodeBefore.text!.split(' ');
  const lastWord = words[words.length - 1];
  const match: Match | null = getLinkMatch(lastWord);

  if (match) {
    const hyperlinkedText = match.raw;
    const start = state.selection.$from.pos - hyperlinkedText.length;
    const end = state.selection.$from.pos;

    if (state.doc.rangeHasMark(start, end, state.schema.marks.link)) {
      return false;
    }

    const url = match.url;
    const markType = state.schema.mark('link', { href: url });

    analyticsService.trackEvent(
      'atlassian.editor.format.hyperlink.autoformatting',
    );

    dispatch(state.tr.addMark(start, end, markType));
  }
  return false;
}

export default createKeymapPlugin;
