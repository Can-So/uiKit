import * as React from 'react';
import Button from '@atlaskit/button';
import {
  createStorybookContext,
  imageFileId,
  videoFileId,
  docFileId,
  defaultCollectionName,
  unknownFileId,
} from '@atlaskit/media-test-helpers';
import { MediaViewer, MediaViewerItem } from '../src/index';

const context = createStorybookContext();

const imageItem: MediaViewerItem = {
  type: 'file',
  id: imageFileId.id,
  occurrenceKey: 'testOccurrenceKey',
};

const docItem: MediaViewerItem = {
  type: 'file',
  id: docFileId.id,
  occurrenceKey: 'testOccurrenceKey',
};

const videoItem: MediaViewerItem = {
  type: 'file',
  id: videoFileId.id,
  occurrenceKey: 'testOccurrenceKey',
};

const unsupportedItem: MediaViewerItem = {
  type: 'file',
  id: unknownFileId.id,
  occurrenceKey: 'testOccurrenceKey',
};

export type State = {
  selectedItem?: MediaViewerItem;
};

export default class Example extends React.Component<{}, State> {
  state: State = { selectedItem: undefined };

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ selectedItem: imageItem })}>
          Preview an image item
        </Button>
        <Button onClick={() => this.setState({ selectedItem: videoItem })}>
          Preview a video item
        </Button>
        <Button onClick={() => this.setState({ selectedItem: docItem })}>
          Preview a doc item
        </Button>
        <Button
          onClick={() => this.setState({ selectedItem: unsupportedItem })}
        >
          Preview unsupported item
        </Button>

        {this.state.selectedItem && (
          <MediaViewer
            featureFlags={{ nextGen: true }}
            MediaViewer={null as any}
            basePath={null as any}
            context={context}
            selectedItem={this.state.selectedItem}
            dataSource={{ list: [this.state.selectedItem] }}
            collectionName={defaultCollectionName}
            onClose={() => this.setState({ selectedItem: undefined })}
          />
        )}
      </div>
    );
  }
}
