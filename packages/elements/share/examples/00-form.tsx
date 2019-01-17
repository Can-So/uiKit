import { userPickerData } from '@atlaskit/util-data-test';
import * as React from 'react';
import { ShareForm } from '../src/components/ShareForm';

const loadOptions = () => userPickerData;

export default () => (
  <ShareForm
    link={window.location.href}
    onShareClick={console.log}
    loadOptions={loadOptions}
  />
);
