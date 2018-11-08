import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import {
  Editor,
  mentionPluginKey,
  textFormattingStateKey,
  blockPluginStateKey,
  ListsState,
  listsStateKey,
  statusPluginKey,
  getStatusAtPosition,
} from '@atlaskit/editor-core';
import {
  TaskDecisionProvider,
  Query,
  DecisionResponse,
  TaskResponse,
  ItemResponse,
  RecentUpdatesId,
  RecentUpdateContext,
  ObjectKey,
  TaskState,
  Handler,
} from '@atlaskit/task-decision';
import { valueOf as valueOfMarkState } from './web-to-native/markState';
import { valueOf as valueOfListState } from './web-to-native/listState';
import { toNativeBridge } from './web-to-native';
import WebBridgeImpl from './native-to-web';
import MobilePicker from './MobileMediaPicker';
import {
  MediaProvider,
  MentionProvider,
  TaskDecisionProvider,
} from '../providers';

export class TaskDecisionProviderImpl implements TaskDecisionProvider {
  getDecisions(query: Query): Promise<DecisionResponse> {
    return Promise.resolve({ decisions: [] });
  }
  getTasks(query: Query): Promise<TaskResponse> {
    return Promise.resolve({ tasks: [] });
  }
  getItems(query: Query): Promise<ItemResponse> {
    return Promise.resolve({ items: [] });
  }
  unsubscribeRecentUpdates(id: RecentUpdatesId) {}
  notifyRecentUpdates(updateContext?: RecentUpdateContext) {}
  toggleTask(key: ObjectKey, state: TaskState): Promise<TaskState> {
    return Promise.resolve('DONE' as TaskState);
  }
  subscribe(key: ObjectKey, handler: Handler) {}
  unsubscribe(key: ObjectKey, handler: Handler) {}
}

const bridge: WebBridgeImpl = ((window as any).bridge = new WebBridgeImpl());

class EditorWithState extends Editor {
  onEditorCreated(instance: {
    view: EditorView;
    eventDispatcher: any;
    transformer?: any;
  }) {
    super.onEditorCreated(instance);
    const { eventDispatcher, view } = instance;
    bridge.editorView = view;
    bridge.editorActions._privateRegisterEditor(view, eventDispatcher);
    if (this.props.media && this.props.media.customMediaPicker) {
      bridge.mediaPicker = this.props.media.customMediaPicker;
    }
    subscribeForMentionStateChanges(view, eventDispatcher);
    subscribeForTextFormatChanges(view, eventDispatcher);
    subscribeForBlockStateChanges(view, eventDispatcher);
    subscribeForListStateChanges(view, eventDispatcher);
    subscribeForStatusStateChange(view, eventDispatcher);
  }

  onEditorDestroyed(instance: {
    view: EditorView;
    eventDispatcher: any;
    transformer?: any;
  }) {
    super.onEditorDestroyed(instance);

    const { eventDispatcher, view } = instance;
    unsubscribeFromBlockStateChanges(view, eventDispatcher);
    unsubscribeFromListStateChanges(view, eventDispatcher);
    unsubscribeFromStatusStateChanges(view, eventDispatcher);

    bridge.editorActions._privateUnregisterEditor();
    bridge.editorView = null;
    bridge.mentionsPluginState = null;
    bridge.textFormattingPluginState = null;
  }
}

function subscribeForMentionStateChanges(
  view: EditorView,
  eventDispatcher: any,
) {
  let mentionsPluginState = mentionPluginKey.getState(view.state);
  bridge.mentionsPluginState = mentionsPluginState;
  if (mentionsPluginState) {
    mentionsPluginState.subscribe(state => sendToNative(state));
  }
}

function subscribeForStatusStateChange(view: EditorView, eventDispatcher: any) {
  let statusPluginState = statusPluginKey.getState(view.state);
  bridge.statusPluginState = statusPluginState;
  eventDispatcher.on((statusPluginKey as any).key, state => {
    statusStateUpdated(view)(state);
  });
}

const statusStateUpdated = view => state => {
  if (state.showStatusPickerAt) {
    const status = getStatusAtPosition(state.showStatusPickerAt)(view);
    console.log(status);
    toNativeBridge.showStatus(status.text, status.color, status.localId);
  } else {
    console.log('dismiss status');
    toNativeBridge.dismissStatus();
  }
};

function sendToNative(state) {
  if (state.queryActive) {
    toNativeBridge.showMentions(state.query || '');
  } else {
    toNativeBridge.dismissMentions();
  }
}

function subscribeForTextFormatChanges(view: EditorView, eventDispatcher: any) {
  let textFormattingPluginState = textFormattingStateKey.getState(view.state);
  bridge.textFormattingPluginState = textFormattingPluginState;
  eventDispatcher.on((textFormattingStateKey as any).key, state => {
    toNativeBridge.updateTextFormat(JSON.stringify(valueOfMarkState(state)));
  });
}

const blockStateUpdated = state => {
  toNativeBridge.updateBlockState(state.currentBlockType.name);
};

function subscribeForBlockStateChanges(view: EditorView, eventDispatcher: any) {
  bridge.blockState = blockPluginStateKey.getState(view.state);
  eventDispatcher.on((blockPluginStateKey as any).key, blockStateUpdated);
}

function unsubscribeFromBlockStateChanges(
  view: EditorView,
  eventDispatcher: any,
) {
  eventDispatcher.off((blockPluginStateKey as any).key, blockStateUpdated);
  bridge.blockState = undefined;
}

function unsubscribeFromStatusStateChanges(
  view: EditorView,
  eventDispatcher: any,
) {
  eventDispatcher.off((statusPluginKey as any).key, statusStateUpdated);
  bridge.statusPluginState = undefined;
}

const listStateUpdated = state => {
  toNativeBridge.updateListState(JSON.stringify(valueOfListState(state)));
};

function subscribeForListStateChanges(view: EditorView, eventDispatcher: any) {
  const listState: ListsState = listsStateKey.getState(view.state);
  bridge.listState = listState;
  eventDispatcher.on((listsStateKey as any).key, listStateUpdated);
}

function unsubscribeFromListStateChanges(
  view: EditorView,
  eventDispatcher: any,
) {
  eventDispatcher.off((listsStateKey as any).key, listStateUpdated);
}

export default function mobileEditor(props) {
  return (
    <EditorWithState
      appearance="mobile"
      mentionProvider={Promise.resolve(new MentionProvider())}
      media={{
        customMediaPicker: new MobilePicker(),
        provider: props.mediaProvider || MediaProvider,
        allowMediaSingle: true,
      }}
      allowLists={true}
      onChange={() => {
        toNativeBridge.updateText(bridge.getContent());
      }}
      allowPanel={true}
      allowCodeBlocks={true}
      allowTables={{
        allowControls: false,
      }}
      allowExtension={true}
      allowTextColor={true}
      allowDate={true}
      allowRule={true}
      allowStatus={true}
      taskDecisionProvider={Promise.resolve(new TaskDecisionProviderImpl())}
    />
  );
}
