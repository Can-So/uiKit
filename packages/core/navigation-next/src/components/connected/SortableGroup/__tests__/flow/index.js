// @flow

import React from 'react';
import SortableGroup from '../../index';

<SortableGroup id="my-group">Foo</SortableGroup>;

// $ExpectError - missing id prop
<SortableGroup>Foo</SortableGroup>;
// $ExpectError - missing children prop
<SortableGroup id="my-group" />;
