// @flow
import React from 'react';

import Select from './Select';
import { RadioOption } from './components';

const RadioSelect = ({ components, ...props }: any) => (
  <Select
    {...props}
    isMulti={false}
    components={{ ...components, Option: RadioOption }}
  />
);

export default RadioSelect;
