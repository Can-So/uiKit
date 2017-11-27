/* tslint:disable:variable-name */
import * as React from 'react';
import { Component } from 'react';
import { MediaTypeIcon } from '../mediaTypeIcon';
import { FileTypeIcon } from './styled';

export interface FileIconProps {
  mediaType?: string;
  style?: any;
  iconUrl?: string;
}

const fileTypeIconClass = 'file-type-icon';

export class FileIcon extends Component<FileIconProps, {}> {
  render() {
    const { mediaType, iconUrl, style } = this.props;
    const type = mediaType || 'unknown';
    const defaultIcon = (
      <MediaTypeIcon
        type={mediaType}
        size="small"
        className={fileTypeIconClass}
      />
    );
    const icon = iconUrl ? (
      <img src={iconUrl} className="custom-icon" alt={type} />
    ) : (
      defaultIcon
    );
    return (
      <FileTypeIcon style={style} className={fileTypeIconClass}>
        {icon}
      </FileTypeIcon>
    );
  }
}
