// @flow

import React from 'react';
import AsyncLayoutManagerWithViewController from '../../index';
import ItemsRenderer, { TypedItemsRenderer } from '../../../../../renderer';

const noop = () => null;

class CustomItemsRenderer extends TypedItemsRenderer<
  { type: 'Foo', id: string } | { type: 'Bar', id: string },
> {}

<AsyncLayoutManagerWithViewController
  globalNavigation={noop}
  containerSkeleton={noop}
  itemsRenderer={noop}
>
  Page
</AsyncLayoutManagerWithViewController>;

<AsyncLayoutManagerWithViewController
  globalNavigation={noop}
  containerSkeleton={noop}
  itemsRenderer={ItemsRenderer}
>
  Page
</AsyncLayoutManagerWithViewController>;

<AsyncLayoutManagerWithViewController
  globalNavigation={noop}
  containerSkeleton={noop}
  itemsRenderer={CustomItemsRenderer}
>
  Page
</AsyncLayoutManagerWithViewController>;

// $ExpectError - missing children prop
<AsyncLayoutManagerWithViewController
  globalNavigation={noop}
  containerSkeleton={noop}
  itemsRenderer={noop}
/>;

// $ExpectError - missing globalNavigation prop
<AsyncLayoutManagerWithViewController>
  Page
</AsyncLayoutManagerWithViewController>;
