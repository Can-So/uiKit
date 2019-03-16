import * as React from 'react';
import Navigation, { AkSearchDrawer } from '@findable/navigation';

import BasicQuickSearch from './utils/BasicQuickSearch';

const noop = () => {};

export default () => (
  <Navigation
    drawers={[
      <AkSearchDrawer
        backIcon={null}
        isOpen
        key="search"
        onBackButton={noop}
        primaryIcon={null}
      >
        <BasicQuickSearch />
      </AkSearchDrawer>,
    ]}
  />
);
