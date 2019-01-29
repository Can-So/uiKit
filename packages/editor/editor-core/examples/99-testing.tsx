import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mention, emoji, taskDecision } from '@atlaskit/util-data-test';
import { EmojiProvider } from '@atlaskit/emoji';
import {
  cardProvider,
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  macroProvider,
  customInsertMenuItems,
} from '@atlaskit/editor-test-helpers';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import quickInsertProviderFactory from '../example-helpers/quick-insert-provider';
import { Editor, EditorProps } from './../src';
import ClipboardHelper from './1-clipboard-helper';
import mediaMockServer from '../example-helpers/media-mock';

export const providers: any = {
  emojiProvider: emoji.storyData.getEmojiResource({
    uploadSupported: true,
    currentUser: {
      id: emoji.storyData.loggedUser,
    },
  }) as Promise<EmojiProvider>,
  mentionProvider: Promise.resolve(mention.storyData.resourceProvider),
  taskDecisionProvider: Promise.resolve(
    taskDecision.getMockTaskDecisionResource(),
  ),
  contextIdentifierProvider: storyContextIdentifierProviderFactory(),
  activityProvider: Promise.resolve(new MockActivityResource()),
  macroProvider: Promise.resolve(macroProvider),
};

export const mediaProvider = storyMediaProviderFactory({
  useMediaPickerAuthProvider: false,
});

export const quickInsertProvider = quickInsertProviderFactory();
export const cardProviderPromise = Promise.resolve(cardProvider);

function createEditorWindowBindings(win: Window) {
  if ((win as Window & { __mountEditor?: () => void }).__mountEditor) {
    return;
  }

  window['__mountEditor'] = (props: EditorProps = {}) => {
    const target = document.getElementById('editor-container');

    if (!target) {
      return;
    }

    // Add providers as they are not serializible
    if (props && props.UNSAFE_cards && props.UNSAFE_cards.provider) {
      props.UNSAFE_cards.provider = cardProviderPromise;
    }
    if (props && props.quickInsert && props.quickInsert) {
      props.quickInsert = { provider: Promise.resolve(quickInsertProvider) };
    }

    if (props && props.media) {
      props.media = {
        allowMediaSingle: true,
        allowResizing: true,
        ...props.media,
        provider: mediaProvider,
      };

      mediaMockServer.enable();
    } else {
      mediaMockServer.disable();
    }

    ReactDOM.unmountComponentAtNode(target);
    ReactDOM.render(
      <Editor
        insertMenuItems={customInsertMenuItems}
        {...providers}
        {...props}
      />,
      target,
    );
  };
}

export default function EditorExampleForTests() {
  createEditorWindowBindings(window);
  return (
    <>
      <div id="editor-container" style={{ width: '100%', height: '100%' }} />
      <ClipboardHelper />
    </>
  );
}
