import { Color as StatusColor } from '@atlaskit/status';

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
  showStatusPicker(text: string, color: StatusColor, uuid: string);
  dismissStatusPicker();
}

export default interface NativeBridge
  extends MentionBridge,
    TextFormattingBridge,
    PromiseBridge,
    ListBridge,
    StatusBridge {}
