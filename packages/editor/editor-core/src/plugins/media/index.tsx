import * as React from 'react';
import EditorImageIcon from '@atlaskit/icon/glyph/editor/image';
import { media, mediaGroup, mediaSingle } from '@atlaskit/adf-schema';
import { EditorPlugin } from '../../types';
import {
  stateKey as pluginKey,
  createPlugin,
  MediaState,
  MediaStateManager,
  DefaultMediaStateManager,
  MediaPluginState,
} from './pm-plugins/main';
import keymapMediaSinglePlugin from './pm-plugins/keymap-media-single';
import keymapPlugin from './pm-plugins/keymap';
import ToolbarMedia from './ui/ToolbarMedia';
import MediaSingleEdit from './ui/MediaSingleEdit';
import { ReactMediaGroupNode } from './nodeviews/mediaGroup';
import { ReactMediaSingleNode } from './nodeviews/mediaSingle';
import { CustomMediaPicker, MediaProvider } from './types';
import WithPluginState from '../../ui/WithPluginState';
import { akEditorFullPageMaxWidth } from '@atlaskit/editor-common';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import {
  pluginKey as editorDisabledPluginKey,
  EditorDisabledPluginState,
} from '../editor-disabled';

export {
  MediaState,
  MediaStateManager,
  DefaultMediaStateManager,
  MediaProvider,
  CustomMediaPicker,
};

export interface MediaOptions {
  provider?: Promise<MediaProvider>;
  allowMediaSingle?: boolean | MediaSingleOptions;
  allowMediaGroup?: boolean;
  customDropzoneContainer?: HTMLElement;
  customMediaPicker?: CustomMediaPicker;
  allowResizing?: boolean;
}

export interface MediaSingleOptions {
  disableLayout?: boolean;
}

const mediaPlugin = (options?: MediaOptions): EditorPlugin => ({
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

  contentComponent({ editorView, appearance }) {
    if (!options) {
      return null;
    }

    const { allowMediaSingle } = options;
    let disableLayout: boolean | undefined;
    if (typeof allowMediaSingle === 'object') {
      disableLayout = allowMediaSingle.disableLayout;
    }

    if (
      (typeof allowMediaSingle === 'boolean' && allowMediaSingle === false) ||
      (typeof disableLayout === 'boolean' && disableLayout === true)
    ) {
      return null;
    }

    return (
      <WithPluginState
        editorView={editorView}
        plugins={{
          mediaState: pluginKey,
          disabled: editorDisabledPluginKey,
        }}
        render={({
          mediaState,
          disabled,
        }: {
          mediaState: MediaPluginState;
          disabled: EditorDisabledPluginState;
        }) => {
          const { element: target, layout } = mediaState;
          const node = mediaState.selectedMediaContainerNode();
          const isFullPage = appearance === 'full-page';
          const allowBreakout = !!(
            node &&
            node.type === mediaSingle &&
            node.firstChild!.attrs &&
            node.firstChild!.attrs.width > akEditorFullPageMaxWidth &&
            isFullPage
          );
          const allowLayout = isFullPage && !!mediaState.isLayoutSupported();
          const { allowResizing } = mediaState.getMediaOptions();
          return (
            <MediaSingleEdit
              pluginState={mediaState}
              allowBreakout={allowBreakout}
              allowLayout={allowLayout}
              layout={layout}
              target={target}
              allowResizing={allowResizing}
              editorDisabled={disabled.editorDisabled}
            />
          );
        }}
      />
    );
  },

  secondaryToolbarComponent({ editorView, disabled }) {
    return (
      <ToolbarMedia
        editorView={editorView}
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
          return insert('');
        },
      },
    ],
  },
});

export default mediaPlugin;
