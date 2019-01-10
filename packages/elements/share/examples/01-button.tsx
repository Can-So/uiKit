import * as React from 'react';
import { ShareButton } from '../src/components/ShareButton';

const noop = () => {};

export default () => (
  <React.Fragment>
    <h4>Icon only</h4>
    <ShareButton onClick={noop} />
    <h4>Icon with text</h4>
    <ShareButton onClick={noop} text="Share" />
  </React.Fragment>
);
