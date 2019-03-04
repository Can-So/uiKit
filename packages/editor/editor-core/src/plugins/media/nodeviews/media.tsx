import * as React from 'react';
import { Component } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory, ImageLoaderProps } from '@atlaskit/editor-common';
import { ProsemirrorGetPosHandler, ReactNodeProps } from '../../../nodeviews';
import {
  MediaPluginState,
  stateKey as mediaStateKey,
  MediaProvider,
} from '../pm-plugins/main';
import { Context, ImageResizeMode, Identifier } from '@atlaskit/media-core';
import {
  Card,
  CardDimensions,
  CardView,
  CardEventHandler,
  CardOnClickCallback,
} from '@atlaskit/media-card';
import { MediaType, MediaBaseAttributes } from '@atlaskit/adf-schema';
import { withImageLoader, ImageStatus } from '@atlaskit/editor-common';

import { EditorAppearance } from '../../../types';

// This is being used by DropPlaceholder now
export const MEDIA_HEIGHT = 125;
export const FILE_WIDTH = 156;

export type Appearance = 'small' | 'image' | 'horizontal' | 'square';

export interface MediaNodeProps extends ReactNodeProps {
  getPos: ProsemirrorGetPosHandler;
  view: EditorView;
  node: PMNode;
  providerFactory?: ProviderFactory;
  cardDimensions: CardDimensions;
  isMediaSingle?: boolean;
  onClick?: CardOnClickCallback;
  onExternalImageLoaded?: (
    dimensions: { width: number; height: number },
  ) => void;
  editorAppearance: EditorAppearance;
  mediaProvider?: Promise<MediaProvider>;
  viewContext?: Context;
}

export interface Props extends Partial<MediaBaseAttributes> {
  type: MediaType;
  cardDimensions?: CardDimensions;
  onClick?: CardOnClickCallback;
  onDelete?: CardEventHandler;
  resizeMode?: ImageResizeMode;
  appearance?: Appearance;
  selected?: boolean;
  url?: string;
  imageStatus?: ImageStatus;
  context: Context;
  disableOverlay?: boolean;
  mediaProvider?: Promise<MediaProvider>;
  viewContext?: Context;
}

export interface MediaNodeState {
  viewContext?: Context;
}

class MediaNode extends Component<
  MediaNodeProps & ImageLoaderProps,
  MediaNodeState
> {
  private pluginState: MediaPluginState;

  constructor(props) {
    super(props);
    const { view } = this.props;
    this.pluginState = mediaStateKey.getState(view.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.selected !== nextProps.selected ||
      this.props.viewContext !== nextProps.viewContext ||
      this.props.node.attrs.id !== nextProps.node.attrs.id ||
      this.props.node.attrs.collection !== nextProps.node.attrs.collection ||
      this.props.cardDimensions !== nextProps.cardDimensions
    ) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.handleNewNode(this.props);
  }

  componentWillUnmount() {
    const { node } = this.props;
    this.pluginState.handleMediaNodeUnmount(node);
  }

  componentDidUpdate(prevProps: Readonly<MediaNodeProps & ImageLoaderProps>) {
    if (prevProps.node.attrs.id !== this.props.node.attrs.id) {
      this.pluginState.handleMediaNodeUnmount(prevProps.node);
      this.handleNewNode(this.props);
    }
    this.pluginState.updateElement();
  }

  render() {
    const {
      node,
      selected,
      cardDimensions,
      onClick,
      editorAppearance,
    } = this.props;
    const { id, type, collection, url } = node.attrs;
    const { viewContext } = this.props;
    /**
     * On mobile we don't receive a collectionName until the `upload-end` event.
     * We don't want to render a proper card until we have a valid collection.
     * Render loading until we do.
     */
    const isMobile = editorAppearance === 'mobile';
    let isMobileReady = isMobile ? typeof collection === 'string' : true;

    if (type !== 'external' && (!viewContext || !isMobileReady)) {
      return <CardView status="loading" dimensions={cardDimensions} />;
    }

    /** For new images, the media state will be loaded inside the plugin state */
    const state = this.pluginState.getMediaNodeState(id);
    const fileId = (state && state.fileId) || id;

    const identifier: Identifier =
      type === 'external'
        ? {
            dataURI: url!,
            name: url,
            mediaItemType: 'external-image',
          }
        : {
            id: fileId,
            mediaItemType: 'file',
            collectionName: collection!,
          };

    return (
      <Card
        context={viewContext as any}
        resizeMode="stretchy-fit"
        dimensions={cardDimensions}
        identifier={identifier}
        selectable={true}
        selected={selected}
        disableOverlay={true}
        onClick={onClick}
        useInlinePlayer={!isMobile}
        isLazy={!isMobile}
      />
    );
  }

  private handleNewNode = (props: MediaNodeProps) => {
    const { node } = props;

    // +1 indicates the media node inside the mediaSingle nodeview
    this.pluginState.handleMediaNodeMount(node, () => this.props.getPos() + 1);
  };
}

export default withImageLoader<MediaNodeProps>(MediaNode);
