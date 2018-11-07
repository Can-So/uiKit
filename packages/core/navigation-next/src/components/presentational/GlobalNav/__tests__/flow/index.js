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

// $ExpectError - primaryItems must have icon prop
<GlobalNav
  primaryItems={[{ id: 'foo', onClick: () => {} }]}
  secondaryItems={[]}
/>;
// $ExpectError - itemComponent must be a component
<GlobalNav itemComponent="foo" primaryItems={[]} secondaryItems={[]} />;
// $ExpectError - missing primaryItems and secondaryItems props
<GlobalNav />;
