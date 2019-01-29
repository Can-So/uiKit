import * as React from 'react';
import Button from '@atlaskit/button';
import { ShareDialogWithTrigger } from '../src/components/ShareDialogWithTrigger';

export default () => (
  <>
    <h4>Default share button</h4>
    <ShareDialogWithTrigger copyLink="copyLink" />
    <h4>Default share button with text</h4>
    <ShareDialogWithTrigger buttonStyle="withText" copyLink="copyLink" />
    <h4>Custom share button</h4>
    <ShareDialogWithTrigger copyLink="copyLink">
      {openDialog => <Button onClick={openDialog}>Custom Button</Button>}
    </ShareDialogWithTrigger>
  </>
);
