import * as React from 'react';
import * as uuid from 'uuid/v4';
import { Subscription } from 'rxjs/Subscription';
import { Context, UploadableFile } from '@atlaskit/media-core';
import { FileIdentifier } from '@atlaskit/media-card';
import { Shortcut } from '@atlaskit/media-ui';
import Spinner from '@atlaskit/spinner';
import { intlShape, IntlProvider } from 'react-intl';
import EditorView from './editorView/editorView';
import { Blanket, SpinnerWrapper } from './styled';
import { fileToBase64 } from '../util';

export interface SmartMediaEditorProps {
  identifier: FileIdentifier;
  context: Context;
  onUploadStart: (identifier: FileIdentifier) => void;
  onFinish: () => void;
  onError: (error: any) => void;
}

export interface SmartMediaEditorState {
  imageUrl?: string;
}

export class SmartMediaEditor extends React.Component<
  SmartMediaEditorProps,
  SmartMediaEditorState
> {
  fileName?: string;
  state: SmartMediaEditorState = {};
  getFileSubscription?: Subscription;
  uploadFileSubscription?: Subscription;

  static contextTypes = {
    intl: intlShape,
  };

  componentDidMount() {
    const { identifier } = this.props;
    this.getFile(identifier);
  }

  componentWillUnmount() {
    const { getFileSubscription, uploadFileSubscription } = this;
    if (getFileSubscription) {
      getFileSubscription.unsubscribe();
    }
    if (uploadFileSubscription) {
      uploadFileSubscription.unsubscribe();
    }
  }

  getFile = async (identifier: FileIdentifier) => {
    console.log('getFile', identifier);
    const { context, onError } = this.props;
    const { collectionName, occurrenceKey } = identifier;
    const id = await identifier.id;
    console.log('context.file.getFileState("', id, '")');
    const getFileSubscription = context.file
      .getFileState(id, { collectionName, occurrenceKey })
      .subscribe({
        next: async state => {
          console.log({ state });
          if (state.status === 'processed') {
            const { name } = state;
            this.fileName = name;
            // TODO do we need to set new URL second time? (in case first time it was set with preview.blob)
            this.setImageUrl(identifier);
            setTimeout(() => getFileSubscription.unsubscribe(), 0);
          } else if (state.status === 'error') {
            onError(state.message);
          } else if (state.preview) {
            const base64ImageUrl = await fileToBase64(state.preview.blob);
            this.setState({
              imageUrl: base64ImageUrl,
            });
          }
        },
        error: error => {
          onError(error);
        },
      });
    this.getFileSubscription = getFileSubscription;
  };

  setImageUrl = async (identifier: FileIdentifier) => {
    const { context } = this.props;
    const id = await identifier.id;
    const imageUrl = await context.getImageUrl(id, {
      collection: identifier.collectionName,
      mode: 'full-fit',
    });

    this.setState({
      imageUrl,
    });
  };

  onSave = (imageData: string) => {
    const { fileName } = this;
    const { context, identifier, onUploadStart, onFinish } = this.props;
    const { collectionName, occurrenceKey } = identifier;
    const uploadableFile: UploadableFile = {
      content: imageData,
      collection: collectionName,
      name: fileName,
    };
    const id = uuid();
    const touchedFiles = context.file.touchFiles(
      [
        {
          fileId: id,
          collection: collectionName,
        },
      ],
      collectionName,
    );
    const deferredUploadId = touchedFiles.then(
      touchedFiles => touchedFiles.created[0].uploadId,
    );
    const uploadableFileUpfrontIds = {
      id,
      deferredUploadId,
      occurrenceKey,
    };

    context.file.upload(uploadableFile, undefined, uploadableFileUpfrontIds);
    console.log('new file id', id);

    const newFileIdentifier: FileIdentifier = {
      id,
      collectionName,
      mediaItemType: 'file',
    };
    onUploadStart(newFileIdentifier);
    onFinish();
  };

  onCancel = () => {
    const { onFinish } = this.props;
    onFinish();
  };

  onError = (error: any) => {
    const { onError } = this.props;
    onError(error);
  };

  renderLoading = () => {
    return (
      <SpinnerWrapper>
        <Spinner size="large" invertColor={true} />
      </SpinnerWrapper>
    );
  };

  renderEditor = (imageUrl: string) => {
    const content = (
      <EditorView
        imageUrl={imageUrl}
        onSave={this.onSave}
        onCancel={this.onCancel}
        onError={this.onError}
      />
    );

    return this.context.intl ? (
      content
    ) : (
      <IntlProvider locale="en">{content}</IntlProvider>
    );
  };

  render() {
    const { imageUrl } = this.state;
    const content = imageUrl
      ? this.renderEditor(imageUrl)
      : this.renderLoading();

    return (
      <Blanket>
        <Shortcut keyCode={27} handler={this.onCancel} />
        {content}
      </Blanket>
    );
  }
}
