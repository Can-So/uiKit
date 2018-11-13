// @flow

import React from 'react';
import MenuSection from '../../index';

<MenuSection>
  {({ className }) => <div className={className}>Header</div>}
</MenuSection>;

<MenuSection id="foo" parentId="bar" alwaysShowScrollHint>
  {({ className }) => <div className={className}>Header</div>}
</MenuSection>;

// $ExpectError - missing children prop
<MenuSection />;
// $ExpectError - children should be function
<MenuSection>Foo</MenuSection>;
