import { StyledComponentClass } from 'styled-components';
import { MediaType } from '@atlaskit/media-core';
import { HTMLAttributes, VideoHTMLAttributes, AudioHTMLAttributes, ImgHTMLAttributes, ComponentClass, ClassAttributes } from 'react';
export declare const mediaTypeIconColors: {
    image: string;
    audio: string;
    video: string;
    doc: string;
    unknown: string;
};
export declare const blanketColor: string;
export declare const hideControlsClassName = "mvng-hide-controls";
export declare const Blanket: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const HeaderWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export interface ContentWrapperProps {
    showControls: boolean;
}
export declare const ListWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const ArrowsWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const CloseButtonWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const ZoomWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const ZoomControlsWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const ZoomLevelIndicator: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>>;
export declare const ContentWrapper: StyledComponentClass<ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & ContentWrapperProps, any, ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement> & ContentWrapperProps>;
export declare const ErrorMessageWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const ErrorImage: StyledComponentClass<import("react").DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, any, import("react").DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>>;
export declare const Video: ComponentClass<VideoHTMLAttributes<{}>>;
export declare const PDFWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const Arrow: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>>;
export declare const LeftWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const RightWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const Header: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const LeftHeader: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const ImageWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const BaselineExtend: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare type ImgProps = {
    canDrag: boolean;
    isDragging: boolean;
    shouldPixelate: boolean;
};
export declare const Img: ComponentClass<ImgHTMLAttributes<{}> & ImgProps>;
export declare const MedatadataTextWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const MetadataWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const MetadataFileName: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const MetadataSubText: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const MetadataIconWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export interface IconWrapperProps {
    type: MediaType;
}
export declare const IconWrapper: ComponentClass<HTMLAttributes<{}> & IconWrapperProps>;
export declare const RightHeader: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const CustomAudioPlayerWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const AudioPlayer: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const Audio: StyledComponentClass<import("react").DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>, any, import("react").DetailedHTMLProps<AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>>;
export declare const AudioCover: StyledComponentClass<import("react").DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, any, import("react").DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>>;
export declare const DefaultCoverWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const DownloadButtonWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const CustomVideoPlayerWrapper: StyledComponentClass<import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, import("react").DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
