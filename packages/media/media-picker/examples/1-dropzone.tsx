/* tslint:disable:no-console */
import * as React from 'react';
import { Component } from 'react';
import {
  userAuthProvider,
  defaultMediaPickerAuthProvider,
  userAuthProviderBaseURL,
} from '@atlaskit/media-test-helpers';
import Button from '@atlaskit/button';
import Toggle from '@atlaskit/toggle';
import Spinner from '@atlaskit/spinner';
import { MediaPicker, Dropzone } from '../src';
import {
  DropzoneContainer,
  PopupHeader,
  PopupContainer,
  DropzoneContentWrapper,
  DropzoneItemsInfo,
} from '../example-helpers/styled';
import { UploadPreviews } from '../example-helpers/upload-previews';
import { ContextFactory } from '@atlaskit/media-core';

export interface DropzoneWrapperState {
  isConnectedToUsersCollection: boolean;
  isActive: boolean;
  isFetchingLastItems: boolean;
  lastItems: any[];
  inflightUploads: string[];
  dropzone?: Dropzone;
}

class DropzoneWrapper extends Component<{}, DropzoneWrapperState> {
  dropzoneContainer: HTMLDivElement;

  state: DropzoneWrapperState = {
    isConnectedToUsersCollection: true,
    isActive: true,
    isFetchingLastItems: true,
    lastItems: [],
    inflightUploads: [],
  };

  // TODO: Move into example-helpers
  fetchLastItems() {
    this.setState({ isFetchingLastItems: true });

    userAuthProvider()
      .then(({ clientId, token }) => {
        const queryParams = `client=${clientId}&token=${token}&limit=5&details=full&sortDirection=desc`;
        return fetch(
          `${userAuthProviderBaseURL}/collection/recents/items?${queryParams}`,
        );
      })
      .then(r => r.json())
      .then(data => {
        const lastItems = data.data.contents;
        this.setState({
          lastItems,
          isFetchingLastItems: false,
        });
      });
  }

  createDropzone() {
    const { isConnectedToUsersCollection } = this.state;
    const context = ContextFactory.create({
      serviceHost: userAuthProviderBaseURL,
      authProvider: defaultMediaPickerAuthProvider,
      userAuthProvider: isConnectedToUsersCollection
        ? userAuthProvider
        : undefined,
    });
    if (this.state.dropzone) {
      this.state.dropzone.deactivate();
    }
    const dropzone = MediaPicker('dropzone', context, {
      container: this.dropzoneContainer,
      uploadParams: {
        collection: '',
      },
      useNewUploadService: true,
    });

    dropzone.activate();

    this.setState({
      dropzone,
    });
  }

  saveDropzoneContainer = (element: HTMLDivElement) => {
    this.dropzoneContainer = element;

    this.createDropzone();
    this.fetchLastItems();
  };

  onConnectionChange = () => {
    const isConnectedToUsersCollection = !this.state
      .isConnectedToUsersCollection;
    this.setState({ isConnectedToUsersCollection }, () => {
      this.createDropzone();
    });
  };

  onActiveChange = () => {
    const { dropzone, isActive } = this.state;
    this.setState({ isActive: !isActive }, () => {
      if (dropzone) {
        if (isActive) {
          dropzone.activate();
        } else {
          dropzone.deactivate();
        }
      }
    });
  };

  onCancel = () => {
    this.setState({ inflightUploads: [] });
  };

  renderLastItems = () => {
    const { isFetchingLastItems, lastItems } = this.state;

    if (isFetchingLastItems) {
      return <Spinner size="large" />;
    }

    return lastItems.map((item, key) => {
      return (
        <div key={key}>
          {item.id} | {item.details.name} | {item.details.mediaType}
        </div>
      );
    });
  };

  onFetchLastItems = () => {
    this.fetchLastItems();
  };

  render() {
    const {
      isConnectedToUsersCollection,
      isActive,
      inflightUploads,
      dropzone,
    } = this.state;
    const isCancelButtonDisabled = inflightUploads.length === 0;

    return (
      <PopupContainer>
        <PopupHeader>
          <Button appearance="primary" onClick={this.onFetchLastItems}>
            Fetch last items
          </Button>
          <Button
            appearance="danger"
            onClick={this.onCancel}
            isDisabled={isCancelButtonDisabled}
          >
            Cancel uploads
          </Button>
          Connected to users collection
          <Toggle
            isDefaultChecked={isConnectedToUsersCollection}
            onChange={this.onConnectionChange}
          />
          Active
          <Toggle isDefaultChecked={isActive} onChange={this.onActiveChange} />
        </PopupHeader>
        <DropzoneContentWrapper>
          <DropzoneContainer
            isActive={isActive}
            innerRef={this.saveDropzoneContainer}
          />
          <DropzoneItemsInfo>
            {dropzone ? <UploadPreviews picker={dropzone} /> : null}
            <h1>User collection items</h1>
            {this.renderLastItems()}
          </DropzoneItemsInfo>
        </DropzoneContentWrapper>
      </PopupContainer>
    );
  }
}

export default () => <DropzoneWrapper />;
