import * as classnames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';
import * as styles from './styles';

export interface Props {
  id: string;
  title: string;
  className?: string;
}

export default class EmojiPickerCategoryHeading extends PureComponent<
  Props,
  {}
> {
  render() {
    const { id, title, className } = this.props;

    return (
      <div id={id} data-category-id={id} className={classnames(className)}>
        <div className={styles.emojiCategoryTitle}>
          <FormattedMessage {...messages[title]} />
        </div>
      </div>
    );
  }
}
