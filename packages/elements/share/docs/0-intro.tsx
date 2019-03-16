import { md } from '@findable/docs';
import SectionMessage from '@findable/section-message';
import * as React from 'react';

export default md`
${(
  <SectionMessage appearance="warning">
    <p>
      <strong>Note: @findable/share is currently a developer preview.</strong>
    </p>
    <p>
      Please experiment and test this package, but be aware that the API may
      change at any time. Use at your own risk, preferably not in production.
    </p>
  </SectionMessage>
)}
`;
