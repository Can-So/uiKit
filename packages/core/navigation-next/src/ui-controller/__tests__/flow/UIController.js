// @flow

import React from 'react';
import UIController from '../../UIController';

new UIController(undefined, false);

new UIController(
  {
    isResizeDisabled: true,
    productNavWidth: 240,
  },
  false,
);

new UIController(
  {
    // $ExpectError - invalid isResizeDisabled prop
    isResizeDisabled: 5,
    productNavWidth: 240,
  },
  false,
);

new UIController(undefined, {
  get: () => ({ isCollapsed: false, productNavWidth: 270 }),
  set: () => {},
});

new UIController(undefined, {
  get: () => null,
  set: () => {},
});
