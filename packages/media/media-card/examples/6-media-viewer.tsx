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

const context = createStorybookContext();
const surroundingItems = [
  imageFileId.id,
  gifFileId.id,
  largeImageFileId.id,
  videoFileId.id,
];

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
      <div>
        <Card
          context={context}
          identifier={imageFileId}
          shouldOpenMediaViewer={shouldOpenMediaViewer}
          surroundingItems={surroundingItems}
        />
        <Card
          context={context}
          identifier={gifFileId}
          shouldOpenMediaViewer={shouldOpenMediaViewer}
          surroundingItems={surroundingItems}
        />
        <Card
          context={context}
          identifier={videoFileId}
          shouldOpenMediaViewer={shouldOpenMediaViewer}
          surroundingItems={surroundingItems}
        />
        <Card
          context={context}
          identifier={videoFileId}
          shouldOpenMediaViewer={shouldOpenMediaViewer}
          surroundingItems={surroundingItems}
          useInlinePlayer={true}
        />
        <Card
          context={context}
          identifier={largeImageFileId}
          shouldOpenMediaViewer={shouldOpenMediaViewer}
          surroundingItems={surroundingItems}
        />
      </div>
    );
  }
}

export default () => <Example />;
