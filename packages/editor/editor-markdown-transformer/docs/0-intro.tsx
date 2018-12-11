import * as React from 'react';
import { md, Example, code } from '@atlaskit/docs';

export default md`

A Markdown to ProseMirror Node parser.

## Usage

Use the component in your React app as follows:

  ${code`import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer';
  const transformer = new MarkdownTransformer(schema);
  transfomer.parse(markdown);`}

  ${(
    <Example
      packageName="@atlaskit/editor-markdown-transformer"
      Component={require('../examples/0-markdown-transformer').default}
      title="Markdown Transformer"
      source={require('!!raw-loader!../examples/0-markdown-transformer')}
    />
  )}
`;
