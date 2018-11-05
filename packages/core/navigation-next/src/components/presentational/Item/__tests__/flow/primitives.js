// @flow

import React from 'react';

import ItemPrimitive, { ItemPrimitiveBase } from '../../primitives';

const hocProvidedProps = {
  theme: ({
    mode: {
      item: () => ({
        container: {},
        product: {},
      }),
    },
    context: 'product',
  }: any),
};

/**
 * ItemPrimitiveBase
 */
<ItemPrimitiveBase {...hocProvidedProps} />;
<ItemPrimitiveBase {...hocProvidedProps} component={() => null} />;

// $ExpectError - id should be string
<ItemPrimitiveBase id={5} />;
// $ExpectError - component should be component
<ItemPrimitiveBase component={null} />;

/**
 * ItemPrimitive
 */
<ItemPrimitive />;
<ItemPrimitive component={() => null} />;

// Invalid usage
// $ExpectError - id should be string
<ItemPrimitive id={5} />;
// $ExpectError - component should be component
<ItemPrimitive component={null} />;
