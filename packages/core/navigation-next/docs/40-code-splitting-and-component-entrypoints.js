// @flow

import React from 'react';
import { code, md } from '@atlaskit/docs';

import { ContentsProvider, H } from './shared';

export default (
  <ContentsProvider>{md`

  ${<H>Entrypoints</H>}

  These are entrypoints for specific components to be used carefully by the consumers. If you're using one of these entrypoints we are assuming you know what you are doing. So it means that code-splitting and tree-shaking should be done on the consumer/product side.

  ${<H>Creating an entrypoint</H>}

  By default all the entrypoints should link \`./dist/esm\` instead of \`../\`. This is required because we're moving the content of \`./entrypoints\` folder to the root of \`dist\` after bundle before publish.

  EX:

  At \`src/entrypoints/LayoutManagerWithViewController.js\` we have a file with content of


  And, in build time, the import will be changed to point to \`./dist/esm\`

  ${code`
  // @flow
  import LayoutManagerWithViewController from './dist/esm/components/LayoutManagerWithViewController';

  export default LayoutManagerWithViewController;
  `}

  ${<H>How to use it</H>}

  ${code`
  import LayoutManagerWithViewController from '@atlaskit/navigation-next/LayoutManagerWithViewController';
  import ItemsRenderer from '@atlaskit/navigation-next/ItemsRenderer';
  import SkeletonContainerView from '@atlaskit/navigation-next/SkeletonContainerView';
  import NavigationProvider from '@atlaskit/navigation-next/NavigationProvider';
  import AsyncLayoutManagerWithViewController from '@atlaskit/navigation-next/AsyncLayoutManagerWithViewController';
  import {
    ViewController,
    ViewControllerSubscriber,
    withNavigationViewController,
    viewReducerUtils,
  } from '@atlaskit/navigation-next/view-controller';
  import {
    UIController,
    UIControllerSubscriber,
    withNavigationUIController,
  } from '@atlaskit/navigation-next/ui-controller';
  `}

  ## Exposed entrypoints

  * \`atlaskit/navigation-next/LayoutManagerWithViewController\`
  * \`atlaskit/navigation-next/ItemsRenderer\`
  * \`atlaskit/navigation-next/SkeletonContainerView\`
  * \`atlaskit/navigation-next/NavigationProvider\`
  * \`atlaskit/navigation-next/AsyncLayoutManagerWithViewController\`
  * \`atlaskit/navigation-next/GlobalNavigationSkeleton\`
  * \`atlaskit/navigation-next/view-controller\`
  * \`atlaskit/navigation-next/ui-controller\`

`}</ContentsProvider>
);
