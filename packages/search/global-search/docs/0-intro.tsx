import * as React from 'react';
import { md, code, Example, Props } from '@atlaskit/docs';

export default md`
  A search component that connects to the Atlassian cross-product search backend.

  ## Usage

  Primary use case for the component is to be displayed in Navigation. Put in the drawers prop of the Navigation component as follows:

  ${code`
  import { GlobalQuickSearch } from '@atlaskit/global-search';

  <Navigation
    drawers={[
      <AkSearchDrawer ...props>
        <GlobalQuickSearch cloudId="{cloudId} />
      </AkSearchDrawer>,
    ]}
  </Navigation>
  `}

  ${(
    <Example
      Component={require('../examples/11-Search-In-Drawer').default}
      title="Search In Drawer"
      source={require('!!raw-loader!../examples/11-Search-In-Drawer')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/GlobalQuickSearch')}
    />
  )}
`;
