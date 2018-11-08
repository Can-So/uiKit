export interface MentionBridge {
  showMentions(query: String);
  dismissMentions();
}

export interface TextFormattingBridge {
  updateTextFormat(markStates: string);
  updateText(content: string);
  updateBlockState(currentBlockType: string);
}

export interface MediaBridge {
  getServiceHost(): string;
  getCollection(): string;
}

export interface PromiseBridge {
  submitPromise(name: string, uuid: string, args?: string);
}

export interface ListBridge {
  updateListState(listState: string);
}

export interface StatusBridge {
  showStatus(text?: string, color?: string, uuid?: string);
  dismissStatus();
}

export default interface NativeBridge
  extends MentionBridge,
    TextFormattingBridge,
    PromiseBridge,
    ListBridge,
    StatusBridge {}
