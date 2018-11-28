// @flow

import type { ExternalItemProps } from '../Item/types';

// ContainerHeader passes most of its props through to an underlying Item. There
// are a couple of props which it doesn't use.
type ExcludedProps = {
  spacing: *, // ContainerHeader doesn't have spacing options
};

// We are using item props directly here instead of using ElementConfig because we want to
// opt out of converting Item's default props to optional since we're providing defaults for
// them ourselves.
export type ContainerHeaderProps = {
  ...$Exact<$Diff<ExternalItemProps, ExcludedProps>>,
};
