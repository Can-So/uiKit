// @flow

import React from 'react';
import LayoutManagerWithViewController from '../../index';

<LayoutManagerWithViewController globalNavigation={() => null}>
  Page
</LayoutManagerWithViewController>;

// $ExpectError - missing children prop
<LayoutManagerWithViewController globalNavigation={() => null} />;

// $ExpectError - missing globalNavigation prop
<LayoutManagerWithViewController>Page</LayoutManagerWithViewController>;
