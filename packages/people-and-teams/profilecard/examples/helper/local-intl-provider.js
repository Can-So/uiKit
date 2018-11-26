import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as es from 'react-intl/locale-data/es';
import * as en from 'react-intl/locale-data/en';

addLocaleData(en, es);

const LocaleIntlProvider = ({ locale = 'en', children }) => (
  <IntlProvider key={locale} locale={locale}>
    {children}
  </IntlProvider>
);

export default LocaleIntlProvider;
