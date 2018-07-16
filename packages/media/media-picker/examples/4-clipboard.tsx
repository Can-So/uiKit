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
import { MediaPicker, Clipboard } from '../src';
import {
  PopupHeader,
  PopupContainer,
  DropzoneContentWrapper,
  DropzoneItemsInfo,
  ClipboardContainer,
} from '../example-helpers/styled';
import { ContextFactory } from '@atlaskit/media-core';

export interface ClipboardWrapperState {
  isConnectedToUsersCollection: boolean;
  isActive: boolean;
  isFetchingLastItems: boolean;
  lastItems: any[];
  isWindowFocused: boolean;
}

class ClipboardWrapper extends Component<{}, ClipboardWrapperState> {
  clipboard: Clipboard;
  dropzoneContainer: HTMLDivElement;

  state: ClipboardWrapperState = {
    isConnectedToUsersCollection: true,
    isActive: true,
    isFetchingLastItems: true,
    lastItems: [],
    isWindowFocused: true,
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

  onFocus = () => {
    this.setState({ isWindowFocused: true });
  };

  onBlur = () => {
    this.setState({ isWindowFocused: false });
  };

  componentDidMount() {
    window.addEventListener('focus', this.onFocus);
    window.addEventListener('blur', this.onBlur);

    this.createClipboard();
    this.fetchLastItems();
  }

  componentWillUnmount() {
    window.removeEventListener('focus', this.onFocus);
    window.removeEventListener('blur', this.onBlur);
  }

  createClipboard() {
    const { isConnectedToUsersCollection, isActive } = this.state;
    const context = ContextFactory.create({
      serviceHost: userAuthProviderBaseURL,
      authProvider: defaultMediaPickerAuthProvider,
      userAuthProvider: isConnectedToUsersCollection
        ? userAuthProvider
        : undefined,
    });
    const clipboard = MediaPicker('clipboard', context);

    this.clipboard = clipboard;

    clipboard.on('upload-end', data => {
      console.log('upload finished');
      console.log(data);
    });

    clipboard.on('upload-error', mpError => {
      console.log('Error', mpError);
    });

    isActive ? clipboard.activate() : clipboard.deactivate();
  }

  onConnectionChange = () => {
    const isConnectedToUsersCollection = !this.state
      .isConnectedToUsersCollection;
    this.setState({ isConnectedToUsersCollection }, () => {
      this.createClipboard();
    });
  };

  onActiveChange = () => {
    const { clipboard } = this;

    this.setState({ isActive: !this.state.isActive }, () => {
      const { isActive } = this.state;
      isActive ? clipboard.activate() : clipboard.deactivate();
    });
  };

  renderLastItems = () => {
    const { isFetchingLastItems, lastItems } = this.state;

    if (isFetchingLastItems) {
      return <Spinner size="large" />;
    }

    return lastItems.map((item, key) => {
      const { id, details } = item;

      // details are not always present in the response
      const name = details ? details.name : '<no-details>';
      const mediaType = details ? details.mediaType : '<no-details>';

      return (
        <div key={key}>
          {id} | {name} | {mediaType}
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
      isWindowFocused,
    } = this.state;

    return (
      <PopupContainer>
        <PopupHeader>
          <Button appearance="primary" onClick={this.onFetchLastItems}>
            Fetch last items
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
          <ClipboardContainer isWindowFocused={isWindowFocused}>
            <h2>Clipboard example</h2>
            <p>
              Use CMD+C to copy a file, followed by CMD+V to paste the image
              when this window is focused
            </p>
          </ClipboardContainer>
          <DropzoneItemsInfo>
            <h1>User collection items</h1>
            {this.renderLastItems()}
          </DropzoneItemsInfo>
        </DropzoneContentWrapper>
      </PopupContainer>
    );
  }
}

export default () => <ClipboardWrapper />;
