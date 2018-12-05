import * as React from 'react';
import { md, Example, code } from '@atlaskit/docs';

export default md`
This transformer allows encoding editor in Jira content as markdown or converting HTML to editor content.

  ## Usage

  Use the encoder with editor-jira-transformer as follows:

  ${code`import { JiraTransformer } from '@atlaskit/editor-jira-transformer';
  import { JiraSchema as schema } from '@atlaskit/editor-common';

  const serializer = new JiraTransformer(schema);
  // To encode editor content as markdown
  serializer.encode(editorContent);
  // To convert HTML to editor content
  serializer.parse(html);`}

  ${(
    <Example
      packageName="@atlaskit/editor-jira-transformer"
      Component={require('../examples/1-jira-html-input').default}
      title="Jira HTML Input"
      source={require('!!raw-loader!../examples/1-jira-html-input')}
    />
  )}
`;
