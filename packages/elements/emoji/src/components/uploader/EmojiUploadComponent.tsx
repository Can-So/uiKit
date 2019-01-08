import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import * as classNames from 'classnames';

import * as styles from './styles';

import { EmojiUpload } from '../../types';
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
}

export default class EmojiUploadComponent extends PureComponent<Props, State> {
  private emojiUploadPicker;

  constructor(props: Props) {
    super(props);
    const { emojiProvider } = props;

    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.prepareForUpload();
    }

    this.state = {};
  }

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

    const formattedErrorMessage = uploadErrorMessage ? (
      <FormattedMessage {...uploadErrorMessage} />
    ) : null;

    return (
      <div className={classNames([styles.emojiUploadFooter])}>
        <EmojiUploadPicker
          ref={emojiUploadPicker => {
            this.emojiUploadPicker = emojiUploadPicker;
          }}
          onUploadCancelled={this.onUploadCancelled}
          onUploadEmoji={this.onUploadEmoji}
          errorMessage={formattedErrorMessage}
        />
      </div>
    );
  };

  render() {
    return (
      <div
        className={classNames([styles.emojiUploadWidget])}
        ref={this.props.onUploadRef}
      >
        {this.getUploadPicker()}
      </div>
    );
  }
}
