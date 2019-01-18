import * as React from 'react';
import Button from '@atlaskit/button';
import { Card, FileIdentifier } from '@atlaskit/media-card';
import { imageFileId, createUploadContext } from '@atlaskit/media-test-helpers';
import { SmartMediaEditor } from '../src';

interface State {
  showEditor: boolean;
  showWithError: boolean;
  newFileIdentifier?: FileIdentifier;
}

const context = createUploadContext();

class SmartMediaEditorExample extends React.Component<{}, State> {
  state: State = {
    showWithError: false,
    showEditor: true,
  };

  openSmartEditor = () => {
    this.setState({ showEditor: true, showWithError: false });
  };

  openSmartEditorWithError = () => {
    this.setState({ showEditor: true, showWithError: true });
  };

  onFinish = () => {
    console.log('onFinish');
    this.setState({ showEditor: false });
  };

  onUploadStart = (identifier: FileIdentifier) => {
    console.log('onUploadStart', identifier);
    this.setState({
      newFileIdentifier: identifier,
      showEditor: false,
    });
  };

  render() {
    const { showWithError, showEditor, newFileIdentifier } = this.state;

    const renderEditor = () => (
      <SmartMediaEditor
        identifier={{
          ...imageFileId,
          id: showWithError ? '🥳' : imageFileId.id,
        }}
        context={context}
        onFinish={this.onFinish}
        onUploadStart={this.onUploadStart}
      />
    );

    return (
      <div>
        <Button onClick={this.openSmartEditor}>Open Smart Editor</Button>
        <br />
        <Button onClick={this.openSmartEditorWithError}>
          Open Smart Editor (with an error)
        </Button>
        {newFileIdentifier ? (
          <Card identifier={newFileIdentifier} context={context} />
        ) : null}
        {showEditor ? renderEditor() : null}
      </div>
    );
  }
}

export default () => <SmartMediaEditorExample />;
