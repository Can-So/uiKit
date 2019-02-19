import * as React from 'react';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import AttachmentIcon from '@atlaskit/icon/glyph/editor/attachment';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { MediaPluginState } from '../../pm-plugins/main';
import WithPluginState from '../../../../ui/WithPluginState';
import { EventDispatcher } from '../../../../event-dispatcher';

export interface Props {
  editorView: EditorView;
  pluginKey: PluginKey;
  eventDispatcher: EventDispatcher;
  isDisabled?: boolean;
  isReducedSpacing?: boolean;
}

const onClickMediaButton = (pluginState: MediaPluginState) =>
  withAnalytics('atlassian.editor.media.button', () => {
    pluginState.showMediaPicker();
    return true;
  });

const ToolbarMedia = ({
  editorView,
  eventDispatcher,
  pluginKey,
  isDisabled,
  isReducedSpacing,
}: Props) => (
  <WithPluginState
    editorView={editorView}
    eventDispatcher={eventDispatcher}
    plugins={{
      mediaPlugin: pluginKey,
    }}
    render={({ mediaPlugin }: { mediaPlugin: MediaPluginState }) => {
      if (!mediaPlugin.allowsUploads) {
        return null;
      }

      return (
        <ToolbarButton
          onClick={onClickMediaButton(mediaPlugin)}
          disabled={isDisabled}
          title="Files & images"
          spacing={isReducedSpacing ? 'none' : 'default'}
          iconBefore={<AttachmentIcon label="Files & images" />}
        />
      );
    }}
  />
);

export default ToolbarMedia;
