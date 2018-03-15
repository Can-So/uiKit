import * as React from 'react';
import { Component } from 'react';
import * as deepEqual from 'deep-equal';
import {
  Context,
  MediaItemType,
  MediaItemProvider,
  UrlPreviewProvider,
  DataUriService,
  ImageResizeMode,
} from '@atlaskit/media-core';

import { SharedCardProps, CardEventProps } from '../..';
import { MediaCard } from '../mediaCard';
import { CardView } from '../cardView';
import { LazyContent } from '../../utils/lazyContent';

export type Identifier = UrlPreviewIdentifier | LinkIdentifier | FileIdentifier;
export type Provider = MediaItemProvider | UrlPreviewProvider;

export interface FileIdentifier {
  readonly mediaItemType: 'file';
  readonly id: string;
  readonly occurrenceKey?: string;
  readonly collectionName?: string; // files can exist outside of a collection
}

export interface LinkIdentifier {
  readonly mediaItemType: 'link';
  readonly id: string;
  readonly occurrenceKey?: string;
  readonly collectionName: string; // links always exist within a collection
}

export interface UrlPreviewIdentifier {
  readonly mediaItemType: 'link';
  readonly url: string;
}

export interface CardProps extends SharedCardProps, CardEventProps {
  readonly context: Context;
  readonly identifier: Identifier;
  isLazy?: boolean;
  resizeMode?: ImageResizeMode;
}

export class Card extends Component<CardProps, {}> {
  static defaultProps = {
    appearance: 'auto',
    isLazy: true,
    resizeMode: 'crop',
  };

  private provider: Provider;
  private dataURIService?: DataUriService;

  constructor(props) {
    super(props);
    const { context, identifier } = props;

    this.updateProvider(context, identifier);
    this.updateDataUriService(context, identifier);
  }

  componentWillReceiveProps(nextProps) {
    const {
      context: currentContext,
      identifier: currentIdentifier,
    } = this.props;
    const { context: nextContext, identifier: nextIdenfifier } = nextProps;

    if (
      currentContext !== nextContext ||
      !deepEqual(currentIdentifier, nextIdenfifier)
    ) {
      this.updateProvider(nextContext, nextIdenfifier);
      this.updateDataUriService(nextContext, nextIdenfifier);
    }
  }

  private isUrlPreviewIdentifier(
    identifier: Identifier,
  ): identifier is UrlPreviewIdentifier {
    const preview = identifier as UrlPreviewIdentifier;
    return preview && preview.url !== undefined;
  }

  private updateProvider(context: Context, identifier: Identifier): void {
    if (this.isUrlPreviewIdentifier(identifier)) {
      this.provider = context.getUrlPreviewProvider(identifier.url);
    } else {
      const { id, mediaItemType, collectionName } = identifier;
      this.provider = context.getMediaItemProvider(
        id,
        mediaItemType,
        collectionName,
      );
    }
  }

  private updateDataUriService(context: Context, identifier: Identifier): void {
    if (!this.isUrlPreviewIdentifier(identifier)) {
      this.dataURIService = context.getDataUriService(
        identifier.collectionName,
      );
    } else {
      this.dataURIService = undefined;
    }
  }

  get placeholder(): JSX.Element {
    const { appearance, dimensions } = this.props;

    return (
      <CardView
        status="loading"
        appearance={appearance}
        dimensions={dimensions}
        mediaItemType={this.mediaItemType}
      />
    );
  }

  render() {
    const {
      context,
      isLazy,
      appearance,
      resizeMode,
      identifier,
      ...otherProps
    } = this.props;
    const card = (
      <MediaCard
        {...otherProps}
        resizeMode={resizeMode}
        appearance={appearance}
        mediaItemType={this.mediaItemType}
        provider={this.provider}
        dataURIService={this.dataURIService}
      />
    );

    return isLazy ? (
      <LazyContent placeholder={this.placeholder}>{card}</LazyContent>
    ) : (
      card
    );
  }

  private get mediaItemType(): MediaItemType {
    const { mediaItemType } = this.props.identifier;

    return mediaItemType;
  }
}
