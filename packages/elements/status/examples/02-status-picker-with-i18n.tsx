import * as React from 'react';
import { StatusPicker } from '../src';
import { IntlProvider, addLocaleData } from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import fr from '../src/i18n/fr';

addLocaleData(frLocaleData);

export default () => (
  <div style={{ width: '225px' }}>
    <IntlProvider locale="fr" messages={fr}>
      <StatusPicker
        text={'In progress'}
        selectedColor={'green'}
        onTextChanged={t => console.log(`Text changed: ${t}`)}
        onColorClick={c => console.log(`Color clicked: ${c}`)}
        onEnter={() => console.log(`Enter pressed`)}
      />
    </IntlProvider>
  </div>
);
