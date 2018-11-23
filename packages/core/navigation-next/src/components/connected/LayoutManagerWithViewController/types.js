// @flow

import type { ElementConfig } from 'react';

import AsyncLayoutManagerWithViewController from '../AsyncLayoutManagerWithViewController';

export type LayoutManagerWithViewControllerProps = $Exact<
  $Diff<
    ElementConfig<typeof AsyncLayoutManagerWithViewController>,
    {
      itemsRenderer: *,
      containerSkeleton: *,
    },
  >,
>;
