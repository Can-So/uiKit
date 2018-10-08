import * as React from 'react';
import { Component } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import {
  Card,
  CardProps,
  CardDimensions,
  CardEventHandler,
  CardAction,
  CardOnClickCallback,
  Identifier,
} from '@atlaskit/media-card';
import { Context, ImageResizeMode } from '@atlaskit/media-core';
import {
  MediaType,
  MediaBaseAttributes,
  withImageLoader,
  ImageStatus,
} from '@atlaskit/editor-common';

import { MediaProvider } from '../../pm-plugins/main';

export type Appearance = 'small' | 'image' | 'horizontal' | 'square';

// This is being used by DropPlaceholder now
export const MEDIA_HEIGHT = 125;
export const FILE_WIDTH = 156;

export interface Props extends Partial<MediaBaseAttributes> {
  type: MediaType;
  mediaProvider?: Promise<MediaProvider>;
  cardDimensions?: CardDimensions;
  onClick?: CardOnClickCallback;
  onDelete?: CardEventHandler;
  resizeMode?: ImageResizeMode;
  appearance?: Appearance;
  selected?: boolean;
  url?: string;
  imageStatus?: ImageStatus;
  disableOverlay?: boolean;
}

export interface State {
  mediaProvider?: Promise<MediaProvider>;
  context?: Context;
}

type Writeable<T> = { -readonly [P in keyof T]-?: T[P] };

export class MediaComponentInternal extends Component<Props, State> {
  static defaultProps: Partial<Props> = {
    selected: false,
    resizeMode: 'full-fit',
  };

  state: State = {};

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { mediaProvider } = nextProps;
    if (mediaProvider && prevState.mediaProvider !== mediaProvider) {
      return {
        mediaProvider,
        context: null,
      };
    }

    return null;
  }

  componentDidMount() {
    this.updateContext();
  }

  componentDidUpdate() {
    if (this.state.context === null) {
      this.updateContext();
    }
  }

  render() {
    const {
      cardDimensions,
      collection,
      id,
      onDelete,
      onClick,
      selected,
      disableOverlay,
      url,
      type,
      resizeMode,
    } = this.props;
    const { context } = this.state;

    if (id && context) {
      const otherProps: Partial<Writeable<CardProps>> = {};

      if (onDelete) {
        otherProps.actions = [createDeleteAction(onDelete)];
      }

      if (onClick) {
        otherProps.onClick = onClick;
      }

      const identifier: Identifier =
        type === 'external'
          ? {
              dataURI: url!,
              name: url,
              mediaItemType: 'external',
            }
          : type === 'file'
            ? {
                id,
                mediaItemType: 'file',
                collectionName: collection,
              }
            : {
                id,
                mediaItemType: 'link',
                collectionName: collection!,
              };

      return (
        <Card
          context={context}
          dimensions={cardDimensions}
          identifier={identifier}
          selectable={true}
          selected={selected}
          resizeMode={resizeMode}
          disableOverlay={disableOverlay}
          {...otherProps}
        />
      );
    }
    return null;
  }

  private updateContext = async () => {
    const mediaProvider = await this.state.mediaProvider;
    if (mediaProvider) {
      this.setState({ context: await mediaProvider.viewContext });
    }
  };
}

export const createDeleteAction = (
  eventHander: CardEventHandler,
): CardAction => ({
  label: 'Delete',
  handler: eventHander,
  icon: <CrossIcon size="small" label="delete" />,
});

export default withImageLoader<Props>(MediaComponentInternal);
