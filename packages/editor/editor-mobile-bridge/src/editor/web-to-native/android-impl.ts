import { Color as StatusColor } from '@atlaskit/status';
import { EditorBridges, EditorPluginBridges } from './index';
import {
  MentionBridge,
  TextFormattingBridge,
  default as NativeBridge,
  MediaBridge,
  PromiseBridge,
  ListBridge,
  StatusBridge,
  LinkBridge,
} from './bridge';

import { sendToBridge } from '../../bridge-utils';

export default class AndroidBridge implements NativeBridge {
  mentionBridge: MentionBridge;
  textFormatBridge: TextFormattingBridge;
  mediaBridge: MediaBridge;
  promiseBridge: PromiseBridge;
  listBridge: ListBridge;
  statusBridge: StatusBridge;
  linkBridge: LinkBridge;

  constructor() {
    this.mentionBridge = window.mentionsBridge as MentionBridge;
    this.textFormatBridge = window.textFormatBridge as TextFormattingBridge;
    this.mediaBridge = window.mediaBridge as MediaBridge;
    this.promiseBridge = window.promiseBridge as PromiseBridge;
    this.listBridge = window.listBridge as ListBridge;
    this.statusBridge = window.statusBridge as StatusBridge;
    this.linkBridge = window.linkBridge as LinkBridge;
  }

  showMentions(query: String) {
    this.mentionBridge.showMentions(query);
  }

  dismissMentions() {
    /*TODO: implement when mentions are ready */
  }

  updateTextFormat(markStates: string) {
    this.textFormatBridge.updateTextFormat(markStates);
  }

  updateText(content: string) {
    this.textFormatBridge.updateText(content);
  }

  getServiceHost(): string {
    return this.mediaBridge.getServiceHost();
  }

  getCollection(): string {
    return this.mediaBridge.getCollection();
  }

  submitPromise(name: string, uuid: string, args: string) {
    this.promiseBridge.submitPromise(name, uuid, args);
  }

  updateBlockState(currentBlockType: string) {
    this.textFormatBridge.updateBlockState(currentBlockType);
  }

  updateListState(listState: string) {
    this.listBridge.updateListState(listState);
  }

  showStatusPicker(
    text: string,
    color: StatusColor,
    uuid: string,
    isNew: boolean,
  ) {
    this.statusBridge.showStatusPicker(text, color, uuid, isNew);
  }

  dismissStatusPicker(isNew: boolean) {
    this.statusBridge.dismissStatusPicker(isNew);
  }

  currentSelection(text: string, url: string) {
    this.linkBridge.currentSelection(text, url);
  }

  call<T extends EditorPluginBridges>(
    bridge: T,
    event: keyof Exclude<EditorBridges[T], undefined>,
    ...args: any[]
  ) {
    sendToBridge(bridge, event, ...args);
  }

  updateTextColor() {}
}
