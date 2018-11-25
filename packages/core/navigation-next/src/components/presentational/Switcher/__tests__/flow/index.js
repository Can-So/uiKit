// @flow

import React from 'react';
import Switcher from '../../index';

const el = <div />;

<Switcher options={[]} target={el} />;

// $ExpectError - missing target prop
<Switcher options={[]} />;
// $ExpectError - missing options prop
<Switcher target={el} />;
