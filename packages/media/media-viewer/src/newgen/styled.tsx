// StyledComponentClass and React types are imported to prevent a typescript error caused by inferred types sourced
// from external modules - https://github.com/styled-components/styled-components/issues/1063#issuecomment-320344957
// @ts-ignore: unused variable
// prettier-ignore
import styled, { StyledComponentClass } from 'styled-components';
import { MediaType } from '@atlaskit/media-core';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, VideoHTMLAttributes, AudioHTMLAttributes, ImgHTMLAttributes, ComponentClass, ClassAttributes } from 'react';
import {
  akColorY200,
  akColorP200,
  akColorB300,
  akBorderRadius,
} from '@atlaskit/util-shared-styles';
import { colors, layers } from '@atlaskit/theme';
import { ellipsis } from '@atlaskit/media-ui';

const overlayZindex = layers.modal() + 10;

export const mediaTypeIconColors = {
  image: akColorY200,
  audio: akColorP200,
  video: '#ff7143',
  doc: akColorB300,
  unknown: '#3dc7dc',
};

export const blanketColor = colors.DN30;

export const hideControlsClassName = 'mvng-hide-controls';

export const Blanket = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${blanketColor};
  z-index: ${overlayZindex};
`;

export const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98px;
  opacity: 0.85;
  background-image: linear-gradient(to bottom, #0e1624, rgba(14, 22, 36, 0));
  color: #b8c7e0;
  font-weight: 500;
  padding-top: 15px;
  padding: 24px;
  box-sizing: border-box;
  pointer-events: none;
  z-index: ${overlayZindex + 1};
`;

HeaderWrapper.displayName = 'HeaderWrapper';

export interface ContentWrapperProps {
  showControls: boolean;
}

export const ListWrapper = styled.div``;

ListWrapper.displayName = 'ListWrapper';

export const ArrowsWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 20px;
  z-index: ${overlayZindex + 2};
`;

export const ZoomWrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 98px;
  background-image: linear-gradient(to top, #0e1624, rgba(14, 22, 36, 0));
  opacity: 0.85;
  pointer-events: none;
`;

export const ZoomControlsWrapper = styled.div`
  width: 100%;
  position: absolute;
  text-align: center;
  bottom: 10px;
  button {
    margin-right: 10px;
  }
  > * {
    pointer-events: all;
  }
`;

export const ZoomLevelIndicator = styled.span`
  position: absolute;
  right: 24px;
  bottom: 22px;
  color: #b8c7e0;
  pointer-events: all;
`;

const handleControlsVisibility = ({ showControls }: ContentWrapperProps) => `
  transition: opacity .3s;
  opacity: ${showControls ? '1' : '0'};
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: auto;
  align-items: center;
  justify-content: center;

  .${hideControlsClassName} {
    ${handleControlsVisibility};
  }
`;

ContentWrapper.displayName = 'Content';

export const ErrorMessageWrapper = styled.div`
  text-align: center;
  color: #b8c7e0;
  p {
    line-height: 100%;
  }
`;

export const ErrorImage = styled.img`
  margin-bottom: 10px;
  user-select: none;
`;

export const Video: ComponentClass<VideoHTMLAttributes<{}>> = styled.video`
  width: 100vw;
  height: 100vh;
`;

export const PDFWrapper = styled.div`
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Arrow = styled.span`
  cursor: pointer;

  > span {
    color: rgba(27, 38, 56, 0.5);
    fill: #9fb0cc;
    filter: drop-shadow(1px 1px 1px rgba(27, 38, 56, 0.2));

    &:hover {
      color: #fff;
    }
  }
`;

const ArrowWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 20px;
`;

export const LeftWrapper = styled(ArrowWrapper)`
  text-align: left;
  left: 0;
`;

export const RightWrapper = styled(ArrowWrapper)`
  text-align: right;
  right: 0;
`;

// header.tsx
export const Header = styled.div`
  display: flex;
`;

export const LeftHeader = styled.div`
  flex: 1;
  overflow: hidden;
  > * {
    pointer-events: all;
  }
`;

export const ImageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
`;

export const BaselineExtend = styled.div`
  height: 100%;
  display: inline-block;
  vertical-align: middle;
`;

export type ImgProps = {
  canDrag: boolean;
  isDragging: boolean;
};

export const Img: ComponentClass<ImgHTMLAttributes<{}> & ImgProps> = styled.img`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  cursor: ${({ canDrag, isDragging }: ImgProps) => {
    if (canDrag && isDragging) {
      return 'grabbing';
    } else if (canDrag) {
      return 'grab';
    } else {
      return 'auto';
    }
  }};
  /* Prevent images from being smoothed when scaled up */
  image-rendering: optimizeSpeed; /* Legal fallback */
  image-rendering: -moz-crisp-edges; /* Firefox        */
  image-rendering: -o-crisp-edges; /* Opera          */
  image-rendering: -webkit-optimize-contrast; /* Safari         */
  image-rendering: optimize-contrast; /* CSS3 Proposed  */
  image-rendering: crisp-edges; /* CSS4 Proposed  */
  image-rendering: pixelated; /* CSS4 Proposed  */
  -ms-interpolation-mode: nearest-neighbor; /* IE8+           */
`;

export const MedatadataTextWrapper = styled.div`
  overflow: hidden;
`;

export const MetadataWrapper = styled.div`
  display: flex;
`;

export const MetadataFileName = styled.div`
  &::first-letter {
    text-transform: uppercase;
  }
  ${ellipsis()};
`;

export const MetadataSubText = styled.div`
  color: ${colors.DN400};
  ${ellipsis()};
`;

export const MetadataIconWrapper = styled.div`
  padding-top: 4px;
  padding-right: 12px;
`;

export interface IconWrapperProps {
  type: MediaType;
}

export const IconWrapper: ComponentClass<
  HTMLAttributes<{}> & IconWrapperProps
> = styled.div`
  display: inline-flex;
  color: ${({ type }: IconWrapperProps) =>
    mediaTypeIconColors[type] || mediaTypeIconColors.unknown};
`;

export const RightHeader = styled.div`
  text-align: right;
  margin-right: 40px;
  min-width: 200px;
  > * {
    pointer-events: all;
  }
`;

export const AudioPlayer = styled.div`
  border-radius: ${akBorderRadius};
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 250px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Audio = styled.audio`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const AudioCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DefaultCoverWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    transform: scale(2);
  }
`;

export const FeedbackWrapper = styled.span`
  padding-right: 5px;
`;

export const DownloadButtonWrapper = styled.div`
  margin-top: 28px;
  text-align: center;

  button {
    font-weight: bold;
  }
`;
