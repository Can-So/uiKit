import React, { PureComponent } from 'react';
import { IntlProvider, injectIntl, InjectedIntlProps } from 'react-intl';
import { getMessagesForLocale } from '../internal/i18n-util';
import type { MessageIntlProviderProps } from '../types';

class MessagesIntlProvider extends PureComponent<
  MessageIntlProviderProps & InjectedIntlProps,
> {
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
