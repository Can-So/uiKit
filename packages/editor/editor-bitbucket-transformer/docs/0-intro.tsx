import * as React from 'react';
import { md, Example, code } from '@atlaskit/docs';

export default md`
This transformer allows encoding editor in Bitbucket content as markdown or converting HTML to editor content.

  ## Usage

  Use the encoder with editor-bitbucket-transformer as follows:

  ${code`import { BitbucketTransformer } from '@atlaskit/editor-bitbucket-transformer';
  import { bitbucketSchema as schema } from '@atlaskit/editor-common';

  const serializer = new BitbucketTransformer(schema);
  // To encode editor content as markdown
  serializer.encode(editorContent);
  // To convert HTML to editor content
  serializer.parse(html);`}

  ${(
    <Example
      packageName="@atlaskit/editor-bitbucket-transformer"
      Component={require('../examples/2-bitbucket-markdown').default}
      title="Bitbucket Markdown"
      source={require('!!raw-loader!../examples/2-bitbucket-markdown')}
    />
  )}

  ${(
    <Example
      packageName="@atlaskit/editor-bitbucket-transformer"
      Component={require('../examples/1-bitbucket-html').default}
      title="Bitbucket HTML"
      source={require('!!raw-loader!../examples/1-bitbucket-html')}
    />
  )}
`;
