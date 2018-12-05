import * as React from 'react';
import { md, Example, code } from '@atlaskit/docs';

export default md`

This transformer allows encoding editor in Wikimarkup.

  ## Usage

  Use the component in your React app as follows:

  ${code`import { WikiMarkupTransformer } from '@atlaskit/editor-wikimarkup-transformer';
  const transformer = new WikiMarkupTransformer(schema);
  const pmNode = transformer.parse(wikiMarkup);`}

  ${(
    <Example
      packageName="@atlaskit/editor-wikimarkup-transformer"
      Component={require('../examples/0-adf-to-wikimarkup').default}
      title="ADF to Wikimarkup"
      source={require('!!raw-loader!../examples/0-adf-to-wikimarkup')}
    />
  )}
`;
