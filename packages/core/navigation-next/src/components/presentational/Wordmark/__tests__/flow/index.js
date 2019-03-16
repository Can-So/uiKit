// @flow

import React from 'react';
import { AtlassianWordmark } from '@findable/logo';
import Wordmark from '../../index';

<Wordmark wordmark={AtlassianWordmark} />;

// $ExpectError - wordmark must be a component
<Wordmark wordmark={<div />} />;
// $ExpectError - invalid prop
<Wordmark foo="bar" />;
