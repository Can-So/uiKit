/**
 * Please note that this is not a complete implemention of composition events
 * but merely a workaround, until ProseMirror has some proper support for these events.
 *
 * Ideally this plugin should be deleted once Composition events are handled correctly.
 *
 * @see ED-5924
 * @see https://www.w3.org/TR/input-events-2/
 */

import { Plugin } from 'prosemirror-state';
import { PluginKey } from 'prosemirror-state';

import { patchDeleteContentBackward } from './events';
import { EditorPlugin } from '../../types';

export const pluginKey = new PluginKey('compositionPlugin');

/**
 * FIXME: TS doesn't have a type for InputEvent yet since its not widely supported.
 * @see https://www.w3.org/TR/input-events-2/
 */
export interface InputEvent extends UIEvent {
  isComposing: boolean;
  inputType: 'deleteContentBackward' | 'insertText' | 'insertCompositionText';
  data: string | null;
}

export const createPlugin = () =>
  new Plugin({
    key: pluginKey,
    props: {
      handleDOMEvents: {
        /**
         * Android composition events aren't handled well by Prosemirror
         * We've added a couple of beforeinput hooks to help PM out when trying to delete
         * certain nodes. We can remove these when PM has better composition support.
         * @see https://github.com/ProseMirror/prosemirror/issues/543
         */
        beforeinput: (view, event: any) => {
          if (event.inputType === 'deleteContentBackward') {
            return patchDeleteContentBackward(view, event);
          }

          return true;
        },
      },
    },
  });

const compositionPlugin: EditorPlugin = {
  pmPlugins() {
    return [
      {
        name: 'compositionPlugin',
        plugin: () => createPlugin(),
      },
    ];
  },
};

export default compositionPlugin;
