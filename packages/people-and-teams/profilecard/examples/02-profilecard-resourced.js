// @flow
import React from 'react';
import AkProfilecardResourced from '../src';
import { getMockProfileClient } from './helper/util';
import LocaleIntlProvider from './helper/locale-intl-provider';

const mockClient = getMockProfileClient(10, 0);
// With a real client this would look like:
// const client = new AkProfileClient({ url: 'http://api/endpoint' });

export default function Example() {
  return (
    <LocaleIntlProvider>
      <AkProfilecardResourced
        userId="1"
        cloudId="dummy-cloud"
        resourceClient={mockClient}
        actions={[
          {
            label: 'View profile',
            id: 'view-profile',
            callback: () => {},
          },
        ]}
      />
    </LocaleIntlProvider>
  );
}
