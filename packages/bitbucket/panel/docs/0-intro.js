// @flow
import React from 'react';
import { code, md, Example, Props } from '@findable/docs';

export default md`
This panel component is designed hold content and expand and collapse with user interaction. It animates its opening and closing.

## Usage

${code`import Panel from '@findable/panel';`}

${(
  <Example
    packageName="@findable/panel"
    Component={require('../examples/01-collapsed').default}
    title="Simple Example"
    source={require('!!raw-loader!../examples/01-collapsed')}
  />
)}

There are two initial visibility options for the panel: expanded or collapsed. Panels are collapsed by default.

Panels are not a fixed height and will expand to the height of the content inside.

${(
  <Props
    props={require('!!extract-react-types-loader!../src/components/Panel')}
  />
)}
`;
