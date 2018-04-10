import * as React from 'react';
import { media, mediaGroup, mediaSingle } from '@atlaskit/editor-common';

import { EditorPlugin } from '../../types';
import { nodeViewFactory } from '../../nodeviews';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../width';

import {
  stateKey as pluginKey,
  createPlugin,
  MediaProvider,
  MediaState,
  MediaStateManager,
  DefaultMediaStateManager,
} from './pm-plugins/main';
import keymapMediaSinglePlugin from './pm-plugins/keymap-media-single';
import keymapPlugin from './pm-plugins/keymap';
import ToolbarMedia from './ui/ToolbarMedia';
import MediaSingleEdit from './ui/MediaSingleEdit';
import ReactMediaGroupNode from './nodeviews/media-group';
import ReactMediaNode from './nodeviews/media';
import ReactMediaSingleNode from './nodeviews/media-single';

export {
  MediaState,
  MediaStateManager,
  DefaultMediaStateManager,
  MediaProvider,
};

export interface MediaOptions {
  provider?: Promise<MediaProvider>;
  allowMediaSingle?: boolean;
  customDropzoneContainer?: HTMLElement;
}

const mediaPlugin = (options?: MediaOptions): EditorPlugin => ({
  nodes() {
    return [
      { name: 'mediaGroup', node: mediaGroup, rank: 1700 },
      { name: 'mediaSingle', node: mediaSingle, rank: 1750 },
      { name: 'media', node: media, rank: 1800 },
    ].filter(
      node =>
        node.name !== 'mediaSingle' || (options && options.allowMediaSingle),
    );
  },

  pmPlugins() {
    return [
      {
        rank: 1200,
        plugin: ({
          schema,
          props,
          dispatch,
          eventDispatcher,
          providerFactory,
          errorReporter,
        }) =>
          createPlugin(
            schema,
            {
              providerFactory,
              nodeViews: {
                mediaGroup: nodeViewFactory(
                  providerFactory,
                  {
                    mediaGroup: ReactMediaGroupNode,
                    media: ReactMediaNode,
                  },
                  true,
                ),
                mediaSingle: nodeViewFactory(
                  providerFactory,
                  {
                    mediaSingle: ({ view, node, ...props }) => (
                      <WithPluginState
                        editorView={view}
                        eventDispatcher={eventDispatcher}
                        plugins={{
                          width: widthPluginKey,
                        }}
                        render={({ width }) => (
                          <ReactMediaSingleNode
                            view={view}
                            node={node}
                            width={width}
                            {...props}
                          />
                        )}
                      />
                    ),
                    media: ReactMediaNode,
                  },
                  true,
                ),
              },
              errorReporter,
              uploadErrorHandler: props.uploadErrorHandler,
              waitForMediaUpload: props.waitForMediaUpload,
              customDropzoneContainer:
                options && options.customDropzoneContainer,
            },
            dispatch,
            props.appearance,
          ),
      },
      { rank: 1220, plugin: ({ schema }) => keymapPlugin(schema) },
    ].concat(
      options && options.allowMediaSingle
        ? {
            rank: 1250,
            plugin: ({ schema }) => keymapMediaSinglePlugin(schema),
          }
        : [],
    );
  },

  contentComponent({ editorView }) {
    const pluginState = pluginKey.getState(editorView.state);

    return <MediaSingleEdit pluginState={pluginState} />;
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
});

export default mediaPlugin;
