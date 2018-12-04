import * as React from 'react';
import { Context, ProcessedFileState } from '@atlaskit/media-core';
import { getArtifactUrl } from '@atlaskit/media-store';
import { CustomVideoPlayer } from '@atlaskit/media-ui';
import { constructAuthTokenUrl } from '../../utils';
import { Outcome, MediaViewerFeatureFlags } from '../../domain';
import {
  Video,
  CustomVideoPlayerWrapper,
  DefaultCoverWrapper,
  blanketColor,
  AudioCover,
} from '../../styled';
import { getFeatureFlag } from '../../utils/getFeatureFlag';
import { isIE } from '../../utils/isIE';
import { createError, MediaViewerError } from '../../error';
import { BaseState, BaseViewer } from '../base-viewer';
import { AudioViewer } from '../audio';
import AudioIcon from '@atlaskit/icon/glyph/media-services/audio';

export type Props = Readonly<{
  item: ProcessedFileState;
  context: Context;
  collectionName?: string;
  featureFlags?: MediaViewerFeatureFlags;
  showControls?: () => void;
  previewCount: number;
  type: 'audio' | 'video';
}>;

export type State = BaseState<string> & {
  isHDActive: boolean;
  coverUrl?: string;
};

const sdArtifact = 'video_640.mp4';
const hdArtifact = 'video_1280.mp4';
const audioArtifact = 'audio.mp3';

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

export class VideoViewer extends BaseViewer<string, Props, State> {
  private renderCover = () => {
    const { type, item } = this.props;
    const { coverUrl } = this.state;
    if (type === 'audio') {
      if (coverUrl) {
        return <AudioCover key="cover" src={coverUrl} alt={item.name} />;
      } else {
        return defaultCover;
      }
    } else {
      return;
    }
  };

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

  protected get initialState() {
    return {
      content: Outcome.pending<string, MediaViewerError>(),
      isHDActive: false,
    };
  }

  private onHDChange = () => {
    const isHDActive = !this.state.isHDActive;
    this.setState({ isHDActive });
    this.init(isHDActive);
  };

  protected renderSuccessful(content: string) {
    const { isHDActive } = this.state;
    const { type, item, featureFlags, showControls, previewCount } = this.props;
    const useCustomVideoPlayer =
      !isIE() && getFeatureFlag('customVideoPlayer', featureFlags);
    const isAutoPlay = previewCount === 0;
    return useCustomVideoPlayer ? (
      <React.Fragment>
        {this.renderCover()}
        <CustomVideoPlayerWrapper>
          <CustomVideoPlayer
            type={type}
            isAutoPlay={isAutoPlay}
            onHDToggleClick={this.onHDChange}
            showControls={showControls}
            src={content}
            isHDActive={isHDActive}
            isHDAvailable={isHDAvailable(item)}
            isShortcutEnabled={true}
          />
        </CustomVideoPlayerWrapper>
        />
      </React.Fragment>
    ) : type === 'audio' ? (
      <AudioViewer {...this.props} />
    ) : (
      <Video autoPlay={isAutoPlay} controls src={content} />
    );
  }

  protected async init(isHDActive?: boolean) {
    const { type, context, item, collectionName } = this.props;
    const preferHd = isHDActive && isHDAvailable(item);
    if (type === 'audio') {
      this.setCoverUrl();
    }
    const contentUrl =
      type === 'audio'
        ? getAudioArtifactUrl(item)
        : getVideoArtifactUrl(item, preferHd);
    try {
      if (!contentUrl) {
        throw new Error(`No ${type} artifacts found`);
      }
      this.setState({
        content: Outcome.successful(
          await constructAuthTokenUrl(contentUrl, context, collectionName),
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

function isHDAvailable(file: ProcessedFileState): boolean {
  return !!getArtifactUrl(file.artifacts, hdArtifact);
}

function getVideoArtifactUrl(
  file: ProcessedFileState,
  preferHd?: boolean,
): string | undefined {
  const artifactName = preferHd ? hdArtifact : sdArtifact;
  return getArtifactUrl(file.artifacts, artifactName);
}

function getAudioArtifactUrl(file: ProcessedFileState): string | undefined {
  return getArtifactUrl(file.artifacts, audioArtifact);
}
