// @flow

import React from 'react';
import SortableItem from '../../index';

<SortableItem index={0} id="my-item" />;

// $ExpectError - missing id prop
<SortableItem index={0} />;
// $ExpectError - missing index prop
<SortableItem id="my-item" />;
// $ExpectError - id prop must be a string
<SortableItem id={5} />;
