import { Color as StatusColor } from '@atlaskit/status';
import { EditorBridges, EditorPluginBridges } from './index';

export interface MentionBridge {
  showMentions(query: String);
  dismissMentions();
}

export interface TextFormattingBridge {
  updateTextFormat(markStates: string);
  updateText(content: string);
  updateBlockState(currentBlockType: string);
  updateTextColor(color: string);
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
  showStatusPicker(
    text: string,
    color: StatusColor,
    uuid: string,
    isNew: boolean,
  );
  dismissStatusPicker(isNew: boolean);
}

export interface TypeAheadBridge {
  dismissTypeAhead();
  typeAheadQuery(query: string, trigger: string);
}

export interface LinkBridge {
  currentSelection(text: string, url: string);
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
    ...args
  );
}
