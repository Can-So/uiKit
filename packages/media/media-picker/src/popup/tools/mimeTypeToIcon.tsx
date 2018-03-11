import * as React from 'react';
import FolderFilledIcon from '@atlaskit/icon/glyph/folder-filled';
import ImageIcon from '@atlaskit/icon/glyph/media-services/image';
import VideoIcon from '@atlaskit/icon/glyph/media-services/video';
import AudioIcon from '@atlaskit/icon/glyph/media-services/audio';
import SpreadSheetIcon from '@atlaskit/icon/glyph/media-services/spreadsheet';
import PresentationIcon from '@atlaskit/icon/glyph/media-services/presentation';
import DocumentIcon from '@atlaskit/icon/glyph/media-services/document';
import PDFDocumentIcon from '@atlaskit/icon/glyph/media-services/pdf';
import ZipDocumentIcon from '@atlaskit/icon/glyph/media-services/zip';
import UnknownIcon from '@atlaskit/icon/glyph/media-services/unknown';
import {
  akColorY200,
  akColorY400,
  akColorG300,
  akColorR300,
  akColorR400,
  akColorP200,
  akColorB75,
  akColorB200,
  akColorN200,
} from '@atlaskit/util-shared-styles';
import styled from 'styled-components';
import { akColorN70 } from '@atlaskit/util-shared-styles';

interface IconWrapperProps {
  color: string;
}

const IconWrapper = styled.div`
  ${({ color }: IconWrapperProps) => `color: ${color};`};
`;

function isFolder(mimeType: string) {
  return mimeType === 'application/vnd.atlassian.mediapicker.folder';
}

function isImage(mimeType: string) {
  return mimeType.indexOf('image/') === 0;
}

function isVideo(mimeType: string) {
  return mimeType.indexOf('video/') === 0;
}

function isAudio(mimeType: string) {
  return mimeType.indexOf('audio/') === 0;
}

function isPDF(mimeType: string) {
  return mimeType === 'application/pdf';
}

function isSpreadsheet(mimeType: string) {
  return (
    [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/x-iwork-keynote-sffnumbers',
    ].indexOf(mimeType) > -1
  );
}

function isPresentation(mimeType: string) {
  return (
    [
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
      'application/x-iwork-keynote-sffkey',
    ].indexOf(mimeType) > -1
  );
}

function isDocument(mimeType: string) {
  return (
    [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/x-iwork-pages-sffpages',
    ].indexOf(mimeType) > -1
  );
}

function isArchive(mimeType: string) {
  return (
    [
      'application/zip',
      'application/x-7z-compressed',
      'application/x-bzip',
      'application/x-bzip2',
    ].indexOf(mimeType) > -1
  );
}

export const mapMimeTypeToIcon = (mimeType: string): JSX.Element => {
  if (isFolder(mimeType)) {
    return (
      <IconWrapper color={akColorB75}>
        <FolderFilledIcon label="folder" />
      </IconWrapper>
    );
  } else if (isImage(mimeType)) {
    return (
      <IconWrapper color={akColorY200}>
        <ImageIcon label="image" />
      </IconWrapper>
    );
  } else if (isVideo(mimeType)) {
    return (
      <IconWrapper color={akColorR300}>
        <VideoIcon label="video" />
      </IconWrapper>
    );
  } else if (isAudio(mimeType)) {
    return (
      <IconWrapper color={akColorP200}>
        <AudioIcon label="audio" />
      </IconWrapper>
    );
  } else if (isSpreadsheet(mimeType)) {
    return (
      <IconWrapper color={akColorG300}>
        <SpreadSheetIcon label="spreadsheet" />
      </IconWrapper>
    );
  } else if (isPresentation(mimeType)) {
    return (
      <IconWrapper color={akColorY400}>
        <PresentationIcon label="presentation" />
      </IconWrapper>
    );
  } else if (isDocument(mimeType)) {
    return (
      <IconWrapper color={akColorB200}>
        <DocumentIcon label="document" />
      </IconWrapper>
    );
  } else if (isPDF(mimeType)) {
    return (
      <IconWrapper color={akColorR400}>
        <PDFDocumentIcon label="pdf document" />
      </IconWrapper>
    );
  } else if (isArchive(mimeType)) {
    return (
      <IconWrapper color={akColorN200}>
        <ZipDocumentIcon label="zip" />
      </IconWrapper>
    );
  } else {
    return (
      <IconWrapper color={akColorN70}>
        <UnknownIcon label="unknown" />
      </IconWrapper>
    );
  }
};
