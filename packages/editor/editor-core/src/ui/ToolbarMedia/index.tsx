import * as React from 'react';
import { PureComponent } from 'react';
import AttachmentIcon from '@atlaskit/icon/glyph/editor/attachment';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { analyticsDecorator as analytics } from '../../analytics';
import { MediaPluginState } from '../../plugins/media';
import ToolbarButton from '../ToolbarButton';

export interface Props {
  editorView: EditorView;
  pluginKey: PluginKey;
  isDisabled?: boolean;
  isReducedSpacing?: boolean;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarMedia extends PureComponent<Props, State> {
  state: State = { disabled: false };
  private pluginState?: MediaPluginState;

  componentDidMount() {
    this.setPluginState(this.props);
  }

  componentWillUpdate(nextProps: Props) {
    if (!this.pluginState) {
      this.setPluginState(nextProps);
    }
  }

  componentWillUnmount() {
    const { pluginState } = this;

    if (pluginState) {
      pluginState.unsubscribe(this.handlePluginStateChange);
    }
  }

  render() {
    const { isDisabled, isReducedSpacing } = this.props;
    const { disabled } = this.state;
    if (disabled) {
      return null;
    }
    return (
      <ToolbarButton
        onClick={this.handleClickMediaButton}
        disabled={isDisabled}
        title="Insert files and images"
        spacing={isReducedSpacing ? 'none' : 'default'}
        iconBefore={<AttachmentIcon label="Insert files and images" />}
      />
    );
  }

  private setPluginState(props: Props) {
    const { editorView, pluginKey } = props;
    const pluginState = pluginKey.getState(editorView.state);

    if (pluginState) {
      this.pluginState = pluginState;
      pluginState.subscribe(this.handlePluginStateChange);
    }
  }

  private handlePluginStateChange = (pluginState: MediaPluginState) => {
    this.setState({
      disabled: !pluginState.allowsUploads,
    });
  };

  @analytics('atlassian.editor.media.button')
  private handleClickMediaButton = () => {
    this.pluginState!.showMediaPicker();
    return true;
  };
}
