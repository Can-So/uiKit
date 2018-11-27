// @flow

import React from 'react';

import Item, { ItemBase } from '../../index';
import { create } from 'domain';

const hocProvidedProps = {
  createAnalyticsEvent: (() => null: any),
};

/** ItemBase */
<ItemBase {...hocProvidedProps} />;
<ItemBase {...hocProvidedProps} component={() => null} />;

// $ExpectError - id should be string
<ItemBase id={5} />;
// $ExpectError - component should be component
<ItemBase component={null} />;

/** Item */
<Item />;
<Item component={() => null} />;

// $ExpectError - id should be string
<Item id={5} />;
// $ExpectError - id should be string
<Item component={null} />;
