import * as React from 'react';
import { ShareDialogTrigger } from '../src/components/ShareDialogTrigger';

export default () => (
  <>
    <h4>Default share button</h4>
    <ShareDialogTrigger />
    <h4>Default share button with text</h4>
    <ShareDialogTrigger buttonStyle="withText" />
    <h4>Custom share button</h4>
    <ShareDialogTrigger>
      {openDialog => <button onClick={openDialog}>Custom Button</button>}
    </ShareDialogTrigger>
  </>
);
