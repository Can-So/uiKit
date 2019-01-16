import {
  ListBridge,
  MediaBridge,
  MentionBridge,
  PromiseBridge,
  TextFormattingBridge,
  StatusBridge,
  TypeAheadBridge,
} from './bridge';
import AndroidBridge from './android-impl';
import IosBridge from './ios-impl';
import DummyBridge from './dummy-impl';
import NativeBridge from './bridge';

export interface EditorBridges {
  mentionsBridge?: MentionBridge;
  mentionBridge?: MentionBridge;
  textFormatBridge?: TextFormattingBridge;
  mediaBridge?: MediaBridge;
  promiseBridge?: PromiseBridge;
  listBridge?: ListBridge;
  blockFormatBridge?: TextFormattingBridge;
  statusBridge?: StatusBridge;
  typeAheadBridge?: TypeAheadBridge;
}

export type EditorPluginBridges = keyof EditorBridges;
declare global {
  interface Window extends EditorBridges {
    webkit?: any;
  }
}

function getBridgeImpl(): NativeBridge {
  if (window.navigator.userAgent.match(/Android/)) {
    return new AndroidBridge();
  } else if (window.webkit) {
    return new IosBridge();
  } else {
    return new DummyBridge();
  }
}

export const toNativeBridge: NativeBridge = getBridgeImpl();
