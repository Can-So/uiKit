import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  EventDispatcher,
  textFormattingStateKey,
  TextFormattingState,
  blockPluginStateKey,
  BlockTypeState,
  listsStateKey,
  ListsState,
  statusPluginKey,
  StatusState,
} from '@atlaskit/editor-core';

import { valueOf as valueOfListState } from '../web-to-native/listState';
import { valueOf as valueOfMarkState } from '../web-to-native/markState';
import WebBridgeImpl from '../native-to-web';
import { toNativeBridge, EditorPluginBridges } from '../web-to-native';

interface BridgePluginListener<T> {
  bridge: EditorPluginBridges;
  pluginKey: PluginKey;
  updater: (state: T) => void;
}

const createListenerConfig = <T>(config: BridgePluginListener<T>) => config;

const configs: Array<BridgePluginListener<any>> = [
  createListenerConfig<StatusState>({
    bridge: 'statusBridge',
    pluginKey: statusPluginKey,
    updater: state => {
      const { selectedStatus: status, showStatusPickerAt } = state;
      if (status) {
        toNativeBridge.call('statusBridge', 'showStatusPicker', {
          text: status.text,
          color: status.color,
          uuid: status.localId,
        });
      } else if (!showStatusPickerAt) {
        toNativeBridge.call('statusBridge', 'dismissStatusPicker');
      }
    },
  }),
  createListenerConfig<TextFormattingState>({
    bridge: 'textFormatBridge',
    pluginKey: textFormattingStateKey,
    updater: state => {
      toNativeBridge.call('textFormatBridge', 'updateTextFormat', {
        states: JSON.stringify(valueOfMarkState(state)),
      });
    },
  }),
  createListenerConfig<BlockTypeState>({
    bridge: 'blockFormatBridge',
    pluginKey: blockPluginStateKey,
    updater: state => {
      /**
       * Currently `updateBlockState` is on different bridges in native land.
       * We have a ticket to align on the naming.
       * @see https://product-fabric.atlassian.net/browse/FM-1341
       */

      // iOS
      toNativeBridge.call('blockFormatBridge', 'updateBlockState', {
        states: state.currentBlockType.name,
      });
      // Android
      toNativeBridge.call('textFormatBridge', 'updateBlockState', {
        states: state.currentBlockType.name,
      });
    },
  }),
  createListenerConfig<ListsState>({
    bridge: 'listBridge',
    pluginKey: listsStateKey,
    updater: state => {
      toNativeBridge.call('listBridge', 'updateListState', {
        states: JSON.stringify(valueOfListState(state)),
      });
    },
  }),
];

export const initPluginListeners = (
  eventDispatcher: EventDispatcher,
  bridge: WebBridgeImpl,
  view: EditorView,
) => {
  configs.forEach(config => {
    const { updater, pluginKey } = config;
    const state = pluginKey.getState(view.state);
    bridge[`${config.bridge}State`] = state;
    eventDispatcher.on((pluginKey as any).key, state => updater(state));
  });
};

export const destroyPluginListeners = (
  eventDispatcher: EventDispatcher,
  bridge: WebBridgeImpl,
) => {
  configs.forEach(config => {
    bridge[`${config.bridge}State`] = undefined;
    eventDispatcher.off((config.pluginKey as any).key, config.updater);
  });
};
