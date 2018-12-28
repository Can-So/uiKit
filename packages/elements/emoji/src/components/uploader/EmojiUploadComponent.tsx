import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';

import {
  OptionalEmojiDescriptionWithVariations,
  EmojiUpload,
} from '../../types';
import { EmojiContext } from '../common/internal-types';
import { EmojiProvider, supportsUploadFeature } from '../../api/EmojiResource';
import { FireAnalyticsEvent } from '@atlaskit/analytics';
import EmojiUploadPicker from '../common/EmojiUploadPicker';

export interface UploadRefHandler {
  (ref: any): any;
}

export interface Props {
  emojiProvider: EmojiProvider;
  onUploadRef?: UploadRefHandler;
  firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}

export interface State {
  toneEmoji?: OptionalEmojiDescriptionWithVariations;
  uploadErrorMessage?: string;
  uploadSupported: boolean;
  showUploadButton: boolean;
}

export default class EmojiUploadComponent extends PureComponent<Props, State> {
  static childContextTypes = {
    emoji: PropTypes.object,
  };

  private emojiUploadPicker;

  constructor(props: Props) {
    super(props);
    const { emojiProvider } = props;

    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.prepareForUpload();
    }

    this.state = {
      uploadSupported: false,
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
  }

  componentDidMount() {
    const { emojiProvider } = this.props;
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.isUploadSupported().then(this.onUploadSupported);
    }
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

  onFileChosen = () => {};

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
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider
        .uploadCustomEmoji(upload)
        .then(() => {
          this.primeUpload();
        })
        .catch(err => {
          this.setState({
            uploadErrorMessage: 'Upload failed',
          });
          // tslint:disable-next-line
          console.error('Unable to upload emoji', err);
        });
    }
  };

  private onUploadCancelled = () => {
    this.setState({
      uploadErrorMessage: undefined,
    });
    this.primeUpload();
  };

  private handleUploadRef = (ref: any) => {
    if (this.props.onUploadRef) {
      this.props.onUploadRef(ref);
    }
  };

  private primeUpload = () => {
    const { emojiProvider } = this.props;
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.prepareForUpload();
    }

    this.setState({
      uploadErrorMessage: undefined,
    });

    if (this.emojiUploadPicker) {
      this.emojiUploadPicker.clearUploadPicker();
    }
  };

  private getFooter = () => {
    const { uploadErrorMessage } = this.state;

    const previewFooterClassnames = classNames([styles.emojiUploadFooter]);

    return (
      <div className={previewFooterClassnames}>
        <EmojiUploadPicker
          ref={emojiUploadPicker => {
            this.emojiUploadPicker = emojiUploadPicker;
          }}
          onUploadCancelled={this.onUploadCancelled}
          onUploadEmoji={this.onUploadEmoji}
          onFileChosen={this.onFileChosen}
          errorMessage={uploadErrorMessage}
          initialUploadName=""
        />
      </div>
    );
  };

  render() {
    const classes = [styles.emojiUploadWidget];

    return (
      <div
        className={classNames(classes)}
        ref={this.handleUploadRef}
        data-emoji-picker-container
      >
        {this.getFooter()}
      </div>
    );
  }
}
