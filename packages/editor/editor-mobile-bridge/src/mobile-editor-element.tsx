import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import {
  Editor,
  mentionPluginKey,
  textFormattingStateKey,
} from '@atlaskit/editor-core';
import { MentionDescription, MentionProvider } from '@atlaskit/mention';
import { valueOf } from './web-to-native/markState';
import { toNativeBridge } from './web-to-native';
import WebBridgeImpl from './native-to-web';
import { ContextFactory } from '@atlaskit/media-core';
import { createPromise } from './cross-platform-promise';
import MobilePicker from './MobileMediaPicker';

/**
 * In order to enable mentions in Editor we must set both properties: allowMentions and mentionProvider.
 * So this type is supposed to be a stub version of mention provider. We don't actually need it.
 */
export class MentionProviderImpl implements MentionProvider {
  filter(query?: string): void {}

  recordMentionSelection(mention: MentionDescription): void {}

  shouldHighlightMention(mention: MentionDescription): boolean {
    return false;
  }

  isFiltering(query: string): boolean {
    return false;
  }

  subscribe(
    key: string,
    callback?,
    errCallback?,
    infoCallback?,
    allResultsCallback?,
  ): void {}

  unsubscribe(key: string): void {}
}

const bridge: WebBridgeImpl = ((window as any).bridge = new WebBridgeImpl());

class EditorWithState extends Editor {
  onEditorCreated(instance: {
    view: EditorView;
    eventDispatcher: any;
    transformer?: any;
  }) {
    super.onEditorCreated(instance);
    bridge.editorView = instance.view;
    bridge.editorActions._privateRegisterEditor(
      instance.view,
      instance.eventDispatcher,
    );
    if (this.props.media && this.props.media.customMediaPicker) {
      bridge.mediaPicker = this.props.media.customMediaPicker;
    }
    subscribeForMentionStateChanges(instance.view);
    subscribeForTextFormatChanges(instance.view);
  }

  onEditorDestroyed(instance: { view: EditorView; transformer?: any }) {
    super.onEditorDestroyed(instance);
    bridge.editorActions._privateUnregisterEditor();
    bridge.editorView = null;
    bridge.mentionsPluginState = null;
    bridge.textFormattingPluginState = null;
  }
}

function subscribeForMentionStateChanges(view) {
  let mentionsPluginState = mentionPluginKey.getState(view.state);
  bridge.mentionsPluginState = mentionsPluginState;
  if (mentionsPluginState) {
    mentionsPluginState.subscribe(state => sendToNative(state));
  }
}

function sendToNative(state) {
  if (state.queryActive) {
    toNativeBridge.showMentions(state.query || '');
  } else {
    toNativeBridge.dismissMentions();
  }
}

function subscribeForTextFormatChanges(view: EditorView) {
  let textFormattingPluginState = textFormattingStateKey.getState(view.state);
  bridge.textFormattingPluginState = textFormattingPluginState;
  if (textFormattingPluginState) {
    textFormattingPluginState.subscribe(state =>
      toNativeBridge.updateTextFormat(JSON.stringify(valueOf(state))),
    );
  }
}

function getToken(context?: any) {
  return createPromise<any>('getAuth', context.collectionName).submit();
}

function getUploadContext(): Promise<any> {
  return Promise.resolve(
    ContextFactory.create({
      serviceHost: toNativeBridge.getServiceHost(),
      authProvider: getToken,
    }),
  );
}

function createMediaProvider() {
  return {
    viewContext: getUploadContext(),
    uploadContext: getUploadContext(),
    uploadParams: {
      collection: toNativeBridge.getCollection(),
    },
  };
}

export default function mobileEditor() {
  return (
    <EditorWithState
      appearance="mobile"
      mentionProvider={Promise.resolve(new MentionProviderImpl())}
      media={{
        customMediaPicker: new MobilePicker(),
        provider: Promise.resolve(createMediaProvider()),
      }}
      onChange={() => {
        toNativeBridge.updateText(bridge.getContent());
      }}
    />
  );
}
