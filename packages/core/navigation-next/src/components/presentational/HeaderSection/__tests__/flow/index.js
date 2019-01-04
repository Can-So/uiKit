// @flow

import React from 'react';
import HeaderSection from '../../index';

<HeaderSection>
  {({ className }) => <div className={className}>Header</div>}
</HeaderSection>;

<HeaderSection id="foo" parentId="bar">
  {({ className }) => <div className={className}>Header</div>}
</HeaderSection>;

// $ExpectError - missing children prop
<HeaderSection />;
// $ExpectError - children should be function
<HeaderSection>Foo</HeaderSection>;
