// @flow
import React from 'react';
import { md, Example, Props, code } from '@findable/docs';

export default md`
  Use tabs to display multiple panels within a single window.

  ## Usage

  ${code`import Tabs,  { TabContent, TabItem } from '@findable/tabs';`}

  ${(
    <Example
      packageName="@findable/tabs"
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
      heading="TabContent Props"
      props={require('!!extract-react-types-loader!../src/components/TabContent')}
    />
  )}

  ${(
    <Example
      packageName="@findable/tabs"
      Component={require('../examples/30-custom-tab-content-component').default}
      title="Custom Content component"
      source={require('!!raw-loader!../examples/30-custom-tab-content-component')}
    />
  )}

  ### Tab Item Provided Props
  
  These props are provided to the component that you pass to \`components.Item\`.

  ${(
    <Props
      heading="TabItem Props"
      props={require('!!extract-react-types-loader!../src/components/TabItem')}
    />
  )}

  ${(
    <Example
      packageName="@findable/tabs"
      Component={require('../examples/20-custom-tab-item-components').default}
      title="Custom Item component"
      source={require('!!raw-loader!../examples/20-custom-tab-item-components')}
    />
  )}
`;
