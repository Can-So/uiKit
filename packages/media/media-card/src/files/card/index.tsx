import * as React from 'react';
import { Component } from 'react';
import { FileDetails, ImageResizeMode } from '@atlaskit/media-core';

import { SharedCardProps, CardStatus } from '../..';
import { CardAction } from '../../actions';
import { FileCardImageView } from '../cardImageView';
import { CardGenericViewSmall } from '../../utils/cardGenericViewSmall';
import { toHumanReadableMediaSize } from '../../utils';

export interface FileCardProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly details?: FileDetails;
  readonly dataURI?: string;
  readonly progress?: number;
  readonly onRetry?: () => void;
  readonly resizeMode?: ImageResizeMode;
}

export class FileCard extends Component<FileCardProps, {}> {
  static defaultProps: Partial<FileCardProps> = {
    actions: [],
  };

  render() {
    return this.renderFile();
  }

  renderFile(): JSX.Element {
    const {
      status,
      dimensions,
      selectable,
      selected,
      details,
      dataURI,
      progress,
      resizeMode,
      onRetry,
    } = this.props;
    const defaultDetails: FileDetails = {
      id: '',
      name: undefined,
      mediaType: undefined,
      size: undefined,
    };
    const { name, mediaType, size } = details || defaultDetails;
    const errorMessage = this.isError ? 'Failed to load' : undefined;

    if (this._isSmall()) {
      const subtitle = toHumanReadableMediaSize(size || 0);
      return (
        <CardGenericViewSmall
          error={errorMessage}
          type="file"
          mediaType={mediaType}
          title={name}
          subtitle={subtitle}
          thumbnailUrl={dataURI}
          dimensions={dimensions}
          loading={this.isLoading}
          onRetry={onRetry}
          actions={this._getActions()}
        />
      );
    } else {
      return (
        <FileCardImageView
          error={errorMessage}
          dimensions={dimensions}
          selectable={selectable}
          selected={selected}
          dataURI={dataURI}
          mediaName={name}
          mediaType={mediaType}
          mediaSize={size}
          status={status}
          progress={progress}
          resizeMode={resizeMode}
          onRetry={onRetry}
          actions={this._getActions()}
        />
      );
    }
  }

  private _getActions(): Array<CardAction> {
    const { details } = this.props;
    if (!details) {
      return [];
    }
    const actions = this.props.actions || [];

    return actions.map((action: CardAction) => {
      return {
        ...action,
        handler: () => {
          action.handler({ type: 'file', details });
        },
      };
    });
  }

  private _isSmall(): boolean {
    return this.props.appearance === 'small';
  }

  private get isLoading(): boolean {
    const { status } = this.props;
    return status === 'loading' || status === 'processing';
  }

  private get isError(): boolean {
    const { status } = this.props;
    return status === 'error';
  }
}
