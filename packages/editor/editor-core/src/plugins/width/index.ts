import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorPlugin } from '../../types';
import { Dispatch } from '../../event-dispatcher';

export const pluginKey = new PluginKey('widthPlugin');

export type WidthPluginState = {
  width: number;
  lineLength?: number;
};

export function createPlugin(
  dispatch: Dispatch<WidthPluginState>,
): Plugin | undefined {
  return new Plugin({
    key: pluginKey,
    state: {
      init: () => ({
        width: document.body.offsetWidth,
      }),
      apply(tr, oldPluginState) {
        const receivedPluginState = tr.getMeta(pluginKey);
        const newPluginState = {
          ...oldPluginState,
          ...receivedPluginState,
        };

        if (
          newPluginState &&
          (oldPluginState.width !== newPluginState.newWidth ||
            oldPluginState.lineLength !== newPluginState.lineLength)
        ) {
          dispatch(pluginKey, newPluginState);
          return newPluginState;
        }
        return oldPluginState;
      },
    },
  });
}

const widthPlugin: EditorPlugin = {
  pmPlugins: () => [
    {
      name: 'width',
      plugin: ({ dispatch }) => createPlugin(dispatch),
    },
  ],

  // do this early here, otherwise we have to wait for WidthEmitter to debounce
  // which causes anything dependent on lineLength to jump around
  contentComponent({ editorView, containerElement }) {
    const pmDom = containerElement
      ? containerElement.querySelector('.ProseMirror')
      : undefined;

    const tr = editorView.state.tr.setMeta(pluginKey, {
      lineLength: pmDom ? pmDom.clientWidth : undefined,
    });
    editorView.dispatch(tr);
    return null;
  },
};

export default widthPlugin;
