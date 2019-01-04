// @flow

import React from 'react';
import InteractionStateManager from '../../index';

<InteractionStateManager>
  {({ isActive, isHover, isFocused }) => null}
</InteractionStateManager>;

// $ExpectError - missing children prop
<InteractionStateManager />;
// $ExpectError - children must be function
<InteractionStateManager>Foo</InteractionStateManager>;
