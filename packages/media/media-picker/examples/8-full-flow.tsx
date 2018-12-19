import * as React from 'react';
import {
  defaultCollectionName,
  createUploadContext,
  //  mediaMock,
} from '@atlaskit/media-test-helpers';
import { Card, FileIdentifier, CardEvent } from '@atlaskit/media-card';
import { MediaViewer, MediaViewerItem } from '@atlaskit/media-viewer';
import { FileDetails } from '@atlaskit/media-core';
import Button from '@atlaskit/button';
import { CardWrapper } from '../src/popup/components/views/upload/styled';
import { MediaPicker } from '../src';

//mediaMock.enable();

const context = createUploadContext();

const popup = MediaPicker('popup', context, {
  container: document.body,
  uploadParams: {
    collection: defaultCollectionName,
  },
});

popup.show();

export interface State {
  events: Array<Promise<string>>;
  selectedItem?: MediaViewerItem;
}

export default class Example extends React.Component<{}, State> {
  state: State = { events: [] };

  componentDidMount() {
    popup.on('uploads-start', payload => {
      const { events } = this.state;
      this.setState({
        events: [...events, ...payload.files.map(file => file.upfrontId)],
      });
    });
  }

  private onCardClick = (event: CardEvent) => {
    this.setState({
      selectedItem: {
        id: (event.mediaItemDetails as FileDetails).id,
        occurrenceKey: '',
        type: 'file',
      },
    });
  };

  private renderCards = () => {
    const { events } = this.state;

    return events.map((id, key) => {
      const identifier: FileIdentifier = {
        id,
        mediaItemType: 'file',
        collectionName: defaultCollectionName,
      };

      return (
        <Card
          key={key}
          context={context}
          identifier={identifier}
          dimensions={{
            width: 200,
            height: 200,
          }}
          onClick={this.onCardClick}
        />
      );
    });
  };

  render() {
    const { selectedItem } = this.state;

    return (
      <>
        <Button id="show" onClick={() => popup.show()}>
          Show
        </Button>
        <CardWrapper>{this.renderCards()}</CardWrapper>
        {selectedItem ? (
          <MediaViewer
            featureFlags={{ customVideoPlayer: true }}
            context={context}
            selectedItem={selectedItem}
            dataSource={{ list: [selectedItem] }}
            collectionName={defaultCollectionName}
            onClose={() => this.setState({ selectedItem: undefined })}
          />
        ) : null}
      </>
    );
  }
}
