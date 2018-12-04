import * as React from 'react';
import { ProcessedFileState, Context } from '@atlaskit/media-core';
import AudioIcon from '@atlaskit/icon/glyph/media-services/audio';
import { constructAuthTokenUrl } from '../utils';
import { Outcome, MediaViewerFeatureFlags } from '../domain';
import {
  AudioPlayer,
  AudioCover,
  Audio,
  DefaultCoverWrapper,
  blanketColor,
} from '../styled';
import { createError, MediaViewerError } from '../error';
import { getArtifactUrl } from '@atlaskit/media-store';
import { BaseState, BaseViewer } from './base-viewer';
import { isIE } from '../utils/isIE';
import { CustomMediaPlayer } from '@atlaskit/media-ui';
import { getFeatureFlag } from '../utils/getFeatureFlag';

export type Props = Readonly<{
  item: ProcessedFileState;
  context: Context;
  collectionName?: string;
  previewCount: number;
  featureFlags?: MediaViewerFeatureFlags;
  showControls?: () => void;
}>;

export type State = BaseState<string> & {
  coverUrl?: string;
};

const defaultCover = (
  <DefaultCoverWrapper>
    <AudioIcon label="cover" size="xlarge" primaryColor={blanketColor} />
  </DefaultCoverWrapper>
);

const getCoverUrl = (
  item: ProcessedFileState,
  context: Context,
  collectionName?: string,
): Promise<string> =>
  constructAuthTokenUrl(`/file/${item.id}/image`, context, collectionName);

export class AudioViewer extends BaseViewer<string, Props, State> {
  protected get initialState() {
    return {
      content: Outcome.pending<string, MediaViewerError>(),
    };
  }

  private renderCover = () => {
    const { item } = this.props;
    const { coverUrl } = this.state;

    if (coverUrl) {
      return <AudioCover src={coverUrl} alt={item.name} />;
    } else {
      return defaultCover;
    }
  };

  private saveAudioElement = (audioElement?: HTMLElement) => {
    if (!audioElement) {
      return;
    }

    audioElement.setAttribute('controlsList', 'nodownload');
  };

  protected renderSuccessful(src: string) {
    const { showControls, previewCount, featureFlags } = this.props;

    const useCustomAudioPlayer =
      !isIE() && getFeatureFlag('customVideoPlayer', featureFlags);
    const isAutoPlay = previewCount === 0;

    return useCustomAudioPlayer ? (
      <AudioPlayer>
        {this.renderCover()}
        <CustomMediaPlayer
          type="audio"
          isAutoPlay={isAutoPlay}
          src={src}
          isShortcutEnabled={true}
          showControls={showControls}
        />
      </AudioPlayer>
    ) : (
      <AudioPlayer>
        {this.renderCover()}
        <Audio
          autoPlay={isAutoPlay}
          controls
          innerRef={this.saveAudioElement}
          src={src}
          preload="metadata"
        />
      </AudioPlayer>
    );
  }

  private loadCover = (coverUrl: string) => {
    return new Promise(async (resolve, reject) => {
      const img = new Image();

      img.src = coverUrl;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  private setCoverUrl = async () => {
    const { context, item, collectionName } = this.props;
    const coverUrl = await getCoverUrl(item, context, collectionName);

    try {
      await this.loadCover(coverUrl);
      this.setState({ coverUrl });
    } catch (e) {}
  };

  protected async init() {
    const { context, item, collectionName } = this.props;
    const audioUrl = getArtifactUrl(item.artifacts, 'audio.mp3');
    try {
      if (!audioUrl) {
        throw new Error('No audio artifacts found');
      }
      this.setCoverUrl();
      this.setState({
        content: Outcome.successful(
          await constructAuthTokenUrl(audioUrl, context, collectionName),
        ),
      });
    } catch (err) {
      this.setState({
        content: Outcome.failed(createError('previewFailed', err, item)),
      });
    }
  }
  protected release() {}
}
