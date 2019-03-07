import * as React from 'react';
import { IntlProvider, injectIntl, InjectedIntlProps } from 'react-intl';
import * as untypedI18n from '../i18n';

const i18n: { [index: string]: Object | undefined } = untypedI18n;

const getCodesFromLocale = (locale: string) => {
  const [, language, country] = /([a-z]*)[_-]?([A-Z]*)/i.exec(locale || '');
  return [language.toLowerCase(), country.toUpperCase()];
};

interface SwitcherIntlProviderType {
  children: React.ReactElement<any>;
}

const SwitcherIntlProdiver = ({
  children,
  intl,
}: SwitcherIntlProviderType & InjectedIntlProps) => {
  const [language, country] = getCodesFromLocale(intl.locale.toString());
  const messages = i18n[`${language}_${country}`] || i18n[language] || i18n.en;

  return <IntlProvider messages={messages}>{children}</IntlProvider>;
};

export default injectIntl<SwitcherIntlProviderType>(SwitcherIntlProdiver);
