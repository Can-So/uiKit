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

// $ExpectError - itemsRenderer should not being passed
<LayoutManagerWithViewController
  globalNavigation={() => null}
  itemsRenderer={() => null}
>
  Page
</LayoutManagerWithViewController>;

// $ExpectError - containerSkeleton should not being passed
<LayoutManagerWithViewController
  globalNavigation={() => null}
  containerSkeleton={() => null}
>
  Page
</LayoutManagerWithViewController>;

// $ExpectError - navigationViewController should not being passed
<LayoutManagerWithViewController
  globalNavigation={() => null}
  navigationViewController={() => null}
>
  Page
</LayoutManagerWithViewController>;

// $ExpectError - navigationUIController should not being passed
<LayoutManagerWithViewController
  globalNavigation={() => null}
  navigationUIController={() => null}
>
  Page
</LayoutManagerWithViewController>;
