// @flow

import React from 'react';
import { colors } from '@findable/theme';
import SuccessIcon from '@findable/icon/glyph/check-circle';
import Flag, { FlagGroup } from '../src';

export default () => (
  <div>
    <FlagGroup>
      <Flag
        description="I should be above the modal dialog"
        icon={<SuccessIcon primaryColor={colors.G300} label="Info" />}
        id="1"
        key="1"
        title="I am a Flag"
      />
    </FlagGroup>
  </div>
);
