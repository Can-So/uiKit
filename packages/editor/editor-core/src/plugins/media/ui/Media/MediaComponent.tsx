import * as React from 'react';
import { Component } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import {
  Card,
  CardView,
  CardStatus,
  CardDimensions,
  CardEventHandler,
  Identifier,
  CardAction,
} from '@atlaskit/media-card';
import {
  MediaItemType,
  Context,
  FileDetails,
  ImageResizeMode,
} from '@atlaskit/media-core';
import {
  MediaAttributes,
  CardEventClickHandler,
} from '@atlaskit/editor-common';

import { isImage } from '../../../../utils';
import {
  MediaProvider,
  MediaStateManager,
  MediaState,
} from '../../pm-plugins/main';

export type Appearance = 'small' | 'image' | 'horizontal' | 'square';

// This is being used by DropPlaceholder now
export const MEDIA_HEIGHT = 125;
export const FILE_WIDTH = 156;

export interface Props extends MediaAttributes {
  mediaProvider?: Promise<MediaProvider>;
  cardDimensions?: CardDimensions;
  onClick?: CardEventClickHandler;
  onDelete?: CardEventHandler;
  resizeMode?: ImageResizeMode;
  appearance?: Appearance;
  stateManagerFallback?: MediaStateManager;
  selected?: boolean;
  tempId?: string;
}

export interface State extends MediaState {
  mediaProvider?: MediaProvider;
  viewContext?: Context;
  linkCreateContext?: Context;
}

/**
 * Map media state status into CardView processing status
 * Media state status is more broad than CardView API so we need to reduce it
 */
function mapMediaStatusIntoCardStatus(
  state: MediaState,
  progress?: number,
): CardStatus {
  switch (state.status) {
    case 'preview':
      return progress === 1 ? 'complete' : 'uploading';
    case 'ready':
    case 'unknown':
    case 'unfinalized':
    case 'processing':
    // Happens after swap, @see `handleMediaStateChange` method below for more context
    case 'cancelled':
      return 'complete';

    case 'uploading':
      return 'uploading';

    // default case is to let TypeScript know that this function always returns a string
    case 'error':
    default:
      return 'error';
  }
}

export default class MediaComponent extends Component<Props, State> {
  private destroyed = false;

  static defaultProps = {
    selected: false,
  };

  state: State = {
    id: '',
    status: 'unknown',
  };

  componentWillMount() {
    const { mediaProvider } = this.props;

    if (mediaProvider) {
      mediaProvider.then(this.handleMediaProvider);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { mediaProvider } = nextProps;

    if (this.props.mediaProvider !== mediaProvider) {
      if (mediaProvider) {
        mediaProvider.then(this.handleMediaProvider);
      } else {
        this.setState({ mediaProvider });
      }
    }
  }

  componentWillUnmount() {
    this.destroyed = true;

    const { id } = this.props;
    const { mediaProvider } = this.state;

    if (mediaProvider) {
      const { stateManager } = mediaProvider;
      if (stateManager) {
        stateManager.off(id, this.handleMediaStateChange);
      }
    }

    const { stateManagerFallback } = this.props;
    if (stateManagerFallback) {
      stateManagerFallback.off(id, this.handleMediaStateChange);
    }
  }

  render() {
    switch (this.props.type) {
      case 'file':
        return this.renderFile();

      case 'link':
        return this.renderLink();

      default:
        return null;
    }
  }

  private renderLoadingCard(mediaItemType: MediaItemType, url?: string) {
    const { cardDimensions } = this.props;

    return (
      <CardView
        status="loading"
        mediaItemType={mediaItemType}
        dimensions={cardDimensions}
      />
    );
  }

  private renderLink() {
    const { mediaProvider, linkCreateContext } = this.state;
    const {
      id,
      collection,
      cardDimensions,
      onDelete,
      appearance,
      ...otherProps
    } = this.props;
    const hasProviders = mediaProvider && linkCreateContext;

    if (!hasProviders) {
      return this.renderLoadingCard('link');
    }

    const identifier: Identifier = {
      mediaItemType: 'link',
      collectionName: collection,
      id,
    };

    if (id.substr(0, 10) === 'temporary:') {
      const url = id.substr(id.indexOf(':', 11) + 1);
      return this.renderLoadingCard('link', url);
    }

    if (onDelete) {
      (otherProps as any).actions = [createDeleteAction(onDelete)];
    }

    return (
      <Card
        context={linkCreateContext}
        dimensions={cardDimensions}
        identifier={identifier}
        appearance={appearance || 'horizontal'}
        resizeMode={this.resizeMode}
        {...otherProps as any}
      />
    );
  }

  private renderFile() {
    const { mediaProvider, viewContext, thumbnail } = this.state;
    const { id } = this.props;

    if (!mediaProvider || !viewContext) {
      return this.renderLoadingCard('file');
    }

    if (id.substr(0, 10) === 'temporary:' || (thumbnail && thumbnail.src)) {
      return this.renderTemporaryFile();
    } else {
      return this.renderPublicFile();
    }
  }

  private renderPublicFile() {
    const { viewContext } = this.state;
    const {
      cardDimensions,
      collection,
      id,
      onDelete,
      onClick,
      selected,
    } = this.props;
    const otherProps: any = {};

    if (onDelete) {
      otherProps.actions = [createDeleteAction(onDelete)];
    }

    if (onClick) {
      otherProps.onClick = onClick;
    }

    return (
      <Card
        context={viewContext!}
        dimensions={cardDimensions}
        identifier={{
          id,
          mediaItemType: 'file',
          collectionName: collection,
        }}
        selectable={true}
        selected={selected}
        resizeMode={this.resizeMode}
        {...otherProps}
      />
    );
  }

  private renderTemporaryFile() {
    const { thumbnail, fileName, fileSize, fileMimeType, status } = this.state;
    const {
      onDelete,
      cardDimensions,
      appearance,
      selected,
      resizeMode,
    } = this.props;

    // Cache the data url for thumbnail, so it's not regenerated on each re-render (prevents flicker)
    let dataURI: string | undefined;
    if (thumbnail) {
      dataURI = thumbnail.src;
    }

    // Make sure that we always display progress bar when the file is uploading (prevents flicker)
    let { progress } = this.state;
    if (!progress && status === 'uploading') {
      progress = 0.0;
    }

    const isImageFile = isImage(fileMimeType);

    // Construct file details object
    const fileDetails = {
      name: fileName,
      size: fileSize,
      mimeType: fileMimeType,
      mediaType: thumbnail || isImageFile ? 'image' : 'unknown',
    } as FileDetails;

    const otherProps: any = {};
    if (onDelete) {
      otherProps.actions = [createDeleteAction(onDelete)];
    }

    return (
      <CardView
        // CardViewProps
        status={mapMediaStatusIntoCardStatus(this.state, progress)}
        mediaItemType="file"
        metadata={fileDetails}
        // FileCardProps
        dataURI={dataURI}
        progress={progress}
        // SharedCardProps
        dimensions={cardDimensions}
        appearance={appearance}
        selectable={true}
        selected={selected}
        resizeMode={resizeMode}
        {...otherProps}
      />
    );
  }

  private handleMediaStateChange = (mediaState: MediaState) => {
    /**
     * `cancelled` gets triggered when we do the node swap, so we can ignore it here.
     * Because on real `canceled` event it will get removed anyways.
     */
    if (this.destroyed || mediaState.status === 'cancelled') {
      return;
    }

    this.setState({ ...mediaState });
  };

  private handleMediaProvider = async (mediaProvider: MediaProvider) => {
    const { id, tempId } = this.props;

    if (this.destroyed) {
      return;
    }

    /**
     * Try to get stateManager from MediaProvider first, if not, get the fallback from props
     */
    const stateManager =
      mediaProvider.stateManager || this.props.stateManagerFallback;

    this.setState({ mediaProvider });

    if (stateManager) {
      const mediaState = stateManager.getState(tempId || id);

      stateManager.on(id, this.handleMediaStateChange);
      this.setState({ id, ...mediaState });
    }

    await this.setContext('viewContext', mediaProvider);
    await this.setContext('linkCreateContext', mediaProvider);
  };

  private setContext = async (
    contextName: string,
    mediaProvider: MediaProvider,
  ) => {
    const context = await mediaProvider[contextName];

    if (this.destroyed || !context) {
      return;
    }

    this.setState({ [contextName as any]: context });
  };

  private get resizeMode(): ImageResizeMode {
    const { resizeMode } = this.props;

    return resizeMode || 'full-fit';
  }
}

export const createDeleteAction = (
  eventHander: CardEventHandler,
): CardAction => {
  return {
    label: 'Delete',
    handler: eventHander,
    icon: <CrossIcon size="small" label="delete" />,
  };
};
