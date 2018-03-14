import * as React from 'react';
import styled from 'styled-components';
import PluginSlot from '../PluginSlot';
import WithPluginState from '../WithPluginState';
import ContentStyles from '../ContentStyles';
import { EditorAppearanceComponentProps, EditorAppearance } from '../../types';
import { pluginKey as maxContentSizePluginKey } from '../../plugins/max-content-size';
import { mentionPluginKey } from '../../plugins/mentions/pm-plugins/main';

export interface MobileEditorProps {
  isMaxContentSizeReached?: boolean;
  maxHeight?: number;
}

// tslint:disable-next-line:variable-name
const MobileEditor: any = styled.div`
  height: 100%;
  min-height: 30px;
  width: 100%;
  max-width: inherit;
  box-sizing: border-box;
  word-wrap: break-word;

  div > .ProseMirror {
    outline: none;
    white-space: pre-wrap;
    padding: 0;
    margin: 0;
  }
`;
MobileEditor.displayName = 'MobileEditor';

// tslint:disable-next-line:variable-name
const ContentArea = styled(ContentStyles)`
  height: 100%;

  .ProseMirror {
    height: 100%;
  }
`;
ContentArea.displayName = 'ContentArea';

export default class Editor extends React.Component<
  EditorAppearanceComponentProps,
  any
> {
  static displayName = 'MobileEditor';

  private flashToggle = false;

  private appearance: EditorAppearance = 'mobile';

  private handleRef = ref => {
    if (this.props.onUiReady) {
      this.props.onUiReady(ref);
    }
  };

  private renderMobile = ({ maxContentSize, mentions }) => {
    const {
      editorView,
      eventDispatcher,
      providerFactory,
      customContentComponents,
      maxHeight,
      disabled,
      editorDOMElement,
    } = this.props;
    const maxContentSizeReached =
      maxContentSize && maxContentSize.maxContentSizeReached;
    this.flashToggle = maxContentSizeReached && !this.flashToggle;
    return (
      <MobileEditor
        className={this.flashToggle ? '-flash' : ''}
        isMaxContentSizeReached={maxContentSizeReached}
        maxHeight={maxHeight}
      >
        <ContentArea innerRef={this.handleRef}>
          {customContentComponents}
          <PluginSlot
            editorView={editorView}
            eventDispatcher={eventDispatcher}
            providerFactory={providerFactory}
            appearance={this.appearance}
            disabled={!!disabled}
          />
          {editorDOMElement}
        </ContentArea>
      </MobileEditor>
    );
  };

  render() {
    const { eventDispatcher, editorView } = this.props;

    return (
      <WithPluginState
        editorView={editorView}
        eventDispatcher={eventDispatcher}
        plugins={{
          maxContentSize: maxContentSizePluginKey,
          mentions: mentionPluginKey,
        }}
        render={this.renderMobile}
      />
    );
  }
}
