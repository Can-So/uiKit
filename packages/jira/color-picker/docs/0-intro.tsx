import * as React from 'react';
import { md, code, Example, Props } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';

export default md`
${(
  <SectionMessage appearance="warning">
    <p>
      <strong>
        Note: @atlaskit/color-picker is currently a developer preview.
      </strong>
    </p>
    <p>
      Please experiment with and test this package, but be aware that the API
      may change at any time. Use at your own risk, preferrably not in
      production.
    </p>
  </SectionMessage>
)}

This component allows to pick colors from color palette.

## Usage

${code`
  import ColorPicker from '@atlaskit/color-picker';
`}

${(
  <Example
    packageName="@atlaskit/color-picker"
    Component={require('../examples/00-color-picker').default}
    source={require('!!raw-loader!../examples/00-color-picker')}
    title="Basic Usage"
    language="jsx"
  />
)}

${(
  <Example
    packageName="@atlaskit/color-picker"
    Component={require('../examples/01-multi-columns-color-picker').default}
    source={require('!!raw-loader!../examples/01-multi-columns-color-picker')}
    title="Color picker with multiple columns palette"
    language="jsx"
  />
)}

${(
  <Props
    heading="Color picker props"
    props={require('!!extract-react-types-loader!../src/components/ColorPicker')}
  />
)}
`;
