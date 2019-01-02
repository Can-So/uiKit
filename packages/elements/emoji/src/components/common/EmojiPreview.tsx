import * as React from 'react';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import AddIcon from '@atlaskit/icon/glyph/add';
import AkButton from '@atlaskit/button';
import * as styles from './styles';
import EmojiButton from '../../components/common/EmojiButton';
import CachingEmoji from '../../components/common/CachingEmoji';
import ToneSelector from './ToneSelector';
import {
  EmojiDescription,
  EmojiDescriptionWithVariations,
  OnToneSelected,
  ToneSelection,
} from '../../types';
import { messages } from '../i18n';
import { FormattedMessage } from 'react-intl';

export interface Props {
  emoji?: EmojiDescription;
  toneEmoji?: EmojiDescriptionWithVariations;
  selectedTone?: ToneSelection;
  onToneSelected?: OnToneSelected;
  uploadEnabled?: boolean;
  onOpenUpload?: () => void;
}

export interface State {
  selectingTone: boolean;
}

export default class EmojiPreview extends PureComponent<Props, State> {
  state = {
    selectingTone: false,
  };

  onToneButtonClick = () => {
    this.setState({
      selectingTone: true,
    });
  };

  onToneSelected = toneValue => {
    this.setState({
      selectingTone: false,
    });

    if (this.props.onToneSelected) {
      this.props.onToneSelected(toneValue);
    }
  };

  onMouseLeave = () => {
    this.setState({
      selectingTone: false,
    });
  };

  renderTones() {
    const { toneEmoji, selectedTone } = this.props;
    if (!toneEmoji) {
      return null;
    }

    if (this.state.selectingTone) {
      return (
        <div className={styles.toneSelectorContainer}>
          <ToneSelector
            emoji={toneEmoji}
            onToneSelected={this.onToneSelected}
          />
        </div>
      );
    }

    let previewEmoji = toneEmoji;
    if (selectedTone && previewEmoji.skinVariations) {
      previewEmoji = previewEmoji.skinVariations[(selectedTone || 1) - 1];
    }

    return (
      <div className={styles.buttons}>
        <EmojiButton
          emoji={previewEmoji}
          // tslint:disable-next-line:jsx-no-lambda
          onSelected={() => this.onToneButtonClick()}
          selectOnHover={true}
        />
      </div>
    );
  }

  renderEmojiPreview() {
    const { selectingTone } = this.state;
    const { emoji, uploadEnabled } = this.props;

    if (!emoji || selectingTone || uploadEnabled) {
      return null;
    }

    const previewClasses = classNames({
      [styles.preview]: true,
      [styles.withToneSelector]: !!this.props.toneEmoji,
    });

    const previewTextClasses = classNames({
      [styles.previewText]: true,
      [styles.previewSingleLine]: !emoji.name,
    });

    return (
      <div className={previewClasses}>
        <span className={styles.previewImg}>
          <CachingEmoji emoji={emoji} />
        </span>
        <div className={previewTextClasses}>
          <span className={styles.name}>{emoji.name}</span>
          <span className={styles.shortName}>{emoji.shortName}</span>
        </div>
      </div>
    );
  }

  // note: emoji-picker-add-emoji className is used by pollinator synthetic checks
  renderAddOwnEmoji() {
    const { onOpenUpload, uploadEnabled } = this.props;
    const { selectingTone } = this.state;

    if (!uploadEnabled || selectingTone) {
      return null;
    }
    return (
      <div className={styles.AddCustomEmoji}>
        <FormattedMessage {...messages.addCustomEmojiLabel}>
          {label => (
            <AkButton
              onClick={onOpenUpload}
              iconBefore={<AddIcon label={label as string} size="small" />}
              appearance="subtle"
              className={
                styles.addCustomEmojiButton + ' emoji-picker-add-emoji'
              }
            >
              {label as string}
            </AkButton>
          )}
        </FormattedMessage>
      </div>
    );
  }

  render() {
    const sectionClasses = classNames([
      styles.emojiPreview,
      styles.emojiPreviewSection,
    ]);
    return (
      <div className={sectionClasses} onMouseLeave={this.onMouseLeave}>
        {this.renderAddOwnEmoji()}
        {this.renderEmojiPreview()}
        {this.renderTones()}
      </div>
    );
  }
}
