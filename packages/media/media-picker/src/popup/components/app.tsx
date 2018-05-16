import * as React from 'react';
import { Component } from 'react';
import { Dispatch, Store } from 'redux';
import { connect, Provider } from 'react-redux';

import { Context, ContextFactory } from '@atlaskit/media-core';
import ModalDialog from '@atlaskit/modal-dialog';

import { ServiceName, State } from '../domain';

import {
  BinaryUploader as MpBinary,
  Browser as MpBrowser,
  Dropzone as MpDropzone,
} from '../..';

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
import { startApp, StartAppActionPayload } from '../actions/startApp';
import { hidePopup } from '../actions/hidePopup';
import { fileUploadsStart } from '../actions/fileUploadsStart';
import { fileUploadPreviewUpdate } from '../actions/fileUploadPreviewUpdate';
import { fileUploadProgress } from '../actions/fileUploadProgress';
import { fileUploadProcessingStart } from '../actions/fileUploadProcessingStart';
import { fileUploadEnd } from '../actions/fileUploadEnd';
import { fileUploadError } from '../actions/fileUploadError';
import { MediaPicker } from '../..';
import PassContext from './passContext';
import {
  UploadsStartEventPayload,
  UploadPreviewUpdateEventPayload,
  UploadStatusUpdateEventPayload,
  UploadProcessingEventPayload,
  UploadEndEventPayload,
  UploadErrorEventPayload,
} from '../../domain/uploadEvent';
import { MediaPickerPopupWrapper, SidebarWrapper, ViewWrapper } from './styled';

export interface AppStateProps {
  readonly selectedServiceName: ServiceName;
  readonly isVisible: boolean;
  readonly useNewUploadService?: boolean;
  readonly context: Context;
}

export interface AppDispatchProps {
  readonly onStartApp: (payload: StartAppActionPayload) => void;
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
      onStartApp,
      onUploadsStart,
      onUploadPreviewUpdate,
      onUploadStatusUpdate,
      onUploadProcessing,
      onUploadEnd,
      onUploadError,
      context,
    } = props;

    const { userAuthProvider } = context.config;

    if (!userAuthProvider) {
      throw new Error('userAuthProvider must be provided in the context');
    }
    this.state = {
      isDropzoneActive: false,
    };

    const defaultConfig = {
      uploadParams: {
        collection: RECENTS_COLLECTION,
      },
    };

    // We can't just use the given context since the Cards in the recents view needs a different authProvider
    this.mpContext = ContextFactory.create({
      serviceHost: context.config.serviceHost,
      authProvider: userAuthProvider,
    });

    this.mpBrowser = MediaPicker('browser', this.mpContext, {
      ...defaultConfig,
      multiple: true,
      useNewUploadService: this.props.useNewUploadService,
    });
    this.mpBrowser.on('uploads-start', onUploadsStart);
    this.mpBrowser.on('upload-preview-update', onUploadPreviewUpdate);
    this.mpBrowser.on('upload-status-update', onUploadStatusUpdate);
    this.mpBrowser.on('upload-processing', onUploadProcessing);
    this.mpBrowser.on('upload-end', onUploadEnd);
    this.mpBrowser.on('upload-error', onUploadError);

    this.mpDropzone = MediaPicker('dropzone', this.mpContext, {
      ...defaultConfig,
      headless: true,
      useNewUploadService: this.props.useNewUploadService,
    });
    this.mpDropzone.on('drag-enter', () => this.setDropzoneActive(true));
    this.mpDropzone.on('drag-leave', () => this.setDropzoneActive(false));
    this.mpDropzone.on('uploads-start', onUploadsStart);
    this.mpDropzone.on('upload-preview-update', onUploadPreviewUpdate);
    this.mpDropzone.on('upload-status-update', onUploadStatusUpdate);
    this.mpDropzone.on('upload-processing', onUploadProcessing);
    this.mpDropzone.on('upload-end', onUploadEnd);
    this.mpDropzone.on('upload-error', onUploadError);

    this.mpBinary = MediaPicker('binary', this.mpContext, {
      ...defaultConfig,
      useNewUploadService: this.props.useNewUploadService,
    });
    this.mpBinary.on('uploads-start', onUploadsStart);
    this.mpBinary.on('upload-preview-update', onUploadPreviewUpdate);
    this.mpBinary.on('upload-status-update', onUploadStatusUpdate);
    this.mpBinary.on('upload-processing', onUploadProcessing);
    this.mpBinary.on('upload-end', onUploadEnd);
    this.mpBinary.on('upload-error', onUploadError);

    onStartApp({
      onCancelUpload: uploadId => {
        this.mpBrowser.cancel(uploadId);
        this.mpDropzone.cancel(uploadId);
        this.mpBinary.cancel(uploadId);
      },
    });
  }

  componentWillReceiveProps({ isVisible }: Readonly<AppProps>): void {
    if (isVisible !== this.props.isVisible) {
      if (isVisible) {
        this.mpDropzone.activate();
      } else {
        this.mpDropzone.deactivate();
      }
    }
  }

  componentWillUnmount(): void {
    this.mpDropzone.deactivate();
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
  view,
  context,
  useNewUploadService,
}: State): AppStateProps => ({
  selectedServiceName: view.service.name,
  isVisible: view.isVisible,
  useNewUploadService,
  context,
});

const mapDispatchToProps = (dispatch: Dispatch<State>): AppDispatchProps => ({
  onStartApp: (payload: StartAppActionPayload) => dispatch(startApp(payload)),
  onUploadsStart: (payload: UploadsStartEventPayload) =>
    dispatch(fileUploadsStart(payload)),
  onClose: () => dispatch(hidePopup()),
  onUploadPreviewUpdate: (payload: UploadPreviewUpdateEventPayload) =>
    dispatch(fileUploadPreviewUpdate(payload)),
  onUploadStatusUpdate: (payload: UploadStatusUpdateEventPayload) =>
    dispatch(fileUploadProgress(payload)),
  onUploadProcessing: (payload: UploadProcessingEventPayload) =>
    dispatch(fileUploadProcessingStart(payload)),
  onUploadEnd: (payload: UploadEndEventPayload) =>
    dispatch(fileUploadEnd(payload)),
  onUploadError: (payload: UploadErrorEventPayload) =>
    dispatch(fileUploadError(payload)),
});

export default connect<AppStateProps, AppDispatchProps, AppOwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
