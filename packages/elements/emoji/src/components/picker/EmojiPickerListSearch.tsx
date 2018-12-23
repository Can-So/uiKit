import * as React from 'react';
import { PureComponent } from 'react';
import AkFieldBase from '@atlaskit/field-base';
import SearchIcon from '@atlaskit/icon/glyph/search';

import * as styles from './styles';
import { Styles } from '../../types';
import { messages } from '../i18n';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface Props {
  style?: Styles;
  query?: string;
  onChange: any;
}

interface InputSelection {
  selectionStart: number;
  selectionEnd: number;
  selectionDirection?: string;
}

class EmojiPickerListSearch extends PureComponent<Props & InjectedIntlProps> {
  static defaultProps = {
    style: {},
  };

  private inputRef: any;
  private inputSelection?: InputSelection;

  private onBlur = e => {
    const activeElement = document.activeElement;
    // Input lost focus to emoji picker container (happens in IE11 when updating search results)
    // See FS-2111
    if (
      activeElement instanceof HTMLElement &&
      activeElement.getAttribute('data-emoji-picker-container')
    ) {
      this.restoreInputFocus();
    }
  };

  private onChange = e => {
    this.saveInputSelection();
    this.props.onChange(e);
  };

  private saveInputSelection() {
    this.inputSelection = undefined;
    if (this.inputRef) {
      const {
        selectionStart,
        selectionEnd,
        selectionDirection,
      } = this.inputRef;
      if (selectionStart !== undefined) {
        this.inputSelection = {
          selectionStart,
          selectionEnd,
          selectionDirection,
        };
      }
    }
  }

  private restoreInputFocus() {
    this.focusInput();
    if (
      this.inputSelection &&
      this.inputRef &&
      this.inputRef.setSelectionRange
    ) {
      const {
        selectionStart,
        selectionEnd,
        selectionDirection,
      } = this.inputSelection;
      this.inputRef.setSelectionRange(
        selectionStart,
        selectionEnd,
        selectionDirection,
      );
    }
  }

  private focusInput = () => {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  private handleInputRef = input => {
    if (input) {
      // Defer focus so it give some time to position the popup before
      // setting the focus to search input.
      // see FS-2056
      this.inputRef = input;
      window.setTimeout(this.focusInput);
    }
  };

  render() {
    const {
      style,
      query,
      intl: { formatMessage },
    } = this.props;

    return (
      <div className={styles.pickerSearch} style={style}>
        <AkFieldBase
          appearance="standard"
          label={formatMessage(messages.searchLabel)}
          isCompact={true}
          isLabelHidden={true}
          isFitContainerWidthEnabled={true}
        >
          <span className={styles.searchIcon}>
            <SearchIcon label={formatMessage(messages.searchLabel)} />
          </span>
          <input
            className={styles.input}
            autoComplete="off"
            disabled={false}
            name="search"
            placeholder={`${formatMessage(messages.searchLabel)}...`}
            required={false}
            onChange={this.onChange}
            value={query || ''}
            ref={this.handleInputRef}
            onBlur={this.onBlur}
          />
        </AkFieldBase>
      </div>
    );
  }
}

export default injectIntl(EmojiPickerListSearch);
