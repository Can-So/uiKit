import { Color as StatusColor } from '@atlaskit/status';
import { EditorBridges, EditorPluginBridges } from './index';
import NativeBridge from './bridge';
import { sendToBridge } from '../../bridge-utils';

export default class IosBridge implements NativeBridge {
  showMentions(query: String) {
    if (window.webkit && window.webkit.messageHandlers.mentionBridge) {
      window.webkit.messageHandlers.mentionBridge.postMessage({
        name: 'showMentions',
        query: query,
      });
    }
  }

  dismissMentions() {
    if (window.webkit && window.webkit.messageHandlers.mentionBridge) {
      window.webkit.messageHandlers.mentionBridge.postMessage({
        name: 'dismissMentions',
      });
    }
  }
  updateTextFormat(markStates: string) {
    if (window.webkit && window.webkit.messageHandlers.textFormatBridge) {
      window.webkit.messageHandlers.textFormatBridge.postMessage({
        name: 'updateTextFormat',
        states: markStates,
      });
    }
  }
  updateText(content: string) {
    if (window.webkit && window.webkit.messageHandlers.textFormatBridge) {
      window.webkit.messageHandlers.textFormatBridge.postMessage({
        name: 'updateText',
        query: content,
      });
    }
  }
  getServiceHost(): string {
    if (window.mediaBridge) {
      return window.mediaBridge.getServiceHost();
    } else {
      // ¯\_(ツ)_/¯ ugly, I know, but we need this data, and don't want call native side
      return 'http://www.atlassian.com';
    }
  }

  getCollection(): string {
    if (window.mediaBridge) {
      return window.mediaBridge.getCollection();
    } else {
      // ¯\_(ツ)_/¯ @see #getServiceHost()
      return 'FabricMediaSampleCollection';
    }
  }

  submitPromise(name: string, uuid: string, args: string) {
    if (window.webkit && window.webkit.messageHandlers.promiseBridge) {
      window.webkit.messageHandlers.promiseBridge.postMessage({
        name: 'submitPromise',
        promise: {
          name: name,
          uuid: uuid,
        },
        args: args,
      });
    }
  }

  updateBlockState(currentBlockType: string) {
    if (window.webkit && window.webkit.messageHandlers.blockFormatBridge) {
      window.webkit.messageHandlers.blockFormatBridge.postMessage({
        name: 'updateBlockState',
        states: currentBlockType,
      });
    }
  }

  updateListState(listState: string) {
    if (window.webkit && window.webkit.messageHandlers.listBridge) {
      window.webkit.messageHandlers.listBridge.postMessage({
        name: 'updateListState',
        states: listState,
      });
    }
  }

  showStatusPicker(
    text: string,
    color: StatusColor,
    uuid: string,
    isNew: boolean,
  ) {
    if (window.webkit && window.webkit.messageHandlers.statusBridge) {
      window.webkit.messageHandlers.statusBridge.postMessage({
        name: 'showStatusPicker',
        text,
        color,
        uuid,
        isNew,
      });
    }
  }

  dismissStatusPicker(isNew: boolean) {
    if (window.webkit && window.webkit.messageHandlers.statusBridge) {
      window.webkit.messageHandlers.statusBridge.postMessage({
        name: 'dismissStatusPicker',
        isNew,
      });
    }
  }

  call<T extends EditorPluginBridges>(
    bridge: T,
    event: keyof Exclude<EditorBridges[T], undefined>,
    ...args
  ) {
    sendToBridge(bridge, event, ...args);
  }

  updateTextColor() {}
}
