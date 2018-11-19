// @flow

import React from 'react';
import AsyncLayoutManagerWithViewController from '../../index';
import ViewRenderer, { TypedItemsRenderer } from '../../../../../renderer';

const noop = () => null;

class CustomViewRenderer extends TypedItemsRenderer<
  { type: 'Foo', id: string } | { type: 'Bar', id: string },
> {}

<AsyncLayoutManagerWithViewController
  globalNavigation={noop}
  containerSkeleton={noop}
  viewRenderer={noop}
>
  Page
</AsyncLayoutManagerWithViewController>;

<AsyncLayoutManagerWithViewController
  globalNavigation={noop}
  containerSkeleton={noop}
  viewRenderer={ViewRenderer}
>
  Page
</AsyncLayoutManagerWithViewController>;

<AsyncLayoutManagerWithViewController
  globalNavigation={noop}
  containerSkeleton={noop}
  viewRenderer={CustomViewRenderer}
>
  Page
</AsyncLayoutManagerWithViewController>;

// $ExpectError - missing children prop
<AsyncLayoutManagerWithViewController
  globalNavigation={noop}
  containerSkeleton={noop}
  viewRenderer={noop}
/>;

// $ExpectError - missing globalNavigation prop
<AsyncLayoutManagerWithViewController>
  Page
</AsyncLayoutManagerWithViewController>;
