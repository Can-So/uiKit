import { deselectItem } from '../../../actions/deselectItem';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { BinaryUploader } from '../../../../components/binary';
import { State, EditorData, EditorError, FileReference } from '../../../domain';
import { ErrorView } from './errorView/errorView';
import { SpinnerView } from './spinnerView/spinnerView';
import { MainContainer } from './styles';
import { editorClose } from '../../../actions/editorClose';
import { editorShowError } from '../../../actions/editorShowError';
import { editorShowImage } from '../../../actions/editorShowImage';
// TODO [MSW-421]: re-enable code splitting once Stride support is merged
import { EditorView } from './editorView/editorView';
export interface MainEditorViewStateProps {
  readonly editorData?: EditorData;
}

export interface MainEditorViewOwnProps {
  readonly binaryUploader: BinaryUploader;
}

export interface MainEditorViewDispatchProps {
  readonly onCloseEditor: () => void;
  readonly onShowEditorError: (error: EditorError) => void;
  readonly onShowEditorImage: (
    imageUrl: string,
    originalFile?: FileReference,
  ) => void;
  readonly onDeselectFile: (fileId: string) => void;
}

export type MainEditorViewProps = MainEditorViewStateProps &
  MainEditorViewOwnProps &
  MainEditorViewDispatchProps;

export class MainEditorView extends Component<MainEditorViewProps, {}> {
  render(): JSX.Element | null {
    const { editorData } = this.props;
    if (editorData) {
      return <MainContainer>{this.renderContent(editorData)}</MainContainer>;
    } else {
      return null;
    }
  }

  private renderContent(editorData: EditorData): JSX.Element {
    const { imageUrl, originalFile, error } = editorData;

    if (error) {
      return this.renderError(error);
    } else if (imageUrl && originalFile) {
      return (
        <EditorView
          imageUrl={imageUrl}
          onSave={this.onEditorSave(originalFile)}
          onCancel={this.onCancel}
          onError={this.onEditorError}
        />
      );
    } else {
      return <SpinnerView onCancel={this.onCancel} />;
    }
  }

  private renderError({ message, retryHandler }: EditorError): JSX.Element {
    return (
      <ErrorView
        message={message}
        onRetry={retryHandler}
        onCancel={this.onCancel}
      />
    );
  }

  private onEditorError = (
    message: string,
    retryHandler?: () => void,
  ): void => {
    this.props.onShowEditorError({ message, retryHandler });
  };

  private onEditorSave = (originalFile: FileReference) => (
    image: string,
  ): void => {
    const { binaryUploader, onDeselectFile, onCloseEditor } = this.props;

    binaryUploader.upload(image, originalFile.name);
    onDeselectFile(originalFile.id);
    onCloseEditor();
  };

  private onCancel = (): void => {
    this.props.onCloseEditor();
  };
}

export default connect<{}, MainEditorViewDispatchProps, MainEditorViewOwnProps>(
  ({ editorData }: State) => ({
    editorData,
  }),
  dispatch => ({
    onShowEditorImage: (imageUrl, originalFile) =>
      dispatch(editorShowImage(imageUrl, originalFile)),
    onShowEditorError: ({ message, retryHandler }) =>
      dispatch(editorShowError(message, retryHandler)),
    onCloseEditor: () => dispatch(editorClose()),
    onDeselectFile: fileId => dispatch(deselectItem(fileId)),
  }),
)(MainEditorView);
