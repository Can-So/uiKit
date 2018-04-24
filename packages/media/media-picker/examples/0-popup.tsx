/* tslint:disable:no-console */
import * as React from 'react';
import { Component } from 'react';
import { ContextFactory } from '@atlaskit/media-core';
import Button from '@atlaskit/button';
import DropdownMenu, { DropdownItem } from '@atlaskit/dropdown-menu';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import {
  userAuthProvider,
  mediaPickerAuthProvider,
  defaultCollectionName,
  defaultMediaPickerCollectionName,
  userAuthProviderBaseURL,
  createStorybookContext,
} from '@atlaskit/media-test-helpers';
import { Card } from '@atlaskit/media-card';
import { MediaPicker, Popup, MediaProgress } from '../src';
import {
  PopupContainer,
  PopupHeader,
  PopupEventsWrapper,
  PreviewImage,
  UploadingFilesWrapper,
  FileProgress,
  FilesInfoWrapper,
  CardsWrapper,
  CardItemWrapper,
} from '../example-helpers/styled';
import { AuthEnvironment } from '../example-helpers';
import {
  UploadEndEventPayload,
  UploadErrorEventPayload,
  UploadPreviewUpdateEventPayload,
  UploadProcessingEventPayload,
  UploadsStartEventPayload,
  UploadStatusUpdateEventPayload,
} from '../src/domain/uploadEvent';
import { PopupUploadEventPayloadMap } from '../src/components/popup';

const context = createStorybookContext();

export type InflightUpload = { [key: string]: {} };
export type PublicFile = {
  publicId: string;
  preview?: string;
};
export interface Event<K extends keyof PopupUploadEventPayloadMap> {
  readonly eventName: K;
  readonly data: PopupUploadEventPayloadMap[K];
}
export type Events = Event<keyof PopupUploadEventPayloadMap>[];
export interface PopupWrapperState {
  collectionName: string;
  closedTimes: number;
  events: Events;
  authEnvironment: AuthEnvironment;
  inflightUploads: { [key: string]: MediaProgress };
  hasTorndown: boolean;
  publicFiles: { [key: string]: PublicFile };
  isUploadingFilesVisible: boolean;
}

class PopupWrapper extends Component<{}, PopupWrapperState> {
  popup: Popup;

  state: PopupWrapperState = {
    collectionName: defaultMediaPickerCollectionName,
    closedTimes: 0,
    events: [],
    authEnvironment: 'client',
    inflightUploads: {},
    hasTorndown: false,
    publicFiles: {},
    isUploadingFilesVisible: true,
  };

  componentDidMount() {
    const context = ContextFactory.create({
      serviceHost: userAuthProviderBaseURL,
      authProvider: mediaPickerAuthProvider(this),
      userAuthProvider,
    });

    this.popup = MediaPicker('popup', context, {
      container: document.body,
      uploadParams: {
        collection: defaultMediaPickerCollectionName,
      },
    });

    this.popup.on('uploads-start', this.onUploadsStart);
    this.popup.on('upload-preview-update', this.onUploadPreviewUpdate);
    this.popup.on('upload-status-update', this.onUploadStatusUpdate);
    this.popup.on('upload-processing', this.onUploadProcessing);
    this.popup.on('upload-end', this.onUploadEnd);
    this.popup.on('upload-error', this.onUploadError);
    this.popup.on('closed', this.onClosed);
  }

  componentWillUnmount() {
    this.popup.removeAllListeners();
  }

  onUploadError = (data: UploadErrorEventPayload) => {
    if (data.error.name === 'user_token_fetch_fail') {
      const authStg = confirm(
        'It looks like you are not authorized in Staging. Press OK to authorize',
      );
      authStg
        ? window.open('https://id.stg.internal.atlassian.com', '_blank')
        : this.popup.hide();
    } else {
      console.error(JSON.stringify(data));
    }
  };

  onClosed = () => {
    this.setState({
      closedTimes: this.state.closedTimes + 1,
      events: [...this.state.events, { eventName: 'closed', data: undefined }],
    });
  };

  onUploadsStart = (data: UploadsStartEventPayload) => {
    const newInflightUploads = data.files.reduce(
      (prev, { id }) => ({ ...prev, [id]: {} }),
      {},
    );

    this.setState({
      inflightUploads: {
        ...this.state.inflightUploads,
        ...newInflightUploads,
      },
      events: [...this.state.events, { eventName: 'uploads-start', data }],
    });
  };

  onUploadStatusUpdate = (data: UploadStatusUpdateEventPayload) => {
    const { inflightUploads } = this.state;
    const id = data.file.id;
    inflightUploads[id] = data.progress;
    this.setState({
      inflightUploads,
      events: [
        ...this.state.events,
        { eventName: 'upload-status-update', data },
      ],
    });
  };

  onUploadPreviewUpdate = (data: UploadPreviewUpdateEventPayload) => {
    const id = data.file.id;
    const preview = data.preview && data.preview.src;

    if (preview) {
      const newPublicFile = {
        [id]: {
          publicId: id,
          preview,
        },
      };

      this.setState({
        publicFiles: { ...this.state.publicFiles, ...newPublicFile },
        events: [
          ...this.state.events,
          { eventName: 'upload-preview-update', data },
        ],
      });
    }
  };

  onUploadProcessing = (data: UploadProcessingEventPayload) => {
    const { publicFiles } = this.state;
    const publicFile = publicFiles[data.file.id];

    if (publicFile) {
      const publicId = data.file.publicId;
      publicFile.publicId = publicId;
      if (publicFile.preview) {
        context.setLocalPreview(publicId, publicFile.preview);
      }

      this.setState({
        publicFiles,
        events: [
          ...this.state.events,
          { eventName: 'upload-processing', data },
        ],
      });
    }
  };

  onUploadEnd = (data: UploadEndEventPayload) => {
    this.setState({
      events: [...this.state.events, { eventName: 'upload-end', data }],
    });
  };

  onShow = () => {
    const { collectionName: collection } = this.state;

    this.popup.setUploadParams({
      collection,
    });

    // Populate cache in userAuthProvider.
    userAuthProvider();
    // Synchronously with next command tenantAuthProvider will be requested.
    this.popup.show().catch(console.error);
  };

  onCollectionChange = e => {
    const { innerText: collectionName } = e.target;

    this.setState({ collectionName });
  };

  onAuthTypeChange = e => {
    const { innerText: authEnvironment } = e.target;

    this.setState({ authEnvironment });
  };

  renderSerializedEvent(eventName, data, key) {
    const serializedEvent = JSON.stringify(data, undefined, 2);

    return (
      <div key={key}>
        {eventName} :&nbsp;
        <pre> {serializedEvent} </pre>
      </div>
    );
  }

  renderEvents(events: Events) {
    return events.map(({ eventName, data: payload }, key) => {
      if (eventName === 'uploads-start') {
        const data = payload as UploadsStartEventPayload;
        return (
          <div key={key}>
            <div>
              <h2>Upload has started for {data.files.length} files</h2>
            </div>
            {this.renderSerializedEvent(eventName, data, key)}
          </div>
        );
      }

      if (eventName === 'upload-preview-update') {
        const data = payload as UploadPreviewUpdateEventPayload;
        if (!data.preview) {
          return;
        }

        const imageUrl = data.preview.src.toString();
        // We don't want to print the original image src because it freezes the browser
        const newData = {
          ...data,
          preview: { ...data.preview, src: `src length: ${imageUrl.length}` },
        };

        return (
          <div key={key}>
            {this.renderSerializedEvent(eventName, newData, key)}
            <div>
              <PreviewImage src={imageUrl} id={data.file.id} />
            </div>
          </div>
        );
      }

      return this.renderSerializedEvent(eventName, payload, key);
    });
  }

  onTeardown = () => {
    this.setState({ hasTorndown: true }, () => {
      this.popup.teardown();
    });
  };

  onUploadingFilesToggle = () => {
    this.setState({
      isUploadingFilesVisible: !this.state.isUploadingFilesVisible,
    });
  };

  onCancelUpload = () => {
    const { inflightUploads } = this.state;

    Object.keys(inflightUploads).forEach(uploadId =>
      this.popup.cancel(uploadId),
    );

    this.setState({ inflightUploads: {} });
  };

  onEvent = event => {
    console.log(event);
  };

  renderUploadingFiles = () => {
    const { inflightUploads } = this.state;
    const keys = Object.keys(inflightUploads);
    if (!keys.length) {
      return;
    }

    const uploadingFiles = keys.map(id => {
      const progress = inflightUploads[id].portion;

      return (
        <div key={id}>
          {id} <FileProgress value={progress || 0} max="1" /> : ({progress})
        </div>
      );
    });

    return (
      <UploadingFilesWrapper>
        <h1>Uploading Files</h1>
        {uploadingFiles}
      </UploadingFilesWrapper>
    );
  };

  renderCards = () => {
    const { publicFiles } = this.state;
    const publicIds = Object.keys(publicFiles)
      .map(id => publicFiles[id].publicId)
      .filter(id => !!id);

    if (!publicIds.length) {
      return;
    }

    const cards = publicIds.map((id, key) => (
      <CardItemWrapper key={key}>
        <Card
          context={context}
          isLazy={false}
          identifier={{
            mediaItemType: 'file',
            id,
          }}
        />
      </CardItemWrapper>
    ));

    return (
      <CardsWrapper>
        <h1>{'<Cards />'}</h1>
        {cards}
      </CardsWrapper>
    );
  };

  render() {
    const {
      closedTimes,
      events,
      authEnvironment,
      collectionName,
      inflightUploads,
      hasTorndown,
      isUploadingFilesVisible,
    } = this.state;
    const isCancelButtonDisabled = Object.keys(inflightUploads).length === 0;

    return (
      <AnalyticsListener onEvent={this.onEvent} channel="media">
        <PopupContainer>
          <PopupHeader>
            <Button
              appearance="primary"
              onClick={this.onShow}
              isDisabled={hasTorndown}
            >
              Show
            </Button>
            <Button
              appearance="warning"
              onClick={this.onCancelUpload}
              isDisabled={isCancelButtonDisabled || hasTorndown}
            >
              Cancel uploads
            </Button>
            <Button
              appearance="danger"
              onClick={this.onTeardown}
              isDisabled={hasTorndown}
            >
              Teardown
            </Button>
            <Button
              onClick={this.onUploadingFilesToggle}
              isDisabled={hasTorndown}
            >
              Toggle Uploading files
            </Button>
            <DropdownMenu trigger={collectionName} triggerType="button">
              <DropdownItem onClick={this.onCollectionChange}>
                {defaultMediaPickerCollectionName}
              </DropdownItem>
              <DropdownItem onClick={this.onCollectionChange}>
                {defaultCollectionName}
              </DropdownItem>
            </DropdownMenu>
            <DropdownMenu trigger={authEnvironment} triggerType="button">
              <DropdownItem onClick={this.onAuthTypeChange}>
                client
              </DropdownItem>
              <DropdownItem onClick={this.onAuthTypeChange}>asap</DropdownItem>
            </DropdownMenu>
            Closed times: {closedTimes}
          </PopupHeader>
          {isUploadingFilesVisible ? (
            <FilesInfoWrapper>
              {this.renderUploadingFiles()}
              {this.renderCards()}
            </FilesInfoWrapper>
          ) : (
            undefined
          )}
          <PopupEventsWrapper>{this.renderEvents(events)}</PopupEventsWrapper>
        </PopupContainer>
      </AnalyticsListener>
    );
  }
}

export default () => <PopupWrapper />;
