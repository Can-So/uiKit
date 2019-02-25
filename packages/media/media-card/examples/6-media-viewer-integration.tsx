import * as React from 'react';
import { Component } from 'react';
import { Card } from '../src';
import {
  createStorybookContext,
  imageFileId,
  gifFileId,
  videoFileId,
  largeImageFileId,
} from '@atlaskit/media-test-helpers';
import { MediaViewerDataSource } from '@atlaskit/media-viewer';
import {
  MediaViewerExampleWrapper,
  MediaViewerExampleColumn,
} from '../example-helpers/styled';

const context = createStorybookContext();
const mediaViewerDataSource: MediaViewerDataSource = {
  list: [imageFileId, gifFileId, largeImageFileId, videoFileId],
};

interface ExampleState {
  shouldOpenMediaViewer: boolean;
}

class Example extends Component<{}, {}> {
  state: ExampleState = {
    shouldOpenMediaViewer: true,
  };

  render() {
    const { shouldOpenMediaViewer } = this.state;

    return (
      <MediaViewerExampleWrapper>
        <MediaViewerExampleColumn>
          <h3>shouldOpenMediaViewer + mediaViewerDataSource</h3>
          <Card
            context={context}
            identifier={imageFileId}
            shouldOpenMediaViewer={shouldOpenMediaViewer}
            mediaViewerDataSource={mediaViewerDataSource}
          />
          <Card
            context={context}
            identifier={gifFileId}
            shouldOpenMediaViewer={shouldOpenMediaViewer}
            mediaViewerDataSource={mediaViewerDataSource}
          />
          <Card
            context={context}
            identifier={videoFileId}
            shouldOpenMediaViewer={shouldOpenMediaViewer}
            mediaViewerDataSource={mediaViewerDataSource}
          />
        </MediaViewerExampleColumn>
        <MediaViewerExampleColumn>
          <h3>shouldOpenMediaViewer + list without card identifier</h3>
          <Card
            context={context}
            identifier={imageFileId}
            shouldOpenMediaViewer={shouldOpenMediaViewer}
            mediaViewerDataSource={{ list: [gifFileId] }}
          />
        </MediaViewerExampleColumn>
        <MediaViewerExampleColumn>
          <h3>useInlinePlayer=true</h3>
          <Card
            context={context}
            identifier={videoFileId}
            shouldOpenMediaViewer={shouldOpenMediaViewer}
            mediaViewerDataSource={mediaViewerDataSource}
            useInlinePlayer={true}
          />
        </MediaViewerExampleColumn>
        <MediaViewerExampleColumn>
          <h3>mediaViewerDataSource=undefined</h3>
          <Card
            context={context}
            identifier={largeImageFileId}
            shouldOpenMediaViewer={shouldOpenMediaViewer}
          />
        </MediaViewerExampleColumn>
      </MediaViewerExampleWrapper>
    );
  }
}

export default () => <Example />;
