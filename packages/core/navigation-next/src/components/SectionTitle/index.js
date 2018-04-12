// @flow

import React from 'react';

import { light, withTheme } from '../../theme';
import type { SectionTitleProps } from './types';

const SectionTitle = ({ after: After, children, theme }: SectionTitleProps) => {
  const { mode, context } = theme;
  const styles = mode.sectionTitle()[context];

  return (
    <div css={styles.titleBase}>
      <div css={styles.textWrapper}>{children}</div>
      {!!After && (
        <div css={styles.afterWrapper}>
          <After />
        </div>
      )}
    </div>
  );
};

export default withTheme({ mode: light, context: 'container' })(SectionTitle);
