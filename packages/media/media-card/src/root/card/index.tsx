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
import { Subscription } from 'rxjs';
import {
  SharedCardProps,
  CardEventProps,
  CardAnalyticsContext,
  CardStatus,
} from '../..';
import { Identifier, isPreviewableType } from '../domain';
import { CardView } from '../cardView';
import { LazyContent } from '../../utils/lazyContent';
import { getBaseAnalyticsContext } from '../../utils/analyticsUtils';
import { getDataURIDimension } from '../../utils/getDataURIDimension';
import { getDataURIFromFileState } from '../../utils/getDataURIFromFileState';
import { getLinkMetadata, extendMetadata } from '../../utils/metadata';
import { isUrlPreviewIdentifier } from '../../utils/identifier';

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
    } = this.props;
    const { context: nextContext, identifier: nextIdenfifier } = nextProps;

    if (
      currentContext !== nextContext ||
      !deepEqual(currentIdentifier, nextIdenfifier)
    ) {
      this.subscribe(nextIdenfifier, nextContext);
    }
  }

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

    this.unsubscribe();
    this.subscription = context.getFile(id, { collectionName }).subscribe({
      next: async state => {
        const {
          dataURI: currentDataURI,
          metadata: currentMetadata,
        } = this.state;
        const metadata = extendMetadata(state, currentMetadata as FileDetails);

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
                const blob = await context.getImage(state.id, {
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
      : identifier.id;
    return getBaseAnalyticsContext('Card', id);
  }

  render() {
    const {
      isLazy,
      appearance,
      resizeMode,
      dimensions,
      actions,
      selectable,
      selected,
      onClick,
      onMouseEnter,
      onSelectChange,
      disableOverlay,
      identifier,
    } = this.props;
    const { status, progress, metadata, dataURI } = this.state;
    const { analyticsContext, onRetry } = this;
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
