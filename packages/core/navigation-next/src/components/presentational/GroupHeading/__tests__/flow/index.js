// @flow

import React from 'react';
import GroupHeading from '../../index';

<GroupHeading>Foo</GroupHeading>;
<GroupHeading after={() => 'Bar'}>Foo</GroupHeading>;

// $ExpectError - missing children prop
<GroupHeading />;
