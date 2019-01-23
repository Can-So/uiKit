import * as React from 'react';
import Button from '@atlaskit/button';
import { ShareDialogTrigger } from '../src/components/ShareDialogTrigger';

export default () => (
  <>
    <h4>Default share button</h4>
    <ShareDialogTrigger copyLink="copyLink" />
    <h4>Default share button with text</h4>
    <ShareDialogTrigger buttonStyle="withText" copyLink="copyLink" />
    <h4>Custom share button</h4>
    <ShareDialogTrigger copyLink="copyLink">
      {openDialog => <Button onClick={openDialog}>Custom Button</Button>}
    </ShareDialogTrigger>
  </>
);
