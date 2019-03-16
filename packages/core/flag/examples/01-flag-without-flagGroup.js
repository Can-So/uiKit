// @flow

import React from 'react';
import { colors } from '@findable/theme';
import SuccessIcon from '@findable/icon/glyph/check-circle';
import Flag from '../src';

export default () => (
  <Flag
    actions={[
      { content: 'Show me', onClick: () => {} },
      { content: 'No thanks', onClick: () => {} },
    ]}
    icon={<SuccessIcon primaryColor={colors.G300} label="Info" />}
    description="We got fun an games. We got everything you want honey, we know the names."
    id="1"
    key="1"
    title="Welcome to the jungle"
  />
);
