import * as React from 'react';
import EditorImageIcon from '@atlaskit/icon/glyph/editor/image';
import { media, mediaGroup, mediaSingle } from '@atlaskit/adf-schema';
import { EditorPlugin, EditorAppearance } from '../../types';
import { SmartMediaEditor, Dimensions } from '@atlaskit/media-editor';
import { FileIdentifier } from '@atlaskit/media-core';
import {
  stateKey as pluginKey,
  createPlugin,
  MediaState,
  MediaPluginState,
} from './pm-plugins/main';
import keymapMediaSinglePlugin from './pm-plugins/keymap-media-single';
import keymapPlugin from './pm-plugins/keymap';
import ToolbarMedia from './ui/ToolbarMedia';
import { ReactMediaGroupNode } from './nodeviews/mediaGroup';
import { ReactMediaSingleNode } from './nodeviews/mediaSingle';
import { CustomMediaPicker, MediaProvider } from './types';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { floatingToolbar } from './toolbar';

import {
  addAnalytics,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID,
} from '../analytics';
import WithPluginState from '../../ui/WithPluginState';

export { MediaState, MediaProvider, CustomMediaPicker };

export interface MediaOptions {
  provider?: Promise<MediaProvider>;
  allowMediaSingle?: boolean | MediaSingleOptions;
  allowMediaGroup?: boolean;
  customDropzoneContainer?: HTMLElement;
  customMediaPicker?: CustomMediaPicker;
  allowResizing?: boolean;
  allowAnnotation?: boolean;
}

export interface MediaSingleOptions {
  disableLayout?: boolean;
}

export const renderSmartMediaEditor = (mediaState: MediaPluginState) => {
  const node = mediaState.selectedMediaContainerNode();
  if (!node) {
    return null;
  }
  const { id } = node.firstChild!.attrs;

  if (mediaState.uploadContext && mediaState.showEditingDialog) {
    const identifier: FileIdentifier = {
      id,
      mediaItemType: 'file',
      collectionName: node.firstChild!.attrs.collection,
    };

    return (
      <SmartMediaEditor
        identifier={identifier}
        context={mediaState.uploadContext}
        onUploadStart={(
          newFileIdentifier: FileIdentifier,
          dimensions: Dimensions,
        ) => {
          mediaState.closeMediaEditor();
          mediaState.replaceEditingMedia(newFileIdentifier, dimensions);
        }}
        onFinish={mediaState.closeMediaEditor}
      />
    );
  }

  return null;
};

const mediaPlugin = (
  options?: MediaOptions,
  appearance?: EditorAppearance,
): EditorPlugin => ({
  nodes() {
    return [
      { name: 'mediaGroup', node: mediaGroup },
      { name: 'mediaSingle', node: mediaSingle },
      { name: 'media', node: media },
    ].filter(node => {
      const { allowMediaGroup = true, allowMediaSingle = false } =
        options || {};

      if (node.name === 'mediaGroup') {
        return allowMediaGroup;
      }

      if (node.name === 'mediaSingle') {
        return allowMediaSingle;
      }

      return true;
    });
  },

  pmPlugins() {
    return [
      {
        name: 'media',
        plugin: ({
          schema,
          props,
          dispatch,
          eventDispatcher,
          providerFactory,
          errorReporter,
          portalProviderAPI,
          reactContext,
        }) =>
          createPlugin(
            schema,
            {
              providerFactory,
              nodeViews: {
                mediaGroup: ReactMediaGroupNode(
                  portalProviderAPI,
                  props.appearance,
                ),
                mediaSingle: ReactMediaSingleNode(
                  portalProviderAPI,
                  eventDispatcher,
                  props.appearance,
                ),
              },
              errorReporter,
              uploadErrorHandler: props.uploadErrorHandler,
              waitForMediaUpload: props.waitForMediaUpload,
              customDropzoneContainer:
                options && options.customDropzoneContainer,
              customMediaPicker: options && options.customMediaPicker,
              appearance: props.appearance,
              allowResizing: !!(options && options.allowResizing),
            },
            reactContext,
            dispatch,
            props.appearance,
          ),
      },
      { name: 'mediaKeymap', plugin: ({ schema }) => keymapPlugin() },
    ].concat(
      options && options.allowMediaSingle
        ? {
            name: 'mediaSingleKeymap',
            plugin: ({ schema }) => keymapMediaSinglePlugin(schema),
          }
        : [],
    );
  },

  contentComponent({ editorView }) {
    return (
      <WithPluginState
        editorView={editorView}
        plugins={{
          mediaState: pluginKey,
        }}
        render={({ mediaState }) => renderSmartMediaEditor(mediaState)}
      />
    );
  },

  secondaryToolbarComponent({ editorView, eventDispatcher, disabled }) {
    return (
      <ToolbarMedia
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        pluginKey={pluginKey}
        isDisabled={disabled}
        isReducedSpacing={true}
      />
    );
  },

  pluginsOptions: {
    quickInsert: ({ formatMessage }) => [
      {
        title: formatMessage(messages.filesAndImages),
        priority: 400,
        keywords: ['media'],
        icon: () => (
          <EditorImageIcon label={formatMessage(messages.filesAndImages)} />
        ),
        action(insert, state) {
          const pluginState = pluginKey.getState(state);
          pluginState.showMediaPicker();
          const tr = insert('');
          return addAnalytics(tr, {
            action: ACTION.OPENED,
            actionSubject: ACTION_SUBJECT.PICKER,
            actionSubjectId: ACTION_SUBJECT_ID.PICKER_CLOUD,
            attributes: { inputMethod: INPUT_METHOD.QUICK_INSERT },
            eventType: EVENT_TYPE.UI,
          });
        },
      },
    ],

    floatingToolbar: (state, intl) =>
      floatingToolbar(
        state,
        intl,
        options && options.allowResizing,
        options && options.allowAnnotation,
        appearance,
      ),
  },
});

export default mediaPlugin;
