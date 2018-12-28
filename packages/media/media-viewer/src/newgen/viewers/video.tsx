import * as React from 'react';
import { Context, ProcessedFileState } from '@atlaskit/media-core';
import { getArtifactUrl } from '@atlaskit/media-store';
import { CustomMediaPlayer } from '@atlaskit/media-ui';
import { constructAuthTokenUrl } from '../utils';
import { Outcome, MediaViewerFeatureFlags } from '../domain';
import { Video, CustomVideoPlayerWrapper } from '../styled';
import { getFeatureFlag } from '../utils/getFeatureFlag';
import { isIE } from '../utils/isIE';
import { createError, MediaViewerError } from '../error';
import { BaseState, BaseViewer } from './base-viewer';

export type Props = Readonly<{
  item: ProcessedFileState;
  context: Context;
  collectionName?: string;
  featureFlags?: MediaViewerFeatureFlags;
  showControls?: () => void;
  previewCount: number;
}>;

export type State = BaseState<string> & {
  isHDActive: boolean;
  coverUrl?: string;
};

const sdArtifact = 'video_640.mp4';
const hdArtifact = 'video_1280.mp4';

export class VideoViewer extends BaseViewer<string, Props, State> {
  protected get initialState() {
    const { item } = this.props;

    return {
      content: Outcome.pending<string, MediaViewerError>(),
      isHDActive: isHDAvailable(item),
    };
  }

  private onHDChange = () => {
    const isHDActive = !this.state.isHDActive;
    this.setState({ isHDActive });
    this.init(isHDActive);
  };

  protected renderSuccessful(content: string) {
    const { isHDActive } = this.state;
    const { item, featureFlags, showControls, previewCount } = this.props;
    const useCustomVideoPlayer =
      !isIE() && getFeatureFlag('customVideoPlayer', featureFlags);
    const isAutoPlay = previewCount === 0;
    return useCustomVideoPlayer ? (
      <CustomVideoPlayerWrapper>
        <CustomMediaPlayer
          type="video"
          isAutoPlay={isAutoPlay}
          onHDToggleClick={this.onHDChange}
          showControls={showControls}
          src={content}
          isHDActive={isHDActive}
          isHDAvailable={isHDAvailable(item)}
          isShortcutEnabled={true}
        />
      </CustomVideoPlayerWrapper>
    ) : (
      <Video autoPlay={isAutoPlay} controls src={content} />
    );
  }

  protected async init(isHDActive: boolean = this.state.isHDActive) {
    const { context, item, collectionName } = this.props;
    const preferHd = isHDActive && isHDAvailable(item);
    const contentUrl = getVideoArtifactUrl(item, preferHd);

    try {
      if (!contentUrl) {
        throw new Error(`No video artifacts found`);
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
