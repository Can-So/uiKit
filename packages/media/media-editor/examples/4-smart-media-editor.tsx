import * as React from 'react';
import Button from '@atlaskit/button';
import { Card, FileIdentifier } from '@atlaskit/media-card';
import { imageFileId, createUploadContext } from '@atlaskit/media-test-helpers';
import { SmartMediaEditor } from '../src';

interface State {
  showEditor: boolean;
  newFileIdentifier?: FileIdentifier;
}

const context = createUploadContext();

class SmartMediaEditorExample extends React.Component<{}, State> {
  state: State = {
    showEditor: true,
  };

  openSmartEditor = () => {
    this.setState({ showEditor: true });
  };

  onFinish = () => {
    console.log('onFinish');
    this.setState({
      showEditor: false,
    });
  };

  onError = (error: any) => {
    console.log('onError', error);
    this.setState({
      showEditor: false,
    });
  };

  onUploadStart = (identifier: FileIdentifier) => {
    console.log('onUploadStart', identifier);
    this.setState({
      newFileIdentifier: identifier,
    });
  };

  render() {
    const { showEditor, newFileIdentifier } = this.state;

    const editor = (
      <SmartMediaEditor
        identifier={imageFileId}
        context={context}
        onFinish={this.onFinish}
        onError={this.onError}
        onUploadStart={this.onUploadStart}
      />
    );

    return (
      <div>
        <Button onClick={this.openSmartEditor}>Open Smart Editor</Button>
        {newFileIdentifier ? (
          <Card identifier={newFileIdentifier} context={context} />
        ) : null}
        {showEditor ? editor : null}
      </div>
    );
  }
}

export default () => <SmartMediaEditorExample />;
