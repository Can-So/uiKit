// @flow

import React from 'react';

import Select from './Select';
import { CheckboxOption } from './components/input-options';

const CheckboxSelect = (props: any) => (
  <Select
    closeMenuOnSelect={false}
    hideSelectedOptions={false}
    isMulti
    components={{ Option: CheckboxOption }}
    {...props}
  />
);

export default CheckboxSelect;
