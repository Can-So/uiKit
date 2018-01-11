// @flow
import React from 'react';
import Select from '../src';
import type { GroupType } from '../src/types';

const selectItems: Array<GroupType> = [
  {
    items: [
      { content: 'Sydney', value: 'city_1' },
      { content: 'Canberra', value: 'city_2' },
      { content: 'Melbourne', value: 'city_3' },
      { content: 'Perth', value: 'city_4', isDisabled: true },
      { content: 'Some city with spaces', value: 'city_5' },
      { content: 'Some city with another spaces', value: 'city_6' },
    ],
  },
];

const items = selectItems[0].items;
const defaultSelected = [items[0], items[1]];

export default () => (
  <Select
    defaultSelected={defaultSelected}
    items={selectItems}
    label="Choose your favourite"
    placeholder="Australia"
    name="test"
    onSelectedChange={item => {
      console.log(item);
    }}
    shouldFitContainer
  />
);
