// @flow

import React, { Component } from 'react';

import { withContentTheme } from '../../theme';
import type { ConnectedGroupHeadingProps, GroupHeadingProps } from './types';

const GroupHeadingWithTheme = withContentTheme(
  ({ after: After, children, theme }: GroupHeadingProps) => {
    const { mode, context } = theme;
    const styles = mode.heading()[context];

    return (
      <div css={styles.headingBase}>
        <div css={styles.textWrapper}>{children}</div>
        {!!After && (
          <div css={styles.afterWrapper}>
            <After />
          </div>
        )}
      </div>
    );
  },
);

export default class GroupHeading extends Component<
  ConnectedGroupHeadingProps,
> {
  render() {
    return <GroupHeadingWithTheme {...this.props} />;
  }
}
