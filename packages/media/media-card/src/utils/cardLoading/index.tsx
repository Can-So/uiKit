import * as React from 'react';
import { Component } from 'react';
import { MediaItemType } from '@atlaskit/media-core';
import FileIcon from '@atlaskit/icon/glyph/file';
import LinkIcon from '@atlaskit/icon/glyph/link';
import { Wrapper } from './styled';
import { CardDimensions } from '../..';

export interface LoadingCardProps {
  mediaItemType?: MediaItemType;
  iconSize?: 'small' | 'medium' | 'large';
  dimensions?: CardDimensions;
}

export const getDimensionsWithDefault = (
  dimensions: CardDimensions = { width: '100%', height: '100%' },
): CardDimensions => {
  return {
    height:
      typeof dimensions.height === 'number'
        ? `${dimensions.height}px`
        : dimensions.height,
    width:
      typeof dimensions.width === 'number'
        ? `${dimensions.width}px`
        : dimensions.width,
  };
};

export class CardLoading extends Component<LoadingCardProps, {}> {
  render() {
    const dimensions = getDimensionsWithDefault(this.props.dimensions);

    return <Wrapper dimensions={dimensions}>{this.icon}</Wrapper>;
  }

  get iconSize() {
    return this.props.iconSize || 'medium';
  }

  get icon() {
    const { iconSize } = this;
    const { mediaItemType } = this.props;

    return mediaItemType === 'link' ? (
      <LinkIcon label="loading" size={iconSize} />
    ) : (
      <FileIcon label="loading" size={iconSize} />
    );
  }
}
