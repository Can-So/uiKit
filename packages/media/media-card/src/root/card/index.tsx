import * as React from 'react';
import { Component } from 'react';
import * as deepEqual from 'deep-equal';
import {
  Context,
  ImageResizeMode,
  MediaItemDetails,
  FileDetails,
} from '@atlaskit/media-core';
import { AnalyticsContext } from '@atlaskit/analytics-next';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { Subscription } from 'rxjs/Subscription';
import {
  SharedCardProps,
  CardEventProps,
  CardAnalyticsContext,
  CardStatus,
  CardAction,
  CardDimensions,
} from '../..';
import { Identifier, isPreviewableType } from '../domain';
import { CardView } from '../cardView';
import { LazyContent } from '../../utils/lazyContent';
import { getBaseAnalyticsContext } from '../../utils/analyticsUtils';
import { getDataURIDimension } from '../../utils/getDataURIDimension';
import { getDataURIFromFileState } from '../../utils/getDataURIFromFileState';
import { getLinkMetadata, extendMetadata } from '../../utils/metadata';
import {
  isFileIdentifier,
  isUrlPreviewIdentifier,
  isExternalImageIdentifier,
} from '../../utils/identifier';
import { isBigger } from '../../utils/dimensionComparer';

export interface CardProps extends SharedCardProps, CardEventProps {
  readonly context: Context;
  readonly identifier: Identifier;
  readonly isLazy?: boolean;
  readonly resizeMode?: ImageResizeMode;

  // only relevant to file card with image appearance
  readonly disableOverlay?: boolean;
}

export interface CardState {
  status: CardStatus;
  isCardVisible: boolean;
  metadata?: MediaItemDetails;
  dataURI?: string;
  progress?: number;
  readonly error?: Error;
}

export class Card extends Component<CardProps, CardState> {
  subscription?: Subscription;
  static defaultProps: Partial<CardProps> = {
    appearance: 'auto',
    resizeMode: 'crop',
    isLazy: true,
    disableOverlay: false,
  };

  state: CardState = {
    status: 'loading',
    isCardVisible: !this.props.isLazy,
  };

  componentDidMount() {
    const { identifier, context } = this.props;

    this.subscribe(identifier, context);
  }

  componentWillReceiveProps(nextProps: CardProps) {
    const {
      context: currentContext,
      identifier: currentIdentifier,
      dimensions: currentDimensions,
    } = this.props;
    const {
      context: nextContext,
      identifier: nextIdenfifier,
      dimensions: nextDimensions,
    } = nextProps;

    if (
      currentContext !== nextContext ||
      !deepEqual(currentIdentifier, nextIdenfifier) ||
      this.shouldRefetchImage(currentDimensions, nextDimensions)
    ) {
      this.subscribe(nextIdenfifier, nextContext);
    }
  }

  shouldRefetchImage = (current?: CardDimensions, next?: CardDimensions) => {
    if (!current || !next) {
      return false;
    }
    return isBigger(current, next);
  };

  componentWillUnmount() {
    this.unsubscribe();
    this.releaseDataURI();
  }

  releaseDataURI = () => {
    const { dataURI } = this.state;
    if (dataURI) {
      URL.revokeObjectURL(dataURI);
    }
  };

  private onLoadingChangeCallback = () => {
    const { onLoadingChange } = this.props;
    if (onLoadingChange) {
      const { status, error, metadata } = this.state;
      const state = {
        type: status,
        payload: error || metadata,
      };
      onLoadingChange(state);
    }
  };

  async subscribe(identifier: Identifier, context: Context) {
    const { isCardVisible } = this.state;
    if (!isCardVisible) {
      return;
    }

    if (identifier.mediaItemType === 'external-image') {
      const { dataURI, name } = identifier;

      this.setState({
        status: 'complete',
        dataURI,
        metadata: {
          id: dataURI,
          name: name || dataURI,
          mediaType: 'image',
        },
      });

      return;
    }

    if (identifier.mediaItemType !== 'file') {
      try {
        const metadata = await getLinkMetadata(identifier, context);
        this.notifyStateChange({
          status: 'complete',
          metadata,
        });
      } catch (error) {
        this.notifyStateChange({
          error,
          status: 'error',
        });
      }

      return;
    }

    const { id, collectionName } = identifier;
    const resolvedId = await id;

    this.unsubscribe();
    this.subscription = context.file
      .getFileState(resolvedId, { collectionName })
      .subscribe({
        next: async state => {
          const {
            dataURI: currentDataURI,
            metadata: currentMetadata,
          } = this.state;
          const metadata = extendMetadata(
            state,
            currentMetadata as FileDetails,
          );

          if (!currentDataURI) {
            const dataURI = await getDataURIFromFileState(state);
            this.notifyStateChange({ dataURI });
          }

          switch (state.status) {
            case 'uploading':
              const { progress } = state;
              this.notifyStateChange({
                status: 'uploading',
                progress,
                metadata,
              });
              break;
            case 'processing':
              this.notifyStateChange({
                progress: 1,
                status: 'complete',
                metadata,
              });
              break;
            case 'processed':
              if (metadata.mediaType && isPreviewableType(metadata.mediaType)) {
                const { appearance, dimensions, resizeMode } = this.props;
                const options = {
                  appearance,
                  dimensions,
                  component: this,
                };
                const width = getDataURIDimension('width', options);
                const height = getDataURIDimension('height', options);
                try {
                  const allowAnimated = appearance !== 'small';
                  const blob = await context.getImage(resolvedId, {
                    collection: collectionName,
                    mode: resizeMode,
                    height,
                    width,
                    allowAnimated,
                  });
                  const dataURI = URL.createObjectURL(blob);
                  this.releaseDataURI();
                  this.setState({ dataURI });
                } catch (e) {
                  // We don't want to set status=error if the preview fails, we still want to display the metadata
                }
              }
              this.notifyStateChange({ status: 'complete', metadata });
              break;
            case 'failed-processing':
              this.notifyStateChange({ status: 'failed-processing', metadata });
              break;
            case 'error':
              this.notifyStateChange({ status: 'error' });
          }
        },
        error: error => {
          this.notifyStateChange({ error, status: 'error' });
        },
      });
  }

  notifyStateChange = (state: Partial<CardState>) => {
    this.setState(state as any, this.onLoadingChangeCallback);
  };

  unsubscribe = () => {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  };

  // This method is called when card fails and user press 'Retry'
  private onRetry = () => {
    const { identifier, context } = this.props;

    this.subscribe(identifier, context);
  };

  get analyticsContext(): CardAnalyticsContext {
    const { identifier } = this.props;
    const id = isUrlPreviewIdentifier(identifier)
      ? identifier.url
      : isExternalImageIdentifier(identifier)
        ? 'external-image'
        : identifier.id;

    return getBaseAnalyticsContext('Card', id);
  }

  // we don't want to show complete status for empty files, ideally there should no such file on the media api,
  // but there are some edge cases when using id upfront that can result on that.
  get status(): CardStatus {
    const { status, metadata } = this.state;
    const { identifier } = this.props;

    if (status === 'complete' && isFileIdentifier(identifier) && metadata) {
      if (!(metadata as FileDetails).size) {
        return 'processing';
      }
    }

    return status;
  }

  get actions(): CardAction[] {
    const { actions = [], identifier } = this.props;
    const { status, metadata } = this.state;
    if (isFileIdentifier(identifier) && status === 'failed-processing') {
      actions.unshift({
        label: 'Download',
        icon: <DownloadIcon label="Download" />,
        handler: async () =>
          this.props.context.file.downloadBinary(
            await identifier.id,
            (metadata as FileDetails).name,
            identifier.collectionName,
          ),
      });
    }

    return actions;
  }

  render() {
    const {
      isLazy,
      appearance,
      resizeMode,
      dimensions,
      selectable,
      selected,
      onClick,
      onMouseEnter,
      onSelectChange,
      disableOverlay,
      identifier,
    } = this.props;
    const { progress, metadata, dataURI } = this.state;
    const { analyticsContext, onRetry, status, actions } = this;
    const card = (
      <AnalyticsContext data={analyticsContext}>
        <CardView
          status={status}
          metadata={metadata}
          dataURI={dataURI}
          mediaItemType={identifier.mediaItemType}
          appearance={appearance}
          resizeMode={resizeMode}
          dimensions={dimensions}
          actions={actions}
          selectable={selectable}
          selected={selected}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onSelectChange={onSelectChange}
          disableOverlay={disableOverlay}
          progress={progress}
          onRetry={onRetry}
        />
      </AnalyticsContext>
    );

    return isLazy ? (
      <LazyContent placeholder={card} onRender={this.onCardInViewport}>
        {card}
      </LazyContent>
    ) : (
      card
    );
  }

  onCardInViewport = () => {
    this.setState({ isCardVisible: true }, () => {
      const { identifier, context } = this.props;
      this.subscribe(identifier, context);
    });
  };
}
