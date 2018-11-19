// @flow

import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';

export default md`

      The Dynamic Table component is a table component with pagination and sorting functionality.
      
      Dynamic table also allows you to reorder rows (available only with react@^16.0.0) thanks to [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) library.

      ## Usage

      ${code`import DynamicTable from '@atlaskit/dynamic-table';`}

      or 

      ${code`import { DynamicTableStateless } from '@atlaskit/dynamic-table';`}

      ${(
        <Example
          packageName="@atlaskit/dynamic-table"
          Component={require('../examples/0-stateful').default}
          title="Stateful"
          source={require('!!raw-loader!../examples/0-stateful')}
        />
      )}

      ${(
        <Example
          packageName="@atlaskit/dynamic-table"
          Component={require('../examples/1-stateless').default}
          title="Stateless"
          source={require('!!raw-loader!../examples/1-stateless')}
        />
      )}

      ${(
        <Example
          packageName="@atlaskit/dynamic-table"
          Component={require('../examples/13-colspan').default}
          title="With column spanning"
          source={require('!!raw-loader!../examples/13-colspan')}
        />
      )}

      ${(
        <Props
          heading="Stateful DynamicTable Props"
          props={require('!!extract-react-types-loader!../src/components/Stateful')}
        />
      )}

      ${(
        <Props
          heading="Stateless DynamicTable Props"
          props={require('!!extract-react-types-loader!../src/components/Stateless')}
        />
      )}
`;
