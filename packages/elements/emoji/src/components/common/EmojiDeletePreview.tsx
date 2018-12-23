import * as React from 'react';
import { Component } from 'react';
import EmojiErrorMessage from './EmojiErrorMessage';
import AkButton from '@atlaskit/button';

import { EmojiDescription } from '../../types';
import * as styles from './styles';
import CachingEmoji from './CachingEmoji';
import RetryableButton from './RetryableButton';
import { messages } from '../i18n';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

export interface OnDeleteEmoji {
  (emoji: EmojiDescription): Promise<boolean>;
}

export interface Props {
  emoji: EmojiDescription;
  onDeleteEmoji: OnDeleteEmoji;
  onCloseDelete: () => void;
  errorMessage?: string;
}

export interface State {
  loading: boolean;
  error: boolean;
}

class EmojiDeletePreview extends Component<Props & InjectedIntlProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.emoji.id !== this.props.emoji.id) {
      this.setState({ error: false });
    }
  }

  private onSubmit = () => {
    const { emoji, onDeleteEmoji, onCloseDelete } = this.props;
    if (!this.state.loading) {
      this.setState({ loading: true });
      return onDeleteEmoji(emoji).then(success => {
        if (success) {
          return onCloseDelete();
        }
        this.setState({
          loading: false,
          error: true,
        });
      });
    }
  };

  private onCancel = () => {
    this.props.onCloseDelete();
  };

  render() {
    const {
      emoji,
      intl: { formatMessage },
    } = this.props;
    const { loading, error } = this.state;

    return (
      <div className={styles.deletePreview}>
        <div className={styles.deleteText}>
          <h5>
            <FormattedMessage {...messages.deleteEmojiTitle} />
          </h5>
          <FormattedMessage
            {...messages.deleteEmojiDescription}
            values={{ 0: emoji.shortName }}
          />
        </div>
        <div className={styles.deleteFooter}>
          <CachingEmoji emoji={emoji} />
          <div className={styles.previewButtonGroup}>
            {error ? (
              <EmojiErrorMessage
                message={formatMessage(messages.deleteEmojiFailed)}
                className={styles.emojiDeleteErrorMessage}
              />
            ) : null}
            <RetryableButton
              className={styles.submitDelete}
              retryClassName={styles.submitDelete}
              label={formatMessage(messages.deleteEmojiLabel)}
              onSubmit={this.onSubmit}
              appearance="danger"
              loading={loading}
              error={error}
            />
            <AkButton appearance="subtle" onClick={this.onCancel}>
              <FormattedMessage {...messages.cancelLabel} />
            </AkButton>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(EmojiDeletePreview);
