// @flow
import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  The component displays a table of expandable, nested rows that form a tree-like hierarchy.
  Child rows can be loaded asynchronously, on expansion.

  ## Basic Usage

  Import the default exported Component and provide the data in \`rootItems\` prop.

  ${(
    <Example
      Component={require('../examples/single-component').default}
      source={require('!!raw-loader!../examples/single-component')}
      title="Basic Usage: With Static Data"
      language="jsx"
    />
  )}

  ### Expected data structure for \`rootItems\` props

  ~~~js
  [
    {
      id: //Item 1 id,
      content: {

      },
      hasChildren:
      children: [
        // Item 1 children
        {
          // Child 1
        }
      ]
    },
    {
      // Item 2
    }
  ]
  ~~~

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/TableTree')}
    />
  )}
`;
