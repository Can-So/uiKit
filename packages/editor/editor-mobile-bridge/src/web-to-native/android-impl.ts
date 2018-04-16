import {
  MentionBridge,
  TextFormattingBridge,
  default as NativeBridge,
  MediaBridge,
  PromiseBridge,
} from './bridge';

export default class AndroidBridge implements NativeBridge {
  mentionBridge: MentionBridge;
  textFormatBridge: TextFormattingBridge;
  mediaBridge: MediaBridge;
  promiseBridge: PromiseBridge;

  constructor() {
    this.mentionBridge = window.mentionsBridge as MentionBridge;
    this.textFormatBridge = window.textFormatBridge as TextFormattingBridge;
    this.mediaBridge = window.mediaBridge as MediaBridge;
    this.promiseBridge = window.promiseBridge as PromiseBridge;
  }

  showMentions(query: String) {
    this.mentionBridge.showMentions(query);
  }

  dismissMentions() {
    this.mentionBridge.dismissMentions();
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
}
