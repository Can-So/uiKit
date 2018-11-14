// @flow

import React from 'react';
import BackItem from '../../index';

<BackItem />;
// $ExpectError - id should be string
<BackItem id={5} />;
// $ExpectError - goTo should be string
<BackItem goTo={5} />;
