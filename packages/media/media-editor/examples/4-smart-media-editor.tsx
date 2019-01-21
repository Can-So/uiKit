import * as React from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Card, FileIdentifier } from '@atlaskit/media-card';
import {
  imageFileId,
  createUploadContext,
  I18NWrapper,
} from '@atlaskit/media-test-helpers';
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
    showEditor: false,
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

  private renderContent = () => {
    const { showWithError, showEditor } = this.state;

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
        <ButtonGroup>
          <Button onClick={this.openSmartEditor}>Open Smart Editor</Button>
          <Button onClick={this.openSmartEditorWithError}>
            Open Smart Editor (with an error)
          </Button>
        </ButtonGroup>

        {showEditor ? renderEditor() : null}
      </div>
    );
  };

  render() {
    const { newFileIdentifier } = this.state;
    return (
      <div>
        <h3>With i18n</h3>
        <I18NWrapper>{this.renderContent()}</I18NWrapper>

        <h3>Without i18n</h3>
        {this.renderContent()}

        {newFileIdentifier ? (
          <Card identifier={newFileIdentifier} context={context} />
        ) : null}
      </div>
    );
  }
}

export default () => <SmartMediaEditorExample />;
