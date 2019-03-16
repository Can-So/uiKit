import * as React from 'react';
import { md, Example, code } from '@findable/docs';

export default md`
This transformer allows encoding ProseMirror Node to markdown or converting Bitbucket HTML to  ProseMirror Node.

  ## Usage

  Use the encoder with editor-bitbucket-transformer as follows:

  ${code`import { BitbucketTransformer } from '@findable/editor-bitbucket-transformer';
  import { bitbucketSchema as schema } from '@findable/adf-schema';

  const serializer = new BitbucketTransformer(schema);
  // To encode editor content as markdown
  serializer.encode(editorContent);
  // To convert HTML to editor content
  serializer.parse(html);`}

  ${(
    <Example
      packageName="@findable/editor-bitbucket-transformer"
      Component={require('../examples/2-bitbucket-markdown').default}
      title="Bitbucket Markdown"
      source={require('!!raw-loader!../examples/2-bitbucket-markdown')}
    />
  )}

  ${(
    <Example
      packageName="@findable/editor-bitbucket-transformer"
      Component={require('../examples/1-bitbucket-html').default}
      title="Bitbucket HTML"
      source={require('!!raw-loader!../examples/1-bitbucket-html')}
    />
  )}
`;
