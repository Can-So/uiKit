// @flow

import React, { Component } from 'react';

import { withContentTheme } from '../../../theme';
import type { ConnectedGroupHeadingProps, GroupHeadingProps } from './types';

const GroupHeadingPrimitive = ({
  after: After,
  children,
  theme,
}: GroupHeadingProps) => {
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
};
const GroupHeadingPrimitiveWithTheme = withContentTheme(GroupHeadingPrimitive);

// TODO: This component is only defined to pass correct props to our prop docs
// as we require classes for them. Remove once we fix this on the prop doc level.
export default class GroupHeading extends Component<ConnectedGroupHeadingProps> {
  render() {
    return <GroupHeadingPrimitiveWithTheme {...this.props} />;
  }
}
