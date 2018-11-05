// @flow

import React from 'react';

import Item, { ItemBase } from '../../index';

// Valid usage
<ItemBase />;
<ItemBase component={() => null} />;
<Item />;
<Item component={() => null} />;

// Invalid usage
// $ExpectError - id should be string
<ItemBase id={5} />;
// $ExpectError - component should be component
<ItemBase component={null} />;
// $ExpectError - id should be string
<Item id={5} />;
// $ExpectError - component should be component
<Item component={null} />;
