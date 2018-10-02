import * as React from 'react';
import {
  Context,
  FileState,
  MediaType,
  ProcessedFileState,
} from '@atlaskit/media-core';
import Button from '@atlaskit/button';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { Subscription } from 'rxjs/Subscription';
import * as deepEqual from 'deep-equal';
import { toHumanReadableMediaSize } from '@atlaskit/media-ui';
import { Outcome, Identifier } from './domain';
import {
  Header as HeaderWrapper,
  LeftHeader,
  RightHeader,
  MetadataWrapper,
  MetadataSubText,
  MedatadataTextWrapper,
  MetadataIconWrapper,
  MetadataFileName,
  hideControlsClassName,
} from './styled';
import { MediaTypeIcon } from './media-type-icon';
import { FeedbackButton } from './feedback-button';
import { downloadItem } from './domain/download';
import { MediaViewerError, createError } from './error';

export type Props = {
  readonly identifier: Identifier;
  readonly context: Context;
  readonly onClose?: () => void;
};

export type State = {
  item: Outcome<FileState, MediaViewerError>;
};

const initialState: State = {
  item: Outcome.pending(),
};

export default class Header extends React.Component<Props, State> {
  state: State = initialState;

  private subscription?: Subscription;

  componentWillUpdate(nextProps: Props) {
    if (this.needsReset(this.props, nextProps)) {
      this.release();
      this.init(nextProps);
    }
  }

  componentDidMount() {
    this.init(this.props);
  }

  componentWillUnmount() {
    this.release();
  }

  private init(props: Props) {
    this.setState(initialState, () => {
      const { context, identifier } = props;
      this.subscription = context.getFile(identifier.id).subscribe({
        next: file => {
          this.setState({
            item: Outcome.successful(file),
          });
        },
        error: err => {
          this.setState({
            item: Outcome.failed(createError('metadataFailed', undefined, err)),
          });
        },
      });
    });
  }

  private renderDownload = () => {
    const { item } = this.state;
    const { identifier, context } = this.props;
    const icon = <DownloadIcon label="Download" />;

    const disabledDownloadButton = (
      <Button
        label="Download"
        appearance="toolbar"
        isDisabled={true}
        iconBefore={icon}
      />
    );

    return item.match({
      pending: () => disabledDownloadButton,
      failed: () => disabledDownloadButton,
      successful: item => (
        <Button
          label="Download"
          appearance="toolbar"
          onClick={downloadItem(item, context, identifier.collectionName)}
          iconBefore={icon}
        />
      ),
    });
  };

  render() {
    return (
      <HeaderWrapper className={hideControlsClassName}>
        <LeftHeader>{this.renderMetadata()}</LeftHeader>
        <RightHeader>
          <FeedbackButton />
          {this.renderDownload()}
        </RightHeader>
      </HeaderWrapper>
    );
  }

  private renderMetadata() {
    const { item } = this.state;
    return item.match({
      successful: item => this.renderMetadataLayout(item),
      pending: () => null,
      failed: () => null,
    });
  }

  private renderMetadataLayout(item: FileState) {
    if (item.status === 'processed') {
      return (
        <MetadataWrapper>
          <MetadataIconWrapper>
            {this.getMediaIcon(item.mediaType)}
          </MetadataIconWrapper>
          <MedatadataTextWrapper>
            <MetadataFileName>{item.name || 'unknown'}</MetadataFileName>
            <MetadataSubText>
              {this.renderFileTypeText(item.mediaType)}
              {this.renderSize(item)}
            </MetadataSubText>
          </MedatadataTextWrapper>
        </MetadataWrapper>
      );
    } else {
      return null;
    }
  }

  private renderSize = (item: ProcessedFileState) => {
    if (item.size) {
      return this.renderSeparator() + toHumanReadableMediaSize(item.size);
    } else {
      return '';
    }
  };

  private renderSeparator = () => {
    return ' · ';
  };

  private renderFileTypeText = (mediaType?: MediaType): string => {
    if (mediaType === 'doc') {
      return 'document';
    } else {
      return mediaType || 'unknown';
    }
  };

  private getMediaIcon = (mediaType?: MediaType) => {
    return <MediaTypeIcon type={mediaType} />;
  };

  private needsReset(propsA: Props, propsB: Props) {
    return (
      !deepEqual(propsA.identifier, propsB.identifier) ||
      propsA.context !== propsB.context
    );
  }

  private release() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
