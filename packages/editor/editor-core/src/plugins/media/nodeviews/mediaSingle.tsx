import * as React from 'react';
import { Component } from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import {
  MediaSingle,
  WithProviders,
  MediaSingleLayout,
} from '@atlaskit/editor-common';
import { CardEvent } from '@atlaskit/media-card';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { stateKey, MediaPluginState } from '../pm-plugins/main';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import MediaItem from './media';
import WithPluginState from '../../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../../width';
import { stateKey as reactNodeViewStateKey } from '../../../plugins/base/pm-plugins/react-nodeview';
import { setNodeSelection } from '../../../utils';
import ResizableMediaSingle from '../ui/ResizableMediaSingle';
import { createDisplayGrid } from '../../../plugins/grid';
import { EventDispatcher } from '../../../event-dispatcher';

const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 200;

export interface MediaSingleNodeProps {
  node: PMNode;
  eventDispatcher: EventDispatcher;
  view: EditorView;
  width: number;
  selected: Function;
  getPos: () => number;
  lineLength: number;
}

export interface MediaSingleNodeState {
  width?: number;
  height?: number;
}

export default class MediaSingleNode extends Component<
  MediaSingleNodeProps,
  MediaSingleNodeState
> {
  private mediaPluginState: MediaPluginState;

  state = {
    height: undefined,
    width: undefined,
  };

  constructor(props) {
    super(props);
    this.mediaPluginState = stateKey.getState(
      this.props.view.state,
    ) as MediaPluginState;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.node.attrs.width !== nextProps.node.attrs.width ||
      this.props.selected() !== nextProps.selected() ||
      this.props.node.attrs.layout !== nextProps.node.attrs.layout ||
      this.props.width !== nextProps.width ||
      this.props.lineLength !== nextProps.lineLength ||
      this.props.getPos !== nextProps.getPos ||
      this.mediaChildHasUpdated(nextProps)
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const { layout } = this.props.node.attrs;
    if (this.props.selected()) {
      this.mediaPluginState.updateLayout(layout);
    }
  }

  private onExternalImageLoaded = ({ width, height }) => {
    this.setState(
      {
        width,
        height,
      },
      () => {
        this.forceUpdate();
      },
    );
  };

  private mediaChildHasUpdated = nextProps => {
    if (!this.props.node.firstChild || !nextProps.node.firstChild) {
      return false;
    }

    return (
      this.props.node.firstChild.attrs.collection !==
        nextProps.node.firstChild.attrs.collection ||
      this.props.node.firstChild.attrs.id !== nextProps.node.firstChild.attrs.id
    );
  };

  mediaReady(mediaState) {
    return mediaState && mediaState.status === 'ready';
  }

  selectMediaSingle = ({ event }: CardEvent) => {
    // We need to call "stopPropagation" here in order to prevent the browser from navigating to
    // another URL if the media node is wrapped in a link mark.
    event.stopPropagation();
    setNodeSelection(this.props.view, this.props.getPos() + 1);
  };

  updateSize = (width: number | null, layout: MediaSingleLayout) => {
    const { state, dispatch } = this.props.view;
    const pos = this.props.getPos();
    if (typeof pos === 'undefined') {
      return;
    }
    return dispatch(
      state.tr.setNodeMarkup(pos, undefined, {
        ...this.props.node.attrs,
        layout,
        width,
      }),
    );
  };

  render() {
    const {
      selected,
      getPos,
      node,
      view: { state },
    } = this.props;

    const { layout, width: mediaSingleWidth } = node.attrs;
    const childNode = node.firstChild!;

    let { width, height, type } = childNode.attrs;

    if (type === 'external') {
      const { width: stateWidth, height: stateHeight } = this.state;

      if (width === null) {
        width = stateWidth || DEFAULT_WIDTH;
      }

      if (height === null) {
        height = stateHeight || DEFAULT_HEIGHT;
      }
    }

    const mediaState = this.mediaPluginState.getMediaNodeState(
      childNode.attrs.__key,
    );

    const isLoading = mediaState ? !this.mediaReady(mediaState) : false;
    let canResize = !!this.mediaPluginState.options.allowResizing && !isLoading;

    const pos = getPos();
    if (pos) {
      const $pos = state.doc.resolve(pos);
      const { table, layoutSection } = state.schema.nodes;
      const disabledNode = !!findParentNodeOfTypeClosestToPos($pos, [
        table,
        layoutSection,
      ]);
      canResize = canResize && !disabledNode;
    }

    if (width === null || height === null) {
      width = DEFAULT_WIDTH;
      height = DEFAULT_HEIGHT;
    }

    const cardWidth = this.props.width;
    const cardHeight = (height / width) * cardWidth;
    const cardDimensions = {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
    };

    const props = {
      layout,
      width,
      height,
      isLoading,

      containerWidth: this.props.width,
      lineLength: this.props.lineLength,
      pctWidth: mediaSingleWidth,
    };

    const MediaChild = (
      <WithProviders
        providers={['mediaProvider']}
        providerFactory={this.mediaPluginState.options.providerFactory}
        renderNode={({ mediaProvider }) => {
          return (
            <MediaItem
              node={childNode}
              view={this.props.view}
              getPos={this.props.getPos}
              cardDimensions={cardDimensions}
              mediaProvider={mediaProvider}
              selected={selected()}
              onClick={this.selectMediaSingle}
              onExternalImageLoaded={this.onExternalImageLoaded}
            />
          );
        }}
      />
    );

    return canResize ? (
      <ResizableMediaSingle
        {...props}
        getPos={getPos}
        updateSize={this.updateSize}
        displayGrid={createDisplayGrid(this.props.eventDispatcher)}
        gridSize={12}
        state={this.props.view.state}
        appearance={this.mediaPluginState.options.appearance}
        selected={this.props.selected()}
      >
        {MediaChild}
      </ResizableMediaSingle>
    ) : (
      <MediaSingle {...props}>{MediaChild}</MediaSingle>
    );
  }
}

class MediaSingleNodeView extends ReactNodeView {
  render(props, forwardRef) {
    const { eventDispatcher } = this.reactComponentProps;
    return (
      <WithPluginState
        editorView={this.view}
        plugins={{
          width: widthPluginKey,
          reactNodeViewState: reactNodeViewStateKey,
        }}
        render={({ width, reactNodeViewState }) => {
          return (
            <MediaSingleNode
              width={width.width}
              lineLength={width.lineLength}
              node={this.node}
              getPos={this.getPos}
              view={this.view}
              selected={() => this.getPos() + 1 === reactNodeViewState}
              eventDispatcher={eventDispatcher}
            />
          );
        }}
      />
    );
  }
}

export const ReactMediaSingleNode = (portalProviderAPI, eventDispatcher) => (
  node: PMNode,
  view: EditorView,
  getPos: () => number,
): NodeView => {
  return new MediaSingleNodeView(node, view, getPos, portalProviderAPI, {
    eventDispatcher,
  }).init();
};
