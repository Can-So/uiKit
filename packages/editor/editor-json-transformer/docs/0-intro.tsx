import * as React from 'react';
import { md, Example, code } from '@atlaskit/docs';

export default md`
This transformer allows encoding ProseMirror Node in JSON format.

  ## Usage

  Use the encoder with editor-json-transformer as follows:

  ${code`import { JSONTransformer } from '@atlaskit/editor-json-transformer';
  const serializer = new JSONTransformer(schema);
  serializer.encode(editorContent);`}

  ${(
    <Example
      packageName="@atlaskit/editor-json-transformer"
      Component={require('../examples/0-json-transformer').default}
      title="Json Transformer"
      source={require('!!raw-loader!../examples/0-json-transformer')}
    />
  )}
`;
