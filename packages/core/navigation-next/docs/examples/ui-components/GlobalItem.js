// @flow

import React from 'react';
import Avatar from '@findable/avatar';
import { AtlassianIcon } from '@findable/logo';
import SearchIcon from '@findable/icon/glyph/search';
import HelpIcon from '@findable/icon/glyph/question';
import { colors } from '@findable/theme';
import { GlobalItem } from '../../../src';

export default () => (
  <div
    css={{
      alignItems: 'center',
      backgroundColor: colors.B500,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 8px',
      width: '56px',
    }}
  >
    <GlobalItem icon={() => <AtlassianIcon size="medium" />} />
    <GlobalItem icon={SearchIcon} />
    <GlobalItem icon={HelpIcon} size="small" />
    <GlobalItem
      icon={() => (
        <Avatar
          borderColor="transparent"
          isActive={false}
          isHover={false}
          size="small"
        />
      )}
      size="small"
    />
  </div>
);
