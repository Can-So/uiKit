// tslint:disable:no-console

import * as React from 'react';

import Editor from '../example-helpers/editor';
import ToolsDrawer from '../example-helpers/ToolsDrawer';

const CANCEL_ACTION = () => console.log('Cancel');
const SAVE_ACTION = () => console.log('Save');

const analyticsHandler = (actionName, props) => console.log(actionName, props);

class DemoEditor extends React.PureComponent<any, any> {
  private editorRef: Editor;

  private onChange = () => {
    const editor = this.editorRef;

    if (editor && editor.doc && this.props.onChange) {
      this.props.onChange(editor.state.editorView);
    }
  };

  private handleEditorRef = ref => {
    this.editorRef = ref;
  };

  render() {
    const {
      mediaProvider,
      mentionProvider,
      emojiProvider,
      taskDecisionProvider,
      contextIdentifierProvider,
      activityProvider,
    } = this.props;
    return (
      <Editor
        analyticsHandler={analyticsHandler}
        onCancel={CANCEL_ACTION}
        onSave={SAVE_ACTION}
        onChange={this.onChange}
        mediaProvider={mediaProvider}
        mentionProvider={mentionProvider}
        emojiProvider={emojiProvider}
        taskDecisionProvider={taskDecisionProvider}
        contextIdentifierProvider={contextIdentifierProvider}
        activityProvider={activityProvider}
        isExpandedByDefault={true}
        ref={this.handleEditorRef}
        devTools={true}
      />
    );
  }
}

export default function Example() {
  return (
    <ToolsDrawer
      renderEditor={({
        mediaProvider,
        mentionProvider,
        emojiProvider,
        taskDecisionProvider,
        contextIdentifierProvider,
        activityProvider,
        onChange,
      }) => (
        <DemoEditor
          onChange={onChange}
          mediaProvider={mediaProvider}
          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider}
          taskDecisionProvider={taskDecisionProvider}
          contextIdentifierProvider={contextIdentifierProvider}
          activityProvider={activityProvider}
        />
      )}
    />
  );
}
