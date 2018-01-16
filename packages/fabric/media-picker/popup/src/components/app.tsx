import * as React from 'react';
import { Component } from 'react';
import { Dispatch, Store } from 'redux';
import { connect, Provider } from 'react-redux';

import { AuthProvider, Context, ContextFactory } from '@atlaskit/media-core';
import ModalDialog from '@atlaskit/modal-dialog';

import { ServiceName, State } from '../domain';

import {
  BinaryUploader as MpBinary,
  Browser as MpBrowser,
  Dropzone as MpDropzone,
} from '../../../src';

/* Components */
import Footer from './footer/footer';
import Sidebar from './sidebar/sidebar';
import UploadView from './views/upload/upload';
import GiphyView from './views/giphy/giphyView';
import Browser from './views/browser/browser';
import { Dropzone } from './dropzone/dropzone';
import MainEditorView from './views/editor/mainEditorView';

/* Configs */
import { RECENTS_COLLECTION } from '../config';

/* actions */
import { startApp } from '../actions/startApp';
import { hidePopup } from '../actions/hidePopup';
import { fileUploadsStart } from '../actions/fileUploadsStart';
import { fileUploadPreviewUpdate } from '../actions/fileUploadPreviewUpdate';
import { fileUploadProgress } from '../actions/fileUploadProgress';
import { fileUploadProcessingStart } from '../actions/fileUploadProcessingStart';
import { fileUploadEnd } from '../actions/fileUploadEnd';
import { fileUploadError } from '../actions/fileUploadError';
import { MediaPicker } from '../../../src';
import PassContext from './passContext';
import {
  UploadsStartEventPayload,
  UploadPreviewUpdateEventPayload,
  UploadStatusUpdateEventPayload,
  UploadProcessingEventPayload,
  UploadEndEventPayload,
  UploadErrorEventPayload,
} from '../../../src/domain/uploadEvent';
import { MediaPickerPopupWrapper, SidebarWrapper, ViewWrapper } from './styled';

export interface AppStateProps {
  readonly apiUrl: string;
  readonly selectedServiceName: ServiceName;
  readonly userAuthProvider: AuthProvider;
  readonly isVisible: boolean;
}

export interface AppDispatchProps {
  readonly onStartApp: (onCancelUpload: (uploadId: string) => void) => void;
  readonly onClose: () => void;
  readonly onUploadsStart: (payload: UploadsStartEventPayload) => void;
  readonly onUploadPreviewUpdate: (
    payload: UploadPreviewUpdateEventPayload,
  ) => void;
  readonly onUploadStatusUpdate: (
    payload: UploadStatusUpdateEventPayload,
  ) => void;
  readonly onUploadProcessing: (payload: UploadProcessingEventPayload) => void;
  readonly onUploadEnd: (payload: UploadEndEventPayload) => void;
  readonly onUploadError: (payload: UploadErrorEventPayload) => void;
}

export interface AppOwnProps {
  store: Store<State>;
}

export type AppProps = AppStateProps & AppOwnProps & AppDispatchProps;

export interface AppState {
  readonly isDropzoneActive: boolean;
}

export class App extends Component<AppProps, AppState> {
  private readonly mpBrowser: MpBrowser;
  private readonly mpDropzone: MpDropzone;
  private readonly mpBinary: MpBinary;
  private readonly mpContext: Context;

  constructor(props: AppProps) {
    super(props);
    const {
      apiUrl,
      userAuthProvider,
      onStartApp,
      onUploadsStart,
      onUploadPreviewUpdate,
      onUploadStatusUpdate,
      onUploadProcessing,
      onUploadEnd,
      onUploadError,
    } = props;

    this.state = {
      isDropzoneActive: false,
    };

    const mpConfig = {
      apiUrl,
      authProvider: userAuthProvider,
      uploadParams: {
        collection: RECENTS_COLLECTION,
      },
    };

    this.mpBrowser = MediaPicker('browser', mpConfig, { multiple: true });
    this.mpBrowser.on('uploads-start', onUploadsStart);
    this.mpBrowser.on('upload-preview-update', onUploadPreviewUpdate);
    this.mpBrowser.on('upload-status-update', onUploadStatusUpdate);
    this.mpBrowser.on('upload-processing', onUploadProcessing);
    this.mpBrowser.on('upload-end', onUploadEnd);
    this.mpBrowser.on('upload-error', onUploadError);

    this.mpDropzone = MediaPicker('dropzone', mpConfig, { headless: true });
    this.mpDropzone.on('drag-enter', () => this.setDropzoneActive(true));
    this.mpDropzone.on('drag-leave', () => this.setDropzoneActive(false));
    this.mpDropzone.on('uploads-start', onUploadsStart);
    this.mpDropzone.on('upload-preview-update', onUploadPreviewUpdate);
    this.mpDropzone.on('upload-status-update', onUploadStatusUpdate);
    this.mpDropzone.on('upload-processing', onUploadProcessing);
    this.mpDropzone.on('upload-end', onUploadEnd);
    this.mpDropzone.on('upload-error', onUploadError);
    this.mpDropzone.activate();

    this.mpBinary = MediaPicker('binary', mpConfig);
    this.mpBinary.on('uploads-start', onUploadsStart);
    this.mpBinary.on('upload-preview-update', onUploadPreviewUpdate);
    this.mpBinary.on('upload-status-update', onUploadStatusUpdate);
    this.mpBinary.on('upload-processing', onUploadProcessing);
    this.mpBinary.on('upload-end', onUploadEnd);
    this.mpBinary.on('upload-error', onUploadError);

    this.mpContext = ContextFactory.create({
      serviceHost: apiUrl,
      authProvider: userAuthProvider,
    });

    onStartApp(uploadId => {
      this.mpBrowser.cancel(uploadId);
      this.mpDropzone.cancel(uploadId);
    });
  }

  render() {
    const { selectedServiceName, isVisible, onClose, store } = this.props;
    const { isDropzoneActive } = this.state;

    if (!isVisible) {
      return null;
    }

    return (
      <Provider store={store}>
        <ModalDialog onClose={onClose} width="x-large" isChromeless={true}>
          <PassContext store={store}>
            <MediaPickerPopupWrapper>
              <SidebarWrapper>
                <Sidebar />
              </SidebarWrapper>
              <ViewWrapper>
                {this.renderCurrentView(selectedServiceName)}
                <Footer />
              </ViewWrapper>
              <Dropzone isActive={isDropzoneActive} />
              <MainEditorView binaryUploader={this.mpBinary} />
            </MediaPickerPopupWrapper>
          </PassContext>
        </ModalDialog>
      </Provider>
    );
  }

  private renderCurrentView(selectedServiceName: ServiceName): JSX.Element {
    if (selectedServiceName === 'upload') {
      return (
        <UploadView
          mpBrowser={this.mpBrowser}
          context={this.mpContext}
          recentsCollection={RECENTS_COLLECTION}
        />
      );
    } else if (selectedServiceName === 'giphy') {
      return <GiphyView />;
    } else {
      return <Browser />;
    }
  }

  private setDropzoneActive = (isDropzoneActive: boolean) => {
    this.setState({
      isDropzoneActive,
    });
  };
}

const mapStateToProps = ({
  apiUrl,
  userAuthProvider,
  view,
}: State): AppStateProps => ({
  apiUrl,
  userAuthProvider,
  selectedServiceName: view.service.name,
  isVisible: view.isVisible,
});

const mapDispatchToProps = (dispatch: Dispatch<State>): AppDispatchProps => ({
  onStartApp: onCancelUpload => dispatch(startApp({ onCancelUpload })),
  onUploadsStart: ({ files }) =>
    dispatch(
      fileUploadsStart({
        files,
      }),
    ),
  onClose: () => dispatch(hidePopup()),
  onUploadPreviewUpdate: ({ file, preview }) => {
    dispatch(
      fileUploadPreviewUpdate({
        file,
        preview,
      }),
    );
  },
  onUploadStatusUpdate: ({ file, progress }) =>
    dispatch(
      fileUploadProgress({
        file,
        progress,
      }),
    ),
  onUploadProcessing: ({ file }) =>
    dispatch(
      fileUploadProcessingStart({
        file,
      }),
    ),
  onUploadEnd: ({ file, public: publicFileDetails }) =>
    dispatch(
      fileUploadEnd({
        file,
        public: publicFileDetails,
      }),
    ),
  onUploadError: ({ file, error }) =>
    dispatch(
      fileUploadError({
        file,
        error,
      }),
    ),
});

export default connect<AppStateProps, AppDispatchProps, AppOwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
