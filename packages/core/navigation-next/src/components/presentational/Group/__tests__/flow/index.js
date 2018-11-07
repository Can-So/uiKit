// @flow

import React from 'react';
import Group from '../../index';

<Group heading="foo">My group</Group>;
<Group heading="foo" hasSeparator id="my-group">
  My group
</Group>;

// $ExpectError - missing children prop
<Group heading="foo" />;
// $ExpectError - missing heading prop
<Group>My group</Group>;
