import * as React from 'react';
import { ChangeEvent, ChangeEventHandler, PureComponent } from 'react';

import AkFieldBase from '@atlaskit/field-base';

import { EmojiUpload } from '../../types';
import * as ImageUtil from '../../util/image';
import debug from '../../util/logger';
import * as styles from './styles';
import FileChooser from './FileChooser';
import EmojiErrorMessage from './EmojiErrorMessage';
import { UploadStatus } from './internal-types';
import EmojiUploadPreview from './EmojiUploadPreview';

export interface OnUploadEmoji {
  (upload: EmojiUpload): void;
}

export interface Props {
  onUploadEmoji: OnUploadEmoji;
  onUploadCancelled: () => void;
  onFileChosen?: (name: string) => void;
  errorMessage?: string;
  initialUploadName?: string;
}

export interface State {
  previewImage?: string;
  name?: string;
  filename?: string;
  uploadStatus?: UploadStatus;
  chooseEmojiErrorMessage?: string;
}

const disallowedReplacementsMap = new Map([
  [':', ''],
  ['!', ''],
  ['@', ''],
  ['#', ''],
  ['%', ''],
  ['^', ''],
  ['&', ''],
  ['*', ''],
  ['(', ''],
  [')', ''],
  [' ', '_'],
]);

const sanitizeName = (name: string): string => {
  // prevent / replace certain characters, allow others
  disallowedReplacementsMap.forEach((replaceWith, exclude) => {
    name = name.split(exclude).join(replaceWith);
  });
  return name;
};

const maxNameLength = 50;

const toEmojiName = (uploadName: string): string => {
  const name = uploadName.split('_').join(' ');
  return `${name.substr(0, 1).toLocaleUpperCase()}${name.substr(1)}`;
};

interface ChooseEmojiFileProps {
  name?: string;
  onChooseFile: ChangeEventHandler<any>;
  onNameChange: ChangeEventHandler<any>;
  onUploadCancelled: () => void;
  errorMessage?: string;
}

class ChooseEmojiFile extends PureComponent<ChooseEmojiFileProps, {}> {
  private onKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onUploadCancelled();
    }
  };

  render() {
    const { name = '', onChooseFile, onNameChange, errorMessage } = this.props;
    const disableChooser = !name;

    // Note: FileChooser.accept does not work in Electron due to a bug: https://product-fabric.atlassian.net/browse/FS-1626
    return (
      <div className={styles.emojiUpload}>
        <div className={styles.uploadChooseFileMessage}>
          <h5>Add your own emoji</h5>
        </div>
        <div className={styles.uploadChooseFileRow}>
          <span className={styles.uploadChooseFileEmojiName}>
            <AkFieldBase
              appearance="standard"
              isCompact={true}
              isLabelHidden={true}
              isFocused={true}
              isFitContainerWidthEnabled={true}
            >
              <input
                placeholder="Emoji name"
                maxLength={maxNameLength}
                onChange={onNameChange}
                onKeyDown={this.onKeyDown}
                value={name}
                ref="name"
                autoFocus={true}
              />
            </AkFieldBase>
          </span>
          <span className={styles.uploadChooseFileBrowse}>
            <FileChooser
              label="Choose file"
              onChange={onChooseFile}
              accept="image/png,image/jpeg,image/gif"
              isDisabled={disableChooser}
            />
          </span>
        </div>
        <div className={styles.emojiUploadBottom}>
          {!errorMessage ? (
            <p>JPG, PNG or GIF. Max size 1 MB.</p>
          ) : (
            <EmojiErrorMessage
              className={styles.emojiChooseFileErrorMessage}
              message={errorMessage}
            />
          )}
        </div>
      </div>
    );
  }
}

export default class EmojiUploadPicker extends PureComponent<Props, State> {
  state = {
    uploadStatus: UploadStatus.Waiting,
    chooseEmojiErrorMessage: undefined,
  } as State;

  constructor(props: Props) {
    super(props);
    if (props.errorMessage) {
      this.state.uploadStatus = UploadStatus.Error;
    }
    if (props.initialUploadName) {
      this.state.name = sanitizeName(props.initialUploadName);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const updatedState: State = {};
    if (nextProps.errorMessage) {
      updatedState.uploadStatus = UploadStatus.Error;
    } else {
      if (this.state.uploadStatus === UploadStatus.Error) {
        updatedState.uploadStatus = UploadStatus.Waiting;
      }
    }
    if (nextProps.initialUploadName) {
      if (!this.state.name) {
        updatedState.name = sanitizeName(nextProps.initialUploadName);
      }
    }
    this.setState(updatedState);
  }

  private onNameChange = (event: ChangeEvent<any>) => {
    let newName = sanitizeName(event.target.value);
    if (this.state.name !== newName) {
      this.setState({
        name: newName,
      });
    }
  };

  private onAddEmoji = () => {
    const { onUploadEmoji } = this.props;
    const { filename, name, previewImage, uploadStatus } = this.state;

    if (uploadStatus === UploadStatus.Uploading) {
      return;
    }

    if (filename && name && previewImage) {
      const notifyUpload = size => {
        const { width, height } = size;
        this.setState({
          uploadStatus: UploadStatus.Uploading,
        });

        onUploadEmoji({
          name: toEmojiName(name),
          shortName: `:${name}:`,
          filename,
          dataURL: previewImage,
          width,
          height,
        });
      };
      ImageUtil.getNaturalImageSize(previewImage)
        .then(size => {
          notifyUpload(size);
        })
        .catch(error => {
          debug('getNaturalImageSize error', error);
          // Just set arbitrary size, worse case is it may render
          // in wrong aspect ratio in some circumstances.
          notifyUpload({
            width: 32,
            height: 32,
          });
        });
    }
  };

  private errorOnUpload = (event: any): void => {
    debug('File load error: ', event);
    this.setState({
      chooseEmojiErrorMessage: 'Upload failed',
    });
    this.cancelChooseFile();
  };

  private onFileLoad = (file: File) => (f): Promise<any> => {
    return ImageUtil.parseImage(f.target.result)
      .then(() => {
        const state = {
          previewImage: f.target.result,
          filename: file.name,
        };
        this.setState(state);
      })
      .catch(() => {
        this.setState({
          chooseEmojiErrorMessage: 'Selected image is invalid',
        });
        this.cancelChooseFile();
      });
  };

  private cancelChooseFile = () => {
    this.setState({
      previewImage: undefined,
    });
  };

  private onChooseFile = (event: ChangeEvent<any>): void => {
    const files = event.target.files;

    if (files.length) {
      const { onFileChosen } = this.props;
      const reader = new FileReader();
      const file: File = files[0];

      if (ImageUtil.hasFileExceededSize(file)) {
        this.setState({
          chooseEmojiErrorMessage: 'Selected image is more than 1 MB',
        });
        this.cancelChooseFile();
        return;
      }

      reader.addEventListener('load', this.onFileLoad(file));
      reader.addEventListener('abort', this.errorOnUpload);
      reader.addEventListener('error', this.errorOnUpload);
      reader.readAsDataURL(file);
      if (onFileChosen) {
        onFileChosen(file.name);
      }
    } else {
      this.cancelChooseFile();
    }
  };

  render() {
    const { errorMessage, onUploadCancelled } = this.props;
    const {
      name,
      previewImage,
      uploadStatus,
      chooseEmojiErrorMessage,
    } = this.state;

    if (name && previewImage) {
      return (
        <EmojiUploadPreview
          errorMessage={errorMessage}
          name={name}
          onAddEmoji={this.onAddEmoji}
          onUploadCancelled={onUploadCancelled}
          previewImage={previewImage}
          uploadStatus={uploadStatus}
        />
      );
    }

    return (
      <ChooseEmojiFile
        name={name}
        onChooseFile={this.onChooseFile}
        onNameChange={this.onNameChange}
        onUploadCancelled={onUploadCancelled}
        errorMessage={chooseEmojiErrorMessage}
      />
    );
  }
}
