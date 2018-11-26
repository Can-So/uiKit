import { IntlProvider, intlShape } from 'react-intl';
import { mount, ReactWrapper } from 'enzyme';
import { ReactElement } from 'react';

export const mountWithIntlContext = (
  component: ReactElement<any>,
  reactContext?: Object,
  childContextTypes?: Object,
): ReactWrapper => {
  const intlProvider = new IntlProvider({
    locale: 'en',
    messages: {},
  });
  const intl = intlProvider.getChildContext().intl;

  return mount(component, {
    context: { intl, ...reactContext },
    childContextTypes: { intl: intlShape, ...childContextTypes },
  });
};
