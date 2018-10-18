// @flow
import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  Use tabs to display multiple panels within a single window.

  ${(
    <Example
      packageName="@atlaskit/tabs"
      Component={require('../examples/00-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic')}
    />
  )}

  ${(
    <Props
      heading="Tabs Props"
      props={require('!!extract-react-types-loader!../src/components/Tabs')}
    />
  )}

  ### Tab Content Provided Props

  These props are provided to the component that you pass to \`components.Content\`.

  ${(
    <Props
      heading=" "
      props={require('!!extract-react-types-loader!../src/components/TabContent')}
    />
  )}

  ${(
    <Example
      packageName="@atlaskit/tabs"
      Component={require('../examples/30-custom-tab-content-component').default}
      title="Custom Content component"
      source={require('!!raw-loader!../examples/30-custom-tab-content-component')}
    />
  )}

  ### Tab Item Provided Props
  
  These props are provided to the component that you pass to \`components.Item\`.

  ${(
    <Props
      heading=" "
      props={require('!!extract-react-types-loader!../src/components/TabItem')}
    />
  )}

  ${(
    <Example
      packageName="@atlaskit/tabs"
      Component={require('../examples/20-custom-tab-item-components').default}
      title="Custom Item component"
      source={require('!!raw-loader!../examples/20-custom-tab-item-components')}
    />
  )}
`;
