// @flow

import React from 'react';
import AsyncLayoutManagerWithViewController from '../../index';
const noop = () => null;

<AsyncLayoutManagerWithViewController
  globalNavigation={noop}
  containerSkeleton={noop}
  viewRenderer={noop}
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
