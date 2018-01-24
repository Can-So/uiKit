import * as React from 'react';

import MentionTextInput from '../example-helpers/demo-mention-text-input';
import ConfigurableMentionPicker from '../example-helpers/demo-configurable-mention-picker';
import { onSelection } from '../example-helpers';

let config;

interface DefaultExport {
  default: any;
}

try {
  // eslint-disable-next-line import/no-unresolved, global-require
  config = (require('../local-config') as DefaultExport).default;
} catch (e) {
  // eslint-disable-next-line import/no-unresolved, global-require
  config = (require('../local-config-example') as DefaultExport).default;
}

const asapConfig = config.asap;

export default function Example() {
  return (
    <ConfigurableMentionPicker config={asapConfig}>
      <MentionTextInput label="User search" onSelection={onSelection} />
    </ConfigurableMentionPicker>
  );
}
