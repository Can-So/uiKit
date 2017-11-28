// @flow

import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  Breadcrumbs are used for nested navigation, with each item acting as a link.
  There is a stateful default export that handles expansion of the collapse
  view, and passes other props on to the stateless export.

  Breadcrumbs or BreadcrumbsStateless are used as the wrapper component.
  BreadcrumbsItem is the rendering componet for each individual item in the
  list.

  A BreadcrumbsStateless component with no items will not be rendered.

  ## Examples

  ${(
    <Example
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${(
    <Example
      Component={require('../examples/1-expand').default}
      title="With Expand"
      source={require('!!raw-loader!../examples/1-expand')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/Breadcrumbs')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/BreadcrumbsStateless')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/BreadcrumbsItem')}
    />
  )}

`;
