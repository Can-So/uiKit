import * as React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import MessagesIntlProvider from '../src/components/MessagesIntlProvider';

import * as fr from 'react-intl/locale-data/fr';
import * as es from 'react-intl/locale-data/es';
addLocaleData([...fr, ...es]);

const LocaleIntlProvider = ({ locale = 'en', children }) => (
  <IntlProvider key={locale} locale={locale}>
    {children}
  </IntlProvider>
);

const LocaleAndMessagesIntlProvider = ({ locale = 'en', children }) => (
  <LocaleIntlProvider key={locale} locale={locale}>
    <MessagesIntlProvider>{children}</MessagesIntlProvider>
  </LocaleIntlProvider>
);

export default LocaleIntlProvider;
export { LocaleAndMessagesIntlProvider };
