// @flow
import React from 'react';
import { md, Example, Props, code } from '@findable/docs';

export default md`

  Renders inline code snippets and code blocks.
  
  ## Usage

  ${code`import { AkCode, AkCodeBlock } from '@findable/code`}

  ${(
    <Example
      packageName="@findable/code"
      Component={require('../examples/00-inline-code-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-inline-code-basic')}
    />
  )}

  ${(
    <Props
      heading="Code Props"
      props={require('!!extract-react-types-loader!../src/components/Code')}
    />
  )}

  ${(
    <Props
      heading="CodeBlock Props"
      props={require('!!extract-react-types-loader!../src/components/CodeBlock')}
    />
  )}

`;
