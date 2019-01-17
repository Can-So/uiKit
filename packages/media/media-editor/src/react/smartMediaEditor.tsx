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
import ErrorView from './editorView/errorView/errorView';

export interface SmartMediaEditorProps {
  identifier: FileIdentifier;
  context: Context;
  onUploadStart: (identifier: FileIdentifier) => void;
  onFinish: () => void;
}

export interface SmartMediaEditorState {
  error?: any;
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

  componentWillReceiveProps(nextProps: Readonly<SmartMediaEditorProps>) {
    const { identifier, context } = this.props;
    if (
      nextProps.identifier.id !== identifier.id ||
      nextProps.context !== context
    ) {
      this.getFile(nextProps.identifier);
    }
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
    const { context } = this.props;
    const { collectionName, occurrenceKey } = identifier;
    const id = await identifier.id;
    const getFileSubscription = context.file
      .getFileState(id, { collectionName, occurrenceKey })
      .subscribe({
        next: async state => {
          if (state.status === 'processed') {
            const { name } = state;
            this.fileName = name;
            // TODO do we need to set new URL second time? (in case first time it was set with preview.blob)
            this.setImageUrl(identifier);
            setTimeout(() => getFileSubscription.unsubscribe(), 0);
          } else if (state.status === 'error') {
            this.onError(state.message);
            setTimeout(() => getFileSubscription.unsubscribe(), 0);
          } else if (state.preview) {
            const base64ImageUrl = await fileToBase64(state.preview.blob);
            this.setState({
              imageUrl: base64ImageUrl,
            });
            setTimeout(() => getFileSubscription.unsubscribe(), 0);
          }
        },
        error: error => {
          this.onError(error);
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

    const uploadingFileState = context.file.upload(
      uploadableFile,
      undefined,
      uploadableFileUpfrontIds,
    );
    const uploadingFileStateSubscription = uploadingFileState.subscribe({
      next: fileState => {
        if (fileState.status === 'processing') {
          onFinish();
          setTimeout(() => uploadingFileStateSubscription.unsubscribe(), 0);
        } else if (fileState.status === 'failed-processing') {
          this.onError(new Error('Failed to process'));
          setTimeout(() => uploadingFileStateSubscription.unsubscribe(), 0);
        } else if (fileState.status === 'error') {
          this.onError(new Error(fileState.message));
          setTimeout(() => uploadingFileStateSubscription.unsubscribe(), 0);
        }
      },
    });
    const newFileIdentifier: FileIdentifier = {
      id,
      collectionName,
      mediaItemType: 'file',
    };
    onUploadStart(newFileIdentifier);
  };

  onCancel = () => {
    const { onFinish } = this.props;
    onFinish();
  };

  onError = (error: any) => {
    this.setState({
      error,
    });
  };

  renderLoading = () => {
    return (
      <SpinnerWrapper>
        <Spinner size="large" invertColor={true} />
      </SpinnerWrapper>
    );
  };

  private renderWithIntl(content: JSX.Element) {
    return this.context.intl ? (
      content
    ) : (
      <IntlProvider locale="en">{content}</IntlProvider>
    );
  }

  renderEditor = (imageUrl: string) => {
    return this.renderWithIntl(
      <EditorView
        imageUrl={imageUrl}
        onSave={this.onSave}
        onCancel={this.onCancel}
        onError={this.onError}
      />,
    );
  };

  renderError = (error: any) => {
    const { onFinish } = this.props;
    return this.renderWithIntl(
      <ErrorView message={error} onCancel={onFinish} />,
    );
  };

  render() {
    const { imageUrl, error } = this.state;
    const content = error
      ? this.renderError(error)
      : imageUrl
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
