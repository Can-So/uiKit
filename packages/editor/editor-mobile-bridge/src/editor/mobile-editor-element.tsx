import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { Editor } from '@atlaskit/editor-core';

import { toNativeBridge } from './web-to-native';
import WebBridgeImpl from './native-to-web';
import MobilePicker from './MobileMediaPicker';
import {
  initPluginListeners,
  destroyPluginListeners,
} from './plugin-subscription';
import {
  MediaProvider,
  MentionProvider,
  TaskDecisionProvider,
} from '../providers';

export const bridge: WebBridgeImpl = ((window as any).bridge = new WebBridgeImpl());

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

    initPluginListeners(eventDispatcher, bridge, view);
  }

  onEditorDestroyed(instance: {
    view: EditorView;
    eventDispatcher: any;
    transformer?: any;
  }) {
    super.onEditorDestroyed(instance);

    destroyPluginListeners(instance.eventDispatcher, bridge);

    bridge.editorActions._privateUnregisterEditor();
    bridge.editorView = null;
    bridge.mentionsPluginState = null;
  }
}

export default function mobileEditor(props) {
  return (
    <EditorWithState
      appearance="mobile"
      mentionProvider={MentionProvider}
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
      taskDecisionProvider={Promise.resolve(TaskDecisionProvider())}
    />
  );
}
