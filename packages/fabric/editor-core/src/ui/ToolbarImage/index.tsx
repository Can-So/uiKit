import ImageIcon from '@atlaskit/icon/glyph/editor/image';
import * as React from 'react';
import { PureComponent } from 'react';
import { analyticsDecorator as analytics } from '../../analytics';
import { EditorView } from 'prosemirror-view';
import { ImageUploadState } from '../../plugins/image-upload';
import ToolbarButton from '../ToolbarButton';

export interface Props {
  editorView: EditorView;
  pluginState: ImageUploadState;
  isReducedSpacing?: boolean;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarImage extends PureComponent<Props, State> {
  state: State = { disabled: false };

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  render() {
    const { disabled } = this.state;

    return (
      <ToolbarButton
        onClick={this.handleInsertImage}
        title="Insert image"
        disabled={disabled}
        spacing={this.props.isReducedSpacing ? 'none' : 'default'}
        iconBefore={<ImageIcon label="Add image" />}
      />
    );
  }

  private handlePluginStateChange = (pluginState: ImageUploadState) => {
    this.setState({
      disabled: !pluginState.enabled,
    });
  };

  @analytics('atlassian.editor.image.button')
  private handleInsertImage = () => {
    return this.props.pluginState.handleImageUpload(this.props.editorView);
  };
}
