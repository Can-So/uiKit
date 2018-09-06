/**
 * Only used internally ATM
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component, CSSProperties } from 'react';

import { ImageViewWrapper, transparentFallbackBackground } from './styled';

export interface MediaImageProps {
  dataURI: string;
  fadeIn?: boolean;
  crop?: boolean;
  transparentFallback?: boolean;
  width?: string;
  height?: string;
  className?: string;
  onError?: (this: HTMLElement, ev: ErrorEvent) => any;
}

export interface MediaImageState {
  imgWidth: number;
  imgHeight: number;
  parentWidth: number;
  parentHeight: number;
}

export class MediaImage extends Component<MediaImageProps, MediaImageState> {
  static defaultProps = {
    fadeIn: true,
    crop: true,
    transparentFallback: false,
    width: '100%',
    height: '100%',
    className: '',
  };

  constructor(props: MediaImageProps) {
    super(props);

    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      parentWidth: Infinity,
      parentHeight: Infinity,
    };
  }

  private img: any;

  // TODO FIL-4060 we need to check whether the dataURI changes in componentWillReceiveProps()
  // and if it does recalculate the image height and width

  componentWillMount() {
    this.img = new Image();

    this.img.src = this.props.dataURI;
    this.img.onload = this.onImageLoad(this);
    if (this.props.onError) {
      this.img.onerror = this.props.onError;
    }
  }

  componentDidMount() {
    const parent = ReactDOM.findDOMNode(this).parentElement;
    if (!parent) {
      return;
    }
    const { width, height } = parent.getBoundingClientRect();

    this.setState({
      parentWidth: width,
      parentHeight: height,
    });
  }

  componentWillUnmount() {
    this.img.onload = null;
  }

  onImageLoad(component: any) {
    return function(this: any) {
      component.setState({
        imgWidth: this.width,
        imgHeight: this.height,
      });
    };
  }

  render() {
    const {
      transparentFallback,
      crop,
      dataURI,
      fadeIn,
      className,
    } = this.props;
    const { implicitNoCrop, backgroundSize } = this;
    const transparentBg = transparentFallback
      ? `, ${transparentFallbackBackground}`
      : '';
    const style: CSSProperties = {
      backgroundSize,
      backgroundImage: `url(${dataURI})${transparentBg}`,
    };
    const isCropped = crop && !implicitNoCrop;
    const classNames = `media-card ${className}`;

    return (
      <ImageViewWrapper
        fadeIn={fadeIn}
        isCropped={isCropped}
        className={classNames}
        style={style}
      />
    );
  }

  private get isSmallerThanWrapper() {
    const { imgWidth, parentWidth, imgHeight, parentHeight } = this.state;

    return imgWidth < parentWidth && imgHeight < parentHeight;
  }

  // If users specifies a custom dimensions, we take that as a no-crop and prioritize it over the 'crop' property
  private get implicitNoCrop() {
    return this.props.width !== '100%' || this.props.height !== '100%';
  }

  private get backgroundSize() {
    const { width, height } = this.props;
    const { imgWidth, imgHeight } = this.state;

    return this.implicitNoCrop
      ? `${width} ${height}, auto`
      : this.isSmallerThanWrapper
        ? `${imgWidth}px ${imgHeight}px, auto`
        : undefined;
  }
}
