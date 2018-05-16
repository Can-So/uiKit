/* tslint:disable:variable-name */
import {
  HTMLAttributes,
  ComponentClass,
  ImgHTMLAttributes,
  ProgressHTMLAttributes,
} from 'react';
import styled, { ThemedOuterStyledProps } from 'styled-components';

export interface DropzoneContainerProps {
  isActive: boolean;
}

export const PopupContainer: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  overflow: hidden;
`;

export const PopupHeader: ComponentClass<HTMLAttributes<{}>> = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  padding: 30px 0;

  > * {
    margin-right: 15px;
  }
`;

export const PopupEventsWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  overflow: auto;
`;

export interface PreviewImageProps {
  fadedOut: boolean;
}
export const PreviewImage: ComponentClass<
  ImgHTMLAttributes<{}> & PreviewImageProps
> = styled.img`
  width: 300px;
  ${({ fadedOut }: PreviewImageProps) => `opacity: ${fadedOut ? 0.3 : 1};`};
`;

export const PreviewImageWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  position: relative;
  margin-right: 15px;
`;

export const DropzoneContainer: ComponentClass<
  HTMLAttributes<{}> & ThemedOuterStyledProps<DropzoneContainerProps, {}>
> = styled.div`
  width: 600px;
  min-height: 500px;
  border: 1px dashed transparent;

  ${(props: DropzoneContainerProps) =>
    props.isActive
      ? `
    border-color: gray;
  `
      : ''};
`;

export const DropzoneConfigOptions: ComponentClass<
  HTMLAttributes<{}>
> = styled.div``;

export const DropzoneRoot: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
`;

export const DropzoneContentWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  display: flex;
`;

export const PreviewsWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-flow: row wrap;
  overflow: auto;
`;

export const PreviewsTitle: ComponentClass<HTMLAttributes<{}>> = styled.h1`
  width: 100%;
`;

export const ProgressCircleWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  width: 100px;
  height: 100px;
`;

export const DropzoneItemsInfo: ComponentClass<HTMLAttributes<{}>> = styled.div`
  flex: 1;
  min-width: 600px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export interface ClipboardContainerProps {
  isWindowFocused: boolean;
}

export const ClipboardContainer: ComponentClass<
  HTMLAttributes<{}> & ClipboardContainerProps
> = styled.div`
  padding: 10px;
  min-height: 400px;

  border: ${({ isWindowFocused }: ClipboardContainerProps) =>
    isWindowFocused ? `1px dashed gray` : `1px dashed transparent`};
`;

export const UploadingFilesWrapper: ComponentClass<
  HTMLAttributes<{}>
> = styled.div``;

export const FileProgress: ComponentClass<
  ProgressHTMLAttributes<{}>
> = styled.progress`
  width: 400px;
`;

export const FilesInfoWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  border: 1px solid;
  padding: 10px;
  margin-bottom: 10px;
  max-height: 250px;
  min-height: 250px;
  overflow: auto;
  display: flex;
`;

export const CardsWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  flex: 1;
`;

export const CardItemWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: inline-block;
`;
