// @flow

import React from 'react';
import ConnectedItem from '../../index';

<ConnectedItem />;
<ConnectedItem after={null} />;

// $ExpectError - id should be string
<ConnectedItem id={5} />;
// $ExpectError - goTo should be string
<ConnectedItem goTo={5} />;
// $ExpectError - after should be component or null
<ConnectedItem after={5} />;
