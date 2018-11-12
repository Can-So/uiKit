// @flow

import React from 'react';
import ContainerHeader from '../../index';

<ContainerHeader />;
<ContainerHeader text="My header" />;
<ContainerHeader styles={styles => styles} />;

// $ExpectError - id must be string
<ContainerHeader id={5} />;
// $ExpectError - styles must be a function
<ContainerHeader styles={5} />;
