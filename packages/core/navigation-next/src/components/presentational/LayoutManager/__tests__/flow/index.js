// @flow

import React from 'react';
import LayoutManager from '../../index';

<LayoutManager
  containerNavigation={() => null}
  globalNavigation={() => null}
  productNavigation={() => null}
>
  Page
</LayoutManager>;

// $ExpectError - missing children prop
<LayoutManager
  containerNavigation={() => null}
  globalNavigation={() => null}
  productNavigation={() => null}
/>;
// $ExpectError - missing productNavigation prop
<LayoutManager containerNavigation={() => null} globalNavigation={() => null}>
  Page
</LayoutManager>;
// $ExpectError - missing containerNavigation prop
<LayoutManager productNavigation={() => null} globalNavigation={() => null}>
  Page
</LayoutManager>;
// $ExpectError - missing globalNavigation prop
<LayoutManager productNavigation={() => null} containerNavigation={() => null}>
  Page
</LayoutManager>;
// $ExpectError - productNavigation prop must be a component
<LayoutManager
  productNavigation="foo"
  globalNavigation={() => null}
  containerNavigation={() => null}
>
  Page
</LayoutManager>;
