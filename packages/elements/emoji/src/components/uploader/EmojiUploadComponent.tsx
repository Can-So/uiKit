import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import * as classNames from 'classnames';

import * as styles from './styles';

import { EmojiUpload } from '../../types';
import { EmojiContext } from '../common/internal-types';
import { EmojiProvider, supportsUploadFeature } from '../../api/EmojiResource';
import { FireAnalyticsEvent } from '@atlaskit/analytics';
import EmojiUploadPicker from '../common/EmojiUploadPicker';

import { messages } from '../i18n';

export interface UploadRefHandler {
  (ref: HTMLDivElement): void;
}

export interface Props {
  emojiProvider: EmojiProvider;
  onUploadRef?: UploadRefHandler;
  firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}

export interface State {
  uploadErrorMessage?: FormattedMessage.MessageDescriptor;
  uploadSupported: boolean;
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
            uploadErrorMessage: messages.emojiUploadFailed,
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

  private getUploadPicker = () => {
    const { uploadErrorMessage } = this.state;

    const previewFooterClassnames = classNames([styles.emojiUploadFooter]);

    const formattedErrorMessage = uploadErrorMessage ? (
      <FormattedMessage {...uploadErrorMessage} />
    ) : null;

    return (
      <div className={previewFooterClassnames}>
        <EmojiUploadPicker
          ref={emojiUploadPicker => {
            this.emojiUploadPicker = emojiUploadPicker;
          }}
          onUploadCancelled={this.onUploadCancelled}
          onUploadEmoji={this.onUploadEmoji}
          onFileChosen={this.onFileChosen}
          errorMessage={formattedErrorMessage}
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
        ref={this.props.onUploadRef}
        data-emoji-picker-container
      >
        {this.getUploadPicker()}
      </div>
    );
  }
}
