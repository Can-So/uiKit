// @flow

import React from 'react';
import GlobalItem from '../../index';

<GlobalItem />;
<GlobalItem
  id="my-global-item"
  href="http://www.atlassian.com"
  label="My global item"
  onClick={() => {}}
  icon={() => null}
/>;

// $ExpectError - id should be string
<GlobalItem id={5} />;
// $ExpectError - icon should be component or null/undefined
<GlobalItem icon={5} />;
