// @flow

import React from 'react';
import ItemAvatar from '../../index';

<ItemAvatar
  itemState={{
    isActive: false,
    isHover: false,
    isFocused: false,
    isSelected: false,
    spacing: 'default',
  }}
/>;

// $ExpectError - missing itemState prop
<ItemAvatar />;
// $ExpectError - itemState does not have all required object props
<ItemAvatar itemState={{}} />;
