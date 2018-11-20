// @flow

import type { ElementConfig } from 'react';

import AsyncLayoutManagerWithViewController from '../AsyncLayoutManagerWithViewController';

export type LayoutManagerWithViewControllerProps = {|
  ...$Diff<
    ElementConfig<typeof AsyncLayoutManagerWithViewController>,
    {
      viewRenderer: *,
      containerSkeleton: *,
    },
  >,
|};
