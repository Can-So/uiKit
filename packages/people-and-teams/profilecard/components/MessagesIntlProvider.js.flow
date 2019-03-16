// @flow

import React, { PureComponent } from 'react';
import { IntlProvider, injectIntl } from 'react-intl';
import { getMessagesForLocale } from '../internal/i18n-util';
import type { MessageIntlProviderProps } from '../types';

class MessagesIntlProvider extends PureComponent<MessageIntlProviderProps> {
  render() {
    const { intl, children } = this.props;

    return (
      <IntlProvider messages={getMessagesForLocale(intl.locale)}>
        {children}
      </IntlProvider>
    );
  }
}

export default injectIntl(MessagesIntlProvider);
