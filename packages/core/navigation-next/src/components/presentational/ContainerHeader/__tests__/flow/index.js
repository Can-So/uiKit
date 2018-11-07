// @flow

import React from 'react';
import ContainerHeader from '../../index';

<ContainerHeader />;
<ContainerHeader text="My header" />;

// $ExpectError - id must be string
<ContainerHeader id={5} />;
// $ExpectError - does not accept a spacing prop
<ContainerHeader spacing="foo" />;
