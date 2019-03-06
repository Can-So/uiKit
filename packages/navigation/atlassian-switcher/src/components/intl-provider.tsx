import * as React from 'react';
import { IntlProvider } from 'react-intl';
import * as untypedI18n from '../i18n';

const i18n: { [index: string]: Object | undefined } = untypedI18n;

const getCodesFromLocale = (locale: string) => {
  const [, language, country] = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
  return [language.toLowerCase(), country.toUpperCase()];
};

interface SwitcherIntlProviderProps {
  children: React.ReactElement<any>;
  locale?: string;
}

export default ({ children, locale = 'en' }: SwitcherIntlProviderProps) => {
  const [language, country] = getCodesFromLocale(locale);
  const messages = i18n[`${language}_${country}`] || i18n[language] || i18n.en;

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};
