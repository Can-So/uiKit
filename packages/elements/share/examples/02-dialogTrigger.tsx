import * as React from 'react';
import Button from '@atlaskit/button';
import { ShareDialogWithTrigger } from '../src/components/ShareDialogWithTrigger';

const loadUserOptions = () => [];

export default () => (
  <>
    <h4>Default share button</h4>
    <ShareDialogWithTrigger
      copyLink="copyLink"
      loadUserOptions={loadUserOptions}
    />
    <h4>Default share button with text</h4>
    <ShareDialogWithTrigger
      buttonStyle="withText"
      copyLink="copyLink"
      loadUserOptions={loadUserOptions}
    />
    <h4>Custom share button</h4>
    <ShareDialogWithTrigger
      copyLink="copyLink"
      loadUserOptions={loadUserOptions}
    >
      {openDialog => <Button onClick={openDialog}>Custom Button</Button>}
    </ShareDialogWithTrigger>
  </>
);
