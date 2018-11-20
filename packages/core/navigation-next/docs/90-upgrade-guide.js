// @flow

import React from 'react';
import { code, md } from '@atlaskit/docs';

export default md`
  # 3.x - 4.x

  ### API Changes
  #### Inline component \`type\` API change

  The API for renderer items that use components as their \`type\` property have now changed to use a type value of \`'InlineComponent'\` and specify the component via a \`component\` prop instead. This allows the renderer item types to be typed correctly as disjoint unions on the type property.

  ${code`
    {
  -   type: FooComponent,
  +   type: 'InlineComponent',
  +   component: FooComponent,
    }
    `}

  ### Export renames

  #### Rename \`withNavigationUI\` HOC to \`withNavigationUIController\`

  The \`withNavigationUI\` HOC has been renamed to \`withNavigationUIController\` to align naming convention with \`withNavigationViewController\`

  #### Rename \`ViewRenderer\` export to \`ItemsRenderer\`

  The \`ViewRenderer\` export has been renamed to \`ItemsRenderer\` to better represent the component's purpose, that it renders items of a view. A view is just comprised of items so this is used to render the view. \`ItemsRenderer\` is also recursively rendered within group-like item types like 'Group' and 'Section', and can be used inside custom components that are group-like as well, so it makes more sense for it to be named \`ItemsRenderer\`.

  ### Removals

  #### Remove \`icon\` prop from ConnectedItem

  The \`icon\` prop of ConnectedItem, aka the \`'Item'\` in-built type, allowed you to pass in string names for a very limited set of icons and would render them as \`before\` components. This was never meant to be used in the final API and so has been removed in favour of providing the standard \`before\` prop.

  ${code`
+ import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
  {
    type: 'Item',
-   icon: 'DashboardIcon'
+   before: DashboardIcon
  }
  `}

  #### Remove deprecated \`key\` prop from GlobalNav primary and secondary items

  The \`key\` prop of \`primaryItems\` and \`secondaryItems\` in GlobalNav has been removed in favour of the \`id\` prop.

  #### Remove ScrollableSectionInner component

  Remove ScrollableSectionInner component and scrollHint styles from theme. This component is not required as it has been replaced inline within Section directly.
`;
