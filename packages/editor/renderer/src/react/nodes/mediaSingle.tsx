import * as React from 'react';
import { Component, ReactElement } from 'react';
import styled from 'styled-components';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import {
  MediaSingle as UIMediaSingle,
  WidthConsumer,
  akEditorFullPageMaxWidth,
  mapBreakpointToLayoutMaxWidth,
  ImageLoaderProps,
} from '@atlaskit/editor-common';
import { FullPagePadding } from '../../ui/Renderer/style';
import { RendererAppearance } from '../../ui/Renderer';
import { MediaProps } from './media';

export interface Props {
  children: ReactElement<any>;
  layout: MediaSingleLayout;
}

export interface State {
  width?: number;
  height?: number;
}

const DEFAULT_WIDTH = 250;
const DEFAULT_HEIGHT = 200;

const ExtendedUIMediaSingle = styled(UIMediaSingle)`
  ${({ layout }) =>
    layout === 'full-width' || layout === 'wide'
      ? `
  margin-left: 50%;
  transform: translateX(-50%);
  `
      : ``} transition: all 0.1s linear;
`;

export default class MediaSingle extends Component<
  {
    layout: MediaSingleLayout;
    width?: number;
    allowDynamicTextSizing?: boolean;
    rendererAppearance: RendererAppearance;
  },
  State
> {
  constructor(props) {
    super(props);
    this.state = {}; // Need to initialize with empty state.
  }

  private onExternalImageLoaded = ({ width, height }) => {
    this.setState({
      width,
      height,
    });
  };

  render() {
    const { props } = this;

    const child = React.Children.only(
      React.Children.toArray(props.children)[0],
    );

    let { width, height, type } = child.props;

    if (type === 'external') {
      const { width: stateWidth, height: stateHeight } = this.state;
      if (width === null) {
        width = stateWidth || DEFAULT_WIDTH;
      }
      if (height === null) {
        height = stateHeight || DEFAULT_HEIGHT;
      }
    }

    if (width === null) {
      width = DEFAULT_WIDTH;
      height = DEFAULT_HEIGHT;
    }

    // TODO: put appearance-based padding into theme instead
    const padding =
      this.props.rendererAppearance === 'full-page' ? FullPagePadding * 2 : 0;

    return (
      <WidthConsumer>
        {({ width: containerWidth, breakpoint }) => {
          const cardWidth = containerWidth;
          const cardHeight = (height / width) * cardWidth;
          const cardDimensions = {
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
          };

          return (
            <ExtendedUIMediaSingle
              layout={props.layout}
              width={width}
              height={height}
              containerWidth={containerWidth}
              lineLength={
                containerWidth - padding >= akEditorFullPageMaxWidth
                  ? this.props.allowDynamicTextSizing
                    ? mapBreakpointToLayoutMaxWidth(breakpoint)
                    : akEditorFullPageMaxWidth
                  : containerWidth - padding
              }
              pctWidth={props.width}
            >
              {React.cloneElement(child, {
                resizeMode: 'stretchy-fit',
                cardDimensions,
                onExternalImageLoaded: this.onExternalImageLoaded,
                disableOverlay: true,
              } as MediaProps & ImageLoaderProps)}
            </ExtendedUIMediaSingle>
          );
        }}
      </WidthConsumer>
    );
  }
}
