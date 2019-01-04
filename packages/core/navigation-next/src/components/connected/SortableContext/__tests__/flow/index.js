// @flow

import React from 'react';
import SortableContext from '../../index';

<SortableContext onDragEnd={() => {}}>Foo</SortableContext>;

// $ExpectError - missing onDragEnd prop
<SortableContext>Foo</SortableContext>;
// $ExpectError - missing children prop
<SortableContext onDragEnd={() => {}} />;
// $ExpectError - onDragEnd prop should be a function
<SortableContext onDragEnd="foo">Foo</SortableContext>;
