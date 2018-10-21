import * as React from 'react';
import { ImageWrapper } from './styled';
import { isImageRemote } from '@atlaskit/media-ui';

export interface ImageProps {
  src?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onLoad: (
    imageElement: HTMLImageElement,
    width: number,
    height: number,
  ) => void;
  onError: (errorMessage: string) => void;
}

export class Image extends React.Component<ImageProps, {}> {
  constructor(props: ImageProps) {
    super(props);
    if (props.src !== undefined) {
      try {
        isImageRemote(props.src);
      } catch (e) {
        if (props.onError) {
          props.onError('Bad Url');
        }
      }
    }
  }

  onLoad = (e: any) => {
    const image = e.target as HTMLImageElement;
    const { naturalWidth: width, naturalHeight: height } = image;
    this.props.onLoad(image, width, height);
  };

  onError = () => {
    this.props.onError('Image load error');
  };

  render() {
    const { src, x, y, width, height } = this.props;

    if (src) {
      const crossOrigin = isImageRemote(src) ? 'anonymous' : undefined;
      return (
        <ImageWrapper
          src={src}
          x={x}
          y={y}
          crossOrigin={crossOrigin}
          width={width}
          height={height}
          onLoad={this.onLoad}
          onError={this.onError}
          draggable={false}
        />
      );
    }

    return null;
  }
}
