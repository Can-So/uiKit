// @flow

import React from 'react';
import GlobalNavigationItemPrimitive from '../../primitives';

<GlobalNavigationItemPrimitive />;
<GlobalNavigationItemPrimitive
  id="my-global-item"
  href="http://www.atlassian.com"
  label="My global item"
  onClick={() => {}}
  icon={() => null}
/>;

// $ExpectError - id should be string
<GlobalNavigationItemPrimitive id={5} />;
// $ExpectError - icon should be component or null/undefined
<GlobalNavigationItemPrimitive icon={5} />;
