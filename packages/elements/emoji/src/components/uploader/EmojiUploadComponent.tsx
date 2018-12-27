import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';

import { analyticsEmojiPrefix } from '../../constants';
import {
  OptionalEmojiDescriptionWithVariations,
  EmojiUpload,
} from '../../types';
import { EmojiContext } from '../common/internal-types';
import { EmojiProvider, supportsUploadFeature } from '../../api/EmojiResource';
import { FireAnalyticsEvent } from '@atlaskit/analytics';
import EmojiUploadPicker from '../common/EmojiUploadPicker';

export interface PickerRefHandler {
  (ref: any): any;
}

export interface Props {
  emojiProvider: EmojiProvider;
  onPickerRef?: PickerRefHandler;
  firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}

export interface State {
  toneEmoji?: OptionalEmojiDescriptionWithVariations;
  uploadErrorMessage?: string;
  uploadSupported: boolean;
  uploading: boolean;
  // the picker is considered loaded when at least 1 set of emojis have loaded
  loading: boolean;
  showUploadButton: boolean;
}

export default class EmojiUploadComponent extends PureComponent<Props, State> {
  static childContextTypes = {
    emoji: PropTypes.object,
  };

  constructor(props: Props) {
    super(props);
    const { emojiProvider } = props;

    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.prepareForUpload();
    }

    this.state = {
      loading: true,
      uploadSupported: false,
      uploading: true,
      showUploadButton: true,
    };

    this.openTime = 0;
  }

  openTime: number;

  getChildContext(): EmojiContext {
    return {
      emoji: {
        emojiProvider: this.props.emojiProvider,
      },
    };
  }

  componentWillMount() {
    this.openTime = Date.now();
    // this.fireAnalytics('open');
  }

  componentDidMount() {
    const { emojiProvider } = this.props;
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.isUploadSupported().then(this.onUploadSupported);
    }
  }

  componentWillUnmount() {
    // this.fireAnalytics('close');
  }

  componentWillReceiveProps(nextProps: Props) {
    const prevEmojiProvider = this.props.emojiProvider;
    const nextEmojiProvider = nextProps.emojiProvider;
    if (prevEmojiProvider !== nextEmojiProvider) {
      if (supportsUploadFeature(nextEmojiProvider)) {
        nextEmojiProvider.isUploadSupported().then(this.onUploadSupported);
      }
    }
  }

  onFileChosen = () => {
    this.fireAnalytics('upload.file.selected');
  };

  private fireAnalytics = (eventName: string, data: any = {}): void => {
    const { firePrivateAnalyticsEvent } = this.props;

    if (firePrivateAnalyticsEvent) {
      firePrivateAnalyticsEvent(`${analyticsEmojiPrefix}.${eventName}`, data);
    }
  };

  private calculateElapsedTime = () => {
    return Date.now() - this.openTime;
  };

  private onUploadSupported = (supported: boolean) => {
    this.setState({
      uploadSupported: supported,
    });
  };

  private onUploadEmoji = (upload: EmojiUpload) => {
    const { emojiProvider } = this.props;
    this.setState({
      uploadErrorMessage: undefined, // clear previous errors
    });
    this.fireAnalytics('upload.start');
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider
        .uploadCustomEmoji(upload)
        .then(() => {
          this.setState({
            uploading: false,
          });
          this.fireAnalytics('upload.successful', {
            duration: this.calculateElapsedTime(),
          });
          this.primeUpload();
        })
        .catch(err => {
          this.setState({
            uploadErrorMessage: 'Upload failed',
          });
          // tslint:disable-next-line
          console.error('Unable to upload emoji', err);
          this.fireAnalytics('upload.failed');
        });
    }
  };

  private onUploadCancelled = () => {
    this.setState({
      uploading: false,
      uploadErrorMessage: undefined,
    });
    this.fireAnalytics('upload.cancel');
    this.primeUpload();
  };

  private handlePickerRef = (ref: any) => {
    if (this.props.onPickerRef) {
      this.props.onPickerRef(ref);
    }
  };

  private primeUpload = () => {
    const { emojiProvider } = this.props;
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.prepareForUpload();
    }

    this.setState({
      uploadErrorMessage: undefined,
      uploading: true,
    });
  };

  private getFooter = () => {
    const { uploadErrorMessage, uploading } = this.state;

    const previewFooterClassnames = classNames([styles.emojiPickerFooter]);

    const myUploadEmoji = (emoji: EmojiUpload) => {
      this.onUploadEmoji(emoji);
      this.primeUpload();
    };

    if (uploading) {
      return (
        <div className={previewFooterClassnames}>
          <EmojiUploadPicker
            onUploadCancelled={this.onUploadCancelled}
            onUploadEmoji={myUploadEmoji}
            onFileChosen={this.onFileChosen}
            errorMessage={uploadErrorMessage}
            initialUploadName=""
          />
        </div>
      );
    }
  };

  render() {
    const classes = [styles.emojiUploadWidget];

    return (
      <div
        className={classNames(classes)}
        ref={this.handlePickerRef}
        data-emoji-picker-container
      >
        {this.getFooter()}
      </div>
    );
  }
}
