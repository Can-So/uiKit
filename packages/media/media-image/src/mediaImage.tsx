import { Component, ReactNode } from 'react';
import {
  Context,
  FileState,
  FileIdentifier,
  isDifferentIdentifier,
} from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import { MediaStoreGetFileImageParams } from '@atlaskit/media-store';

export interface MediaImageChildrenProps {
  loading: boolean;
  error: boolean;
  data: MediaImageState | undefined;
}
export interface MediaImageProps {
  identifier: FileIdentifier;
  context: Context;
  apiConfig?: MediaStoreGetFileImageParams;
  children: (props: MediaImageChildrenProps) => ReactNode;
}

export interface MediaImageState {
  status: 'loading' | 'error' | 'processed' | 'succeeded';
  src?: string;
}

export class MediaImage extends Component<MediaImageProps, MediaImageState> {
  subscription?: Subscription;
  state: MediaImageState = {
    status: 'loading',
  };

  static defaultProps = {
    apiConfig: {},
  };

  componentDidMount() {
    this.subscribe(this.props);
  }

  componentWillReceiveProps({
    apiConfig: newApiConfig = {},
    identifier: newIdentifier,
    ...otherNewProps
  }: MediaImageProps) {
    const { apiConfig = {}, identifier } = this.props;
    const isWidthBigger =
      newApiConfig.width &&
      apiConfig.width &&
      newApiConfig.width > apiConfig.width;
    const isHeightBigger =
      newApiConfig.height &&
      apiConfig.height &&
      newApiConfig.height > apiConfig.height;

    const isNewDimensionsBigger = isWidthBigger || isHeightBigger;

    if (
      (!!newIdentifier && isDifferentIdentifier(newIdentifier, identifier)) ||
      isNewDimensionsBigger
    ) {
      this.subscribe({
        identifier: newIdentifier,
        apiConfig: newApiConfig,
        ...otherNewProps,
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.releaseSrc();
  }

  private releaseSrc = () => {
    const { src } = this.state;
    if (src) {
      URL.revokeObjectURL(src);
    }
  };

  private async subscribe(props: MediaImageProps) {
    const {
      context,
      identifier: { id, collectionName },
      apiConfig,
    } = props;
    this.unsubscribe();
    this.setState({ status: 'loading' });

    const fileId = await id;

    this.subscription = context.file
      .getFileState(fileId, { collectionName })
      .subscribe({
        next: async (fileState: FileState) => {
          if (fileState.status === 'error' || fileState.mediaType !== 'image') {
            this.setState({ status: 'error' });
            return;
          }

          const { preview } = fileState;

          if (preview) {
            const value = (await preview).value;

            // NOTE: Preview is referring to the local image
            // after page reload it will get the image src
            // based on the API
            // PS: it will the case for third-party, such as Giphy
            if (typeof value !== 'string') {
              this.setSourceFromBlob(value);
              return;
            }
          }

          if (fileState.status === 'processed') {
            const blob = await context.getImage(fileId, {
              collection: collectionName,
              ...apiConfig,
            });
            this.setSourceFromBlob(blob);
          }
        },
        error: () => this.setState({ status: 'error' }),
      });
  }

  private setSourceFromBlob(blob: Blob) {
    const src = URL.createObjectURL(blob);
    this.releaseSrc();

    this.setState({
      status: 'succeeded',
      src,
    });
    this.unsubscribe();
  }

  unsubscribe = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

  render() {
    return this.props.children({
      loading: this.state.status === 'loading',
      error: this.state.status === 'error',
      data: this.state.status === 'succeeded' ? this.state : undefined,
    });
  }
}

export default MediaImage;
