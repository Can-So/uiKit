// @flow

import React from 'react';
import SearchIcon from '@atlaskit/icon/glyph/search';
import GlobalNav from '../../index';

<GlobalNav primaryItems={[]} secondaryItems={[]} />;
<GlobalNav
  itemComponent={() => null}
  primaryItems={[{ id: 'foo', icon: SearchIcon, onClick: () => {} }]}
  secondaryItems={[]}
/>;

// $ExpectError - primaryItems onClick prop must be a function
<GlobalNav primaryItems={[{ id: 'foo', onClick: 5 }]} secondaryItems={[]} />;
// $ExpectError - itemComponent must be a component
<GlobalNav itemComponent="foo" primaryItems={[]} secondaryItems={[]} />;
// $ExpectError - missing primaryItems and secondaryItems props
<GlobalNav />;
