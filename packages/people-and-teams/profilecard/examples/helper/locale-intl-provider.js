// @flow
import React, { type Element as ReactElement } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import * as es from 'react-intl/locale-data/es';
import * as en from 'react-intl/locale-data/en';

addLocaleData(en, es);

type Props = {
  locale?: string,
  children: ReactElement<*>,
};

const LocaleIntlProvider = (props: Props) => {
  const { locale = 'en', children } = props;

  return (
    <IntlProvider key={locale} locale={locale}>
      {children}
    </IntlProvider>
  );
};

export default LocaleIntlProvider;
