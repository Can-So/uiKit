// @flow

import React from 'react';
import Theme from '../src';

export default () => (
  <Theme.Consumer>
    {theme => (
      <div>
        The default mode is <code>{theme.mode}</code>.
      </div>
    )}
  </Theme.Consumer>
);
