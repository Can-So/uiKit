import * as assert from 'assert';
import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { FilmstripView } from '@atlaskit/media-filmstrip';
import { MediaNodeProps } from './media';
import {
  MediaPluginState,
  stateKey as mediaStateKey,
} from '../pm-plugins/main';

export interface MediaGroupNodeProps {
  view: EditorView;
}

export interface MediaGroupNodeState {
  animate: boolean;
  offset: number;
}

// Need `padding-left` override for media item drop-shadow
const Wrapper = styled.div`
  margin-bottom: 8px;
  &&& ul {
    padding: 0;
    & li:first-child {
      padding-left: 2px;
    }
  }
`;

export default class MediaGroupNode extends PureComponent<
  MediaGroupNodeProps,
  MediaGroupNodeState
> {
  private mediaPluginState: MediaPluginState;
  private mediaNodesIds: string[];

  state: MediaGroupNodeState = {
    animate: false,
    offset: 0,
  };

  constructor(props) {
    super(props);

    this.mediaPluginState = mediaStateKey.getState(props.view.state);
    assert(this.mediaPluginState, 'Media is not enabled');
  }

  private handleSize = ({ offset }) => this.setState({ offset });
  private handleScroll = ({ animate, offset }) =>
    this.setState({ animate, offset });

  /**
   * Save all childNodes ids into "mediaNodesIds"
   */
  componentDidMount() {
    this.mediaNodesIds = this.getMediaNodesIds(this.props.children);
  }

  /**
   * Update "mediaNodesIds" and notify media plugin about removed nodes
   */
  componentWillReceiveProps(nextProps) {
    const newMediaNodesIds = this.getMediaNodesIds(nextProps.children);
    const removedNodesIds = this.mediaNodesIds.filter(
      id => newMediaNodesIds.indexOf(id) === -1,
    );

    removedNodesIds.forEach(mediaNodeId => {
      this.mediaPluginState.cancelInFlightUpload(mediaNodeId);
    });

    this.mediaNodesIds = newMediaNodesIds;
  }

  render() {
    const { animate, offset } = this.state;
    return (
      <Wrapper>
        <FilmstripView
          animate={animate}
          offset={offset}
          onSize={this.handleSize}
          onScroll={this.handleScroll}
        >
          {this.props.children}
        </FilmstripView>
      </Wrapper>
    );
  }

  private getMediaNodesIds = (children: React.ReactNode): string[] => {
    return (
      React.Children.map(children, (child: React.ReactElement<any>) => {
        return (child.props as MediaNodeProps).node.attrs.id;
      }) || []
    );
  };
}
