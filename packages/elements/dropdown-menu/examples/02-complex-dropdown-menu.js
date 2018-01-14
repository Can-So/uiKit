// @flow

import React from 'react';
import DropdownMenu, {
  DropdownItemGroupRadio,
  DropdownItemRadio,
} from '../src';

export default () => (
  <DropdownMenu
    trigger="Choices"
    triggerType="button"
    shouldFlip={false}
    position="right middle"
    onOpenChange={e => console.log('dropdown opened', e)}
  >
    <DropdownItemGroupRadio id="cities-aus" title="Australia">
      <DropdownItemRadio id="sydney">Sydney</DropdownItemRadio>
    </DropdownItemGroupRadio>
    <DropdownItemGroupRadio id="cities-usa" title="United States">
      <DropdownItemRadio id="san-francisco">San Francisco</DropdownItemRadio>
      <DropdownItemRadio id="austin">Austin</DropdownItemRadio>
    </DropdownItemGroupRadio>
    <DropdownItemGroupRadio id="cities-elsewhere" title="Elsewhere">
      <DropdownItemRadio id="amsterdam">Amsterdam</DropdownItemRadio>
      <DropdownItemRadio id="yokohama">Yokohama</DropdownItemRadio>
      <DropdownItemRadio id="manila">Manila</DropdownItemRadio>
    </DropdownItemGroupRadio>
  </DropdownMenu>
);
