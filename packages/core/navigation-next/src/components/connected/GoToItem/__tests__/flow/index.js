// @flow

import React from 'react';
import GoToItem from '../../index';

<GoToItem goTo="my-view" />;

// $ExpectError - missing goTo prop
<GoToItem />;
// $ExpectError - id should be string
<GoToItem id={5} />;
// $ExpectError - goTo should be string
<GoToItem goTo={5} />;
