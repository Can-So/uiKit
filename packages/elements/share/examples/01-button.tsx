import * as React from 'react';
import { ShareButton } from '../src/components/ShareButton.tsx';

export default () => (
  <React.Fragment>
    <h4>Icon only</h4>
    <ShareButton />
    <h4>Icon with text</h4>
    <ShareButton text="Share" />
  </React.Fragment>
);
