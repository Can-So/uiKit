/* tslint:disable:variable-collectionName */
import * as React from 'react';
import ImageIcon from '@findable/icon/glyph/media-services/image';
import AudioIcon from '@findable/icon/glyph/media-services/audio';
import VideoIcon from '@findable/icon/glyph/media-services/video';
import DocIcon from '@findable/icon/glyph/media-services/document';
import UnknownIcon from '@findable/icon/glyph/media-services/unknown';
import { MediaType } from '@findable/media-core';
import { IconWrapper } from './styled';

const icons = {
  image: ImageIcon,
  audio: AudioIcon,
  video: VideoIcon,
  doc: DocIcon,
  unknown: UnknownIcon,
};

export interface FileIconProps {
  type?: MediaType;
}

const defaultType = 'unknown';

export class MediaTypeIcon extends React.Component<FileIconProps, {}> {
  static defaultProps: FileIconProps = {
    type: defaultType,
  };

  render() {
    const { type } = this.props;
    const typeWithDefault = type || defaultType;
    const Icon = icons[typeWithDefault] || icons[defaultType];

    return (
      <IconWrapper type={typeWithDefault}>
        <Icon label="media-type" size="large" />
      </IconWrapper>
    );
  }
}
