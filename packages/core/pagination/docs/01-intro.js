// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';

export default md`
Pagination is helpful when you do not want to blot your page by showing all the data at once. In this case we expect user to
navigate through different pages of the component.

This component is mostly used with tables, see [dynamic-table](https://atlaskit.atlassian.com/packages/core/dynamic-table) for example.

## Usage:

${code`
import Pagination from '@atlaskit/pagination';
`}

${(
  <Example
    packageName="@atlaskit/pagination"
    Component={require('../examples/01-basic').default}
    title="Example Pagination"
    source={require('!!raw-loader!../examples/01-basic')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../src/components/pagination')}
    heading="Pagination props"
  />
)}
`;
