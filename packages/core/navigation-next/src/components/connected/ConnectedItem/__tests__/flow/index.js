// @flow

import React from 'react';
import ConnectedItem from '../../index';

<ConnectedItem />;
// $ExpectError - id should be string
<ConnectedItem id={5} />;
// $ExpectError - goTo should be string
<ConnectedItem goTo={5} />;
