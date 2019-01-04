// @flow

import React from 'react';
import Section from '../../index';

<Section>
  {({ className }) => <div className={className}>My section</div>}
</Section>;
<Section id="section" shouldGrow alwaysShowScrollHint>
  {({ className }) => <div className={className}>My section</div>}
</Section>;

// $ExpectError - missing children
<Section />;
// $ExpectError - children must be a function
<Section>My children</Section>;
// $ExpectError - id must be string
<Section id={5}>
  {({ className }) => <div className={className}>My section</div>}
</Section>;
