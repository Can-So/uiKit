// @flow

import React from 'react';
import SkeletonContainerView from '../../index';

<SkeletonContainerView />;

// $ExpectError - invalid prop
<SkeletonContainerView type={'foo'} />;
