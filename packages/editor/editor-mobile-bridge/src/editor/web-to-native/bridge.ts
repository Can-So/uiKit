import { Color as StatusColor } from '@atlaskit/status';
import { EditorBridges, EditorPluginBridges } from './index';

export interface MentionBridge {
  showMentions(query: String): void;
  dismissMentions(): void;
}

export interface TextFormattingBridge {
  updateTextFormat(markStates: string): void;
  updateText(content: string): void;
  updateBlockState(currentBlockType: string): void;
  updateTextColor(color: string): void;
}

export interface MediaBridge {
  getServiceHost(): string;
  getCollection(): string;
}

export interface PromiseBridge {
  submitPromise(name: string, uuid: string, args?: string): void;
}

export interface ListBridge {
  updateListState(listState: string): void;
}

export interface StatusBridge {
  showStatusPicker(
    text: string,
    color: StatusColor,
    uuid: string,
    isNew: boolean,
  ): void;
  dismissStatusPicker(isNew: boolean): void;
}

export interface TypeAheadBridge {
  dismissTypeAhead(): void;
  typeAheadQuery(query: string, trigger: string): void;
}

export interface LinkBridge {
  currentSelection(text: string, url: string): void;
}

export default interface NativeBridge
  extends MentionBridge,
    TextFormattingBridge,
    PromiseBridge,
    ListBridge,
    StatusBridge,
    LinkBridge {
  call<T extends EditorPluginBridges>(
    bridge: T,
    event: keyof Exclude<EditorBridges[T], undefined>,
    ...args: any[]
  ): void;
}
