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
  textColorPluginKey,
  TextColorPluginState,
  typeAheadPluginKey,
  TypeAheadPluginState,
} from '@atlaskit/editor-core';

import { valueOf as valueOfListState } from '../web-to-native/listState';
import { valueOf as valueOfMarkState } from '../web-to-native/markState';
import WebBridgeImpl from '../native-to-web';
import { toNativeBridge, EditorPluginBridges } from '../web-to-native';

interface BridgePluginListener<T> {
  bridge: EditorPluginBridges;
  pluginKey: PluginKey;
  updater: (state: T, initialPass?: boolean) => void;
  sendInitialState?: boolean;
}

interface SerialisedTextColor {
  color: string | null;
  disabled?: boolean | undefined;
  borderColorPalette?: {
    [color: string]: string; // Hex
  };
  palette?: {
    [color: string]: string; // Hex
  };
}

const createListenerConfig = <T>(config: BridgePluginListener<T>) => config;

const configs: Array<BridgePluginListener<any>> = [
  createListenerConfig<StatusState>({
    bridge: 'statusBridge',
    pluginKey: statusPluginKey,
    updater: state => {
      const { selectedStatus: status, showStatusPickerAt, isNew } = state;
      if (status) {
        toNativeBridge.call('statusBridge', 'showStatusPicker', {
          text: status.text,
          color: status.color,
          uuid: status.localId,
          isNew,
        });
      } else if (!showStatusPickerAt) {
        toNativeBridge.call('statusBridge', 'dismissStatusPicker', { isNew });
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
      if (window.webkit) {
        // iOS
        toNativeBridge.call('blockFormatBridge', 'updateBlockState', {
          states: state.currentBlockType.name,
        });
      } else {
        // Android
        toNativeBridge.call('textFormatBridge', 'updateBlockState', {
          states: state.currentBlockType.name,
        });
      }
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
  createListenerConfig<TextColorPluginState>({
    bridge: 'textFormatBridge',
    pluginKey: textColorPluginKey,
    updater: (state, initialPass) => {
      let color = state.color || null;
      let serialisedState: SerialisedTextColor = {
        color,
        disabled: state.disabled,
      };

      if (initialPass) {
        let palette = Object.create(null);
        for (let [k, v] of state.palette) {
          palette[v] = k;
        }

        serialisedState = {
          ...state,
          color,
          palette,
        };
      }

      toNativeBridge.call('textFormatBridge', 'updateTextColor', {
        states: JSON.stringify(serialisedState),
      });
    },
    sendInitialState: true,
  }),
  createListenerConfig<TypeAheadPluginState>({
    bridge: 'typeAheadBridge',
    pluginKey: typeAheadPluginKey,
    updater: state => {
      const { active, query, trigger } = state;

      if (active === false) {
        toNativeBridge.call('typeAheadBridge', 'dismissTypeAhead');
        return;
      }

      toNativeBridge.call('typeAheadBridge', 'typeAheadQuery', {
        query,
        trigger,
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
    bridge[`${config.bridge}State`] = {
      ...bridge[`${config.bridge}State`],
      ...state,
    };
    if (config.sendInitialState) {
      updater(state, true);
    }
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
