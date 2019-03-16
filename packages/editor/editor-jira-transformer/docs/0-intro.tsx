import * as React from 'react';
import { md, Example, code } from '@findable/docs';

export default md`
This package provides a transformation from ProseMirror Node → wikimarkup and from HTML → ProseMirror Node.

  ## Usage

  Use the encoder with editor-jira-transformer as follows:

  ${code`import { JiraTransformer } from '@findable/editor-jira-transformer';
  import { JiraSchema as schema } from '@findable/editor-common';

  const serializer = new JiraTransformer(schema);
  // To encode editor content as markdown
  serializer.encode(editorContent);
  // To convert HTML to editor content
  serializer.parse(html);`}

  ${(
    <Example
      packageName="@findable/editor-jira-transformer"
      Component={require('../examples/1-jira-html-input').default}
      title="Jira HTML Input"
      source={require('!!raw-loader!../examples/1-jira-html-input')}
    />
  )}
`;
