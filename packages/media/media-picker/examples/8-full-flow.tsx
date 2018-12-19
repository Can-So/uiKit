import * as React from 'react';
import {
  defaultCollectionName,
  createUploadContext,
  mediaMock,
} from '@atlaskit/media-test-helpers';
import { MediaPicker } from '../src';
import { Card, FileIdentifier } from '@atlaskit/media-card';
import { CardWrapper } from '../src/popup/components/views/upload/styled';
import { MediaViewer, MediaViewerItem } from '@atlaskit/media-viewer';
import { FileDetails } from '@atlaskit/media-core';

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
  constructor(readonly props: any) {
    super(props);
    this.state = { events: [] };
  }

  componentDidMount() {
    popup.on('uploads-start', payload => {
      const { events } = this.state;
      this.setState({
        events: [...events, ...payload.files.map(file => file.upfrontId)],
      });
    });
  }

  render() {
    const { events, selectedItem } = this.state;

    return (
      <>
        <CardWrapper>
          {events.map((id, key) => {
            const identifier: FileIdentifier = {
              id,
              mediaItemType: 'file',
              collectionName: defaultCollectionName,
            };
            console.log({ identifier });
            return (
              <Card
                key={key}
                context={context}
                identifier={identifier}
                dimensions={{
                  width: 200,
                  height: 200,
                }}
                onClick={async event => {
                  this.setState({
                    selectedItem: {
                      //id: await identifier.id,
                      id: (event.mediaItemDetails as FileDetails).id,
                      occurrenceKey: 'bs',
                      type: 'file',
                    },
                  });
                }}
              />
            );
          })}
        </CardWrapper>
        {selectedItem && (
          <MediaViewer
            featureFlags={{ customVideoPlayer: true }}
            context={context}
            selectedItem={selectedItem}
            dataSource={{ list: [selectedItem] }}
            collectionName={defaultCollectionName}
            onClose={() => this.setState({ selectedItem: undefined })}
          />
        )}
      </>
    );
  }
}
