// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';

export default md`
  Size Detector is a utility component that informs the child function of the available width and height.

  ## Usage

  ${code`import SizeDetector from '@atlaskit/size-detector';`}

  ${(
    <Example
      packageName="@atlaskit/size-detector"
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ## SSR support

  When server side rendering, we cannot check the size of the container thus size-detector call children with 
  \`{ height: null, width: null }\`. Thus, enabling us to create DOM with proper checks and then hydrate on client with no errors.

  ${(
    <Props
      heading="SizeDetector Props"
      props={require('!!extract-react-types-loader!../src/SizeDetector')}
    />
  )}
`;
