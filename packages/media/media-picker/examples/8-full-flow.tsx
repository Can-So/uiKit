import * as React from 'react';
import {
  defaultCollectionName,
  createUploadContext,
} from '@atlaskit/media-test-helpers';
import { Card, FileIdentifier, CardEvent } from '@atlaskit/media-card';
import { MediaViewer, MediaViewerItem } from '@atlaskit/media-viewer';
import { FileDetails } from '@atlaskit/media-core';
import Button from '@atlaskit/button';
import * as uuid from 'uuid/v4';
import { MediaPicker } from '../src';

const context = createUploadContext();

const popup = MediaPicker('popup', context, {
  container: document.body,
  uploadParams: {
    collection: defaultCollectionName,
  },
});

popup.show();

export type TenantFileRecord = {
  id: Promise<string>;
  occKey?: string;
};

export interface State {
  events: Array<TenantFileRecord>;
  selectedItem?: MediaViewerItem;
}

export default class Example extends React.Component<{}, State> {
  state: State = { events: [] };

  componentDidMount() {
    popup.on('uploads-start', payload => {
      const { events } = this.state;

      this.setState({
        events: [
          ...events,
          ...payload.files.map(file => ({
            id: file.upfrontId,
            occKey: file.occurrenceKey,
          })),
        ],
      });
    });
  }

  private onCardClick = (occurrenceKey: string = '') => (event: CardEvent) => {
    if (event.mediaItemDetails) {
      this.setState({
        selectedItem: {
          id: (event.mediaItemDetails as FileDetails).id,
          occurrenceKey,
          type: 'file',
        },
      });
    }
  };

  private renderCards = () => {
    const { events } = this.state;

    return events.map((fileRecord, key) => {
      const identifier: FileIdentifier = {
        id: fileRecord.id,
        mediaItemType: 'file',
        collectionName: defaultCollectionName,
        occurrenceKey: fileRecord.occKey,
      };

      return (
        <div key={uuid()} style={{ display: 'inline-block', margin: '10px' }}>
          <Card
            key={key}
            context={context}
            identifier={identifier}
            dimensions={{
              width: 200,
              height: 200,
            }}
            onClick={this.onCardClick(identifier.occurrenceKey)}
          />
        </div>
      );
    });
  };

  private onCloseMediaViewer = () => {
    this.setState({ selectedItem: undefined });
  };

  private renderMediaViewer = () => {
    const { events, selectedItem } = this.state;
    if (!selectedItem) {
      return null;
    }

    const dataSource =
      events.length > 1
        ? { collectionName: defaultCollectionName }
        : { list: [selectedItem] };

    return (
      <MediaViewer
        featureFlags={{ customVideoPlayer: true }}
        context={context}
        selectedItem={selectedItem}
        dataSource={dataSource}
        collectionName={defaultCollectionName}
        onClose={this.onCloseMediaViewer}
      />
    );
  };

  render() {
    return (
      <>
        <Button id="show" onClick={() => popup.show()}>
          Show
        </Button>
        <div>{this.renderCards()}</div>
        {this.renderMediaViewer()}
      </>
    );
  }
}
