import * as React from 'react';
import { createStorybookContext } from '@atlaskit/media-test-helpers';
import { FileIdentifier, Card } from '@atlaskit/media-card';
import { ButtonList, Container, Group } from '../example-helpers/styled';
import {
  archiveItem,
  audioItem,
  audioItemNoCover,
  docItem,
  imageItem,
  largeImageItem,
  smallImageItem,
  unsupportedItem,
  videoHorizontalFileItem,
  videoItem,
  videoLargeFileItem,
  videoProcessingFailedItem,
  wideImageItem,
  defaultCollectionName,
} from '../example-helpers';
import { MediaViewer, MediaViewerItem } from '../src';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';

const context = createStorybookContext();

const handleEvent = (analyticsEvent: UIAnalyticsEventInterface) => {
  const { payload, context } = analyticsEvent;
  console.log('Received event:', { payload, context });
};

export type State = {
  selectedItem?: MediaViewerItem;
};

export default class Example extends React.Component<{}, State> {
  state: State = { selectedItem: undefined };

  setItem = (selectedItem: MediaViewerItem) => () => {
    this.setState({ selectedItem });
  };

  createItem = (item: MediaViewerItem, title: string) => {
    const identifier: FileIdentifier = {
      id: item.id,
      mediaItemType: 'file',
      collectionName: defaultCollectionName,
    };
    const onClick = this.setItem(item);

    return (
      <div>
        <h4>{title}</h4>
        <Card identifier={identifier} context={context} onClick={onClick} />
      </div>
    );
  };

  render() {
    return (
      <Container>
        <Group>
          <h2>Image</h2>
          <ButtonList>
            <li>{this.createItem(imageItem, 'Picture')}</li>
            <li>{this.createItem(smallImageItem, 'Icon')}</li>
            <li>{this.createItem(wideImageItem, 'Wide')}</li>
            <li>{this.createItem(largeImageItem, 'Large')}</li>
          </ButtonList>
        </Group>
        <Group>
          <h2>Document</h2>
          <ButtonList>
            <li>{this.createItem(docItem, 'Normal')}</li>
          </ButtonList>
        </Group>
        <Group>
          <h2>Video</h2>
          <ButtonList>
            <li>{this.createItem(videoHorizontalFileItem, 'Horizontal')}</li>
            <li>{this.createItem(videoLargeFileItem, 'Large')}</li>
            <li>{this.createItem(videoItem, 'Normal')}</li>
          </ButtonList>
        </Group>
        <Group>
          <h2>Audio</h2>
          <ButtonList>
            <li>{this.createItem(audioItem, 'Normal')}</li>
            <li>{this.createItem(audioItemNoCover, 'Song without cover')}</li>
          </ButtonList>
        </Group>
        <Group>
          <h2>Errors</h2>
          <ButtonList>
            <li>{this.createItem(unsupportedItem, 'Unsupported item')}</li>
            <li>{this.createItem(archiveItem, 'Archive has no preview')}</li>
            <li>
              {this.createItem(videoProcessingFailedItem, 'Failed processing')}
            </li>
          </ButtonList>
        </Group>
        {this.state.selectedItem && (
          <AnalyticsListener channel="media" onEvent={handleEvent}>
            <MediaViewer
              featureFlags={{ customVideoPlayer: true }}
              context={context}
              selectedItem={this.state.selectedItem}
              dataSource={{ list: [this.state.selectedItem] }}
              collectionName={defaultCollectionName}
              onClose={() => this.setState({ selectedItem: undefined })}
            />
          </AnalyticsListener>
        )}
      </Container>
    );
  }
}
